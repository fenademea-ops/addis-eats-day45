const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

const count = document.getElementById("count");


// Ethiopian phone number
// Example: 0912345678
const ethiopianPhoneRegex = /^(?:\+251|0)9\d{8}$/;


// Get saved people from localStorage
function getPeople() {

    const saved = localStorage.getItem("signupPeople");

    if (saved) {
        return JSON.parse(saved);
    }

    return [];
}


// Show number of registered people
function showCount() {

    const people = getPeople();

    count.textContent =
        `${people.length} people have signed up.`;
}


// Submit form
form.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values and remove extra spaces
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();


    // Clear old errors
    nameError.textContent = "";
    phoneError.textContent = "";

    nameInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");


    // -------------------------
    // 1. Check Full Name
    // -------------------------

    if (name.length < 2) {

        nameError.textContent =
            "⚠ Full Name must be at least 2 characters.";

        nameInput.classList.add("input-error");

        return;
    }


    // -------------------------
    // 2. Check Phone Number
    // -------------------------

    if (!ethiopianPhoneRegex.test(phone)) {

        phoneError.textContent =
            "⚠ Please enter a valid Ethiopian phone number (09XXXXXXXX).";

        phoneInput.classList.add("input-error");

        return;
    }


    // -------------------------
    // 3. Get saved people
    // -------------------------

    const people = getPeople();


    // -------------------------
    // 4. Check if name is taken
    // -------------------------

    const nameTaken = people.some(function (person) {

        return person.name.toLowerCase() === name.toLowerCase();

    });


    if (nameTaken) {

        nameError.textContent =
            "⚠ This name is already registered.";

        nameInput.classList.add("input-error");

        return;
    }


    // -------------------------
    // 5. Check if phone is taken
    // -------------------------

    const phoneTaken = people.some(function (person) {

        return person.phone === phone;

    });


    if (phoneTaken) {

        phoneError.textContent =
            "⚠ This phone number is already registered.";

        phoneInput.classList.add("input-error");

        return;
    }


    // -------------------------
    // 6. Register new person
    // -------------------------

    const person = {
        name: name,
        phone: phone
    };


    people.push(person);


    // Save as JSON
    localStorage.setItem(
        "signupPeople",
        JSON.stringify(people)
    );


    // Clear form
    form.reset();


    // Update count
    showCount();


    // Show success
    alert("Registration successful!");

});


// Show saved count when page loads
showCount();