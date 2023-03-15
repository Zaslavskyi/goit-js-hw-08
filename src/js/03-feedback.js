
const throttle = require('lodash.throttle');
const STORAGE_KEY = 'feedback-from-state';
const formData = {};
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(e => {
    formData[e.target.name] = e.target.value;
    onInputFormValue();
}, 500)
);

populateFormInput();

function onFormSubmit(e) {
    e.preventDefault();

    console.log(formData);

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    Object.keys(formData).forEach(el => delete formData[el]);
};

function populateFormInput() {
    const storageData = localStorage.getItem(STORAGE_KEY);

    if (!storageData) {
        return;
    };

    try {
        const saveData = JSON.parse(storageData);

        if (saveData) {
            Object.entries(saveData).forEach(([name, value]) => {
                const input = form.querySelector('[name="${name}"]');
                input.value = value;
                formData[name] = value;
            });
        };
    } catch (error) {
        console.error(error);
    };
};