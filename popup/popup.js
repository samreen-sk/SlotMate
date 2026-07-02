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

            const container =
                document.getElementById("examList");

            container.innerHTML = "";

            if (!response || response.length === 0) {

                container.innerHTML =
                    "<p>No exams found.</p>";

                return;
            }

            response.forEach((exam) => {

                const div = document.createElement("div");

                div.className = "exam-card";

                div.innerHTML = `
                    <h4>${exam.name}</h4>

                    <p>${exam.time}</p>

                    <p>Venue: ${exam.venue}</p>
                `;

                container.appendChild(div);

            });

        }
    );

});