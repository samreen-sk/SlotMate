console.log("SlotMate Content Script Loaded");

// Step 1: Find all booking cards
const cards = document.querySelectorAll(".card.shadow-sm");

// Print how many cards were found
console.log("Cards Found:", cards.length);

// Loop through every card
cards.forEach((card, index) => {

    console.log("-----------------------");
    console.log("Card Number:", index + 1);

    // Try to find the exam title
    const title = card.querySelector("h4, h5, h3, .card-title");

    if (title) {
        console.log("Exam Name:", title.innerText.trim());
    } else {
        console.log("Exam Name: Not Found");
    }

});