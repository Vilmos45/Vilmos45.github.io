export {movePiece, movek, movType, resetmovTpe};
import {board, isWhite} from "./script.js";
import { isInDanger } from "./attacks.js";

let movType = 0;

function resetmovTpe(){
    movType = 0;
}

function isAvailable(y: number, x: number, y1: number, x1: number){
    return board[y][x].piece === null || isWhite(y, x) != isWhite(y1, x1);
}

function movePiece(p: any, y: number, x: number){
    switch (p.charAt(1)) {
        case "p":
            movep(y, x);
            break;
        case "n":
            moven(y, x);
            break;
        case "b":
            moveb(y, x);
            break;
        case "r":
            mover(y, x);
            break;
        case "q":
            moveq(y, x);
            break;
        case "k":
            movek(y, x);
            break;
        default:
            return;
    }
}

function movep(y: number, x: number){
    let dir = isWhite(y, x) ? -1 :  1;

    if (board[y + dir][x].piece === null){
        if (!board[y][x].moved && board[y + dir * 2][x].piece === null)
            board[y + dir * 2][x].reachable = true;
        board[y + dir][x].reachable = true;
    }
    if (x > 0 && board[y+dir][x-1].piece != null && isAvailable(y+dir, x-1, y, x))
        board[y+dir][x-1].reachable = true;
    if (x < 7 && board[y+dir][x+1].piece != null && isAvailable(y+dir, x+1, y, x))
        board[y+dir][x+1].reachable = true;
}

function mover(y: number, x: number){
    for (let xi = x + 1; xi < 8; xi++) {//the same code 4x
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            if (isAvailable(y, xi, y, x))
                board[y][xi].reachable = true;
            break;
        }
    }
    for (let xi = x - 1; xi >= 0; xi--) {
        if (board[y][xi].piece === null)
            board[y][xi].reachable = true;
        else{
            if (isAvailable(y, xi, y, x))
                board[y][xi].reachable = true;
            break;
        }
    }
    for (let yi = y + 1; yi < 8; yi++) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            if (isAvailable(yi, x, y, x))
                board[yi][x].reachable = true;
            break;
        }
    }
    for (let yi = y - 1; yi >= 0; yi--) {
        if (board[yi][x].piece === null)
            board[yi][x].reachable = true;
        else{
            if (isAvailable(yi, x, y, x))
                board[yi][x].reachable = true;
            break;
        }
    }
}

function moveb(y: number, x: number){
    let yi = y + 1;
    for (let xi = x + 1; xi < 8; xi++) {//the same code 4x
        if (yi >= 8)
            break;
        if (board[yi][xi].piece === null)
            board[yi][xi].reachable = true;
        else{
            if (isAvailable(yi, xi, y, x))
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
            if (isAvailable(yi, xi, y, x))
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
            if (isAvailable(yi, xi, y, x))
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
            if (isAvailable(yi, xi, y, x))
                board[yi][xi].reachable = true;
            break;
        }
        yi--;
    }
}

function moveq(y: number, x: number){
    moveb(y, x);
    mover(y, x);
}

function movek(y: number, x: number){
    let co = isWhite(y, x);
    const dirs = [
    [-1,-1], [-1,0], [-1,1],
    [ 0,-1],         [ 0,1],
    [ 1,-1], [ 1,0], [ 1,1]
    ];

    let available = [
        false, false, false,
        false,        false,
        false, false, false
    ]

    function isKing(y: number, x: number, co: boolean) {
        if (y < 0 || y > 7 || x < 0 || x > 7)
            return false;

        const piece = board[y][x].piece;

        return piece &&
           piece.charAt(1) === "k" &&
           (piece.charAt(0) === "w") !== co;
    }

    function kingAround(yy: number, xx: number, co:boolean){
        return isKing(yy, xx, co) ||
            isKing(yy + 1, xx, co) ||
            isKing(yy - 1, xx, co) ||
            isKing(yy, xx + 1, co) ||
            isKing(yy, xx - 1, co) ||
            isKing(yy - 1, xx - 1, co) ||
            isKing(yy + 1, xx + 1, co) ||
            isKing(yy + 1, xx - 1, co) ||
            isKing(yy - 1, xx + 1, co);
    }
    let i = 0;
    for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;

        if (ny >= 0 && ny < 8 &&
          nx >= 0 && nx < 8 &&
          isAvailable(ny, nx, y, x) && co != undefined &&
          !kingAround(ny, nx, co) && !isInDanger(ny, nx, co)){
            available[i] = true;
            i++;
        }
        else{
             available[i] = false;
        }
    }
    i = 0;
    for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;
        if (ny >= 0 && ny < 8 &&
          nx >= 0 && nx < 8)
            board[ny][nx].reachable = available[i];
        i++;
    }
    if(board[y][x].moved === false)
    {
        if (co){
            if (!board[7][0].moved && board[7][1].piece === null && board[7][2].piece === null && board[7][3].piece === null){
                board[7][1].reachable = true;
                movType = 1;
            }
            if (!board[7][7].moved && board[7][6].piece === null && board[7][5].piece === null){
                board[7][5].reachable = true;
                movType = 1;
            }
        }
        else{
            if (!board[0][0].moved && board[0][1].piece === null && board[0][2].piece === null && board[0][3].piece === null)
                board[0][1].reachable = true;
            if (!board[0][7].moved && board[0][6].piece === null && board[0][5].piece === null)
                board[0][5].reachable = true;
        }
    }
}

function moven(y: number, x: number){
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
          nx >= 0 && nx < 8 &&
          isAvailable(ny, nx, y, x))
            board[ny][nx].reachable = true;
    }
}

console.info("moves.js loaded!");