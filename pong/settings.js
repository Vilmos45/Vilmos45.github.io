let sens = document.getElementById("sens");
let bspeed = document.getElementById("bspeed");
let gspeed = document.getElementById("gspeed");
let mscore = document.getElementById("mscore");
let mtime = document.getElementById("mtime");
let ai = document.getElementById("ai");
let aiSpeed = document.getElementById("aispeed");

function saveSettings(){
    localStorage.clear();
    localStorage.setItem("sens", sens.textContent);
    localStorage.setItem("bspeed", bspeed.textContent);
    localStorage.setItem("gspeed", gspeed.textContent);
    localStorage.setItem("mscore", mscore.textContent);
    localStorage.setItem("mtime", mtime.textContent);
    localStorage.setItem("ai", ai.textContent);
    localStorage.setItem("aispeed", aiSpeed.textContent);
}


setInterval(() => {
    saveSettings();
    console.log("game saved");
    console.log(sens.textContent);
},1000);

/*
setItem(key, value) } 	Store data (string only)} 	localStorage.setItem('score', 100)}
getItem(key)} 	Retrieve data (returns null if not found)} 	let score = localStorage.getItem('score')}
removeItem(key)} 	Delete specific item} 	localStorage.removeItem('score')}
clear()} 	Delete all localStorage data} 	localStorage.clear()}
key(index)} 	Get key name by index} 	localStorage.key(0)} 
*/