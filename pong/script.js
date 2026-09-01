let sensitivity = 20; //20 by default
let ballSpeed = 25;   //25 by default
let gameSpeed = 270;  //270 by default (lower values, makes the game slower)
let maxScore = 10; //10 by default
let maxTime = -1; //-1 by default, means unlimited
let aiSpeed = 3.75; //3.25 by default (lower values, makes the ai faster)
let ai = false; //true for single player, false by def

/*--- Please do NOT modify anything below this line ---*/
const scoreDiv = document.getElementById("score");
const labda = document.getElementById("labda");
const uto1 = document.getElementById("uto1");
const uto2 = document.getElementById("uto2");
const GameScreen = document.getElementById("game_screen");

//document.getElementById("felezovonal").style.left = GameScreen.clientWidth - document.getElementById("felezovonal").offsetWidth + "px";
//document.getElementById("felezovonal").style.top = GameScreen.clientHeight + "px";

let scoreb = 0;
let scorer = 0;
let InGame = true;
let Vx = 0;
let Vy = 0;

let rw = true;
let rs = true;
let ru = true;
let rd = true;

function getSettings(){
    if (localStorage.getItem("singlep") === "true")
        ai = true;

    let tmp = localStorage.getItem("sens");
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        sensitivity = tmp;

    tmp = parseInt(localStorage.getItem("bspeed"));
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        ballSpeed = tmp;

    tmp = parseInt(localStorage.getItem("gspeed"));
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        gameSpeed = tmp;

    tmp = parseInt(localStorage.getItem("mscore"));
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        maxScore = tmp;

    tmp = parseInt(localStorage.getItem("mtime"));
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        maxTime = tmp;

    tmp = localStorage.getItem("ai");
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        ai = tmp;

    tmp = parseInt(localStorage.getItem("aispeed"));
    if (!Number.isNaN(tmp) && Number.isInteger(tmp))
        aiSpeed = tmp;
}

function mobileSetup(){
    if (navigator.maxTouchPoints === 0) return;

    sensitivity = sensitivity/3;
    ballSpeed = ballSpeed/4;
    aiSpeed = aiSpeed;

    if (!ai){
        document.getElementById("p1up").addEventListener("touchstart", e=>{
            e.preventDefault();
            rw = false;
        });
        document.getElementById("p1up").addEventListener("touchend", e=>{
            e.preventDefault();
            rw = true;
        });

        document.getElementById("p1down").addEventListener("touchstart", e=>{
            e.preventDefault();
            rs = false;
        });
        document.getElementById("p1down").addEventListener("touchend", e=>{
            e.preventDefault();
            rs = true;
        });
    }else{
        document.getElementById("p1up").style.display = "none";
        document.getElementById("p1down").style.display = "none";
    }

    document.getElementById("p2up").addEventListener("touchstart", e=>{
        e.preventDefault();
        ru = false;
    });
    document.getElementById("p2up").addEventListener("touchend", e=>{
        e.preventDefault();
        ru = true;
    });

    document.getElementById("p2down").addEventListener("touchstart", e=>{
        e.preventDefault();
        rd = false;
    });
    document.getElementById("p2down").addEventListener("touchend", e=>{
        e.preventDefault();
        rd = true;
    });

    document.getElementById("play").addEventListener("touchend", e => {
        e.preventDefault();
        InGame = !InGame;
    });
}

function setup(){
    InGame = false;
    getSettings();

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
    console.log("|---------Settings---------|\nsensitivity: " + sensitivity + "\nball speed: " + ballSpeed + "\ngame speed: " + gameSpeed + "\nmax score: " + maxScore + "\nmax time: " + maxTime+ "\nai: " + ai + "\nai speed: " + aiSpeed + "\n|--------------------------|");
    mobileSetup();
    setTimer();
    console.log("Game set!");
}

function keyDownHandler(e) {
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") InGame = !InGame;
    if (!InGame) return;
    switch (e.key){
        case "w":
            if (!ai)
                rw = false;
            break;
        case "ArrowUp":
            ru = false;
            break;
        case "s":
            if (!ai)
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
            if (!ai)
                rw = true;
            break;
        case "ArrowUp":
            ru = true;
            break;
        case "s":
            if (!ai)
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
            console.log("Red won: " + scoreb + ":" + scorer);
            if (ai)
                sendAlert("You won!\n" + scoreb + ":" + scorer);
            else
                sendAlert("!!!Red won!!!\n" + scoreb + ":" + scorer);
            setup();
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
            console.log("Blue won: " + scoreb + ":" + scorer);
            if (ai)
                sendAlert("You lost\n" + scoreb + ":" + scorer);
            else
                sendAlert("!!!Red won!!!\n" + scoreb + ":" + scorer);
            setup();
        }
        newLeft = (GameScreen.clientWidth - labda.offsetWidth) / 2;
        newTop = (GameScreen.clientHeight - labda.offsetHeight) / 2;
        Vx = 0;
        Vy = 0;
    }

    labda.style.top = newTop + "px";
    labda.style.left = newLeft + "px";
}

function getKozep(elem) {
    return parseInt(getComputedStyle(elem).top) + elem.offsetHeight / 2;
}

function movUto1ai() {
    let labdaKozep = getKozep(labda);
    if (labdaKozep >= GameScreen.clientWidth/2) return;

    let newTop = parseInt(getComputedStyle(uto1).top);
    let utoKozep = getKozep(uto1);

    if (labdaKozep + uto1.offsetHeight/4 > utoKozep) {
        newTop += sensitivity/aiSpeed;
    } else if (labdaKozep - uto1.offsetHeight/4< utoKozep) {
        newTop -= sensitivity/aiSpeed;
    }

    if (newTop < 0) newTop = 0;
    let maxTop = GameScreen.clientHeight - uto1.offsetHeight;
    if (newTop > maxTop) newTop = maxTop;

    uto1.style.top = newTop + "px";
}

function setTimer(){
    if (maxTime <= 0) return;
    maxTime = maxTime * 2;
    let elapsed = 0;

    const timer = setInterval(() => {
        if (!InGame) return;

        elapsed += 500;
        if(elapsed < maxTime * 1000) return;
        clearInterval(timer);

        if (scoreb > scorer)
        {
            console.log("Blue won: " + scoreb + ":" + scorer);
            if (ai)
                sendAlert("You lost\n" + scoreb + ":" + scorer);
            else
                sendAlert("!!!Red won!!!\n" + scoreb + ":" + scorer);
            setup();
            return;
        } else if (scorer > scoreb)
        {
            console.log("Red won: " + scoreb + ":" + scorer);
            if (ai)
                sendAlert("You won!\n" + scoreb + ":" + scorer);
            else
                sendAlert("!!!Red won!!!\n" + scoreb + ":" + scorer);
            setup();
            return;
        } else{
            console.log("Tie: " + scoreb + ":" + scorer);
            sendAlert("Tie!\n" + scoreb + ":" + scorer);
            setup();
            return;
        }
    }, maxTime*500);
}

document.addEventListener("keydown", keyDownHandler, true);
document.addEventListener("keyup", keyUpHandler, true);
setup();

if (ai){
    setInterval(() => {
        if (InGame) {
            movPlayer();
            movUto1ai();
            movBall();
        }
    }, 10000 / gameSpeed);
}else{
    setInterval(() => {
    if (InGame) {
        movPlayer();
        movBall();
    }
    }, 10000 / gameSpeed);
}
//sebesség, randomizalas