const htmlscore = document.getElementById("userscore")
const returnBtn = document.getElementById("btnReturn")
const submitBtn = document.getElementById("btnSubmit")
const scoretable = document.getElementById("scoretable")
let score = 0

window.onload = () => {
    score = localStorage.getItem("scoreStore")
    ShowUserScore()
    getScores()
    if (score == null) submitBtn.disabled = true
}

returnBtn.addEventListener("click", () => {
    window.location = "./index.html"
})

function ShowUserScore() {
    htmlscore.innerHTML = score
}

async function getScores() {
    fetch("/scores")
        .then(resp => resp.json())
        .then(resp => populateScoreTable(resp))
        .catch(console.log)
}

async function postScore(userid) {
    await fetch("/scores", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "userid": userid, "score": score })
    })
    setTimeout(function () {
        getScores()
        submitBtn.disabled = true
        localStorage.removeItem("scoreStore")
    }, 700)
}

function populateScoreTable(data) {
    scorentry.innerHTML = ""
    for (let entry in data) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${entry}</td><td>${data[entry].user}</td><td>${data[entry].playcounts}</td><td>${data[entry].maxscore}</td>`
        scorentry.appendChild(tr)
    }
}