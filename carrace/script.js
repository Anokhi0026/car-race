// Game Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Players and Race Setup
let playerTurn = 1;
let car1_x = 50, car1_y = 150;
let car2_x = 50, car2_y = 250;
const finishLine = 700;
const secretNumberP1 = Math.floor(Math.random() * 50) + 1;
const secretNumberP2 = Math.floor(Math.random() * 50) + 1;
let winner = null;

// Draw Game Elements
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Race Track
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 140, canvas.width, 60);
    ctx.fillRect(0, 240, canvas.width, 60);
    
    // Finish Line
    ctx.fillStyle = "black";
    ctx.fillRect(finishLine, 140, 5, 160);

    // Draw Cars
    drawCar(car1_x, car1_y, "red");
    drawCar(car2_x, car2_y, "blue");

    // Check for Winner
    if (winner) {
        document.getElementById("player-turn").innerText = winner;
        document.getElementById("hint-text").innerText = `P1's Number: ${secretNumberP1} | P2's Number: ${secretNumberP2}`;
        document.getElementById("guess-input").disabled = true;
    }
}

// Draw Car Function
function drawCar(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 60, 30);
    ctx.fillStyle = "black";
    ctx.fillRect(x + 10, y + 25, 10, 10);
    ctx.fillRect(x + 40, y + 25, 10, 10);
}

// Handle Guess Submission
function submitGuess() {
    if (winner) return;

    let guess = parseInt(document.getElementById("guess-input").value);
    let hintText = document.getElementById("hint-text");

    if (isNaN(guess) || guess < 1 || guess > 50) {
        hintText.innerText = "Enter a number between 1-50!";
        return;
    }

    let secretNumber = (playerTurn === 1) ? secretNumberP1 : secretNumberP2;
    let carX = (playerTurn === 1) ? car1_x : car2_x;

    if (guess === secretNumber) {
        // Player wins instantly
        if (playerTurn === 1) {
            car1_x = finishLine;
            winner = "🎉 Player 1 Wins!";
        } else {
            car2_x = finishLine;
            winner = "🎉 Player 2 Wins!";
        }
    } else {
        // Move car based on how close the guess is
        let moveDistance = Math.max(10, 50 - Math.abs(secretNumber - guess));
        carX += moveDistance;

        // Set hint messages
        if (guess < secretNumber) {
            hintText.innerText = "Too Low! 🔽";
        } else {
            hintText.innerText = "Too High! 🔼";
        }

        if (Math.abs(secretNumber - guess) <= 5) {
            hintText.innerText = "You're Very Close! 🚀";
        }
    }

    // Update positions
    if (playerTurn === 1) {
        car1_x = Math.min(car1_x, finishLine);
    } else {
        car2_x = Math.min(car2_x, finishLine);
    }

    // Switch Player
    playerTurn = (playerTurn === 1) ? 2 : 1;
    document.getElementById("player-turn").innerText = `Player ${playerTurn}'s turn - Enter a guess (1-50)`;

    // Redraw Game
    drawGame();
}

// Initialize Game
drawGame();
