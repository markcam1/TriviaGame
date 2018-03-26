

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
    for (key in obj){
      console.log(key)
    }
  }
  gameDisplay(xsx,1);
  
  };
    