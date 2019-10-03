const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressfill");
const loader = document.getElementById("loader");
const header = document.getElementById("header");
const container = document.getElementById("qaContainer");
const score = document.getElementById("score");

const QUESTION = "Question: ";
const SCORE = "Score: ";
const HIDDEN_CLASS = "hidden";
let acceptingAnswers = false;
let currentQuestion = {};
let questions=[];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")

    .then(response=>{return response.json();})
    .then(json => {
        questions = json.results.map((value,index)=>{
            const formattedQuestion = {
                question: value.question
            }
            let choices = [...value.incorrect_answers]; 
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            choices.splice(formattedQuestion.answer -1, 0, value.correct_answer);
            choices.forEach((choice,index)=>{
                formattedQuestion["choice"+(index+1)] = choice;
            });
            
            return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {console.error(err)});

let questionCounter = 0;
let availableQuestions = [];
let currentScore = 0;
// CONSTANTS
const CORRECT_BONUS = 10;
let MAX_QUESTIONS;

const startGame = () =>{
    currentScore = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    MAX_QUESTIONS = availableQuestions.length;
    getNextQuestion();
    showGame();
}

const getNextQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("latestScore", currentScore);
        return window.location.assign("./end.html");
    }
    questionCounter++;
    fillHeaderAttributes();
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach(choice =>{
        choice.innerHTML = currentQuestion["choice" + choice.dataset.number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
}

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        let classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer){
            currentScore += CORRECT_BONUS;
            classToApply = "correct";
        }
        choice.parentElement.classList.add(classToApply);

        setTimeout( ()=> {
            choice.parentElement.classList.remove(classToApply);
            getNextQuestion();
        }, 1000)
    });
});

const fillHeaderAttributes = () => {
    questionNumber.innerHTML = QUESTION + questionCounter + "/" + MAX_QUESTIONS;
    score.innerHTML = SCORE + currentScore;
    progressBar.style.width = questionCounter/MAX_QUESTIONS*100 + "%";
}

const showGame = () => {
    if(!loader.classList.contains(HIDDEN_CLASS)) loader.classList.add(HIDDEN_CLASS);
    if(header.classList.contains(HIDDEN_CLASS))  header.classList.remove(HIDDEN_CLASS);
    if(container.classList.contains(HIDDEN_CLASS)) container.classList.remove(HIDDEN_CLASS);
}
