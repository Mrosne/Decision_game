// script.js

document.addEventListener('DOMContentLoaded', function() {
    const decideButton = document.getElementById('decide-button');
    const option1Input = document.getElementById('option1');
    const option2Input = document.getElementById('option2');
    const errorMessage = document.getElementById('error-message');
    const timerContainer = document.getElementById('timer-container');
    const timerSpan = document.getElementById('timer');
    const optionsContainer = document.getElementById('options-container');
    const kotContainer = document.getElementById('kot-container');
    const clockAudio = document.getElementById('clock-audio');
    const selectAudio = document.getElementById('select-audio');
    const resetButton = document.getElementById('reset-button');
    const shareContainer = document.getElementById('share-container');
    const copyLinkButton = document.getElementById('copy-link');
    const whatsappShare = document.getElementById('whatsapp-share');
    const emailShare = document.getElementById('email-share');
    const messageContainer = document.getElementById('message-container');

    let countdownInterval;

    const baseUrl = 'https://mrosne.github.io/Decision_game/';

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const paramOption1 = urlParams.get('option1');
    const paramOption2 = urlParams.get('option2');

    if (paramOption1 && paramOption2) {
        option1Input.value = paramOption1;
        option2Input.value = paramOption2;
        checkInputs();
        startGame();
    }

    // Check inputs on every input event
    option1Input.addEventListener('input', checkInputs);
    option2Input.addEventListener('input', checkInputs);

    function checkInputs() {
        if (option1Input.value.trim() !== '' && option2Input.value.trim() !== '') {
            shareContainer.style.display = 'block';

            // Prepare share link
            const shareUrl = `${baseUrl}?option1=${encodeURIComponent(option1Input.value)}&option2=${encodeURIComponent(option2Input.value)}`;

            // Update copy link button
            copyLinkButton.onclick = function() {
                navigator.clipboard.writeText(shareUrl).then(function() {
                    alert('Link copied to clipboard!');
                }, function(err) {
                    alert('Failed to copy: ', err);
                });
            };

            // WhatsApp share
            whatsappShare.href = `https://wa.me/?text=${encodeURIComponent('Check out this Decision Game: ' + shareUrl)}`;

            // Email share
            emailShare.href = `mailto:?subject=Decision Game&body=Check out this Decision Game: ${shareUrl}`;
        } else {
            shareContainer.style.display = 'none';
        }
    }

    decideButton.addEventListener('click', function() {
        if (option1Input.value.trim() === '' || option2Input.value.trim() === '') {
            errorMessage.textContent = 'Please enter both options.';
        } else {
            errorMessage.textContent = '';
            startGame();
        }
    });

    function startGame() {
        // Hide input fields and decide button
        document.getElementById('input-container').style.display = 'none';
        decideButton.style.display = 'none';

        // Hide share container
        shareContainer.style.display = 'none';

        // Show timer
        timerContainer.style.display = 'block';
        timerSpan.textContent = '10';

        // Play clock audio
        clockAudio.play().catch(function(error) {
            console.log('Audio playback failed:', error);
        });

        // Start countdown
        let timeLeft = 10;
        countdownInterval = setInterval(function() {
            timeLeft--;
            timerSpan.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                clockAudio.pause();
                clockAudio.currentTime = 0;

                // Hide the gif
                kotContainer.innerHTML = '';

                // Display sad message
                messageContainer.innerHTML = '<h2>Time\'s up! No decision was made.</h2>';

                // Disable option buttons
                const buttons = optionsContainer.querySelectorAll('button');
                buttons.forEach(function(button) {
                    button.disabled = true;
                });

                // Show reset button
                resetButton.style.display = 'inline-block';
            }
        }, 1000);

        // Display options as buttons
        const option1Button = document.createElement('button');
        option1Button.textContent = option1Input.value;
        const option2Button = document.createElement('button');
        option2Button.textContent = option2Input.value;

        optionsContainer.appendChild(option1Button);
        optionsContainer.appendChild(option2Button);

        // Display 'kot.gif'
        const kotImage = document.createElement('img');
        kotImage.src = 'kot.gif';
        kotContainer.appendChild(kotImage);

        // Add event listeners to options
        option1Button.addEventListener('click', makeSelection);
        option2Button.addEventListener('click', makeSelection);
    }

    function makeSelection() {
        // Stop the timer
        clearInterval(countdownInterval);
        clockAudio.pause();
        clockAudio.currentTime = 0;

        // Play select audio
        selectAudio.play();

        // Disable option buttons
        const buttons = optionsContainer.querySelectorAll('button');
        buttons.forEach(function(button) {
            button.disabled = true;
        });

        // Hide the gif
        kotContainer.innerHTML = '';

        // Display congratulations message
        messageContainer.innerHTML = '<h2>Congratulations on making a decision!</h2>';

        // Show reset button
        resetButton.style.display = 'inline-block';
    }

    resetButton.addEventListener('click', function() {
        // Reset the game
        location.reload();
    });

    // Initial check to display share options if inputs are pre-filled
    checkInputs();
});
