document.addEventListener('DOMContentLoaded', () => {
    // --- Part 1: JavaScript Event Handling ---

    // 1. Click Event for a Button
    const clickMeBtn = document.getElementById('clickMeBtn');
    const clickMessage = document.getElementById('clickMessage');

    clickMeBtn.addEventListener('click', () => {
        // Toggle visibility of the message
        clickMessage.classList.toggle('hidden');
        if (!clickMessage.classList.contains('hidden')) {
            clickMessage.textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
        }
    });

    // 2. Mouseover and Mouseout Events for a Box
    const hoverBox = document.getElementById('hoverBox');
    const hoverMessage = document.getElementById('hoverMessage');

    hoverBox.addEventListener('mouseover', () => {
        hoverMessage.classList.remove('hidden');
    });

    hoverBox.addEventListener('mouseout', () => {
        hoverMessage.classList.add('hidden');
    });

    // 3. Keyboard Input Event
    const keyInput = document.getElementById('keyInput');
    const keyMessage = document.getElementById('keyMessage');

    keyInput.addEventListener('keyup', (event) => {
        keyMessage.textContent = `Last key pressed: ${event.key} (Code: ${event.code})`;
    });

    // --- Part 2: Building Interactive Elements ---

    // 1. Light/Dark Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save user preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = 'Toggle Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = 'Toggle Dark Mode';
        }
    });

    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Toggle Light Mode';
    } else {
        themeToggleBtn.textContent = 'Toggle Dark Mode';
    }

    // 2. Simple Counter
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const counterDisplay = document.getElementById('counterDisplay');
    let counter = 0;

    decrementBtn.addEventListener('click', () => {
        counter--;
        counterDisplay.textContent = counter;
    });

    incrementBtn.addEventListener('click', () => {
        counter++;
        counterDisplay.textContent = counter;
    });

    // 3. Collapsible FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // Get the next sibling element (the answer)
            answer.classList.toggle('hidden');

            // Optional: Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.nextElementSibling.classList.add('hidden');
                }
            });
        });
    });

    // --- Part 3: Form Validation with JavaScript ---

    const myForm = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const formSuccess = document.getElementById('formSuccess');

    // Function to show error message
    const showError = (element, message) => {
        element.textContent = message;
        element.classList.remove('hidden');
    };

    // Function to hide error message
    const hideError = (element) => {
        element.textContent = '';
        element.classList.add('hidden');
    };

    // Validation functions
    const validateName = () => {
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            return false;
        } else if (nameInput.value.trim().length < 3) {
            showError(nameError, 'Name must be at least 3 characters long.');
            return false;
        }
        hideError(nameError);
        return true;
    };

    const validateEmail = () => {
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        }
        hideError(emailError);
        return true;
    };

    const validatePassword = () => {
        if (passwordInput.value === '') {
            showError(passwordError, 'Password is required.');
            return false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long.');
            return false;
        } else if (!/[A-Z]/.test(passwordInput.value)) {
            showError(passwordError, 'Password must contain at least one uppercase letter.');
            return false;
        } else if (!/[a-z]/.test(passwordInput.value)) {
            showError(passwordError, 'Password must contain at least one lowercase letter.');
            return false;
        } else if (!/[0-9]/.test(passwordInput.value)) {
            showError(passwordError, 'Password must contain at least one number.');
            return false;
        } else if (!/[!@#$%^&*]/.test(passwordInput.value)) {
            showError(passwordError, 'Password must contain at least one special character (!@#$%^&*).');
            return false;
        }
        hideError(passwordError);
        return true;
    };

    const validateConfirmPassword = () => {
        if (confirmPasswordInput.value === '') {
            showError(confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        hideError(confirmPasswordError);
        return true;
    };

    // Real-time validation on input change (optional but good UX)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    // Also validate confirm password if the main password changes
    passwordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value !== '') { // Only re-validate if confirm password field is not empty
            validateConfirmPassword();
        }
    });


    // Form submission handler
    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        // Check if all fields are valid
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            formSuccess.classList.remove('hidden');
            myForm.reset(); // Clear the form
            // Hide success message after a few seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 3000);
        } else {
            formSuccess.classList.add('hidden'); // Ensure success message is hidden if validation fails
        }
    });
});