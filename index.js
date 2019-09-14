var col = ["green", "red", "yellow", "blue"]
var gamePattern = []
var userClickedPattern = []
var level;
$(document).keypress(function() {
  level = 0;
  nextSequence();
  intializeButtons();
  $(document).unbind("keypress")
})
//
// for(var i=0;i<4;i++)
// {
//   console.log(col[i])
//   $("#"+col[i]).on("click",function(event){
//      var btn = event.target.id;
//      var soundFile = "sounds/"+event.target.id+".mp3"
//      var audio = new Audio(soundFile)
//      audio.play();
//      nextSequence();
//   })
// }
function restart()
{
  $(document).keypress(function() {
    level = 0;
    nextSequence();
    intializeButtons();
    $(document).unbind("keypress")
  })
}
function intializeButtons() {
  $(".btn").on("click", function(event) {
    var userColorChosen = event.target.id;
    userClickedPattern.push(userColorChosen);
    console.log("userPattern:" + userClickedPattern);
    annimatePress(userColorChosen)
    var x = compare(userClickedPattern, gamePattern)

    if(x)
    {
      playSound(userColorChosen)
    }
    if (!x) {
      playSound("wrong")
      level--;
      gameOver();
    }
    if (len(userClickedPattern) == len(gamePattern) && x) {
      userClickedPattern = []
      setTimeout(function(){
        nextSequence();
      },1000)

    }
    console.log(x)
  })
}

function compare(user, system) {
  l = (len(user) < len(system)) ? len(user) : len(system)
  console.log(l)
  for (var i = 0; i < l; i++) {
    if (user[i] != system[i]) {
      return false;
    }
  }
  return true;
}

function len(x) {
  return x.length;
}

function gameOver() {
  temp = level;
  level = 0;
  gamePattern=[]
  userClickedPattern=[]
  $("h1").text("Game Over, Press Any Key to Restart Failed At Level "+temp);
  $("body").addClass("game-over")
  setTimeout(function (){
    $("body").removeClass("game-over")
  },200)
  $(".btn").unbind("click")
  console.log(gameOver);
  restart();
}

function nextSequence() {
  $("h1").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4)
  //console.log(randomNumber)
  var randomColor = col[randomNumber]
  //console.log(randomColor)
  gamePattern.push(randomColor)
  console.log("gamePattern:" + gamePattern)
  notifyUser(randomColor);
  level++;

}

function notifyUser(randomColor) {
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  //console.log(randomColor)
  playSound(randomColor);
}

function playSound(name) {
  var soundFile = "sounds/" + name + ".mp3"
  var audio = new Audio(soundFile)
  audio.play();
}

function annimatePress(color) {
  var self = color;
  $("#" + color).addClass("pressed")
  setTimeout(function() {
    //console.log(self)
    $("#" + self).removeClass("pressed")
  }, 100)
}