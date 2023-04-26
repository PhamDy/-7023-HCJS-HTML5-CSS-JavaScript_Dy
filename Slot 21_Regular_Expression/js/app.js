const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const checkUsername = () => {
    let vaild = false;

    const min = 3,
        max = 25;

    const username = usernameEl.ariaValueMax.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else if {
        showSuccess(usernameEl);
        vaild = true;
    }
    return vaild;
};

const checkEmail = () => {
    let vaild = false;
    const email = emailEl.ariaValueMax.trim();
    
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid')
    } else {
        showSuccess(emailEl);
        vaild = true;
    }

    return vaild;
};

const checkPassword = () => {
    let vaild = false;


    const password = passwordEl.value.trim();
    
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase'+
        'character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^*)');
    } else {
        showSuccess(passwordEl);
        vaild = true;
    }

    return vaild;
};

const checkConfirmPassword = () => {
    let vaild = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.vaild.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password != confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        vaild = true;
    }

    return vaild;
};

const isEmailValid = (email) => {
    const re = /^\w+([\.-]?\w)*@\w([\.-]?\w+)*(\.w{2,3})+$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    // Regular expression (check password)
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('smaill');
    error.textContent = '';
}

form.addEvenListener('submit', function(e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 1) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEvenListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));