import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js"
import { update as updateFood, draw as drawFood } from "./food.js"
import { draw as drawScore, getScore } from "./score.js"
import { outsideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")
const overlayDiv = document.getElementById("overlay")

function hideInstruction() {
    overlayDiv.style.display = "none"
}

function main(currentTime) {
    if (gameOver) {
        localStorage.setItem("scoreStore", getScore());
        setTimeout(function () { window.location = "./submit.html" }, 1000)
        return
    }

    if (window.getComputedStyle(overlayDiv).display === 'block') {
        setTimeout(hideInstruction, 5000)
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawScore()
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
