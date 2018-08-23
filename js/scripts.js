// business logic

//SHARED LOGIC
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

var dice = function() {
  var roll = Math.floor((Math.random() *6) +1);
  diceLog.push(roll);
  return roll;
};

var endTurn = function () {
  var newTotalScore = lastTotalScore() + turnScore;
  var currentPlayer = activePlayer();
  var currentTurn = new Turn(currentPlayer, turnScore, newTotalScore);
    win(newTotalScore);
    Scores.push(currentTurn);
    playerTurnMessage(activePlayer());
    turnScore = 0;
}

//TWO PLAYER LOGIC
var rollDice = function(diceRoll) {
  hideOne();
  if (diceRoll === 1) {
    turnScore = 0;
    endTurn();
  } else {
    turnScore = turnScore + diceRoll;
  }
}

var hold = function() {
    endTurn();
    clearDice();
  }

//COMPUTER LOGIC
var rollDiceComputer = function(diceRoll) {
  hideOne();
  if (diceRoll === 1) {
    turnScore = 0;
    endTurn();
    showDice();
    toggleOff();
    delayClearDice();
    computerTurn1();
  } else {
    turnScore = turnScore + diceRoll;
    showDice();
  }
}


var computerTurn1 = function() {
  setTimeout(function() {
    dice();
    computerDiceThrow();
    if (diceLog[diceLog.length-1] === 1) {
      endTurn();
      toggleOn();
    } else {
      turnScore = turnScore + diceLog[diceLog.length-1];
      if (turnScore >= 6) {
        endTurn();
        toggleOn();
      } else {
        computerTurn1();
      }
    }
  }, 2000);
}

// user interface logic

var toggleOff = function() {
  $(".userButton").hide();
}

var toggleOn = function() {
  $(".userButton").show();
}

var computerDiceThrow = function () {
  currentRoll = diceLog[diceLog.length-1];
  $(".dice").append(diceFaces[currentRoll-1]);
}



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

var showDice = function () {
  currentRoll = diceLog[diceLog.length-1];
  $(".dice").append(diceFaces[currentRoll-1]);
}

var clearDice = function() {
  $(".dice").text("");
}

var delayClearDice = function() {
  setTimeout(function() {
    $(".dice").text("");
  }, 1900);
}

var displayScores = function () {
  

}

$(document).ready(function() {
  // 2Player mode
  $("#2Players").click(function(event) {
    event.preventDefault();
    $(".form-group").show();
    $(".playDecision").hide();
  });

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
  //VS Computer Mode
  $("#vsComputer").click(function(event) {
    event.preventDefault();
    $(".computer-form").show();
    $(".playDecision").hide();

  });
// --------------------------------------------------
  $(".computer-form").submit(function (event) {
    event.preventDefault();
    $(".computer-form").hide();
    $(".rollAndHold").show();

    player1Name = $("input.player1").val();
    player2Name = $("input.computer").val();
    $("#currentPlayer").text(player1Name + "'s turn");
    currentPlayer.push(player1Name);
    currentPlayer.push(player2Name);



// edit for computer play
    $("h2#player1").text(player1Name);
    $("h2#player2").text(player2Name);
    $("#playerRoll").click(function(event) {
      event.preventDefault();
      var currentRoll = dice();
      rollDiceComputer(currentRoll);
      $(".player1Score").text("Player 1 score:" + player1Score());
      $(".player2Score").text("Computer score:" + player2Score());
    });
    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      $(".player1Score").text("Player 1 score:" + player1Score());
      $(".player2Score").text("Computer score:" + player2Score());

    });
  });
});
