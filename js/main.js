"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('h3');
    headings.forEach((heading) => { heading.style.color = '#2E8B57'; });
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const infoMsg = document.createElement('p');
        infoMsg.textContent = "© 2025 PriceTracker. Всі ціни моніторяться в реальному часі.";
        infoMsg.style.textAlign = 'center';
        infoMsg.style.color = '#888';
        infoMsg.style.marginTop = '20px';
        mainElement.appendChild(infoMsg);
    }
    const themeBtn = document.createElement('button');
    themeBtn.textContent = '🌙 Змінити тему';
    Object.assign(themeBtn.style, { position: 'fixed', bottom: '20px', left: '20px', zIndex: '1000', padding: '10px', background: '#3CB371', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' });
    document.body.appendChild(themeBtn);
    if (localStorage.getItem('site-theme') === 'dark')
        document.body.classList.add('dark-theme');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('site-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    const footerObj = document.querySelector('footer p');
    if (footerObj)
        footerObj.innerHTML += ` | Сьогодні: ${new Date().toLocaleDateString('uk-UA')}`;
    const toggleBtn = document.getElementById('toggle-btn');
    const moreDetails = document.getElementById('more-details');
    if (toggleBtn && moreDetails) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = moreDetails.style.display === 'none';
            moreDetails.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? 'Приховати деталі' : 'Дізнатися більше';
        });
    }
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        if (form.classList.contains('main-search'))
            return;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;
            const showError = (input, message) => {
                if (!input)
                    return;
                const inputEl = input;
                inputEl.style.setProperty('border', '2px solid #FF5F56', 'important');
                let errorSpan = inputEl.nextElementSibling;
                if (!errorSpan || !errorSpan.classList.contains('error-msg')) {
                    errorSpan = document.createElement('span');
                    errorSpan.className = 'error-msg';
                    if (inputEl.parentNode) {
                        inputEl.parentNode.insertBefore(errorSpan, inputEl.nextSibling);
                    }
                }
                errorSpan.textContent = message;
            };
            const clearError = (input) => {
                if (!input)
                    return;
                const inputEl = input;
                inputEl.style.removeProperty('border');
                const errorSpan = inputEl.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-msg')) {
                    errorSpan.remove();
                }
            };
            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const msgInput = form.querySelector('textarea[name="message"]');
            if (nameInput.value.trim().length < 3) {
                showError(nameInput, "Ім'я має бути не менше 3 символів");
                isValid = false;
            }
            else {
                clearError(nameInput);
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, "Введіть коректний email (з @)");
                isValid = false;
            }
            else {
                clearError(emailInput);
            }
            if (msgInput.value.trim().length < 10) {
                showError(msgInput, "Повідомлення занадто коротке");
                isValid = false;
            }
            else {
                clearError(msgInput);
            }
            if (isValid) {
                alert("✅ Форма успішно надіслана!");
                form.reset();
                [nameInput, emailInput, msgInput].forEach(clearError);
            }
        });
    });
});
