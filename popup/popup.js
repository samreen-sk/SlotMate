document.addEventListener("DOMContentLoaded", async () => {

    const [tab] = await chrome.tabs.query({

        active: true,

        currentWindow: true

    });

    chrome.tabs.sendMessage(
    tab.id,
    {
        action: "GET_EXAMS"
    },
    (response) => {

        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        console.log("Popup received:", response);

        if (!response) {
            console.log("No response received.");
            return;
        }

        const examList = document.getElementById("examList");

        examList.innerHTML = "";

        response.forEach((exam, index) => {

            const card = document.createElement("div");

            card.className = "exam-card";

            card.innerHTML = `
                <div class="exam-header">
                    <input type="checkbox" id="exam${index}">
                    <label class="exam-name" for="exam${index}">
                        ${exam.name}
                    </label>
                </div>

                <div class="exam-time">
                    ${exam.time}
                </div>

                <div class="exam-venue">
                    Venue : ${exam.venue}
                </div>
            `;

            examList.appendChild(card);

        });

    }
);

});