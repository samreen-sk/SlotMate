console.log("Background Service Worker Started");

chrome.storage.local.get(["autoBooking"], (result) => {

    console.log(result);

});