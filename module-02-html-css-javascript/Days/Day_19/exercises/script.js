// ==========================================
// Exercise 1: textContent & classList.toggle
// ==========================================
const mainTitle = document.querySelector("#main-title");
const toggleBtn = document.querySelector("#toggle-btn");

// Change text content directly
mainTitle.textContent = "Welcome to Day 19 Exercises!";

// Toggle CSS class on button click
toggleBtn.addEventListener("click", () => {
  mainTitle.classList.toggle("highlight");
});


// ==========================================
// Exercise 2: Dynamic <li> creation from Array
// ==========================================
const cities = ["Addis Ababa", "Gondar", "Hawassa"];
const cityList = document.querySelector("#city-list");

cities.forEach((cityName) => {
  const li = document.createElement("li");
  li.textContent = cityName;
  cityList.appendChild(li);
});


// ==========================================
// Exercise 3: Event Bubbling Observation
// ==========================================
const parentDiv = document.querySelector("#parent-div");
const childBtn = document.querySelector("#child-btn");

childBtn.addEventListener("click", (event) => {
  console.log("Child button clicked!");
  console.log("Button event.target:", event.target);
});

parentDiv.addEventListener("click", (event) => {
  console.log("Parent div clicked (due to bubbling)!");
  console.log("Parent event.target:", event.target);
});


// ==========================================
// Exercise 4: Event Delegation for Deletion
// ==========================================
const itemList = document.querySelector("#item-list");

// Single listener attached to parent <ul>
itemList.addEventListener("click", (event) => {
  // Check if click originated from a delete button
  if (event.target.classList.contains("delete-btn")) {
    const parentLi = event.target.closest("li");
    parentLi.remove();
  }
});


// ==========================================
// Exercise 5: Form Handling with preventDefault
// ==========================================
const todoForm = document.querySelector("#todo-form");
const itemInput = document.querySelector("#item-input");
const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", (event) => {
  // Prevent full page reload
  event.preventDefault();

  // Read input value
  const value = itemInput.value.trim();

  if (value !== "") {
    // Append new item to list
    const li = document.createElement("li");
    li.textContent = value;
    todoList.appendChild(li);

    // Clear the input field
    itemInput.value = "";
  }
});