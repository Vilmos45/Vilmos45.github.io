let sensitivity = 20; //20 by default
let ballSpeed = 8;   //25 by default
let gameSpeed = 270;  //270 by default (lower values, makes the game slower)
let maxScore = 10; //10 by default
let maxTime = -1; //-1 by default, means unlimited

/*--- Please do NOT modify anything below this line ---*/
const scoreDiv = document.getElementById("score");
const labda = document.getElementById("labda");
const uto1 = document.getElementById("uto1");
const uto2 = document.getElementById("uto2");
const GameScreen = document.getElementById("game_screen");

document.getElementById("felezovonal").style.left = GameScreen.clientWidth - document.getElementById("felezovonal").offsetWidth + "px";
document.getElementById("felezovonal").style.top = GameScreen.clientHeight + "px";


let scoreb= 0;
let scorer = 0;
let InGame = true;
let Vx = 0;
let Vy = 0;

let rw = true;
let rs = true;
let ru = true;
let rd = true;

function setup(){
    labda.style.top = (GameScreen.clientHeight - labda.offsetHeight)/2 + "px";
    labda.style.left = (GameScreen.clientWidth - labda.offsetWidth)/2 + "px";

    uto2.style.top = (GameScreen.clientHeight - uto2.offsetHeight)/2 + "px";
    uto2.style.left = (GameScreen.clientWidth - uto2.offsetWidth - (GameScreen.clientWidth/50)) + "px";

    uto1.style.top = (GameScreen.clientHeight - uto1.offsetHeight)/2 + "px";
    uto1.style.left = (GameScreen.clientWidth/50) + "px";

    rw = true;
    rs = true;
    ru = true;
    rd = true;

    Vx = 0;
    Vy = 0;
    scoreb = 0;
    scorer = 0;
    InGame = false;
    console.log("|---------Settings---------|\nsensitivity: " + sensitivity + "\nball speed: " + ballSpeed + "\ngame speed: " + gameSpeed + "\n|--------------------------|");
    console.log("Game set!");
}

document.addEventListener("keydown", keyDownHandler, true);
document.addEventListener("keyup", keyUpHandler, true);

function keyDownHandler(e) {
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") InGame = !InGame;
    if (!InGame) return;
    switch (e.key){
        case "w":
            rw = false;
            break;
        case "ArrowUp":
            ru = false;
            break;
        case "s":
            rs = false;
            break;
        case "ArrowDown":
            rd = false;
            break;
        default:
            return;
    }
}

function keyUpHandler(e) {
    e.preventDefault();
    switch (e.key)
    {
        case "w":
            rw = true;
            break;
        case "ArrowUp":
            ru = true;
            break;
        case "s":
            rs = true;
            break;
        case "ArrowDown":
            rd = true;
            break;
        default:
            return;
    }
}


function up (utoje){
    let newTop = (parseInt(getComputedStyle(utoje).top) || 0) - sensitivity;
    if (newTop < 0) newTop = 0;

    utoje.style.top = newTop + "px";
}

function down (utoje){
    let newTop = (parseInt(getComputedStyle(utoje).top) || 0) + sensitivity;
    const maxTop = GameScreen.clientHeight - uto1.offsetHeight;
    if (newTop > maxTop) newTop = maxTop;

    utoje.style.top = newTop + "px";
}

function movPlayer(){
    if (!rw)
        up(uto1);
    if (!ru)
        up(uto2);
    if(!rs)
        down(uto1);
    if(!rd)
        down(uto2);
}

function getRand(rnd) {
    if (rnd > 0){
        rnd += 2;
    }
    else if (rnd < 0)
        rnd -= 2;
    else
        getRand((Math.random() - 0.5));
    return Math.floor(rnd);
}

function sendAlert(msg){
    setInterval(() => {}, 10000 / gameSpeed);
    alert(msg);
    setInterval(() => {}, 10000 / gameSpeed);
}

