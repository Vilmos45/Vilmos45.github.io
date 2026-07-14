export {addEventListeners};

function addEventListeners(){
    if (navigator.maxTouchPoints === 0) return;
document.getElementById("p1up").addEventListener("touchstart", e=>{
    e.preventDefault();
    rw = false;
});
document.getElementById("p1up").addEventListener("touchend", ()=>{
    e.preventDefault();
    rw = true;
});

document.getElementById("p1down").addEventListener("touchstart", e=>{
    e.preventDefault();
    rs = false;
});
document.getElementById("p1down").addEventListener("touchend", ()=>{
    e.preventDefault();
    rs = true;
});

document.getElementById("p2up").addEventListener("touchstart", e=>{
    e.preventDefault();
    ru = false;
});
document.getElementById("p2up").addEventListener("touchend", ()=>{
    e.preventDefault();
    ru = true;
});

document.getElementById("p2down").addEventListener("touchstart", e=>{
    e.preventDefault();
    rd = false;
});
document.getElementById("p2down").addEventListener("touchend", ()=>{
    e.preventDefault();
    rd = true;
});
}