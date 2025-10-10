// TODO: загрузить корзину из localStorage

// TODO: для каждого товара подгрузить данные из API (getProductById)

// TODO: отрисовать список товаров с количеством и кнопкой "Удалить"

// TODO: посчитать итоговую сумму

// TODO: при удалении товара обновлять localStorage и перерисовывать корзину

document.addEventListener("DOMContentLoaded", async () => {
    const cart = await getCart();

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

    if (window.location.pathname.endsWith("cart.html")) {
        await renderCart(cart);
        await renderCartSummary(cart);
    }
});

async function getCart() {
    const cartItemsRaw = localStorage.getItem("cart");
    const cartItems = cartItemsRaw ? JSON.parse(cartItemsRaw) : [];
    return new Cart(cartItems.map(item => new CartItem(item.productId, item.quantity, item.price)));
}

async function saveCart(cart) {
    const cartItems = cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
    }));
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

async function renderCart(cart) {
    const cartItemsContainer = document.getElementById("cartItems");
    if (!cartItemsContainer) return;

    if (cart.items.length === 0) {
        const emptyMsgElem = document.getElementById("cartEmptyMessage");
        if (emptyMsgElem) {
            emptyMsgElem.style.display = "block";
        } else {
            console.warn('Element with id "cartEmptyMessage" not found.');
        }

        const summaryElem = document.getElementById("cartSummary");
        if (summaryElem) {
            summaryElem.style.display = "none";
        } else {
            console.warn('Element with id "cartSummary" not found.');
        }

        return;
    }

    // очистка предыдущего содержимого
    cartItemsContainer.innerHTML = "";

    // отрисовка каждого элемента корзины
    cart.items.forEach(async (cartItem) => {
        const product = await getProductById(cartItem.productId);
        if (!product) return null;

        // создание элемента корзины
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.dataset.id = cartItem.productId;
        item.dataset.quantity = cartItem.quantity;

        // добавление содержимого элемента
        // изображение
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("cart-item__image-wrapper");
        item.appendChild(imgWrapper);

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.classList.add("cart-item__image");
        imgWrapper.appendChild(img);

        // информация
        const infoWrapper = document.createElement("div");
        infoWrapper.classList.add("cart-item__info");
        item.appendChild(infoWrapper);

        const title = document.createElement("h3")
        title.classList.add("card-item__title");
        title.textContent = product.title
        infoWrapper.appendChild(title);

        const price = document.createElement("p");
        price.textContent = `$${cartItem.price}`;
        price.classList.add("card-item__price");
        infoWrapper.appendChild(price);

        // управление кол-вом
        const controlsWrapper = document.createElement("div");
        controlsWrapper.classList.add("card-item__controls", "d-flex", "align-items-center");
        infoWrapper.appendChild(controlsWrapper);

        const minusBtn = document.createElement("button");
        minusBtn.classList.add("cart-item__qty-btn", "cart-item__qty-btn--minus");
        minusBtn.textContent = "−";
        minusBtn.addEventListener("click", () => {
            cart.removeQuantity(cartItem.productId, 1);
            if (cartItem.quantity < 1) item.remove();
            else {
                qty.textContent = cartItem.quantity;
                totalPrice.textContent = `$${cartItem.getTotalPrice().toFixed(2)}`;
            }

            renderCartSummary(cart);
            saveCart(cart);
        });
        controlsWrapper.appendChild(minusBtn);

        const qty = document.createElement("span");
        qty.classList.add("cart-item__qty");
        qty.textContent = cartItem.quantity;
        controlsWrapper.appendChild(qty);

        const plusBtn = document.createElement("button");
        plusBtn.classList.add("cart-item__qty-btn", "cart-item__qty-btn--plus");
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => {
            cart.addQuantity(cartItem.productId, 1);
            qty.textContent = cartItem.quantity;
            totalPrice.textContent = `$${cartItem.getTotalPrice().toFixed(2)}`;
            renderCartSummary(cart);
            saveCart(cart);
        });
        controlsWrapper.appendChild(plusBtn);

        // общая цена
        const totalWrapper = document.createElement("div");
        totalWrapper.classList.add("cart-item__total");
        item.appendChild(totalWrapper);

        const totalPrice = document.createElement("p");
        totalPrice.classList.add("cart-item__total-price");
        totalPrice.textContent = `$${cartItem.getTotalPrice().toFixed(2)}`;
        totalWrapper.appendChild(totalPrice);

        // кнопка удаления
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("cart-item__remove");
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", () => {
            cart.removeItem(cartItem.productId);
            item.remove();
            saveCart(cart);
        });
        item.appendChild(removeBtn);
        cartItemsContainer.appendChild(item);
    });
}

async function renderCartSummary(cart) {
    const summaryElem = document.getElementById("cartSummary");
    if (!summaryElem) return;

    // Создание нового содержимого
    const totalItems = cart.getTotalCount();
    const totalPrice = cart.getTotalPrice();
    const deliveryFee = 0; // можно добавить логику расчета доставки

    const cartItemsCount = summaryElem.querySelector("#cartItemsCount");
    if (cartItemsCount) cartItemsCount.textContent = totalItems;

    const cartSubTotal = summaryElem.querySelector("#cartSubtotal");
    if (cartSubTotal) cartSubTotal.textContent = `$${totalPrice.toFixed(2)}`;

    const cartTotalPrice = summaryElem.querySelector("#cartTotal");
    if (cartTotalPrice) cartTotalPrice.textContent = `$${(totalPrice + deliveryFee).toFixed(2)}`;
}