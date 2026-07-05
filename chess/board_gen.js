let board = document.getElementById("board");

function colorBoard() {
    let black = false;
    board.forEach(element => {
        if (black)
            //element.givecalss(black)
        black = !black;
    });
}