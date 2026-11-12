const menuButton = document.getElementById("mobile-menu-button");
const navigation = document.getElementById("navigation");
if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Закрыть меню" : "Открыть меню"
        );
        menuButton.textContent = isOpen ? "×" : "☰";
    });
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Открыть меню");
            menuButton.textContent = "☰";
        });
    });
}
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const modalClose = document.querySelector(".modal-close");
const registrationSwitch = document.getElementById(
    "registration-switch"
);
let authMode = "login";
document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    });
});
function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove("is-open");
    authModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
if (modalClose) {
    modalClose.addEventListener("click", closeAuthModal);
}
if (authModal) {
    authModal.addEventListener("click", event => {
        if (event.target === authModal) {
            closeAuthModal();
        }
    });
}
if (registrationSwitch) {
    registrationSwitch.addEventListener("click", () => {
        const heading = authModal.querySelector(".modal-content h2");
        const submitButton = authForm.querySelector(
            'button[type="submit"]'
        );
        authMode = authMode === "login" ? "register" : "login";
        if (authMode === "register") {
            heading.textContent = "РЕГИСТРАЦИЯ";
            submitButton.textContent = "Зарегистрироваться";
            registrationSwitch.textContent = "Уже есть аккаунт? Войти";
        } else {
            heading.textContent = "ВХОД";
            submitButton.textContent = "Войти";
            registrationSwitch.textContent = "Регистрация";
        }
        removeFormMessage(authForm);
    });
}
if (authForm) {
    authForm.addEventListener("submit", event => {
        event.preventDefault();
        showFormMessage(
            authForm,
            "Интерфейс готов. Для регистрации и входа необходимо подключить серверную авторизацию."
        );
    });
}
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("gift-search-input");
if (searchForm && searchInput) {
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        const searchQuery = searchInput.value.trim();
        if (!searchQuery) {
            showFormMessage(
                searchForm,
                "Введите название или повод для подарка."
            );
            searchInput.focus();
            return;
        }
        /*
           Сейчас серверного каталога ещё нет.
        */
        showFormMessage(
            searchForm,
            "Поисковый запрос принят: «" +
            searchQuery +
            "». Каталог будет подключён на следующем этапе."
        );
    });
}
const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");
function openCart() {
    if (!cartPanel) return;
    cartPanel.classList.add("is-open");
    cartPanel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}
function closeCart() {
    if (!cartPanel) return;
    cartPanel.classList.remove("is-open");
    cartPanel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}
if (cartButton) {
    cartButton.addEventListener("click", openCart);
}
if (cartClose) {
    cartClose.addEventListener("click", closeCart);
}
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAuthModal();
        closeCart();
        if (navigation && menuButton) {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        }
    }
});
function showFormMessage(form, message) {
    removeFormMessage(form);
    const messageElement = document.createElement("div");
    messageElement.className = "form-message";
    messageElement.textContent = message;
    messageElement.setAttribute("role", "status");
    form.appendChild(messageElement);
}
function removeFormMessage(form) {
    const existingMessage = form.querySelector(".form-message");
    if (existingMessage) {
        existingMessage.remove();
    }
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") {
            event.preventDefault();
            return;
        }
        const target = document.querySelector(targetId);
        if (!target) {
            event.preventDefault();
        }
    });
});
console.log("Квест Хоум: интерфейс загружен.");