// ==========================================
// CACHE ELEMENTS
// ==========================================

const form = document.querySelector("#add-form");

const nameInput =
    document.querySelector("#name");

const priceInput =
    document.querySelector("#price");

const quantityInput =
    document.querySelector("#quantity");

const categoryInput =
    document.querySelector("#category");

const categoryHint =
    document.querySelector("#category-hint");

const list =
    document.querySelector("#list");

const totalEl =
    document.querySelector("#total");

const itemCountEl =
    document.querySelector("#item-count");

const boughtCountEl =
    document.querySelector("#bought-count");

const remainingCountEl =
    document.querySelector("#remaining-count");

const errorMessage =
    document.querySelector("#error-message");

const emptyMessage =
    document.querySelector("#empty-message");

const searchInput =
    document.querySelector("#search");

const themeButton =
    document.querySelector("#theme-btn");



// ==========================================
// SIDEBAR ELEMENTS
// ==========================================

const menuButton =
    document.querySelector("#menu-btn");

const sidebar =
    document.querySelector("#sidebar");

const closeSidebar =
    document.querySelector("#close-sidebar");

const sidebarOverlay =
    document.querySelector("#sidebar-overlay");

const homeLink =
    document.querySelector("#home-link");

const aboutLink =
    document.querySelector("#about-link");



// ==========================================
// PRODUCT IMAGES
// ==========================================

const coffeeImage =
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80";

const vegetableImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80";

const breadImage =
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80";

const bananaImage =
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80";

const defaultImage =
    vegetableImage;



// ==========================================
// CATEGORIES
// ==========================================

const categoryWords = {

    Drinks: [
        "coffee",
        "coffe",
        "water",
        "milk",
        "juice",
        "tea",
        "soda",
        "drink",
        "coke",
        "pepsi"
    ],

    Fruits: [
        "banana",
        "apple",
        "orange",
        "mango",
        "avocado",
        "grape",
        "lemon",
        "pineapple",
        "fruit"
    ],

    Vegetables: [
        "tomato",
        "potato",
        "onion",
        "carrot",
        "cabbage",
        "lettuce",
        "pepper",
        "garlic",
        "vegetable",
        "spinach"
    ],

    Food: [
        "bread",
        "rice",
        "teff",
        "flour",
        "pasta",
        "sugar",
        "salt",
        "egg",
        "meat",
        "chicken",
        "fish",
        "food"
    ],

    Household: [
        "soap",
        "shampoo",
        "detergent",
        "tissue",
        "toilet",
        "sponge",
        "broom",
        "bucket",
        "household"
    ]

};



// ==========================================
// GET CATEGORY
// ==========================================

function getCategory(itemName) {

    const name =
        itemName.toLowerCase().trim();


    for (const category in categoryWords) {

        for (
            const word
            of categoryWords[category]
        ) {

            if (name.includes(word)) {

                return category;

            }

        }

    }


    return "Other";
}



// ==========================================
// GET PRODUCT IMAGE
// ==========================================

function getProductImage(
    itemName,
    category
) {

    const name =
        itemName.toLowerCase().trim();


    if (
        name.includes("coffee") ||
        name.includes("coffe")
    ) {

        return coffeeImage;

    }


    if (
        name.includes("banana")
    ) {

        return bananaImage;

    }


    if (
        name.includes("bread")
    ) {

        return breadImage;

    }


    if (
        category === "Vegetables"
    ) {

        return vegetableImage;

    }


    if (
        category === "Food"
    ) {

        return breadImage;

    }


    if (
        category === "Fruits"
    ) {

        return bananaImage;

    }


    if (
        category === "Drinks"
    ) {

        return coffeeImage;

    }


    return defaultImage;
}



// ==========================================
// AUTOMATIC CATEGORY
// ==========================================

nameInput.addEventListener(
    "input",
    function () {

        const name =
            nameInput.value.trim();


        if (!name) {

            categoryHint.textContent =
                "Start typing an item name.";

            return;

        }


        const category =
            getCategory(name);


        categoryInput.value =
            category;


        categoryHint.textContent =
            `✓ Category detected: ${category}`;

    }
);



// ==========================================
// ADD ITEM
// ==========================================

form.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const name =
            nameInput.value.trim();

        const price =
            Number(priceInput.value);

        const quantity =
            Number(quantityInput.value);

        const category =
            categoryInput.value;


        if (!name) {

            errorMessage.textContent =
                "Please enter an item name.";

            nameInput.focus();

            return;

        }


        if (!price || price <= 0) {

            errorMessage.textContent =
                "Please enter a valid price.";

            priceInput.focus();

            return;

        }


        if (!quantity || quantity <= 0) {

            errorMessage.textContent =
                "Please enter a valid quantity.";

            quantityInput.focus();

            return;

        }


        const image =
            getProductImage(
                name,
                category
            );


        addRow(
            name,
            price,
            quantity,
            category,
            image
        );


        form.reset();


        quantityInput.value = 1;


        categoryInput.value =
            "Food";


        categoryHint.textContent =
            "Start typing an item name.";


        errorMessage.textContent =
            "";


        updateTotal();

        updateSummary();

        updateEmptyMessage();

    }
);



// ==========================================
// CREATE SHOPPING ROW
// ==========================================

