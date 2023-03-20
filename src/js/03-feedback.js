import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// const inputEl = document.querySelector('[name ="email"]');

// const textareaEl = document.querySelector('[name ="message"]');

// inputEl.setAttribute('id', 'email');
// textareaEl.setAttribute('id', 'message');

populateForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(e => {
    userStorage[e.target.name] = e.target.value;
    onInputFormValue();
}, 500)
);

let userStorage = {};

function onFormInput(e) {
    e.preventDefault();
    
    const name = e.target;
    const value = e.target.value;
    // const attributeName = name.getAttribute("id");
    // if (attributeName === 'email') {
    //      userStorage.email = value;
    // } else {
    //     userStorage.message = value;
    // }
    userStorage[e.target.name] = e.target.value;
    const userData = JSON.stringify(userStorage);
    localStorage.setItem(STORAGE_KEY, userData); 
   
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(userStorage);
    e.currentTarget.reset();
    // const savedData = localStorage.getItem(STORAGE_KEY);
    // const parsedSavedData = JSON.parse(savedData);
    // console.log("email:", parsedSavedData.email);
    // console.log("message", parsedSavedData.message);
    localStorage.removeItem(STORAGE_KEY);
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
    //     inputEl.value = userStorage.email;
        
    //     textareaEl.value = userStorage.message;
    //    if(userStorage.email === undefined){
    //     inputEl.value = '';  
    //     } if (userStorage.message === undefined) {
    //         textareaEl.value = '';
    // }
    } 
    } catch (error) {
        console.error(error);
}}