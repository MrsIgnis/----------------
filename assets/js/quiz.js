function changeStage(currentStage, nextStage, event) {
    if (event) {
        event.preventDefault();
    }

    if (nextStage < currentStage) {
        const currentStageElement = document.querySelector(`.stage_${currentStage}`);
        const prevStageElement = document.querySelector(`.stage_${nextStage}`);

        if (currentStageElement && prevStageElement) {
            currentStageElement.style.display = 'none';
            prevStageElement.style.display = 'block';
            prevStageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
    }

    if (currentStage === 1) {
        const checkboxes = document.querySelectorAll('.stage_1 input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert('Пожалуйста, выберите хотя бы один предмет');
            return;
        }
    } else if (currentStage === 4) {
        const nameInput = document.querySelector('input[name="name_quiz_input"]');
        const phoneInput = document.querySelector('input[name="number_quiz_input"]');

        if (!nameInput.value.trim()) {
            alert('Пожалуйста, введите ваше имя');
            nameInput.focus();
            return;
        } else if (nameInput.value.trim().length < 2) {
            alert('Имя должно содержать минимум 2 символа');
            nameInput.focus();
            return;
        }

        const phoneValue = phoneInput.value.replace(/\D/g, '');
        if (!phoneValue) {
            alert('Пожалуйста, введите ваш телефон');
            phoneInput.focus();
            return;
        } else if (phoneValue.length !== 11) {
            alert('Пожалуйста, введите корректный номер телефона (11 цифр)');
            phoneInput.focus();
            return;
        }

        const formattedPhone = `+7 ${phoneValue.substring(1, 4)} ${phoneValue.substring(4, 7)} ${phoneValue.substring(7, 9)} ${phoneValue.substring(9)}`;
        phoneInput.value = formattedPhone;
    } else {
        const radioName = currentStage === 2 ? 'level_know' : 'time_problem';
        const isChecked = document.querySelector(`input[name="${radioName}"]:checked`) !== null;

        if (!isChecked) {
            alert('Пожалуйста, выберите один вариант ответа');
            return;
        }
    }

    if (nextStage === 5) {
        showSelectedAnswers();
    }

    const currentStageElement = document.querySelector(`.stage_${currentStage}`);
    const nextStageElement = document.querySelector(`.stage_${nextStage}`);

    if (currentStageElement && nextStageElement) {
        currentStageElement.style.display = 'none';
        nextStageElement.style.display = 'block';
        nextStageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.querySelector('input[name="number_quiz_input"]');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            const input = e.target;
            let value = input.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            let formattedValue = '+7';
            if (value.length > 1) {
                formattedValue += ' ' + value.substring(1, 4);
            }
            if (value.length > 4) {
                formattedValue += ' ' + value.substring(4, 7);
            }
            if (value.length > 7) {
                formattedValue += ' ' + value.substring(7, 9);
            }
            if (value.length > 9) {
                formattedValue += ' ' + value.substring(9, 11);
            }

            input.value = formattedValue;
        });
    }

    const stages = document.querySelectorAll('.stage');
    stages.forEach((stage, index) => {
        if (index !== 0) {
            stage.style.display = 'none';
        }
    });
});

function showSelectedAnswers() {
    const answersContainer = document.querySelector('.selected_answers_list');
    answersContainer.innerHTML = '';

    const selectedSubjects = Array.from(
        document.querySelectorAll('.stage_1 input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);

    const knowledgeLevel = document.querySelector('.stage_2 input[type="radio"]:checked')?.value;
    const problemDuration = document.querySelector('.stage_3 input[type="radio"]:checked')?.value;

    const allAnswers = [
        ...selectedSubjects,
        knowledgeLevel,
        problemDuration,
    ].filter(Boolean);

    let answersHTML = '<p class="answers_title">Ваши ответы:</p><ul class="answers_list">';

    allAnswers.forEach(answer => {
        answersHTML += `
            <li class="answer_item">
                <span class="answer_icon"></span>${answer}
            </li>
        `;
    });

    answersHTML += '</ul>';

    answersContainer.innerHTML = answersHTML;
}

function restartQuiz() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    document.querySelector('input[name="name_quiz_input"]').value = '';
    document.querySelector('input[name="number_quiz_input"]').value = '';

    document.querySelectorAll('.stage').forEach(stage => {
        stage.style.display = 'none';
    });
    document.querySelector('.stage_1').style.display = 'block';
}