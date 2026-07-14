import {movePiece} from "./moves.js";
import {isKingAttacked, attackPiece, isInDanger} from "./attacks.js";
export {board, turn, isWhite, setNotReachable, render, setTurn};

window.chosedfp = chosedfp;

const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");

const pfpawn = document.getElementsByClassName("pfpawn");

const wcap = document.getElementById("wcap");
const bcap = document.getElementById("bcap");
//should make a save board button, and a load one
let turn = true;//true = white; false = black
let cpiece = {piece: null, y: null, x: null};
let chosedPiecefp;

const board = [
    [{piece: "br", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bq", reachable: false, moved: false},{piece: "bk", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "br", reachable: false, moved: false}],
    [{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false}],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null}],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null}],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null}],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null}],
    [{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false}],
    [{piece: "wr", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wq", reachable: false, moved: false},{piece: "wk", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wr", reachable: false, moved: false}]
];
//piece, reachable, moved

const pieceNames = {
    wp: "white_pawn",
    wr: "white_rook",
    wn: "white_knight",
    wb: "white_bishop",
    wq: "white_queen",
    wk: "white_king",

    bp: "black_pawn",
    br: "black_rook",
    bn: "black_knight",
    bb: "black_bishop",
    bq: "black_queen",
    bk: "black_king"
};

const cba = [
    "H", "G", "F", "E", "D", "C", "B", "A"
]

function setTurn(value) {
    turn = value;
}

function isWhitePiece(piece) {
    return piece?.charAt(0) === "w";
}

function isWhite(y, x) {
    return board[y][x].piece?.charAt(0) === "w";
}

window.addEventListener("DOMContentLoaded", () => {
    render();
});

function renderBoard() {
    boardElement.innerHTML = "";

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if ((x + y) % 2)
                cell.classList.add("black");

            cell.dataset.x = x;
            cell.dataset.y = y;

            const piece = (board[y][x].piece === null) ? false : board[y][x].piece;

            if (piece) {
                const img = document.createElement("img");
                img.src = `src/pieces/${pieceNames[piece]}.png`;
                img.alt = piece;

                cell.appendChild(img);

                if (cpiece && cpiece.x === x && cpiece.y === y)
                    cell.classList.add("selected");

                cell.addEventListener("click", () => manageClick(cell, piece, x, y));
            }
            if (board[y][x].reachable === true){
                cell.classList.add("reachable");
                cell.addEventListener("click", () => mgReachableCell(x, y));
            }
            boardElement.appendChild(cell);
        }
    }
}

function render(){
    if (boardElement === null || turnElement === null) return;
    renderBoard();
    if (turn)
        turnElement.style.backgroundColor = "#ffffff";
    else
        turnElement.style.backgroundColor = "#000000";
    turnElement.style.borderColor = (turn) ? "black" : "white";
}

function setNotReachable(){
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            board[y][x].reachable = false;
        }
    }
}

function listdisplay(list, ev){
    for (let i = 0; i < list.length; i++) {
        list[i].style.display = ev;
    }
}

function choosePawn() {
    listdisplay(pfpawn, "flex");

    return new Promise(resolve => {
        chosedPiecefp = resolve;
    });
}

function chosedfp(c) {
    console.log("choosed: " + c + " for pawn");
    listdisplay(pfpawn, "none");
    chosedPiecefp(c);
}

function rmFromBoard(y, x){
    const img = document.createElement("img");
    img.src = `src/pieces/${pieceNames[board[y][x].piece]}.png`;
    img.alt = board[y][x].piece;
    if (isWhite(y, x))
        wcap.appendChild(img);
    else
        bcap.appendChild(img);
}

async function mgReachableCell(x, y){
    board[cpiece.y][cpiece.x].piece = null;

    console.log(cpiece.piece+": "+(cba[7-cpiece.x])+", "+(8-cpiece.y)+" -> "+(cba[7-x])+", "+(8-y));
    if (board[y][x].piece != null){
        console.log("X: " + board[y][x].piece);
        rmFromBoard(y, x);
    }

    board[y][x].piece = cpiece.piece;
    board[y][x].moved = true;

    if (cpiece.piece.charAt(1) === "p" && ((isWhitePiece(cpiece.piece) && y === 0) || (!isWhitePiece(cpiece.piece) && y === 7))){
        listdisplay(pfpawn, "block");
        const piece = await choosePawn();
        board[y][x].piece = cpiece.piece.charAt(0) + piece;
    }
    if (y === 7 && cpiece.piece.charAt(1) === "p")
        userChosePieceForPawn(x, y);
    turn = !turn;
    setNotReachable();
    isCheckmate();
    render();
}

function isCheckmate(){
    let is = isKingAttacked(turn);
    if (is[0]){
        turnElement.style.borderColor = "red";
        movek(is[2], is[1]);
        if (board.flat().filter(c => c.reachable).length === 0 &&
            isInDanger(cpiece.y, cpiece.x, isWhitePiece(cpiece.piece))){
            alert("Checkmate!\n" + turn ? "black won" : "white won");
            localStorage.removeItem("board");
        }
        setNotReachable();
    }
}

function manageClick(cell, piece, x, y){
    //console.info("selected: " + piece, x, y, cell);
    if (piece === null || !turn && isWhitePiece(piece) || turn && !isWhitePiece(piece))
        return;
    setNotReachable();
    cpiece.piece = piece;
    cpiece.x = x;
    cpiece.y = y;
    movePiece(piece, x, y);
    renderBoard();
}

console.info("script.js loaded!");

render();