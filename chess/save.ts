import {board, render, turn, setTurn, setNotReachable, chosedfp} from "./script.js";

declare global {
    interface Window {
        saveGame: any,
        continueGame: any,
        chosedfp: any;
    }
}

window.saveGame = saveGame;
window.continueGame = continueGame;
window.chosedfp = chosedfp;

const boardDef = [
    [{piece: "br", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bq", reachable: false, moved: false},{piece: "bk", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "br", reachable: false, moved: false}],
    [{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false}],
    [{piece: "wr", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wq", reachable: false, moved: false},{piece: "wk", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wr", reachable: false, moved: false}]
];

function continueGame() {
    if (localStorage.getItem("board")) {
        sessionStorage.setItem("action", "load");
    } else {
        alert("There's no saved game to load.");
        console.warn("No saved game to load");
    }
    location.href = "game.html";
}

function resetGame(){
    localStorage.setItem("board", JSON.stringify(boardDef));
    sessionStorage.setItem("action", "new");
    console.info("Game reseted");
    location.href = "game.html";
}

function saveGame(){
    setNotReachable();
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("turn", turn.toString());
    console.info("Game saved");
}

function loadGame() {
    const data = localStorage.getItem("board");
    if (!data) {
        return false;
    }

    const loaded = JSON.parse(data);

    board.length = 0;
    board.push(...loaded);

    setTurn(localStorage.getItem("turn") === "true");
    console.info("Game loaded");
    return true;
}


console.info("save.js loaded!");
if (document.getElementById("board")!== null){
    const action = sessionStorage.getItem("action");
    if (action === "new") {
        board.length = 0;
        board.push(...structuredClone(boardDef));
        setTurn(true);
        saveGame();
    }
    else {
        loadGame();
    }
    sessionStorage.removeItem("action");
    render();
}

document.getElementById("play")?.addEventListener("click", resetGame);
document.getElementById("load")?.addEventListener("click", loadGame);

if (document.getElementById("board") !== null){
    setInterval(() => {
        saveGame();
    }, 50000);
}