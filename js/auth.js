function renderCurrentForm(mode) {
    if (mode === "sign_in") {
        document.getElementById("signInContainer").style.display = "block";
        document.getElementById("signUpContainer").style.display = "none";
    } else {
        document.getElementById("signInContainer").style.display = "none";
        document.getElementById("signUpContainer").style.display = "block";
    }
}
function toggleForms() {
    const currentForm = new URLSearchParams(window.location.search).get("mode") || "sign_in";

    if (currentForm === "sign_in") {
        renderCurrentForm("sign_up");
        window.history.replaceState({}, document.title, "auth.html?mode=sign_up");
    } else {
        renderCurrentForm("sign_in");
        window.history.replaceState({}, document.title, "auth.html?mode=sign_in");
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}
function getUser(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function registerUser(name, email, password) {
    // регистрация нового пользователя
    const user = new User(name, email, password);

    let users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    // перенаправление на главную страницу
    window.location.href = "index.html";
}

function signInUser(email, password) {
    const user = getUser(email);
    if (user && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Неверный email или пароль");
    }
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function validateName(name) {
    // Проверяем, что имя не пустое
    if (!name.trim()) {
        return { valid: false, message: "Введите имя" };
    }

    // Проверяем минимальную длину имени
    if (name.trim().length < 3) {
        return { valid: false, message: "Имя должно содержать не менее 3 символов" }
    }

    // Проверяем, что имя не содержит цифр
    const nameRegex = /^[а-яА-Яa-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return { valid: false, message: "Имя может содержать только буквы" }
    }

    // Проверка пройдена
    return { valid: true, message: "" };
}

function validateEmail(email) {
    // Проверяем, что email не пустой
    if (!email.trim()) {
        return { valid: false, message: "Введите email" };
    }

    // Проверяем формат email с помощью регулярного выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Введите корректный email" };
    }

    // Проверка пройдена
    return { valid: true, message: "" };
}

function validatePassword(password) {
    // Проверяем, что пароль не пустой
    if (!password) {
        return { valid: false, message: "Введите пароль" };
    }

    // Проверяем минимальную длину пароля
    if (password.length < 6) {
        return { valid: false, message: "Пароль должен содержать не менее 6 символов" };
    }

    // Проверяем наличие хотя бы одного символа и верхнего регистра
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/;
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Пароль должен содержать хотя бы одну заглавную букву и спец.символ" };
    }

    // Проверка пройдена
    return { valid: true, message: "" };
}

document.addEventListener("DOMContentLoaded", function () {
    // Инициализация формы в зависимости от параметра URL
    const mode = new URLSearchParams(window.location.search).get("mode") || "sign_in";
    renderCurrentForm(mode);

    // Добавление обработчика события для кнопки переключения форм
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", toggleForms);
    });

    // Для страницы входа
    const signInForm = document.getElementById("signInForm");

    if (signInForm) {
        const emailInput = document.getElementById("signInEmailInput");
        const passwordInput = document.getElementById("signInPasswordInput");

        signInForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!validateEmail(emailInput.value).valid) {
                emailInput.setCustomValidity(validateEmail(emailInput.value).message);
                emailInput.reportValidity();
                return;
            } else {
                emailInput.setCustomValidity("");
            }

            if (!validatePassword(passwordInput.value).valid) {
                passwordInput.setCustomValidity(validatePassword(passwordInput.value).message);
                passwordInput.reportValidity();
                return;
            } else {
                passwordInput.setCustomValidity("");
            }

            signInUser(emailInput.value, passwordInput.value);
        })
    }

    // Для страницы регистрации
    const signUpForm = document.getElementById("signUpForm");

    if (signUpForm) {
        const nameInput = document.getElementById("signUpNameInput");
        const emailInput = document.getElementById("signUpEmailInput");
        const passwordInput = document.getElementById("signUpPasswordInput");

        signUpForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameValidation = validateName(nameInput.value);

            if (!nameValidation.valid) {
                nameInput.setCustomValidity(nameValidation.message);
                nameInput.reportValidity();
                return;
            } else {
                nameInput.setCustomValidity("");
            }

            if (!validateEmail(emailInput.value).valid) {
                emailInput.setCustomValidity(validateEmail(emailInput.value).message);
                emailInput.reportValidity();
                return;
            } else {
                emailInput.setCustomValidity("");
            }

            if (!validatePassword(passwordInput.value).valid) {
                passwordInput.setCustomValidity(validatePassword(passwordInput.value).message);
                passwordInput.reportValidity();
                return;
            } else {
                passwordInput.setCustomValidity("");
            }

            registerUser(nameInput.value, emailInput.value, passwordInput.value);
        })
    }
});