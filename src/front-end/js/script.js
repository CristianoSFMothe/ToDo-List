document.addEventListener('DOMContentLoaded', function () {
    console.log("Script carregado!");

    const form = document.getElementById('userForm');
    const submitButton = document.getElementById('submitButton');
    const fields = document.querySelectorAll('input, select, textarea');
    const selectFramework = document.getElementById('select-itens');
    let formSubmitted = false;

    function showErrorMessage(field, message) {
        const errorSpan = field.nextElementSibling;
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }

    function clearErrorMessage(field) {
        const errorSpan = field.nextElementSibling;
        errorSpan.textContent = '';
        errorSpan.style.display = 'none';
    }

    function validateField(field) {
        if (field.value.trim() === '') {
            if (formSubmitted) {
                showErrorMessage(field, 'Este campo é obrigatório.');
            }
            return false;
        }

        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                if (formSubmitted) {
                    showErrorMessage(field, 'Insira um e-mail válido.');
                }
                return false;
            }
        }

        clearErrorMessage(field);
        return true;
    }

    function validateForm() {
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validação do select-itens
        if (selectFramework.value === '') {
            if (formSubmitted) {
                showErrorMessage(selectFramework, 'Selecione um framework.');
            }
            isValid = false;
        } else {
            clearErrorMessage(selectFramework);
        }

        return isValid;
    }

    fields.forEach(field => {
        field.addEventListener('input', function () {
            validateField(field);
        });
    });

    selectFramework.addEventListener('change', function () {
        validateField(selectFramework);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        formSubmitted = true; // Agora a exibição de erros está ativada

        if (!validateForm()) {
            return;
        }

        console.log("Botão acionado !!!");
        submitButton.textContent = 'Enviado';
        submitButton.disabled = true;
        window.location.href = "obrigado.html";
    });


});
