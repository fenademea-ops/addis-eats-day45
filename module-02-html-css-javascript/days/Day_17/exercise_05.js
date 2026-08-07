const ethiopianCities = [
  "Addis Ababa",
  "Hawassa",
  "Dire Dawa",
  "Gondar",
  "Mekelle",
  "Bahir Dar"
];

// Using forEach callback: array element as 1st arg, index as 2nd arg
ethiopianCities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});