
let scoreCount = 0

export function addToScore() {
    scoreCount += 10
}

export function draw() {
    const drawScore = document.getElementById("score")
    drawScore.innerHTML = "Score: " + scoreCount
}