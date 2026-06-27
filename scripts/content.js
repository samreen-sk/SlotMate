console.log("SlotMate Content Script Loaded");

// Get all exam cards
const cards = document.querySelectorAll(".card.shadow-sm");

console.log("Cards Found:", cards.length);

// Store all available exams
const exams = [];

// Loop through every card
cards.forEach((card) => {
    // Exam Name
    const title = card.querySelector("h5");
    const name = title?.innerText.trim() || "Not Found";
    // Time & Venue
    const details = card.querySelectorAll(".text-muted.small");

    const time = details[0]?.innerText.trim() || "Not Found";

    const venue = details[1]
        ?.innerText
        .replace("Venue:", "")
        .trim() || "Not Found";
    // Purpose Input
    const purposeInput = card.querySelector('input[name="purpose"]');
    // Book Button
    const bookButton = card.querySelector('button[type="submit"]');
    // Skip closed bookings
    if (!purposeInput || !bookButton) {
        return;
    }
    // Create Exam Object
    const exam = {

        name,

        time,

        venue,

        purposeInput,

        bookButton,

        isOpen: true

    };

    exams.push(exam);

});

// Print final array
console.log("Available Exams:");
console.log(exams);
// Auto Fill Purpose
exams.forEach((exam) => {

    exam.purposeInput.focus();

exam.purposeInput.value = "Module Exam";

exam.purposeInput.dispatchEvent(
    new Event("input", {
        bubbles: true
    })
);

exam.purposeInput.dispatchEvent(
    new Event("change", {
        bubbles: true
    })
);
});