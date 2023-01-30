'use strict';

const basket = {};
const basketCounter = document.querySelector('.cartIconWrap span');
const basketValue = document.querySelector('.basketTotalValue');
const basketIcon = document.querySelector('.cartIconWrap');
const basketTab = document.querySelector('.basket');
basketIcon.addEventListener('click', () => {
    basketTab.classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!(event.target.tagName == 'BUTTON')) {
        return;
        }
    const clickedElData = event.target.closest('.featuredItem').dataset;
    const elId = clickedElData.id;
    const elName = clickedElData.name;
    const elPrice = clickedElData.price;
    addToCart(elId, elName, elPrice);
    }
);
/**
 * Функция добавляет элементы в корзину.
 * @param {*} id - Идентификационный номер товара.
 * @param {*} name - Наименование товара.
 * @param {*} price - Цена товара.
 */
function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count += 1;
    basketCounter.textContent = getBasketCount().toString();
    basketValue.textContent = getBasketPrice().toFixed(2);
    makeBasketHTML();
};

function getBasketCount() {
    let sum = 0;
    Object.values(basket).forEach(element => sum = sum + element.count);
    return sum;
};

function getBasketPrice() {
    // let sum = 0;
    // Object.values(basket).forEach(element => sum = sum + element.count * element.price);
    // return sum;
    return Object.values(basket).reduce((accumulator, curVal) =>
         +accumulator + curVal.price * curVal.count, 0);
};
/**
 * Функция представляет содержимое корзины в удобном для пользователя виде.
 */
function makeBasketHTML() {
    const placeToInsert = document.querySelector('.basketTotal');
    document.querySelectorAll('.toRemove').forEach(element => element.remove());
    Object.values(basket).forEach(element =>
        placeToInsert.insertAdjacentHTML("beforebegin", `
        <div class="basketRow toRemove">
        <div>${element.name}</div>
        <div>${element.count}</div>
        <div>${element.price}</div>
        <div>${element.price * element.count}</div>
        </div>
        `))
}