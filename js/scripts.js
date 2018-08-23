// business logic

Scores = [];
currentPlayer = [];
diceLog = [];
thrownDice = [];
var turnScore = 0;

function Turn(name, turnScore, totalScore) {
this.playerName = name;
this.turnScore = turnScore;
this.totalScore = totalScore;
};

// Turn.prototype.DetailedScore = function() {
//   if (Scores.length < 2) {
//     return 0;
//   } else {
//   response = "Points remaining to win: " + toString((100 - this.totalScore));
//   return response;
//   }
// };

var activePlayer = function() {
  if (Scores.length % 2 === 0 || Scores.length === 0) {
    return currentPlayer[0];
  } else {
    return currentPlayer[1];
  }
};

var player1Score = function () {
  if (Scores.length === 0) {
    return 0;
  } else if (Scores.length % 2 === 1) {
    return Scores[Scores.length - 1].totalScore;
  } else {
    return Scores[Scores.length - 2].totalScore;
  }
};

var player2Score = function () {
  if (Scores.length < 2) {
    return 0;
  } else if (Scores.length % 2 === 0) {
    return Scores[Scores.length - 1].totalScore;
  } else {
    return Scores[Scores.length - 2].totalScore;
  }
};

var lastTotalScore = function() {
    if (Scores.length < 2) {
      return 0;
    } else {
    currentTotal = Scores[Scores.length - 2].totalScore;
    return currentTotal;
    }
};

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
    displayScores();
    playerTurnMessage(activePlayer());
    turnScore = 0;
};

//TWO PLAYER LOGIC
var rollDice = function(diceRoll) {
  hideOne();
  if (diceRoll === 1) {
    turnScore = 0;
    endTurn();
  } else {
    turnScore = turnScore + diceRoll;
  }
};

var roll2Dice = function(diceRoll1, diceRoll2) {
  hideOne();
  if (diceRoll1 === 1 || diceRoll2 === 1) {
    turnScore = 0;
    endTurn();
  } else {
    turnScore = turnScore + diceRoll1 + diceRoll2;
  }
};

var hold = function() {
  endTurn();
  clearDice();
};

//COMPUTER LOGIC
var rollDiceComputer = function() {
  hideOne();
  if (thrownDice[0] === "2Dice") {
    dieOne = dice();
    dieTwo = dice();
  } else {
    dieOne = dice();
    dieTwo = 0;
  }
  if (dieOne === 1 || dieTwo === 1) {
    turnScore = 0;
    endTurn();
    computerDiceThrow();
    toggleOff();
    delayClearDice();
    computerTurn1();
  } else {
    turnScore = turnScore + dieOne + dieTwo;
    computerDiceThrow();
  }
};

var computerTurn1 = function() {
  setTimeout(function() {
    if (thrownDice[0] === "2Dice"){
      dieOne = dice();
      dieTwo = dice();
    } else {
      dieOne = dice();
      dieTwo = 0;
    }
    computerDiceThrow();
    if (dieOne === 1 || dieTwo === 1) {
      turnScore = 0;
      endTurn();
      toggleOn();
    } else {
      turnScore = turnScore + dieOne + dieTwo;
      if (turnScore >= 12) {
        endTurn();
        diceLog.push(1);
        toggleOn();
      } else {
        computerTurn1();
      }
    }
  }, 1500);
};


// user interface logic

var toggleOff = function() {
  $(".userButton").hide();
};

var toggleOn = function() {
  $(".userButton").show();
};

var computerDiceThrow = function () {
  if (thrownDice[0] === "2Dice"){
    currentRoll = diceLog[diceLog.length-1];
    priorRoll = diceLog[diceLog.length-2];
    $(".dice").append(diceFaces[priorRoll-1] + diceFaces[currentRoll-1])
  } else {
    currentRoll = diceLog[diceLog.length-1];
    $(".dice").append(diceFaces[currentRoll-1]);
  }
};

var diceFaces = ['<img src="img/one.png" alt="Die Face">','<img src="img/two.png" alt="Die Face">', '<img src="img/three.png" alt="Die Face">', '<img src="img/four.png" alt="Die Face">', '<img src="img/five.png" alt="Die Face">', '<img src="img/six.png" alt="Die Face">']

var win = function(finalNumber) {
  if (finalNumber >= 100) {
    $(".winning").show();
    $(".rollAndHold").hide();
    $(".winner").text(activePlayer());
  } else {
  }
};

var playerTurnMessage = function(name) {
  $("#currentPlayer").text(name + "'s turn");
  $("#firstPlayer").hide();
};

var hideOne = function () {
  if (thrownDice[0] === "2Dice") {
    if (diceLog[diceLog.length-1] === 1 || diceLog[diceLog.length-2] === 1) {
      $(".dice").text("");
    }
  } else {
    if (diceLog[diceLog.length-1] === 1) {
      $(".dice").text("");
    }
  }
};

var clearDice = function() {
  $(".dice").text("");
};

var delayClearDice = function() {
  setTimeout(function() {
    $(".dice").text("");
  }, 1400);
};

var checkDiceUsed = function () {
  if (thrownDice[0] === "2Dice"){
    $("#playerRoll1").hide();
  } else if (thrownDice[0] === "1Die") {
    $("#playerRoll2").hide();
  } else { //STRICTLY FOR TEST PURPOSES
    $("#playerRoll2").hide();
    $("#playerRoll1").hide();
  }
}

var displayScores = function () {
  $(".player1Score").text("Score:" + player1Score());
  $(".player2Score").text("Score:" + player2Score());
};

$(document).ready(function() {
  // 2Player mode
  $("#2Players").click(function(event) {
    event.preventDefault();
    $(".form-group").show();
    $(".playDecision").hide();
    thrownDice.push($('input[name=diceSelect]:checked').val());
    console.log(thrownDice);
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
    checkDiceUsed();

    $("#playerRoll1").click(function(event) {
      event.preventDefault();
      var currentRoll = dice();
      rollDice(currentRoll);
      console.log(currentRoll);
      console.log(Scores);
      $(".dice").append(diceFaces[currentRoll-1]);
      displayScores();
    });

    $("#playerRoll2").click(function(event) {
      event.preventDefault();
      var firstRoll = dice();
      var secondRoll = dice();
      console.log(firstRoll);
      console.log(secondRoll);
      roll2Dice(firstRoll, secondRoll);
      $(".dice").append(diceFaces[(firstRoll - 1)]);
      $(".dice").append(diceFaces[(secondRoll - 1)]);
      displayScores();
    });

    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      displayScores();
      console.log(Scores);
    });
  });

  //VS Computer Mode
  $("#vsComputer").click(function(event) {
    event.preventDefault();
    $(".computer-form").show();
    $(".playDecision").hide();
    thrownDice.push($('input[name=diceSelect]:checked').val());
    console.log(thrownDice);
  });

  $(".computer-form").submit(function (event) {
    event.preventDefault();
    $(".computer-form").hide();
    $(".rollAndHold").show();
    player1Name = $("input.player1").val();
    player2Name = $("input.computer").val();
    $("#currentPlayer").text(player1Name + "'s turn");
    currentPlayer.push(player1Name);
    currentPlayer.push(player2Name);
    $("h2#player1").text(player1Name);
    $("h2#player2").text(player2Name);
    $("#playerRoll2").remove();

    $("#playerRoll1").click(function(event) {
      event.preventDefault();
      rollDiceComputer();
    });

    $("#hold").click(function(event) {
      event.preventDefault();
      hold();
      toggleOff();
      displayScores();
      computerTurn1();
    });
  });
});