function movBall() {

    if (Vx === 0)
        Vx = (getRand(Math.random() - 0.5) * ballSpeed);

    if (Vy === 0)
        Vy = (getRand(Math.random() - 0.5) * (ballSpeed/10)*5);

    let newTop = (parseInt(getComputedStyle(labda).top) || 0) + Vy;
    let newLeft = (parseInt(getComputedStyle(labda).left) || 0) + Vx;

    const maxTop = GameScreen.clientHeight - labda.offsetHeight;

    // Felső / alsó fal
    if (newTop <= 0) {
        newTop = 0;
        Vy *= -Math.random()/2 - 0.75; //-1
    }

    if (newTop >= maxTop) {
        newTop = maxTop;
        Vy *= -Math.random()/2 - 0.75; //-1
    }

    // Ütő 1 collision
    const uto1Top = parseInt(getComputedStyle(uto1).top);
    const uto1Left = parseInt(getComputedStyle(uto1).left);

    if (
        newLeft <= uto1Left + uto1.offsetWidth &&
        newTop + labda.offsetHeight >= uto1Top &&
        newTop <= uto1Top + uto1.offsetHeight
    ) {
        newLeft = uto1Left + uto1.offsetWidth;
        Vx *= -Math.random()/2 - 0.75; //-1
    }

    // Ütő 2 collision
    const uto2Top = parseInt(getComputedStyle(uto2).top);
    const uto2Left = parseInt(getComputedStyle(uto2).left);

    if (
        newLeft + labda.offsetWidth >= uto2Left &&
        newTop + labda.offsetHeight >= uto2Top &&
        newTop <= uto2Top + uto2.offsetHeight
    ) {
        newLeft = uto2Left - labda.offsetWidth;
        Vx *= -Math.random()/2 - 0.75;
    }

    // Bal / jobb fal (pont)
    if (newLeft <= 0) {
        scorer++;
        scoreDiv.textContent = scoreb + ":" + scorer;
        if (scorer >= maxScore)
        {
            sendAlert("!!!Red won!!!\n" + scoreb + ":" + scorer);
            setup;
        }
        newLeft = (GameScreen.clientWidth - labda.offsetWidth) / 2;
        newTop = (GameScreen.clientHeight - labda.offsetHeight) / 2;
        Vx = 0;
        Vy = 0;
    }

    if (newLeft >= GameScreen.clientWidth - labda.offsetWidth) {
        scoreb++;
        scoreDiv.textContent = scoreb + ":" + scorer;
        if (scoreb >= maxScore)
        {
            send
            ("!!!Blue won!!!\n" + scoreb + ":" + scorer);
            setup;
        }
        newLeft = (GameScreen.clientWidth - labda.offsetWidth) / 2;
        newTop = (GameScreen.clientHeight - labda.offsetHeight) / 2;
        Vx = 0;
        Vy = 0;
    }

    labda.style.top = newTop + "px";
    labda.style.left = newLeft + "px";
}

setup();
setInterval(() => {
  if (InGame) {
    movPlayer();
    movBall();
  }
}, 10000 / gameSpeed);
//sebesség, randomizalas

/*
addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") InGame = !InGame;
    if (!InGame) return;
    if (e.key === "w") up(uto1)
    if (e.key === "s") down(uto1)
    if (e.key === "ArrowUp") up(uto2)
    if (e.key === "ArrowDown") down(uto2)
}, true);



function movBall(){
    if (Vx === 0)
        Vx = Math.floor((Math.random()-0.5) * ballSpeed);
    if (Vy === 0)
        Vy = Math.floor((Math.random()-0.5) * ballSpeed);

    let newTop = ((parseInt(getComputedStyle(labda).top) || 0) + Vy);
    let newLeft = ((parseInt(getComputedStyle(labda).left) || 0) + Vx);
    const maxTop = GameScreen.clientHeight;
    const maxLeft = GameScreen.clientWidth - labda.offsetWidth;

    if (newTop - labda.offsetHeight < 0){
        Vy = 0;
        newTop = labda.offsetHeight;
    }else if (newTop - labda.offsetHeight > maxTop){
        Vy = 0;
        newTop = maxTop;
    }else if (newLeft < 0){
        Vx = 0;
        scoreb++;
        newLeft = 0;
    }else if (newLeft + labda.offsetHeight > maxLeft){
        Vx = 0;
        scorer++;
        newLeft = maxLeft;
    }

    labda.style.top = newTop + "px";
    labda.style.left = newLeft + "px";

    console.log("ball moved at: " + Vx + ", " + Vy);
}

*/
