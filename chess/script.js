const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");
//should make a save board button, and a load one
let turn = true;//true = white; false = black
let cpiece = {piece: null, y: null, x: null};

const board = [
    [{piece: "br", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bq", reachable: false, moved: false},{piece: "bk", reachable: false, moved: false},{piece: "bb", reachable: false, moved: false},{piece: "bn", reachable: false, moved: false},{piece: "br", reachable: false, moved: false}],
    [{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false},{piece: "bp", reachable: false, moved: false}],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},[null, false, null]],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},[null, false, null]],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},[null, false, null]],
    [{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},{piece: null, reachable: false, moved: null},[null, false, null]],
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

function setNotReachable(){
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            board[y][x].reachable = false;
        }
    }
}

function mgReachableCell(x, y){
    board[cpiece.y][cpiece.x].piece = null;
    board[y][x].piece = cpiece.piece;
    //cpiece = null;
    turn = !turn;
    setNotReachable();
    render();
}

function manageClick(cell, piece, x, y){
    console.log("selected " + piece, x, y, cell);
    cpiece.piece = piece;
    cpiece.x = x;
    cpiece.y = y;
    cell.classList.add("selected");
    if (turn){
        switch (piece) {
            case "wp":
                if (board[y][x].moved === false)
                    board[y - 2][x].reachable = true;
                board[y - 1][x].reachable = true;
                break;
            default:
                break;
        }
    } else {
        switch (piece) {
            case "bp":
                if (!board[y][x].moved)
                    board[y + 2][x].reachable = true;
                board[y + 1][x].reachable = true;
                break;
            default:
                break;
        }
    }
    renderBoard();
}

function render(){
    renderBoard();
    if (turn)
        turnElement.style.backgroundColor = "#ffffff";
    else
        turnElement.style.backgroundColor = "#000000";
}

render();
