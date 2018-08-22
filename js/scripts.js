// business logic
Scores = [];
currentPlayer = [];
diceLog = [];
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
  hideOne();
  if (diceRoll === 1) {
    turnScore = 0;
    var newTotalScore = lastTotalScore() + turnScore;
    var currentPlayer = activePlayer();
    var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    Scores.push(currentTurn);
    playerTurnMessage(activePlayer());
  } else {
    turnScore = turnScore + diceRoll;
  }
}

var hold = function() {
  var newTotalScore = lastTotalScore() + turnScore;
  var currentPlayer = activePlayer();
  var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    win(newTotalScore);
    Scores.push(currentTurn);
    playerTurnMessage(activePlayer());
    turnScore = 0;
    clearDice();

  }

var dice = function() {
  var roll = Math.floor((Math.random() *6) +1);
  diceLog.push(roll);
  return roll;
};

// user interface logic
var diceFaces = ['<img src="img/one.png" alt="Die Face">','<img src="img/two.png" alt="Die Face">', '<img src="img/three.png" alt="Die Face">', '<img src="img/four.png" alt="Die Face">', '<img src="img/five.png" alt="Die Face">', '<img src="img/six.png" alt="Die Face">']

var win = function(finalNumber) {
  if (finalNumber >= 100) {
    $(".winning").show();
    $(".rollAndHold").hide();
    $(".winner").text(activePlayer());
  } else {
  }
}

var playerTurnMessage = function(name) {
  $("#currentPlayer").text(name + "'s turn");
  $("#firstPlayer").hide();
}

var hideOne = function () {
  if (diceLog[diceLog.length-2] === 1) {
    $(".dice").text("");
  }
}

var clearDice = function() {
  $(".dice").text("");
}

$(document).ready(function() {
  $(".form-group").submit(function (event) {
    event.preventDefault();
   $(".form-group").hide();
   $(".rollAndHold").show();

    player1Name = $("input.player1").val();
    player2Name = $("input.player2").val();
    $("#currentPlayer").text(player1Name + "'s turn");
    currentPlayer.push(player1Name);
    currentPlayer.push(player2Name);

    $("h2#player1").text(player1Name);
    $("h2#player2").text(player2Name);

    $("#playerRoll").click(function(event) {
      event.preventDefault();
      var currentRoll = dice();
      rollDice(currentRoll);
      console.log(currentRoll);
      $(".dice").append(diceFaces[currentRoll-1]);

      $(".player1Score").text("Player 1 score:" + player1Score());
      $(".player2Score").text("Player 2 score:" + player2Score());

    });

    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      $(".player1Score").text("Player 1 score:" + player1Score());
      $(".player2Score").text("Player 2 score:" + player2Score());
    });

  });
});
