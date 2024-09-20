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
    const input1Element = document.getElementById("input1");
    const input2Element = document.getElementById("input2");

    // Populate input fields with values from the URL parameters
    if (params.input1) {
        input1Element.value = params.input1;
    }
    if (params.input2) {
        input2Element.value = params.input2;
    }

    // Automatically start the game if "start=true" is in the URL
    if (params.start === "true") {
        startDecisionGame();
    }
};

// Start the decision game (decide button functionality)
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

    const gifElement = document.getElementById("timerGif");
    gifElement.style.display = "block"; // Show the GIF

    const countdownInterval = setInterval(function () {
        countdown--;
        timerElement.innerText = `Time left: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            gifElement.style.display = "none"; // Hide the GIF
            if (!document.querySelector(".selected")) {
                document.getElementById("decision").innerText = "Time's up! No selection was made.";
            }
            restartApp();
        }
    }, 1000);

    // Add event listeners to boxes
    document.getElementById("box1").addEventListener("click", function () {
        selectOption(input1);
    });

    document.getElementById("box2").addEventListener("click", function () {
        selectOption(input2);
    });
}

function selectOption(selectedInput) {
    document.getElementById("decision").innerText = `Chosen: ${selectedInput}`;
    clearInterval(countdownInterval);
    document.getElementById("timerGif").style.display = "none"; // Hide the GIF
    restartApp();
}

function restartApp() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("box-container").innerHTML = "";
    document.getElementById("timer").innerText = "";
    document.getElementById("decision").innerText = "";
}
