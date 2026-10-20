
const form = document.getElementById("registration-form");
const successMessage = document.getElementById("success-message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const ageInput = document.getElementById("age");

function showError(input, message) {
    const errorElement = document.getElementById(input.id + "-error");

    errorElement.textContent = message;
    input.classList.toggle("invalid", message !== "");
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateName() {
    const name = nameInput.value.trim();

    let message = "";

    if (name.length < 2) {
        message = "Name must be at least 2 characters.";
    }

    showError(nameInput, message);
    return message === "";
}

function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let message = "";

    if (email === "") {
        message = "Email is required.";
    } else if (!emailPattern.test(email)) {
        message = "Please enter a valid email address.";
    }

    showError(emailInput, message);
    return message === "";
}

function validatePassword() {
    const password = passwordInput.value;

    let message = "";

    if (password.length < 8) {
        message = "Password must be at least 8 characters.";
    }

    showError(passwordInput, message);

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }

    return message === "";
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let message = "";

    if (confirmPassword === "") {
        message = "Please confirm your password.";
    } else if (confirmPassword !== password) {
        message = "Passwords do not match.";
    }

    showError(confirmPasswordInput, message);
    return message === "";
}

function validateAge() {
    const ageValue = ageInput.value.trim();
    const age = Number(ageValue);

    let message = "";

    if (ageValue === "") {
        message = "Age is required.";
    } else if (!Number.isInteger(age) || age < 1 || age > 120) {
        message = "Age must be a whole number between 1 and 120.";
    }

    showError(ageInput, message);
    return message === "";
}

// Validate fields while the user types.
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
ageInput.addEventListener("input", validateAge);

// Stop submission if any field is invalid.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const isValid = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validateAge()
    ].every(Boolean);

    if (isValid) {
        successMessage.hidden = false;
    } else {
        successMessage.hidden = true;

        const firstInvalid = form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});
