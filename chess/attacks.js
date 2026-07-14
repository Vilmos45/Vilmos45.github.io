export {isKingAttacked, attackPiece, isInDanger};
import {board, turn, isWhite, setNotReachable} from "./script.js";

console.info("attack.js loaded!");


function isKingAttacked(co){
    let y,x;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((co && board[i][j].piece === "wk") || (!co && board[i][j].piece === "bk"))
            {
                y = i;
                x = j;
            }
        }
    }
    return [isInDanger(y, x, co), y, x];
}

function isInDanger(y, x, co){
    let is = false;
    setNotReachable();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j].piece != null && isWhite(i, j) !== co &&  board[i][j].piece.charAt(1) !== "k")
                attackPiece(board[i][j].piece, j, i);
        }
    }
    if (board[y][x].reachable)
        is = true;
    setNotReachable();
    return is;
}

function attackPiece(p, x, y){
    if (p === null) return;
    switch (p.charAt(1)) {
        case "p":
            attackp(x, y);
            break;
        case "n":
            attackn(x, y);
            break;
        case "b":
            attackb(x, y);
            break;
        case "r":
            attackr(x, y);
            break;
        case "q":
            attackq(x, y);
            break;
        case "k":
            attackk(x, y);
            break;
        default:
            return;
    }
}

function attackp (x, y){
    let co = isWhite(y, x);
    let dir = co ? -1 :  1;
    if (y + dir >= 0 && y + dir < 8) {
        if (x > 0)
            board[y + dir][x - 1].reachable = true;
        if (x < 7)
            board[y + dir][x + 1].reachable = true;
    }
}

function attackr(x, y){
    for (let xi = x + 1; xi < 8; xi++) {//the same code 4x
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            board[y][xi].reachable = true;
            break;
        }
    }
    for (let xi = x - 1; xi >= 0; xi--) {
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            board[y][xi].reachable = true;
            break;
        }
    }
    for (let yi = y + 1; yi < 8; yi++) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            board[yi][x].reachable = true;
            break;
        }
    }
    for (let yi = y - 1; yi >= 0; yi--) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            board[yi][x].reachable = true;
            break;
        }
    }
}

function attackb(x, y){
    let yi = y + 1;
    for (let xi = x + 1; xi < 8; xi++) {//the same code 4x
        if (yi >= 8)
            break;
        if (board[yi][xi].piece === null)
            board[yi][xi].reachable = true;
        else{
            board[yi][xi].reachable = true;
            break;
        }
        yi++;
    }
    yi = y - 1;
    for (let xi = x - 1; xi >= 0; xi--) {
        if (yi < 0)
            break;
        if (board[yi][xi].piece === null)
            board[yi][xi].reachable = true;
        else{
            board[yi][xi].reachable = true;
            break;
        }
        yi--;
    }
    yi = y + 1;
    for (let xi = x - 1; xi >= 0; xi--) {
        if (yi >= 8)
            break;
        if (board[yi][xi].piece === null)
            board[yi][xi].reachable = true;
        else{
            board[yi][xi].reachable = true;
            break;
        }
        yi++;
    }
    yi = y - 1;
    for (let xi = x + 1; xi < 8; xi++) {
        if (yi < 0)
            break;
        if (board[yi][xi].piece === null)
            board[yi][xi].reachable = true;
        else{
            board[yi][xi].reachable = true;
            break;
        }
        yi--;
    }
}

function attackq(x, y){
    attackb(x, y);
    attackr(x, y);
}

function attackk(x, y){
    const dirs = [
    [-1,-1], [-1,0], [-1,1],
    [ 0,-1],         [ 0,1],
    [ 1,-1], [ 1,0], [ 1,1]
    ];

    for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;

        if (ny >= 0 && ny < 8 &&
          nx >= 0 && nx < 8)
            board[ny][nx].reachable = true;
    }
}

function attackn(x, y){
    const dirs = [
           [-2,-1],         [-2,1],
    [-1,-2],                      [-1,2],
                 /*  */
    [1,-2],                       [1,2],
          [2,-1],           [2,1]
    ];

    for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;

        if (ny >= 0 && ny < 8 &&
          nx >= 0 && nx < 8)
            board[ny][nx].reachable = true;
    }
}