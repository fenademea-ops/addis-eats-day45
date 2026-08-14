const list = document.querySelector("#list");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const refreshBtn = document.querySelector("#refreshBtn");

async function load() {

    // Show loading message
    loading.textContent = "Loading...";

    // Clear previous data and error
    list.innerHTML = "";
    error.textContent = "";

    try {

        // Fetch data from the public API
        const res = await fetch("https://dummyjson.com/recipes");

        // Check if the response was successful
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
        }

        // Convert response to JSON
        const data = await res.json();

        // Render each dish
        data.recipes.forEach(dish => {

            const li = document.createElement("li");

            li.textContent = dish.name;

            list.append(li);
        });

    } catch (err) {

        // Friendly error message
        error.textContent =
            "Sorry, we could not load the dishes. Please try again.";

        console.error(err);

    } finally {

        // Remove loading message
        loading.textContent = "";
    }
}


// Bonus: refresh button
refreshBtn.addEventListener("click", load);


// Load data when the page opens
load();