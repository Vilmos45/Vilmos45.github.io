export {isKingAttacked, attackPiece, isInDanger};
import {board, isWhite, setNotReachable} from "./script.js";

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

function attackPiece(p, y, x){
    if (p === null) return;
    switch (p.charAt(1)) {
        case "p":
            attackp(y, x);
            break;
        case "n":
            attackn(y, x);
            break;
        case "b":
            attackb(y, x);
            break;
        case "r":
            attackr(y, x);
            break;
        case "q":
            attackq(y, x);
            break;
        case "k":
            attackk(y, x);
            break;
        default:
            return;
    }
}

function attackp (y, x){
    let dir = isWhite(y, x) ? -1 :  1;
    if (y + dir >= 0 && y + dir < 8) {
        if (x > 0)
            board[y + dir][x - 1].reachable = true;
        if (x < 7)
            board[y + dir][x + 1].reachable = true;
    }
}

function attackr(y, x){
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

function attackb(y, x){
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

function attackq(y, x){
    attackb(y, x);
    attackr(y, x);
}

function attackk(y, x){
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

function attackn(y, x){
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


console.info("attack.js loaded!");