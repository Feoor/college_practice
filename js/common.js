// Работа с пользователем
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function showGreeting() {
  const user = getCurrentUser();
  if (user) {
    alert(`Привет, ${user.name}!`);
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartCountElem = document.getElementById("cartCount");
  if (cart && cartCountElem) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.textContent = totalItems;
    cartCountElem.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// Шапка
function renderHeader() {
  const header = document.getElementById("header");
  const rightSide = header.querySelector(".header__right-side");
  if (!header) return;

  const user = getCurrentUser();

  rightSide.innerHTML = user
    ? `<span class="header__user-name">Привет, <span class="highlight--purple">${user.name}!</span></span>
      <button id="logout-btn" class="btn btn-secondary header__logout-btn">Выйти</button>`
    : `<a href="auth.html?mode=sign_in" class="header__login">Войти</a>
      <a href="auth.html?mode=sign_up" class="header__sign-up">Зарегистрироваться</a>`;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
      window.location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  updateCartCount();
});