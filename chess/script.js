const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");
//should make a save board button, and a load one
let turn = true;//true = white; false = black
let cpiece = {piece: null, y: null, x: null};

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
    board[y][x].moved = true;
    if (y === 7 && cpiece.piece.charAt(1) === "p")
        userChosePieceForPawn(x, y);
    turn = !turn;
    setNotReachable();
    render();
}

function isWhite(y, x) {
    return board[y][x].piece?.charAt(0) === "w";
}

function isWhitePiece(piece) {
    return piece?.charAt(0) === "w";
}

function manageClick(cell, piece, x, y){
    console.log("selected " + piece, x, y, cell);
    if (!turn && isWhitePiece(piece))
        return;
    if (turn && !isWhitePiece(piece))
        return;
    setNotReachable();
    cpiece.piece = piece;
    cpiece.x = x;
    cpiece.y = y;
    switch (piece) {
        case "wp":
        case "bp":
            movep(x, y);
            break;
        case "wr":
        case "br":
            mover(x, y);
            break;
        default:
            return;
    }
    renderBoard();
}

function userChosePieceForPawn(x, y){
    
}

function render(){
    renderBoard();
    if (turn)
        turnElement.style.backgroundColor = "#ffffff";
    else
        turnElement.style.backgroundColor = "#000000";
}

render();


function movep(x, y){
    let co = isWhite(y, x);
    let dir = co ? -1 :  1;

    if (board[y + dir][x].piece === null){
        if (!board[y][x].moved && board[y + dir * 2][x].piece === null)
            board[y + dir * 2][x].reachable = true;
        board[y + dir][x].reachable = true;
    }
    if (x > 0 && board[y+dir][x-1].piece != null && co != isWhite(y+dir, x-1))
        board[y+dir][x-1].reachable = true;
    if (x < 7 && board[y+dir][x+1].piece != null && co != isWhite(y+dir, x+1))
        board[y+dir][x+1].reachable = true;
}

function mover(x, y){
    let co = isWhite(y, x);

    for (let xi = x + 1; xi < 8; xi++) {//the same code 4x
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            if (co != isWhite(y, xi))
                board[y][xi].reachable = true;
            break;
        }
    }
    for (let xi = x - 1; xi >= 0; xi--) {
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            if (co != isWhite(y, xi))
                board[y][xi].reachable = true;
            break;
        }
    }
    for (let yi = y + 1; yi < 8; yi++) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            if (co != isWhite(yi, x))
                board[yi][x].reachable = true;
            break;
        }
    }
    for (let yi = y - 1; yi >= 0; yi--) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            if (co != isWhite(yi, x))
                board[yi][x].reachable = true;
            break;
        }
    }
}