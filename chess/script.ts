import {movePiece, movek, movType, resetmovTpe} from "./moves.js";
import {isKingAttacked, attackPiece, isInDanger} from "./attacks.js";
export {board, turn, isWhite, setNotReachable, render, setTurn, chosedfp};

const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");
const pfpawn = document.getElementsByClassName("pfpawn");
const wcap = document.getElementById("wcap");
const bcap = document.getElementById("bcap");

let turn: boolean = true;//true = white; false = black
let cpiece = {piece: "", y: -1, x: -1};
let chosedPiecefp: any;
let phase: number = 0;

const board = [
    [{piece: "br", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bq", reachable: false, moved: false},{piece: "bk", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "br", reachable: false, moved: false}],
    [{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true},{piece: null, reachable: false, moved: true}],
    [{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false},{piece: "wp", reachable: false, moved: false}],
    [{piece: "wr", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wq", reachable: false, moved: false},{piece: "wk", reachable: false, moved: false},{piece: "wb", reachable: false, moved: false},{piece: "wn", reachable: false, moved: false},{piece: "wr", reachable: false, moved: false}]
];

const pieceNames: any = {
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

const cells: any[] = [];

const cba = ["H", "G", "F", "E", "D", "C", "B", "A"];

function setTurn(value: boolean) {
    turn = value;
}

function isWhitePiece(piece: any) {
    return piece?.startsWith("w");
}

function isWhite(y: number, x: number) {
    return board[y][x].piece?.startsWith("w");
}

window.addEventListener("DOMContentLoaded", () => {
    render();
});

function createBoard(){
    if (boardElement === null) return;
    boardElement.innerHTML = "";

    for (let y = 0; y < 8; y++) {
            cells[y] = [];
        for (let x = 0; x < 8; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if ((x + y) % 2)
                cell.classList.add("black");

            cell.dataset.x = x.toString();
            cell.dataset.y = y.toString();
            cells[y][x] = cell;

            boardElement.appendChild(cell);
        }
    }
}

function renderBoard() {
    if (boardElement === null) return;
    boardElement.innerHTML = "";

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const cell = cells[y][x];

            cell.replaceChildren();

            cell.classList.remove("selected", "reachable");
            cell.removeEventListener("click", () => manageClick(piece, x, y));
            cell.removeEventListener("click", () => mgReachableCell(x, y));

            const piece = (board[y][x].piece === null) ? false : board[y][x].piece;

            if (piece) {
                const img = document.createElement("img");
                img.src = `src/pieces/${pieceNames[piece]}.png`;
                img.alt = piece;

                cell.appendChild(img);

                if (cpiece && cpiece.x === x && cpiece.y === y)
                    cell.classList.add("selected");

                cell.addEventListener("click", () => manageClick(piece, y, x));
            }
            if (board[y][x].reachable === true){
                cell.classList.add("reachable");
                cell.addEventListener("click", () => mgReachableCell(y, x));
            }
            boardElement.appendChild(cell);
        }
    }
}

function render(){
    if (turnElement === null) return;
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

function listdisplay(list: any, ev: string){
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

function chosedfp(c: any) {
    console.log("+: " + c);
    listdisplay(pfpawn, "none");
    chosedPiecefp(c);
}

function rmFromBoard(y: number, x: number){
    if (bcap === null || wcap === null || board[y][x].piece === null) return;
    const img = document.createElement("img");
    img.src = `src/pieces/${pieceNames[board[y][x].piece]}.png`;
    img.alt = board[y][x].piece;
    if (isWhite(y, x))
        wcap.appendChild(img);
    else
        bcap.appendChild(img);
}

async function mgReachableCell(y: number, x: number){
    if (cpiece.x === null || cpiece.y === null || cpiece.piece === null) return;
    board[cpiece.y][cpiece.x].piece = null;
    board[cpiece.y][cpiece.x].moved = true;

    console.log(cpiece.piece+": "+(cba[7-cpiece.x])+", "+(8-cpiece.y)+" -> "+(cba[7-x])+", "+(8-y));
    if (board[y][x].piece != null){
        console.log("X: " + board[y][x].piece);
        rmFromBoard(y, x);
    }

    board[y][x].piece = cpiece.piece;
    board[y][x].moved = true;

    if (cpiece.piece.charAt(1) === "p" && (turn && y === 7) || (!turn && y === 0)){
        listdisplay(pfpawn, "block");
        const piece = await choosePawn();
        board[y][x].piece = cpiece.piece.charAt(0) + piece;
    }

    if (movType === 1){
        resetmovTpe();
        if (cpiece.x === 2 && cpiece.y === 7){
            board[7][0].piece = null;
            board[7][3].piece = "wr";
        }
        if (cpiece.x === 6 && cpiece.y === 7){
            board[7][7].piece = null;
            board[7][5].piece = "wr";
        }
        if (cpiece.x === 2 && cpiece.y === 0){
            board[0][0].piece = null;
            board[0][3].piece = "br";
        }
        if (cpiece.x === 2 && cpiece.y === 0){
            board[0][7].piece = null;
            board[0][5].piece = "br";
        }
    }

    turn = !turn;
    setNotReachable();
    isCheckmate();
    /*cpiece.x = null;
    cpiece.y = null;
    cpiece.piece = null;*/
    phase = 0;
    render();
}

function isCheckmate(){
    let is = isKingAttacked(turn);
    if (is[0] && turnElement != null){
        turnElement.style.borderColor = "red";
        if (board.flat().filter(c => c.reachable).length === 0 &&
            isInDanger(cpiece.y, cpiece.x, isWhitePiece(cpiece.piece))){
            alert("Checkmate!\n" + turn ? "black won" : "white won");
            localStorage.removeItem("board");
        }
        setNotReachable();
    }
}

function manageClick(piece: any, y: number, x: number){
    const co = isWhitePiece(piece);
    if (piece === null || (!turn && co) || (turn && !co) || phase != 0) return;
    phase++;
    setNotReachable();
    cpiece.piece = piece;
    cpiece.x = x;
    cpiece.y = y;
    movePiece(piece, y, x);
    renderBoard();
}

console.info("script.js loaded!");
createBoard();
render();
