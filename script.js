document.getElementById("decideBtn").addEventListener("click", function () {
    startDecisionGame();
});

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

document.getElementById("shareBtn").addEventListener("click", function () {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;

    if (input1 === "" || input2 === "") {
        alert("Please enter both options to share.");
        return;
    }

    const baseURL = "https://mrosne.github.io/Decision_game/";
    const shareURL = `${baseURL}?input1=${encodeURIComponent(input1)}&input2=${encodeURIComponent(input2)}&start=true`;

    navigator.clipboard.writeText(shareURL).then(() => {
        alert("Shareable URL copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy the URL: " + err);
    });
});
