// TODO: загрузить корзину из localStorage

// TODO: для каждого товара подгрузить данные из API (getProductById)

// TODO: отрисовать список товаров с количеством и кнопкой "Удалить"

// TODO: посчитать итоговую сумму

// TODO: при удалении товара обновлять localStorage и перерисовывать корзину

document.addEventListener("DOMContentLoaded", async () => {
    const cart = new Cart();
    cart.loadFromLocalStorage();

    //  Пример структуры одного товара:
    // <div class="cart-item">
    //     <div class="cart-item__image-wrapper">
    //         <img src="img/product.jpg" alt="Product" class="cart-item__image">
    //     </div>
    //     <div class="cart-item__info">
    //         <h3 class="cart-item__title">Название товара</h3>
    //         <p class="cart-item__price">$19.99</p>
    //     </div>
    //     <div class="cart-item__controls">
    //         <button class="cart-item__qty-btn cart-item__qty-btn--minus">−</button>
    //         <span class="cart-item__qty">1</span>
    //         <button class="cart-item__qty-btn cart-item__qty-btn--plus">+</button>
    //     </div>
    //     <div class="cart-item__total">
    //         <p class="cart-item__total-price">$19.99</p>
    //     </div>
    //     <button class="cart-item__remove">×</button>
    // </div>

    const cartItemsContainer = document.getElementById("cartItems");
    const summaryElem = document.getElementById("cartSummary");
    if (!cartItemsContainer) {
        console.error('Element with id "cartItems" not found.');
        return;
    }

    if (!summaryElem) {
        console.error('Element with id "cartSummary" not found.');
        return;
    }

    if (cart.items.length === 0) {
        const emptyMsgElem = document.getElementById("cartEmptyMessage");
        if (emptyMsgElem) {
            emptyMsgElem.style.display = "block";
        } else {
            console.warn('Element with id "cartEmptyMessage" not found.');
        }
        
        summaryElem.style.display = "none";

        return;
    }
    cart.items.forEach(async (cartItem) => {
        const cartItemElement = cartItem.renderCartItem();
        cartItemsContainer.appendChild(cartItemElement);
    });
});