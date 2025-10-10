class User {
    // name, email, password
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Product {
    // id, title, price, description, image, category
    constructor(id, title, price, rating, description, image, category, quantity = 0) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.image = image;
        this.category = category;
        this.quantity = quantity
    }

    renderCard() {
      // создание карточки товара
      const card = document.createElement("div");
      card.classList.add("our-catalog__item", "card");
      card.dataset.id = this.id;
      card.dataset.category = this.category;
      
      // добавление содержимого карточки
      // изображение
      const img = document.createElement("img");
      img.src = this.image;
      img.alt = this.title;
      img.classList.add("card-img-top");
      card.appendChild(img);

      // тело карточки
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      card.appendChild(cardBody);

      // заголовок
      const title = document.createElement("h5");
      title.classList.add("card-title", "mb-1");
      title.textContent = this.title;
      cardBody.appendChild(title);

      // рейтинг и иконка
      const itemInfo = document.createElement("div");
      itemInfo.classList.add("our-catalog__item-info", "d-flex", "align-items-center", "mb-2");
      cardBody.appendChild(itemInfo);

      // иконка звезды
      const starImg = document.createElement("img");
      starImg.src = "icons/purple_star.svg";
      starImg.alt = "Purple star";
      itemInfo.appendChild(starImg);

      // рейтинг
      const rating = document.createElement("span");
      rating.classList.add("item__rating");
      rating.textContent = this.rating;
      itemInfo.appendChild(rating);

      // цена
      const price = document.createElement("h5");
      price.classList.add("menu-section__dish-price");
      price.textContent = `$${this.price}`;
      cardBody.appendChild(price);

      // кнопка "В корзину"
      const cartBtn = document.createElement("button");
      cartBtn.classList.add("product__cart-btn", "add-to-cart");
      cartBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        // добавление товара в корзину
        const cart = await getCart();
        cart.addItem(this.id, this.price, 1);
        saveCart(cart);
        updateCartCount();
      });
      cardBody.appendChild(cartBtn);

      return card;
    }

    renderProductPage() {
      // создание детальной страницы товара

      const productWrapper = document.createElement("div");
      productWrapper.classList.add("product-page__product", "row", "g-4");
      productWrapper.dataset.id = this.id;
      
      // добавление содержимого страницы
      // изображение товара
      const imageCol = document.createElement("div");
      imageCol.classList.add("product-page__image-col", "col-12", "col-lg-6");
      productWrapper.appendChild(imageCol);

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("product-page__image-wrapper");
      imageCol.appendChild(imgWrapper);

      const img = document.createElement("img");
      img.src = this.image;
      img.alt = this.title;
      img.classList.add("product-page__image");
      imgWrapper.appendChild(img);

      // информация о товаре
      const infoCol = document.createElement("div");
      infoCol.classList.add("product-page__info-col", "col-12", "col-lg-6");
      productWrapper.appendChild(infoCol);
      const info = document.createElement("div");
      info.classList.add("product-page__info");
      infoCol.appendChild(info);

      // категория
      const category = document.createElement("span");
      category.classList.add("badge", "badge-healthy", "mb-2");
      category.textContent = this.category;
      info.appendChild(category);

      // название
      const title = document.createElement("h1");
      title.classList.add("product-page__title");
      title.textContent = this.title;
      info.appendChild(title);

      // рейтинг
      const ratingDiv = document.createElement("div");
      ratingDiv.classList.add("product-page__rating", "mb-3");
      info.appendChild(ratingDiv);

      const starImg = document.createElement("img");
      starImg.src = "icons/purple_star.svg";
      starImg.alt = "Рейтинг";
      starImg.classList.add("product-page__rating-icon");
      ratingDiv.appendChild(starImg);

      const rating = document.createElement("span");
      rating.classList.add("product-page__rating-value");
      rating.textContent = this.rating;
      ratingDiv.appendChild(rating);

      // описание
      const description = document.createElement("p");
      description.classList.add("product-page__description");
      description.textContent = this.description;
      info.appendChild(description);

      // цена
      const price = document.createElement("h3");
      price.classList.add("product-page__price");
      price.textContent = `$${this.price}`;
      info.appendChild(price);

      // кнопки
      const actions = document.createElement("div");
      actions.classList.add("product-page__actions");
      info.appendChild(actions);

      // кнопка "Добавить в корзину"
      const addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("product-page__btn", "product-page__btn--primary");
      addToCartBtn.textContent = "Добавить в корзину";
      addToCartBtn.addEventListener("click", async () => {
        // добавление товара в корзину
        const cart = await getCart();
        cart.addItem(this.id, this.price, 1);
        saveCart(cart);
        // renderHeader
      });
        
      // Визуальный фидбек
      addToCartBtn.textContent = "✓ Добавлено!";
      addToCartBtn.classList.add("product-page__btn--success");
      addToCartBtn.disabled = true;
      
      setTimeout(() => {
          addToCartBtn.textContent = "Добавить в корзину";
          addToCartBtn.classList.remove("product-page__btn--success");
          addToCartBtn.disabled = false;
      }, 2000);
      
      actions.appendChild(addToCartBtn);

      // навигационные кнопки
      const navButtons = document.createElement("div");
      navButtons.classList.add("product-page__nav-buttons");
      actions.appendChild(navButtons);

      // вернуться назад в каталог и перейти в корзину
      const toCatalogBtn = document.createElement("button");
      toCatalogBtn.classList.add("product-page__btn", "product-page__btn--secondary");
      toCatalogBtn.textContent = "В каталог";
      toCatalogBtn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
      navButtons.appendChild(toCatalogBtn);

      const toCartBtn = document.createElement("button");
      toCartBtn.classList.add("product-page__btn", "product-page__btn--secondary");
      toCartBtn.textContent = "В корзину";
      toCartBtn.addEventListener("click", () => {
        window.location.href = "cart.html";
      });
      navButtons.appendChild(toCartBtn);

      return productWrapper;
    }
}

class CartItem {
    // productId, quantity
    constructor(productId, quantity, price) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price; // цена за единицу товара
    }

    getTotalPrice() {
      return this.quantity * this.price;
    }
}

class Cart {
  constructor(items = []) {
    this.items = items; // массив CartItem
  }

  addQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity += quantity;
    }
  }
  removeQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity < 1) {
        this.removeItem(productId);
      }
    }
  }

  addItem(productId, price = 0, quantity = 1) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      this.items.push(new CartItem(productId, quantity, price));
    }
  }

  removeItem(productId) {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}


