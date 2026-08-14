const form = document.querySelector("#searchForm");
const countryInput = document.querySelector("#countryInput");
const facts = document.querySelector("#facts");

async function showCountry(name) {
    facts.textContent = "Loading...";
    facts.className = "loading";

    try {
        const res = await fetch(
            `https://api.restcountries.com/countries/v5/names.common/${encodeURIComponent(name)}`,
            {
                headers: {
                    "Authorization": "Bearer rc_live_ebf7733258384cb9adb5ed5a8a793975"
                }
            }
        );

        console.log("Status:", res.status);

        if (!res.ok) {
            const errorData = await res.json();
            console.log("API error:", errorData);

            throw new Error(
                errorData.errors?.[0]?.message || "Country not found"
            );
        }

        const result = await res.json();

        console.log("API data:", result);

        const country = result.data.objects[0];

        facts.innerHTML = "";
        facts.className = "";

        const card = document.createElement("div");
        card.className = "country-card";

        const title = document.createElement("h2");
        title.textContent = country.names.common;

        card.append(title);

        const flag = document.createElement("div");
        flag.textContent = country.flag.emoji;
        flag.style.fontSize = "80px";
        flag.style.textAlign = "center";
        flag.style.margin = "20px";

        card.append(flag);

        const capital = country.capitals?.[0]?.name || "N/A";

        render(card, "Capital", capital);

        render(
            card,
            "Population",
            country.population.toLocaleString()
        );

        render(card, "Region", country.region);

        let currencies = "N/A";

        if (country.currencies) {
            currencies = Object.values(country.currencies)
                .map(currency => {
                    return `${currency.name} (${currency.symbol || ""})`;
                })
                .join(", ");
        }

        render(card, "Currencies", currencies);

        facts.append(card);

    } catch (error) {
        console.error("ERROR:", error);

        facts.textContent = error.message;
        facts.className = "error";
    }
}


function render(container, label, value) {
    const div = document.createElement("div");
    div.className = "fact";

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    const text = document.createTextNode(value);

    div.append(strong, text);
    container.append(div);
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = countryInput.value.trim();

    if (name) {
        showCountry(name);
    }
});


showCountry("Ethiopia");