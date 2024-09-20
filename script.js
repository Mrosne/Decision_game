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

    // Show the GIF when the timer starts
    const gifElement = document.getElementById("timerGif");
    gifElement.style.display = "block";  // Make the GIF visible

    // Countdown timer
    const countdownInterval = setInterval(function () {
        countdown--;
        timerElement.innerText = `Time left: ${countdown} seconds`;

        // Play tick sound at 9 seconds
        if (countdown === 9) {
            tickSound.play();
        }

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            gifElement.style.display = "none";  // Hide the GIF when the timer ends
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
            gifElement.style.display = "none";  // Hide the GIF when a selection is made
            restartApp();
        }
    });

    document.getElementById("box2").addEventListener("click", function () {
        if (!document.querySelector(".selected")) {
            this.classList.add("selected");
            document.getElementById("decision").innerText = `Chosen: ${input2}`;
            selectSound.play();  // Play sound on selection
            clearInterval(countdownInterval);
            gifElement.style.display = "none";  // Hide the GIF when a selection is made
            restartApp();
        }
    });
}
