// var nextQuestion = [];


window.onload = function() {
  $("#lap").on("click", stopwatch.recordLap);
  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start").on("click", stopwatch.start);

  var quizObject = [
    {answer1: 113, answer2: 15, answer3: 16},
    {answer1: 130, answer2: 07, answer3: 17},
    {answer1: "fuck off", answer2: "shitbag", answer3: "threeee"},
    {answer1: "dick bag", answer2: "jackass", answer3: 02},
];


function cycleGame () {
  
  nextQuestion = quizObject.pop();

  return nextQuestion;

}


xsx = cycleGame();
console.log(typeof(xsx));

function gameDisplay (obj,item){
  console.log(obj,item)
  
  for (key in obj){
    
    console.log(key)
  }
}
gameDisplay(xsx,1);

};
  
  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;
  
  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  
  // Our stopwatch object
  var stopwatch = {
  
    time: 30000,
    lap: 1,
  
    reset: function() {
  
      stopwatch.time = 30000;
      stopwatch.lap = 1;
  
      //Change the "display" div to "00:00."
      $("#display").text("30:00");
  
      // Empty the "laps" div.
      $("#laps").text("");
    },
    start: function() {
  
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1);
        clockRunning = true;
      }
    },
    stop: function() {
  
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    recordLap: function() {
  
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
  
      // DONE: Add the current lap and time to the "laps" div.
      $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");
  
      // DONE: Increment lap by 1. Remember, we can't use "this" here.
      stopwatch.lap++;
    },
    count: function() {
  
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;
  
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);
      console.log(stopwatch.time);
  
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#display").text(converted);
    },
    timeConverter: function(t) {
  
      var seconds = Math.floor(t / 1000);
      var milli = t;
  
      if (milli < 1000) {
        milli = "0" + milli;
      }
  
      if (seconds === 0) {
        seconds = "00";
      }
      else if (seconds < 1) {
        seconds = "0" + seconds;
      }
  
      return seconds + ":" + milli;
    }

  };
  
  