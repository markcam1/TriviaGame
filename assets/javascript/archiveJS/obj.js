var quizObject = {
    a: {answer1: 113, answer2: 15, answer3: 16},
    b: {answer1: 130, answer2: 07, answer3: 17},
    c: {answer1: "fuck off", answer2: "shitbag", answer3: "threeee"},
    d: {answer1: "dick bag", answer2: "jackass", answer3: 02},
  }

  function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
    if (Math.random() < 1/++count)
    result = prop;
    return result;
  }
  
  console.log(pickRandomProperty(quizObject));