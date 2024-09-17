document.getElementById("decideBtn").addEventListener("click", function () {
    startDecisionGame();
});

// Function to start the decision game (decide button functionality)
function startDecisionGame() {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;

    
    if (input1 === "" || input2 === "") {
        alert("Please enter both options.");
        return;
    }

    // Clear previous decision and timer
    document.getElementById("decision").innerText = "";
    document.getElementById("timer").innerText = "";

    // Generate boxes with the inputs
    const boxContainer = document.getElementById("box-container");
    boxContainer.innerHTML = `
        <div class="box" id="box1">${input1}</div>
        <div class="box" id="box2">${input2}</div>
    `;

    let countdown = 10;
    const timerElement = document.getElementById("timer");
    timerElement.innerText = `Time left: ${countdown} seconds`;

    // Sound alerts
    const tickSound = new Audio('clock.wav');  // Sound when 3 seconds left
    const selectSound = new Audio('select.wav');  // Sound on selection

    // Countdown timer
    const countdownInterval = setInterval(function () {
        countdown--;
        timerElement.innerText = `Time left: ${countdown} seconds`;

        // Play tick sound at 3 seconds
        if (countdown === 10) {
            tickSound.play();
        }

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            if (!document.querySelector(".selected")) {
                document.getElementById("decision").innerText = "Time's up! No selection was made.";
            }
            restartApp();
        }
    }, 1000);

    // Add event listeners to boxes
    document.getElementById("box1").addEventListener("click", function () {
        if (!document.querySelector(".selected")) {
            this.classList.add("selected");
            document.getElementById("decision").innerText = `Chosen: ${input1}`;
            selectSound.play();  // Play sound on selection
            clearInterval(countdownInterval);
            restartApp();
        }
    });

    document.getElementById("box2").addEventListener("click", function () {
        if (!document.querySelector(".selected")) {
            this.classList.add("selected");
            document.getElementById("decision").innerText = `Chosen: ${input2}`;
            selectSound.play();  // Play sound on selection
            clearInterval(countdownInterval);
            restartApp();
        }
    });
}

// Function to get URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        input1: params.get("input1") || "",
        input2: params.get("input2") || "",
        start: params.get("start") || ""
    };
}

// Populate input fields if URL has query parameters and optionally start the timer
window.onload = function () {
    const params = getURLParams();
    if (params.input1) {
        document.getElementById("input1").value = params.input1;
    }
    if (params.input2) {
        document.getElementById("input2").value = params.input2;
    }

    // Automatically start the game if "start=true" is in the URL
    if (params.start === "true") {
        startDecisionGame();
    }
};

// Share URL button functionality
document.getElementById("shareBtn").addEventListener("click", function () {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;

    if (input1 === "" || input2 === "") {
        alert("Please enter both options to share.");
        return;
    }

    // Replace with your website's base URL
    const baseURL = "https://mrosne.github.io/Decision_game/";

    // Create shareable URL with query parameters
    const shareURL = `${baseURL}?input1=${encodeURIComponent(input1)}&input2=${encodeURIComponent(input2)}&start=true`;

    // Copy URL to clipboard
    navigator.clipboard.writeText(shareURL).then(() => {
        alert("Shareable URL copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy the URL: " + err);
    });
});
