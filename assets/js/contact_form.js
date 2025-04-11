document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form_to_contact');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const submitBtn = form.querySelector('.form_btn');

    const successMessage = document.createElement('div');
    successMessage.className = 'form_success_message';
    successMessage.innerHTML = `
        <p>Форма отправлена!</p>
        <p>Мы свяжемся с Вами в ближайшее время</p>
    `;
    document.body.appendChild(successMessage);

    function isValidPhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && digits.startsWith('7');
    }

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите Ваше имя');
            isValid = false;
        }

        const phoneValue = phoneInput.value.trim();
        if (phoneValue === '') {
            showError(phoneInput, 'Пожалуйста, введите Ваш телефон');
            isValid = false;
        } else if (!isValidPhone(phoneValue)) {
            showError(phoneInput, 'Введите телефон в формате +7 912 345-67-89');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        input.classList.add('form_input_error');
        let errorElement = input.parentNode.querySelector('.form_error_message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form_error_message';
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function hideError(input) {
        input.classList.remove('form_input_error');
        const errorElement = input.parentNode.querySelector('.form_error_message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            submitBtn.classList.add('form_btn_loading');

            setTimeout(() => {
                successMessage.style.display = 'block';

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);

                form.reset();

                submitBtn.disabled = false;
                submitBtn.textContent = 'Записаться';
                submitBtn.classList.remove('form_btn_loading');
            }, 1000);
        }
    });

    phoneInput.addEventListener('input', function (e) {
        let value = this.value.replace(/\D/g, '');

        if (!value.startsWith('7')) value = '7' + value;

        value = value.substring(0, 11);

        let formattedValue = '+7';
        if (value.length > 1) {
            formattedValue += ' ' + value.substring(1, 4);
        }
        if (value.length > 4) {
            formattedValue += ' ' + value.substring(4, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length > 9) {
            formattedValue += '-' + value.substring(9, 11);
        }

        this.value = formattedValue;

        if (isValidPhone(this.value)) {
            hideError(this);
        }
    });

});