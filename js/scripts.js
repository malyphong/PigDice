// business logic
Scores = [];
currentPlayer = [];
var turnScore = 0;

function Turn(name, turnScore, totalScore) {
this.playerName = name;
this.turnScore = turnScore;
this.totalScore = totalScore;
}

var activePlayer = function() {
  if (Scores.length % 2 === 0 || Scores.length === 0) {
    return currentPlayer[0];
  } else {
    return currentPlayer[1];
  }
}

var player1Score = function () {
  if (Scores.length === 0) {
    return 0;
  } else if (Scores.length % 2 === 1) {
    return Scores[Scores.length - 1].totalScore;
  } else {
    return Scores[Scores.length - 2].totalScore;
  }
}

var player2Score = function () {
  if (Scores.length < 2) {
    return 0;
  } else if (Scores.length % 2 === 0) {
    return Scores[Scores.length - 1].totalScore;
  } else {
    return Scores[Scores.length - 2].totalScore;
  }
}

var lastTotalScore = function() {
    if (Scores.length < 2) {
      return 0;
    } else {
    currentTotal = Scores[Scores.length - 2].totalScore;
    return currentTotal;
    }
}

var rollDice = function(diceRoll) {
  if (diceRoll === 1) {
    turnScore = 0;
    var newTotalScore = lastTotalScore() + turnScore;
    var currentPlayer = activePlayer();
    var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    Scores.push(currentTurn);
  } else {
    turnScore = turnScore + diceRoll;
  }
}

var hold = function() {
  var newTotalScore = lastTotalScore() + turnScore;
  var currentPlayer = activePlayer();
  var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    Scores.push(currentTurn);
    turnScore = 0;
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
    currentPlayer.push(player1Name);
    currentPlayer.push(player2Name);

    $("#playerRoll").click(function(event) {
      event.preventDefault();
      var currentRoll = dice();
      rollDice(currentRoll);
      console.log(currentRoll);
      $(".dice").text(currentRoll);
      console.log(Scores.length)
      $("#newScore").text("Player 1 score: " + player1Score() + " and Player 2 score: " + player2Score());
    });

    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      $("#newScore").text("Player 1 score: " + player1Score() + " and Player 2 score: " + player2Score());
      console.log(Scores);
    });

  });
});
