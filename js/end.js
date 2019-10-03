const latestScore = localStorage.getItem("latestScore");
const name = document.getElementById("inputBox");
const save = document.getElementById("save");
let highScores = JSON.parse(localStorage.getItem("highScores"));
let userScore;

save.addEventListener("click", ()=>{
    userScore = {user: name.value, score: latestScore};
    if(!highScores){
        highScores = [];
    }
    highScores.push(userScore);
    highScores.sort(function (a,b){return b.score - a.score});
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
});