function addRow(
    name,
    price,
    quantity,
    category,
    image
) {

    const li =
        document.createElement("li");


    li.classList.add(
        "shopping-item"
    );


    const img =
        document.createElement("img");

    img.src = image;

    img.alt = name;


    const itemInfo =
        document.createElement("div");

    itemInfo.classList.add(
        "item-info"
    );


    const itemName =
        document.createElement("h3");

    itemName.textContent =
        name;


    const itemDetails =
        document.createElement("p");

    itemDetails.textContent =
        `${category} · ${price} ETB each`;


    itemInfo.append(
        itemName,
        itemDetails
    );


    const quantityEl =
        document.createElement("span");

    quantityEl.classList.add(
        "quantity"
    );

    quantityEl.textContent =
        `x${quantity}`;


    const itemTotal =
        price * quantity;


    const itemPrice =
        document.createElement("span");

    itemPrice.classList.add(
        "item-price"
    );

    itemPrice.textContent =
        `${itemTotal} ETB`;


    const deleteButton =
        document.createElement("button");

    deleteButton.classList.add(
        "delete-btn",
        "del"
    );

    deleteButton.textContent =
        "Delete";


    li.append(
        img,
        itemInfo,
        quantityEl,
        itemPrice,
        deleteButton
    );


    list.append(li);

}



// ==========================================
// EVENT DELEGATION
// ==========================================

list.addEventListener(
    "click",
    function (e) {


        if (
            e.target.matches(".del")
        ) {

            const item =
                e.target.closest("li");


            item.remove();


            updateTotal();

            updateSummary();

            updateEmptyMessage();


            return;

        }


        const item =
            e.target.closest("li");


        if (item) {

            item.classList.toggle(
                "bought"
            );


            updateSummary();

        }

    }
);



// ==========================================
// UPDATE TOTAL
// ==========================================

function updateTotal() {

    let total = 0;


    const items =
        list.querySelectorAll("li");


    items.forEach(
        function (item) {

            const priceText =
                item.querySelector(
                    ".item-price"
                ).textContent;


            const price =
                Number(
                    priceText
                        .replace(" ETB", "")
                );


            total += price;

        }
    );


    totalEl.textContent =
        `${total.toLocaleString()} ETB`;

}



// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary() {

    const items =
        list.querySelectorAll("li");


    const bought =
        list.querySelectorAll(
            ".shopping-item.bought"
        );


    const totalItems =
        items.length;


    const boughtItems =
        bought.length;


    const remaining =
        totalItems - boughtItems;


    itemCountEl.textContent =
        totalItems;


    boughtCountEl.textContent =
        boughtItems;


    remainingCountEl.textContent =
        remaining;

}



// ==========================================
// EMPTY MESSAGE
// ==========================================

function updateEmptyMessage() {

    const items =
        list.querySelectorAll("li");


    if (items.length === 0) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";

    }

}



// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const items =
            list.querySelectorAll("li");


        items.forEach(
            function (item) {

                const text =
                    item.textContent
                        .toLowerCase();


                if (
                    text.includes(search)
                ) {

                    item.style.display =
                        "flex";

                } else {

                    item.style.display =
                        "none";

                }

            }
        );

    }
);



// ==========================================
// RECOMMENDATION BUTTONS
// ==========================================

const recommendButtons =
    document.querySelectorAll(
        ".recommend-btn"
    );


recommendButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const name =
                    button.dataset.name;

                const price =
                    Number(
                        button.dataset.price
                    );

                const category =
                    button.dataset.category;


                const image =
                    getProductImage(
                        name,
                        category
                    );


                addRow(
                    name,
                    price,
                    1,
                    category,
                    image
                );


                updateTotal();

                updateSummary();

                updateEmptyMessage();

            }
        );

    }
);



// ==========================================
// DARK MODE
// ==========================================

themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        if (darkMode) {

            themeButton.textContent =
                "☀️ Light Mode";

        } else {

            themeButton.textContent =
                "🌙 Dark Mode";

        }

    }
);



// ==========================================
// SIDEBAR OPEN
// ==========================================

function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

}



// ==========================================
// SIDEBAR CLOSE
// ==========================================

function closeSidebarMenu() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

}



// ==========================================
// MENU BUTTON
// ==========================================

menuButton.addEventListener(
    "click",
    openSidebar
);



// ==========================================
// CLOSE BUTTON
// ==========================================

closeSidebar.addEventListener(
    "click",
    closeSidebarMenu
);



// ==========================================
// CLICK OUTSIDE SIDEBAR
// ==========================================

sidebarOverlay.addEventListener(
    "click",
    closeSidebarMenu
);



// ==========================================
// HOME
// ==========================================

homeLink.addEventListener(
    "click",
    function () {

        closeSidebarMenu();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);



// ==========================================
// ABOUT
// ==========================================

aboutLink.addEventListener(
    "click",
    function () {

        closeSidebarMenu();


        const about =
            document.querySelector("#about");


        about.scrollIntoView({
            behavior: "smooth"
        });

    }
);



// ==========================================
// ESCAPE KEY CLOSES SIDEBAR
// ==========================================

document.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Escape") {

            closeSidebarMenu();

        }

    }
);



// ==========================================
// INITIAL STATE
// ==========================================

updateTotal();

updateSummary();

updateEmptyMessage();