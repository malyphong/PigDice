// business logic
player1Score = [];
player2Score = [];
var turnScore = 0;
var currentPlayer = "";
var player1Name = "";
var player2Name = "";

function Turn(name, turnScore, totalScore) {
this.playerName = name;
this.turnScore = turnScore;
this.totalScore = totalScore;
}

var currentTotalScore = function() {
  if (player1Name = currentPlayer) {
    if (player1Score.length === 0) {
      return 0;
    } else {
    currentTotal = player1Score[player1Score.length - 1].totalScore;
    return currentTotal;
    }
  } else {
    if (player2Score.length === 0) {
      return 0;
    } else {
    currentTotal = player1Score[player2Score.length - 1].totalScore;
    return currentTotal;
    }
  }
}

var rollDice = function(diceRoll) {
  if (diceRoll === 1) {
    turnScore = 0;
    newTotalScore = currentTotalScore() + turnScore;
    var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    if (currentPlayer = player1Name) {
      player1Score.push(currentTurn);
      turnScore = 0;
      currentPlayer = player2Name;
    } else {
        player2Score.push(currentTurn);
        turnScore = 0;
        currentPlayer = player1Name;
    }
  } else {
    turnScore = turnScore + diceRoll;
  }
}

var hold = function() {
  newTotalScore = currentTotalScore() + turnScore;
  var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
  if (currentPlayer = player1Name) {
    player1Score.push(currentTurn);
    turnScore = 0;
    currentPlayer = player2Name;
  } else {
      player2Score.push(currentTurn);
      turnScore = 0;
      currentPlayer = player1Name;
  }//SWITCH PLAYER//
}

var dice = function() {
  var roll = Math.floor((Math.random() *6) +1);
  return roll;
};


// user interface logic


$(document).ready(function() {
  $(".form-group").submit(function (event) {
    event.preventDefault();
   // $(".form-group").hide();
   // $(".rollAndHold").show();

    player1Name = $("input.player1").val();
    player2Name = $("input.player2").val();
    currentPlayer = player1Name;


    $("#playerRoll").click(function(event) {
      event.preventDefault();
      var currentRoll = dice();
      rollDice(currentRoll);
      console.log(player1Score);
      console.log(player2Score);

      $(".dice").text(currentRoll);
      $("#newScore").text(currentTotalScore());
    });

    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      $("#newScore").text(currentTotalScore());
    });

  });
});
