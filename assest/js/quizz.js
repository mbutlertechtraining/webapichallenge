//Creating our array of questions with answer choices and correct answers
var questions = [
    {
        title:"What is the capital of the US state, Alabama?",
        choices:[ "Montgomery", "Birmingham", "Texas", "Appleton"],
        answer:"Montgomery"
    },
    {
      title:"Question 2",
      choices:[ "answer a ", "answer b", "answer c", "answer d"],
      answer:"answer a"
    },

    {
      title:"Question 3",
      choices:[ "answer a ", "answer b", "answer c", "answer d"],
      answer:"answer a"
    },

    {
      title:"Question 4",
      choices:[ "answer a ", "answer b", "answer c", "answer d"],
      answer:"answer a"
    }


    
];



//reaching into the DOM based on ID
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//Reaching into the DOM to display.  In the timerID, we are setting the time in Inter
function startQuiz() {
 
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

//reaching into the DOM by utlilzing the ID and setting the attributes to the questions
function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
  
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

//checking if the response if correct of not.  Time is redcued by 15 seconds also providing feedback
function questionClick() {

  if (this.value !== questions[currentQuestionIndex].answer) {
  
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
  } else {
  
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

 
  //calculating the number of correct and incorrect questions
  currentQuestionIndex++;

  //represent the quiz ending 
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

//Sending to the end screen and final scores and time
function quizEnd() {
  
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

//Going through time and subtracting as needed 
function clockTick() {

  time--;
  timerEl.textContent = time;

  //if statement to say if zero is reach to end the quiz
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

  //taking the initials and saving them to local scores 
  var initials = initialsEl.value.trim();

  if (initials !== "") {
 
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

      //The way new scores are plugged in
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

//Once the initials are enter, the information is saved 
function checkForEnter(event) {

  if (event.key === "Enter") {
    saveHighscore();
  }
}

//Calling the functions when there is a click on event.key 
submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
