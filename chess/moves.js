export {moveb, movep, moveq, mover, movek, moven};
import {board, turn} from "./script.js";

function logCount(){
    console.log(board.flat().filter(c => c.reachable).length);
}

function isWhite(y, x) {
    return board[y][x].piece?.charAt(0) === "w";
}

function isAvailable(y, x, y1, x1){
    return board[y][x].piece === null || isWhite(y, x) != isWhite(y1, x1);
}

function movep(x, y){
    let co = isWhite(y, x);
    let dir = co ? -1 :  1;

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

function mover(x, y){
    let co = isWhite(y, x);

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

function moveb(x, y){
    let co = isWhite(y, x);

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

function moveq(x, y){
    console.log("queen should move");
    moveb(x, y);
    console.log("moveb");
    mover(x, y);
    console.log("mover");
}

function movek(x, y){
    let co = isWhite(y, x);

    const dirs = [
    [-1,-1], [-1,0], [-1,1],
    [ 0,-1],         [ 0,1],
    [ 1,-1], [ 1,0], [ 1,1]
    ];

    function isKing(y, x) {
        if (y < 0 || y > 7 || x < 0 || x > 7)
            return false;

        const piece = board[y][x].piece;

        return piece &&
           piece.charAt(1) === "k" &&
           (piece.charAt(0) === "w") !== co;
    }

    function kingAround(yy, xx){
        return isKing(yy, xx) ||
            isKing(yy + 1, xx) ||
            isKing(yy - 1, xx) ||
            isKing(yy, xx + 1) ||
            isKing(yy, xx - 1) ||
            isKing(yy - 1, xx - 1) ||
            isKing(yy + 1, xx + 1) ||
            isKing(yy + 1, xx - 1) ||
            isKing(yy - 1, xx + 1);
    }

    for (const [dy, dx] of dirs) {
        const ny = y + dy;
        const nx = x + dx;

        if (ny >= 0 && ny < 8 &&
          nx >= 0 && nx < 8 &&
          isAvailable(ny, nx, y, x) &&
          !kingAround(ny, nx))
            board[ny][nx].reachable = true;
    }
}

function moven(x, y){
    let co = isWhite(y, x);

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