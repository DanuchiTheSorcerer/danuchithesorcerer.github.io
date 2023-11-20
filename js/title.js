let difficulty = "Medium"

function goToMain() {
    window.location = "main.html"
}

function changeDifficulty() {
    if (difficulty == "Medium") {
        difficulty = "Hard"
    } else if (difficulty == "Hard") {
        difficulty = "Easy"
    } else {
        difficulty = "Medium"
    }
    document.getElementById("difficultyButton").textContent = difficulty
}

function goToCredits() {
    window.location = "credits.html"
}