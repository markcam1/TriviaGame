window.onload = function() {

  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start, #firststart").on("click", quizStarter);
  $("#quizface").on("click", ".choicebtn", gameJudger);
};

var quizObject = [
  {question1: "Which one of these heavenly bodies does not belong to the Local Group?", answer1: "Milky Way", answer2: "Andromeda Galaxy", answer3: "Abell 3266", answer4: "Segue 1", correctA: "Abell 3266"},
  {question1: "Which one of these is not a star?", answer1: "Alpha Centauri A", answer2: "Tau Ceti", answer3: "Cetus", answer4: "Alpha Centauri B", correctA: "Cetus"},
  {question1: "Uranus's spin axis is tilted at how many degrees?", answer1: "ninety-eight degrees", answer2: "ninety-nine degrees", answer3: "23.5 degrees", answer4: "90 degrees", correctA: "ninety-eight degrees"},
  {question1: "Jupiter has this many moons?", answer1: "67", answer2: "68", answer3: "69", answer4: "62", correctA: "69"},
  {question1: "The distance from Earth to the Sun is?", answer1: "9.3 million mi", answer2: "149.6 million mi", answer3: "149.6 million km", answer4: "93 million km", correctA: "149.6 million km"},
  {question1: "Name the farthest planet to the sun?", answer1: "Neptune", answer2: "Sun", answer3: "Jupiter", answer4: "Saturn", correctA: "Neptune"},
  {question1: "Name the nearest planet to the sun?", answer1: "Earth", answer2: "Venus", answer3: "Mars", answer4: "Mercury", correctA: "Mercury"},
  {question1: "What is the smallest planet?", answer1: "Earth", answer2: "Venus", answer3: "Mars", answer4: "Mercury", correctA: "Mercury"},
  {question1: "What is the largest planet?", answer1: "Neptune", answer2: "Sun", answer3: "Jupiter", answer4: "Saturn", correctA: "Jupiter"},
  {question1: "How many planets are there in the solar system?", answer1: "nine", answer2: "eight", answer3: "seven", answer4: "eight plus the Sun", correctA: "eight"},
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
    stopwatch.stop();

    if ( userChoice == finalAnswer ){
      winMaker();
    }
    else{ 
      lossMaker();
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
    $("#reviewboard").show();
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
    
  if (gameCounter == 10){
    $("#quizface").hide();
    $("#qspace").hide();
    $("#scoreboard").show();
    $("#winscore").text(wins);
    $("#lossscore").text(loss);
    stopwatch.stop();
    var gameRestarter = setInterval(restartGame, 4000);
  }
  if (gameCounter < 10){
    cycleGame();
  }
  function restartGame (){
    clearInterval(gameRestarter);
    quizStarter();
    $("#qspace").show();
    $("#scoreboard").hide();
    $("#quizface").show();
  }

}


  

  
 














