// ==========================================
// DAY 20 - FETCH API EXERCISES
// ==========================================


// ==========================================
// EXERCISE 1
// Fetch USD → ETB exchange rate
// ==========================================

async function getUsdToEtbRate() {
    try {
        const res = await fetch(
            "https://api.frankfurter.dev/v2/rate/USD/ETB?providers=NBE"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Exercise 1:");
        console.log(`1 USD = ${data.rate} ETB`);

        return data.rate;

    } catch (error) {
        console.error("Exercise 1 Error:", error.message);
    }
}

getUsdToEtbRate();


// ==========================================
// EXERCISE 2
// Rewrite fetch → json → render
// using async/await
// ==========================================

async function loadPosts() {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const posts = await res.json();

        renderPosts(posts);

    } catch (error) {
        console.error("Exercise 2 Error:", error.message);
    }
}

function renderPosts(posts) {
    console.log("\nExercise 2:");

    posts.slice(0, 5).forEach(post => {
        console.log(`${post.id}. ${post.title}`);
    });
}

loadPosts();


// ==========================================
// EXERCISE 3
// Wrong URL + real 404
// ==========================================

// Deliberately wrong URL
async function testWrongUrl() {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/wrong-url"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);

    } catch (error) {
        console.log("\nExercise 3 - Wrong URL:");
        console.log("Catch block ran!");
        console.log(error.message);
    }
}

testWrongUrl();


// Real URL that returns 404
async function test404() {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts/999999"
        );

        console.log("\nExercise 3 - 404:");
        console.log("Response received.");
        console.log("Status:", res.status);
        console.log("OK:", res.ok);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);

    } catch (error) {
        console.log("Catch block ran for 404!");
        console.log(error.message);
    }
}

test404();


// ==========================================
// EXERCISE 4
// Promise.all()
// Fetch details for first two items
// in parallel
// ==========================================

async function loadFirstTwoPosts() {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const posts = await res.json();

        const firstTwoPosts = posts.slice(0, 2);

        const details = await Promise.all(
            firstTwoPosts.map(async post => {

                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                return response.json();
            })
        );

        console.log("\nExercise 4:");
        console.log("First two posts:");

        details.forEach(post => {
            console.log(post);
        });

    } catch (error) {
        console.error("Exercise 4 Error:", error.message);
    }
}

loadFirstTwoPosts();


// ==========================================
// EXERCISE 5
// Loading → Success → Error
// ==========================================

//