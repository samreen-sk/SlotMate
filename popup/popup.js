const connectButton = document.getElementById("connectBtn");

connectButton.addEventListener("click", () => {

    chrome.storage.local.set({
        autoBooking: true
    }, () => {

        alert("Auto Booking Enabled!");

    });

});