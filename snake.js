// Board
let blockSize = 25;
let rows = 20;
let cols = 20;
let boards;
let context; // Drawing object.

let gameOver = false;
let score = 0;
let displayedScore = document.querySelector("#scoreKeeper");


// Snake head -> Where the snake will start from.
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;

// Snake Body
let snakeBody = [];

// food
let foodX;
let foodY;

window.onload = function () {
    board = document.querySelector("#board");
    board.height = rows * blockSize;
    board.width = cols * blockSize; // Canvas.
    context = board.getContext("2d"); // Used for drawing on the board.

    document.addEventListener("keyup", changeDirection);

    placeFood(); // Randomizes food location on the canvas.
    setInterval(update, 1000 / 10); // Speficifes how often the update() function will be called.
}

function update() {
    if (gameOver) return; // Terminates the game if gameOver is true.
    // updating Board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // updating Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //Checking if snake has eaten the food and increment size.
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1;
        displayedScore.innerHTML = `Score: ${score}`;
    }

    //Starting from the end of the body, we want the tail to get updated X and Y co-ords so it can move with the head.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // updating Snake
    context.fillStyle = "lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Conditions for the game to be over:
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        if (!alert("Game Over!")) {
            window.location.reload();
        };
    };

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            if (!alert("Game Over!")) {
                window.location.reload();
            };
        }
    }

}

function placeFood() { // Creates random co-ords for the food.
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(input) {
    if (input.code === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (input.code === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (input.code === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (input.code === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}
