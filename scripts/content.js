console.log("SlotMate Content Script Loaded");

const SETTINGS = {
    purpose: "Module Exam",
    maxBookings: 5
};


const cards = document.querySelectorAll(".card.shadow-sm");

console.log("Cards Found:", cards.length);

const availableExams = [];

cards.forEach((card) => {

    const title = card.querySelector("h5");
    const name = title?.innerText.trim() || "Not Found";

    const details = card.querySelectorAll(".text-muted.small");

    const time = details[0]?.innerText.trim() || "Not Found";

    const venue = details[1]
        ?.innerText
        .replace("Venue:", "")
        .trim() || "Not Found";

    const purposeInput = card.querySelector('input[name="purpose"]');

    const actionButton = card.querySelector('button[type="submit"]');
    const status = actionButton
    ? actionButton.innerText.trim()
    : "Closed";

    if (!purposeInput || !actionButton) {
        return;
    }

    const exam = {
    card,
    name,
    time,
    venue,
    purposeInput,
    actionButton,
    status,
    selected: false,
    booked: false,
    priority: null
};

    availableExams.push(exam);

});

console.table(
    availableExams.map(exam => ({
        Name: exam.name,
        Time: exam.time,
        Venue: exam.venue
    }))
);


availableExams.forEach((exam) => {

    exam.purposeInput.focus();

    exam.purposeInput.value = SETTINGS.purpose;

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

function bookExam(exam) {

    if (!exam.isOpen) {
        console.log(exam.name + " is not available for booking.");
        return;
    }

    exam.purposeInput.focus();

    exam.purposeInput.value = SETTINGS.purpose;

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

    exam.actionButton.click();

    exam.booked = true;

    console.log("Booked: " + exam.name);
}
console.log("Listener Registered");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log("Message received:", request);

    if (request.action === "GET_EXAMS") {

        console.log("Sending exams:", availableExams);

        sendResponse(
            availableExams.map(exam => ({
                name: exam.name,
                time: exam.time,
                venue: exam.venue,
                status: exam.status
            }))
        );

    }

});