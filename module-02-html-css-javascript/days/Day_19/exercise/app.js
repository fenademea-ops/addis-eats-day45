
let items = [];

const form = document.getElementById("shoppingForm");
const input = document.getElementById("itemInput");
const list = document.getElementById("list");
const count = document.getElementById("count");


// Add a new item
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = input.value.trim();

    // Validate input 
    if (name === "") {
        alert("Please enter a grocery item.");
        return;
    }

    // Create a new item
    const item = {
        id: Date.now(),
        name: name,
        done: false
    };

    // Update state
    items.push(item);

    // Render the new state
    render();

    // Clear input
    input.value = "";
    input.focus();
});


// Render the list
function render() {
    // Clear the existing list
    list.innerHTML = "";

    // Build the list from the items array
    items.forEach(function (item) {
        const li = document.createElement("li");

        // Store item ID in data-id
        li.dataset.id = item.id;

       // Add done class if item is bought
        if (item.done) {
            li.classList.add("done");
        }

        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <button class="delete-btn">Remove</button>
        `;
        list.appendChild(li);
    });

    // Count remaining items
    const remaining = items.filter(function (item) {
        return !item.done;
    }).length;

    count.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} remaining`;
}

// Delegate clicks from the list
list.addEventListener("click", function (event) {
    const row = event.target.closest("li");

    if (!row) {
        return;
    }

    const id = Number(row.dataset.id);

    // Remove item
    if (event.target.classList.contains("delete-btn")) {
        items = items.filter(function (item) {
            return item.id !== id;
        });

        render();
        return;
    }

    // Toggle bought state
    if (event.target.classList.contains("item-name")) {
        const item = items.find(function (item) {
            return item.id === id;
        });

        if (item) {
            item.done = !item.done;
        }

        render();
    }
});

render();
