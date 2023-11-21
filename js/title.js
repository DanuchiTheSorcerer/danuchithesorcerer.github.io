let difficulty = "Medium"

function goToMain() {
    if (difficulty == "Easy") {
        window.location = "easy.html"
    } else if (difficulty == "Medium") {
        window.location = "medium.html"
    } else if (difficulty == "Hard") {
        window.location = "hard.html"
    }
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