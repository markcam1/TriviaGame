//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
  // prevents the clock from being sped up unnecessarily
var clockRunning = false;
  
var stopwatch = {
  time: 30,
    
  reset: function() {
    stopwatch.time = 30;
    $("#display").text("30");
  },

  start: function() {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
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
      

    var seconds = Math.floor(t);
    // var seconds = Math.floor(t / 1000);
    var milli = t - (seconds * 1000)
    console.log("conv: " + seconds);

    // if (milli < 1000) {
    //   milli = "0" + milli;
    // }
    if (seconds === 0) {
      seconds = "00";
      stopwatch.stop();
      timesUp();
      
    }
    else if (seconds < 1) {
      seconds = "0" + seconds;
    }
    return seconds;
  }
};

var quizObject = [
  {question1: 113, answer1: 15, answer2: 16, answer3: "", answer4: "", correctA: 2},
  {question1: "name this and that for 130", answer1: "right here", answer2: "17", answer3: "shit for brains", answer4: "no way asshole", correctA: 1},
  {question1: " what is fuck off", answer1: "shitbag", answer2: "dooche", answer3: "guppy", answer4: "right", correctA: 4},
  {question1: "what is this that or the other shit?", answer1: "jackass", answer2: "right", answer3: "barnacle butt", answer4: "jizz hands", correctA: 2},
];

var win = 0;
var loss = 0;

window.onload = function() {

  $("#lap").on("click", timesUp);
  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start, #firststart").on("click", quizStarter);
  $("#choicebox").on("click", ".choicebtn", gameJudger);

  function quizStarter (){
    stopwatch.start();
    showQuizPage();
    cycleGame();
    function showQuizPage (){
      $("#quizface").show();
      $("#firststart").hide();
    }
  };

  function cycleGame () {
    nextQuestion = quizObject.pop();
    gameDisplay(nextQuestion,1)
    
    function gameDisplay (obj,item){
      for (key in obj){
        if (key == "question1"){
          questonDisplay = obj[key];
          $("#qspace").text(questonDisplay);
        }
        if (key == "answer1"){
          userOption1 = obj[key];
          $("#b1").text(userOption1);
        }
        if (key == "answer2"){
          userOption2 = obj[key];
          $("#b2").text(userOption2);
        }
        if (key == "answer3"){
          userOption3 = obj[key];
          $("#b3").text(userOption3);
        }
        if (key == "answer4"){
          userOption4 = obj[key];
          $("#b4").text(userOption4);
        }
        if (key == "correctA"){
          finalAnswer = obj[key];
        }
      }
    }
  }

  
  function gameJudger (){
    var userChoice = $(this).val();
    console.log("user: " + userChoice + " correct: " + finalAnswer) 
    stopwatch.stop();

    if ( userChoice == finalAnswer ){
      console.log("good")
    }
    else{ console.log("bad")}

    function winMaker(){
      wins++

    }
    function lossMaker(){
      loss++
    }
    
  }

  function timesUp (){
    stopwatch.stop();
    var timeFail = setInterval(showTimesUp, 3000)

    // showTimesUp();

    function showTimesUp(){
      $("#image-holder").html("<img src='assets/media/time.png'>")
    } 

  }


  
 







};






