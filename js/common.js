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

// Шапка
function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const user = getCurrentUser();

  header.innerHTML = `
    <h1><a href="index.html">Магазин</a></h1>
    <nav>
      <a href="index.html">Главная</a>
      <a href="cart.html">Корзина</a>
      ${user ? 
        `<span>Привет, ${user.name}</span> <button id="logout-btn">Выйти</button>` : 
        `<a href="auth.html">Вход / Регистрация</a>`}
    </nav>
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
      window.location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderHeader);
