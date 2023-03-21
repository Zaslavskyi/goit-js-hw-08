import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let userStorage = {};
populateForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(e => {
    userStorage[e.target.name] = e.target.value;
    onFormInput();
}, 500)
);



function onFormInput(e) {

    const userData = JSON.stringify(userStorage);
    localStorage.setItem(STORAGE_KEY, userData); 
   
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(userStorage);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    Object.keys(userStorage).forEach(ei => delete userStorage[el]);
}

function populateForm() {

    try {
    const savedData = localStorage.getItem(STORAGE_KEY);
        
    if (savedData) {
        userStorage = JSON.parse(savedData);
            
            if (userStorage) {
                Object.entries(userStorage).forEach(([name, value]) => {
                    const input = form.querySelector(`[name="${name}"]`);
                    input.value = value;
                    userStorage[name] = value;
                })
            }
    } 
    } catch (error) {
        console.error(error);
}}