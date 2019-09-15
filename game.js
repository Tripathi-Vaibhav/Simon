var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

// detect keypress to Start game

$(document).keypress(function() {
  if (!start) {
    nextSequence();
    start = true;
  }
});


function nextSequence() {

  // set to empty for each Level
  userClickedPattern = [];

  // generate random number

  var randomNumber = Math.floor(Math.random() * 4);

  // update level and heading

  level++;
  $("#level-title").html("Level " + level);

  // get random colour

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash effect

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // play audio

  playSound(randomChosenColour);

}


//  detect click

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// check answer

function checkAnswer(currLevel) {

  if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
    if (currLevel === level - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }

  // game over
  else {

    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");
  }
}



// play sound on user click

function playSound(name) {
  var userChosenAudio = new Audio("sounds/" + name + ".mp3");
  userChosenAudio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
