window.onload = function() {

  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start, #firststart").on("click", quizStarter);
  $("#quizface").on("click", ".choicebtn", gameJudger);
};

var quizObject = [
  {question1: "what the blah blah?", answer1: "xyz abc", answer2: "bush cheney", answer3: "henesey", answer4: "coke cola", correctA: "henesey"},
  {question1: "name this and that for 130", answer1: "right here", answer2: "17", answer3: "shit for brains", answer4: "no way asshole", correctA: "no way asshole"},
  {question1: " what is fuck off", answer1: "shitbag", answer2: "dooche", answer3: "guppy", answer4: "right", correctA: "right"},
  {question1: "what is this that or the other shit, that or the other shit?", answer1: "jackass", answer2: "right", answer3: "barnacle butt", answer4: "jizz hands", correctA: "jackass"},
];

var wins = 0;
var loss = 0;
var gameCounter = 0;
var intervalId;
var clockRunning = false;
  
var stopwatch = {
  time: 30,
  reset: function() {
    stopwatch.time = 30;
    $("#clockdisplay").text(" 30 ");
    stopwatch.start();
  },
  start: function() {
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },
  count: function() {
    stopwatch.time--;
    var converted = stopwatch.timeConverter(stopwatch.time);
    $("#clockdisplay").text(" " + converted + " ");
  },
  timeConverter: function(t) {
    var seconds = Math.floor(t);
    if (seconds === 0) {
      seconds = "00";
      stopwatch.stop();
      timesUp();
    }
    else if (seconds < 0) {
      seconds = "0" + seconds;
    }
    return seconds;
  }
};

function quizStarter (){
  wins = 0;
  loss = 0;
  gameCounter = 0;
  stopwatch.start();
  showQuizPage();
  cycleGame();

  function showQuizPage (){
    $("#mainarea").show();
    $("#quizface").show();
    $("#firststart").hide();
  }
};

  function cycleGame () {
    nextQuestion = quizObject.pop();
    gameDisplay(nextQuestion,1)
    console.log(typeof(nextQuestion));
 
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
    quizObject.unshift(nextQuestion);
  }
  
  function gameJudger (){
    var userChoice = $(this).text();
    console.log("user: " + userChoice + " correct: " + finalAnswer) 
    stopwatch.stop();

    if ( userChoice == finalAnswer ){
      winMaker();
      console.log("good");
    }
    else{ 
      lossMaker();
      console.log("loss");
    }

    function winMaker(){
      wins++
      var successList = ["yes", "winner", "you go", "you win", "thumbsup", "goldstar"];
      successWord = successList[Math.floor(Math.random() * successList.length)];
      gifPlayer(successWord)
      updateEngine("Correct");
    }
    function lossMaker(){
      loss++
      var failList = ["fail", "loser", "thumbsdown", "thumbs down", "wrong", "smh", "shakingmyhead"];
      failWord = failList[Math.floor(Math.random() * failList.length)];
      gifPlayer(failWord)
      updateEngine("Wrong");
    }
  }

  function timesUp(){
    loss++
    var lateList = ["timesup", "alarm", "time's up"];
    lateWord = lateList[Math.floor(Math.random() * lateList.length)];
    gifPlayer(lateWord)
    updateEngine("Time's Up");
  }


function updateEngine (userAudit){
  yourAnswer = userAudit;
  stopwatch.stop();
  gameCounter++;
  
  var timeFail = setInterval(showEngine, 500);
  
  function showEngine(){
    $("#showRightWrong").show();
    $("#showRightWrong").text(yourAnswer);
    $("#qspace").text("The correct answer is " + finalAnswer);
    $("#quizface").hide();
    clearInterval(timeFail);
    $("#reviewboard").show( "fast" );
    var moveOnTimer = setInterval(nextGame, 4000);
    
    function nextGame (){
      clearInterval(moveOnTimer);
      $("#quizface").show();
      $("#reviewboard").hide()
      $("#showRightWrong").hide();
      $("img").remove();
      stopwatch.reset();
      gameMaster();
    }
  }
}

function gifPlayer(searchTerm) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=";
  queryURL += searchTerm

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    response.data.forEach(function(gifObject) {
      var img = $('<img>')
      img.attr('src', gifObject.images.fixed_height.url)
      $('#reviewboard').prepend(img)
    })
  });
  
}


function gameMaster (){
  
  console.log("gameMaster: " + quizObject.length);
  
  if (gameCounter === 4){
    console.log("quiz em")
    stopwatch.reset();
    quizStarter();
  }
  else{
    cycleGame();
    
  }
}


  

  
 














