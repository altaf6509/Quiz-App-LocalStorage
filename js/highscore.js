const ol = document.getElementById("scoreList");
const highScores = JSON.parse(localStorage.getItem("highScores"));
const redirectStart = document.getElementById("redirectStart");

highScores.map((obj,index)=>{
    console.log(index + 1  + " " + obj.user + " " + obj.score);
    let topList = "<li><div class='highscore'>" + (index +1) + ". " + obj.user + "</div>" + obj.score + "</li>";
    ol.innerHTML = ol.innerHTML + topList;
});

redirectStart.addEventListener("click",()=>{
    window.open("./game.html", "_self");
});

console.log(highScores);