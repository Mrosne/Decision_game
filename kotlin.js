import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.Event
import kotlin.js.Date
import kotlin.js.Promise

fun main() {
    val decideBtn = document.getElementById("decideBtn")
    val shareBtn = document.getElementById("shareBtn")

    // Event listener for "Decide!" button
    decideBtn?.addEventListener("click", {
        val input1 = (document.getElementById("input1") as HTMLInputElement).value
        val input2 = (document.getElementById("input2") as HTMLInputElement).value

        if (input1.isEmpty() || input2.isEmpty()) {
            window.alert("Please enter both options.")
            return@addEventListener
        }

        // Clear previous decision and timer
        document.getElementById("decision")?.innerHTML = ""
        document.getElementById("timer")?.innerHTML = ""

        // Generate boxes with the inputs
        val boxContainer = document.getElementById("box-container") as HTMLDivElement
        boxContainer.innerHTML = """
            <div class="box" id="box1">$input1</div>
            <div class="box" id="box2">$input2</div>
        """

        // Countdown timer
        var countdown = 10
        val timerElement = document.getElementById("timer")
        timerElement?.innerHTML = "Time left: $countdown seconds"

        val tickSound = Audio("tick.mp3")
        val selectSound = Audio("select.mp3")

        val countdownInterval = window.setInterval({
            countdown -= 1
            timerElement?.innerHTML = "Time left: $countdown seconds"

            if (countdown == 3) {
                tickSound.play()
            }

            if (countdown <= 0) {
                window.clearInterval(countdownInterval)
                if (document.querySelector(".selected") == null) {
                    document.getElementById("decision")?.innerHTML = "Time's up! No selection was made."
                }
                restartApp()
            }
        }, 1000)

        // Add event listeners to boxes
        document.getElementById("box1")?.addEventListener("click", {
            selectOption("box1", input1, selectSound, countdownInterval)
        })
        document.getElementById("box2")?.addEventListener("click", {
            selectOption("box2", input2, selectSound, countdownInterval)
        })
    })

    // Event listener for "Share URL" button
    shareBtn?.addEventListener("click", {
        val input1 = (document.getElementById("input1") as HTMLInputElement).value
        val input2 = (document.getElementById("input2") as HTMLInputElement).value

        if (input1.isEmpty() || input2.isEmpty()) {
            window.alert("Please enter both options to share.")
            return@addEventListener
        }

        val baseURL = "https://mrosne.github.io/Decision_game/"
        val shareURL = "$baseURL?input1=${encodeURIComponent(input1)}&input2=${encodeURIComponent(input2)}"

        navigator.clipboard.writeText(shareURL).then {
            window.alert("Shareable URL copied to clipboard!")
        }.catch { err ->
            window.alert("Failed to copy the URL: $err")
        }
    })
}

// Function to select an option
fun selectOption(boxId: String, input: String, selectSound: dynamic, countdownInterval: Int) {
    if (document.querySelector(".selected") == null) {
        document.getElementById(boxId)?.classList?.add("selected")
        document.getElementById("decision")?.innerHTML = "Chosen: $input"
        selectSound.play()
        window.clearInterval(countdownInterval)
        restartApp()
    }
}

// Function to restart the app
fun restartApp() {
    window.setTimeout({
        (document.getElementById("input1") as HTMLInputElement).value = ""
        (document.getElementById("input2") as HTMLInputElement).value = ""
        (document.getElementById("box-container") as HTMLDivElement).innerHTML = ""
        document.getElementById("decision")?.innerHTML = ""
        document.getElementById("timer")?.innerHTML = ""
    }, 3000)
}
