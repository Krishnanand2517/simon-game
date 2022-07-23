var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown", function() {
    if (!started){
        $("#level-title").text("Level 0");
        started = true;
        nextSequence();
    }
})

function nextSequence() {
    // empty user click array
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var buttonPressed = $("#" + currentColour)
    buttonPressed.addClass("pressed");

    setTimeout(function() {
        buttonPressed.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        gameOver();
    }
}

function gameOver() {
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();

    $("#level-title").text("Game Over, Press any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}