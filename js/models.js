// TODO: класс пользователя

class User {
    // name, email, password
}

// TODO: класс товара
class Product {
    // id, title, price, description, image, category
}

// TODO: класс для одного элемента корзины
class CartItem {
    // productId, quantity
}

// TODO: класс корзины
class Cart {
  constructor(items = []) {
    this.items = items; // массив CartItem
  }

  addItem(productId) {
    // TODO: добавить товар (если есть — увеличить количество)
  }

  removeItem(productId) {
    // TODO: удалить товар
  }

  getTotal() {
    // TODO: вернуть итоговую сумму
  }
}


