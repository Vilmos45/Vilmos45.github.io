let score = 0, speed = 1, laneh = 0, nexts = 50, mainl = document.getElementById("gameScreen").clientWidth/18 * 7.9, carNum = 0, inGame = false;
const gameScreen = document.getElementById("gameScreen"), hscoreE = document.getElementById("hscore"), scoreElement = document.getElementById("score"), mainCar = addCar("main");
if (localStorage.getItem("maxScore") === null) localStorage.setItem("maxScore", "0");
mainCar.style.top = (gameScreen.clientHeight/10) * 7.5 + "px";
mainCar.style.left = mainl + "px";
hscoreE.textContent = localStorage.getItem("maxScore");
for (let i = 1; i < 5; i++) document.getElementById("sep" + i).style.left = i + "0vw";
document.querySelectorAll("*:is(div, img, p)").forEach(e => e.style.position = "absolute");
document.addEventListener("keydown", (e) =>{
        if (inGame && (e.key.toLowerCase() === "d" || e.key === "ArrowRight") && mainl < gameScreen.clientWidth - gameScreen.clientWidth / 5) mainl += gameScreen.clientWidth / 5;
        else if (inGame && (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") && mainl > gameScreen.clientWidth/5) mainl -= gameScreen.clientWidth / 5;
        else if (e.key === " ") inGame = !inGame;
        else if (e.key === "Enter") window.location.reload();
        mainCar.style.left = mainl + "px";
});
setInterval(() => {
    if (!inGame) return;
    scroll();
    score += speed/10; //0.02-> 1/sec
    scoreElement.textContent = Math.floor(score);
    if (parseInt(localStorage.getItem("maxScore")) < score) {localStorage.setItem("maxScore", Math.floor(score))
        hscoreE.textContent = Math.floor(score);
    }
    if (carNum < 8 && Math.random() > 0.995) addCar("car" + carNum++);
    if (score >= nexts) speed += 0.3, nexts += 50;
}, 20);
function scroll(){
    laneh = (laneh > 0) ? -218 : laneh + speed*2;
    for (let i = 1; i < 5; i++) document.getElementById("sep" + i).style.top = laneh + "px";
    document.querySelectorAll("#gameScreen img:not(#main)").forEach(e => {
        e.style.top = (parseFloat(e.style.top) + e.speed) + "px";
        if (parseInt(e.style.top) > gameScreen.clientHeight) {e.remove();
            return addCar(e.id);}
        if (hasCollided(mainCar.getBoundingClientRect(), e.getBoundingClientRect())) { alert("Your car has crashed!");
            inGame = false;
            window.location.reload();}
        document.querySelectorAll(`#gameScreen img:not(#${e.id}, #main)`).forEach(f => { if(e.style.left === f.style.left && parseFloat(f.style.top) > parseFloat(e.style.top)) [e.speed,f.speed] = [f.speed,e.speed];});
    });
}
function addCar(name){
    const img = document.createElement("img");
    img.style.top = "-20vh";
    img.src = `src/car${Math.floor(Math.random() * 5)}.png`;
    img.id = name;
    img.style.left = Math.floor(Math.random() * 5) * (gameScreen.clientWidth / 50 * 10.78) + "px";
    img.speed = speed * (0.5 + Math.random() * 0.5);
    gameScreen.appendChild(img);
    document.querySelectorAll(`#gameScreen img:not(#${name})`).forEach(e => { if (hasCollided(img.getBoundingClientRect(), e.getBoundingClientRect())){img.remove();
        return addCar(name);}});
    return img;
}
function hasCollided(a, b) {return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;}