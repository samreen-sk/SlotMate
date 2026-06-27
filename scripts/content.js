console.log("SlotMate Content Script Loaded");

// Step 1: Find all booking cards
const cards = document.querySelectorAll(".card.shadow-sm");

// Print how many cards were found
console.log("Cards Found:", cards.length);

// Loop through every card
cards.forEach((card, index) => {

    console.log("-----------------------");
    console.log("Card Number:", index + 1);

    const title = card.querySelector("h5");

    // Get all small text elements
    const details = card.querySelectorAll(".text-muted.small");

    const time = details[0]?.innerText.trim() || "Not Found";
    const venue = details[1]?.innerText.trim() || "Not Found";

    console.log("Exam Name :", title ? title.innerText.trim() : "Not Found");
    console.log("Time      :", time);
    console.log("Venue     :", venue);

});