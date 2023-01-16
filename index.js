

let direction = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')


let speed = 10;
let lastTime = 0;
let score = 0;

let snakeArr = [
    { x: 13, y: 15 }
]

let foodArr = { x: 10, y: 7 }

window.requestAnimationFrame(main);


function main(currentTime) {
    window.requestAnimationFrame(main);

    if ((currentTime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = currentTime;

    game();

}



let highscore = localStorage.getItem("highscore")
if (highscore === null) {
     val = 0;
    localStorage.setItem("highscore", JSON.stringify(val))
} else {
    val = JSON.parse(highscore)
    document.querySelector("#Highscore").innerHTML = `HighScore : ${highscore}`
}

function game() {

    // update the snake array

    if (isCollide(snakeArr)) {

        gameOverSound.play();
        direction = { x: 0, y: 0 };
        alert("Game Over ! Press Ok to play again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        document.querySelector("#score").innerHTML = `Score : 0`
    }

    // eaten the food, regenerate the food

    if (snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x) {
        foodSound.play()
        score += 1;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", JSON.stringify(highscore))
            document.querySelector("#Highscore").innerHTML = `HighScore : ${highscore}`
        }
        document.querySelector("#score").innerHTML = `Score : ${score}`
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 2;
        let b = 16;
        foodArr = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
    }


    // move script

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;





    document.querySelector("#board").innerHTML = "";
    snakeArr.forEach((elem, i) => {
        let snake = document.createElement('div');
        snake.style.gridRowStart = elem.y;
        snake.style.gridColumnStart = elem.x;

        if (i == 0) {
            snake.classList.add("head")
        } else {
            snake.classList.add("snake")
        }

        document.querySelector("#board").append(snake)

    })


    // display the food

    let food = document.createElement('div');
    food.style.gridRowStart = foodArr.y;
    food.style.gridColumnStart = foodArr.x;
    food.classList.add("food")
    document.querySelector("#board").append(food)

}


function isCollide(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].x === arr[0].x && arr[i].y === arr[0].y) {
            score = 0;
            return true
        }
    }
    if (arr[0].x >= 25 || arr[0].x <= 0 || arr[0].y >= 25 || arr[0].y <= 0) {
        score = 0;
        return true;
    }


}


window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})
