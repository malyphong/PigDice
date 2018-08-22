// business logic
var dice = function() {
  var roll = Math.floor((Math.random() *6) +1);
  return roll;
};








// user interface logic


$(document).ready(function() {
 $(".form-group").click(function(event) {
   event.preventDefault();
   // var diceRoll = dice
 $(".dice").text(dice);

  });
});
