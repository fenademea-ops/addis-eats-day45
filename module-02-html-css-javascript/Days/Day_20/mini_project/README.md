# Country Facts Page

A simple JavaScript web app that fetches live country information from the REST Countries API.

## Features

- Search for a country
- Shows loading message
- Shows capital, population, region, currency, and flag
- Shows an error if the country is not found
- Ethiopia is loaded by default

## API

REST Countries API:

https://restcountries.com/

## How to Run

1. Open `index.html` with Live Server in VS Code.
2. Enter a country name.
3. Click **Search**.
4. View the country facts.

## Files

- `index.html` - Page structure
- `styles.css` - Page styling
- `app.js` - API fetching and JavaScript logic

## Requirements Checked

- Uses `fetch()`
-  Uses `async/await`
-  Checks `res.ok`
-  Handles errors with `try/catch`
-  Shows `Loading...`
-  Displays Ethiopia by default
- Formats population with commas