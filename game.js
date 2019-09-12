var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  // update level and heading

  level+=1;
  $("#level-title").html("Level "+level);

  // get random colour

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash effect

  $("#" + gamePattern[0]).fadeIn(100).fadeOut(100).fadeIn(100);

  // play audio

  var randomChosenAudio = new Audio("sounds/" + gamePattern[0] + ".mp3");
  randomChosenAudio.play();

}

detectClick();

//  detect click

function detectClick() {
  $(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  });
}

// play sound on user user

function playSound(name) {
  var userChosenAudio = new Audio("sounds/" + name + ".mp3");
  userChosenAudio.play();
  animatePress(name);
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);

}


// detect keypress to Start game

$(document).one("keydown",level=0,nextSequence);
