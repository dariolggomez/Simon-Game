var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var userInput = -1;
var init_btn = false;
$("body").on("keydown", function () {
    if (!gameStarted) {
        nextSequence();
    }
});

$(".btn").on("click", function () {
    if (!gameStarted) {
        init_btn = true;
        nextSequence();
    }
});

function nextSequence() {
    gameStarted = true;

    $("h1").text("Level" + " " + (level + 1));

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level += 1;

}


$(".btn").on("click", function (e) {
    if (!init_btn) {
        if (gameStarted) {
            userInput += 1;
            var userChosenColour = e.currentTarget.getAttribute("id");
            userClickedPattern.push(userChosenColour);
            if (userClickedPattern[userInput] === gamePattern[userInput]) {
                console.log("Success");
                playSound(userChosenColour);
                animatePress(userChosenColour);
                if (userInput === level - 1) {
                    userClickedPattern = [];
                    userInput = -1;
                    setTimeout(nextSequence, 1000);
                }
            }
            else {
                console.log("Wrong");
                var wrongAudio = new Audio("sounds/wrong.mp3");
                wrongAudio.play();
                $("body").addClass("game-over");

                setTimeout(function () {
                    $("body").removeClass("game-over");
                }, 200);

                $("h1").text("Game over, press any key to restart!");

                startOver();
            }
        }
    }else{
        init_btn = false;
    }
});

function startOver() {
    userClickedPattern = [];
    userInput = -1;
    gamePattern = [];
    level = 0;
    gameStarted = false;
}

function playSound(name) {

    // Creation of Colours Sound
    var blueSound = new Audio("sounds/blue.mp3");
    var greenSound = new Audio("sounds/green.mp3");
    var redSound = new Audio("sounds/red.mp3");
    var yellowSound = new Audio("sounds/yellow.mp3");

    switch (name) {
        case "blue":
            blueSound.play();
            break;

        case "green":
            greenSound.play();
            break;

        case "red":
            redSound.play();
            break;

        case "yellow":
            yellowSound.play();
            break;

        default:
            break;
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
