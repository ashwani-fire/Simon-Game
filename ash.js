// var gamePatter = [];
// var btncolor = ["red", "blue", "green", "yellow"];
// var userpattern = [];
// var started = false;
// var level = 0;
// $(document).keypress(function(){
//   if(!started){
//   $("#level-title").text("level"+level);
//   next_num();
//   started = true;
// }
// })
// $(".btn").click(fucntion(){
//   var  userChosenColour = $(this).attr("id") ;
//     userpattern.push(userChosenColour);
//     playsound(userChosenColour);
//     animate(userChosenColour);
// });
// function next_num(){
//   level++;
//   $("#level-title").text("Level " + level);
//   var  a = math.random();
//   a  = 4*math.floor(a);
//   var randomChosenColour = btncolor[a];
//   gamePatter.push(randomChosenColour);
//   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//   playsound(randomChosenColour);
// }
// function playsound(name){
//   var add = "sounds/"+ name + ".mp3";
//   var audio = new Audio(add);
//   audio.play();
// }
// function animate(ccolor){
//   var id = "#"+ccolor;
//   $(id).addClass("pressed");
//   setTimeout(function(){
//     $(id).removeClass("pressed");
//   },250);
// }

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
