let sens = document.getElementById("sens");
let bspeed = document.getElementById("bspeed");
let gspeed = document.getElementById("gspeed");
let mscore = document.getElementById("mscore");
let mtime = document.getElementById("mtime");
let aispeed = document.getElementById("aispeed");
let singlep = document.getElementById("singlep");

main();
setInterval(() => {
    saveSettings();
}, 10000);

function main(){
    singlep.checked = "true";
    sens.defaultValue = "25";
    bspeed.defaultValue = "10";
    gspeed.defaultValue = "250";
    mscore.defaultValue = "5";
    mtime.defaultValue = "-1"; //time in seconds
    aispeed.defaultValue = "1.5";
}

function saveSettings(){

    localStorage.setItem("singlep", singlep.checked);

    localStorage.setItem("sens", sens.value.trim());
    localStorage.setItem("bspeed", bspeed.value.trim());
    localStorage.setItem("gspeed", gspeed.value.trim());
    localStorage.setItem("mscore", mscore.value.trim());
    localStorage.setItem("mtime", mtime.value.trim());
    aispeed.value = aispeed.value.trim().replace(",",".");
    localStorage.setItem("aispeed", aispeed.value);

    console.log("|---------Settings---------|\nsensitivity: " + sens.value + "\nball speed: " + bspeed.value + "\ngame speed: " + gspeed.value + "\nmax score: " + mscore.value + "\nmax time: " + mtime.value + "\nai speed: " + aispeed.value + "\nsingle player: " + singlep.checked + "\n|--------------------------|");
    console.info("Game saved");
}

/*
setItem(key, value) } 	Store data (string only)} 	localStorage.setItem('score', 100)}
getItem(key)} 	Retrieve data (returns null if not found)} 	let score = localStorage.getItem('score')}
removeItem(key)} 	Delete specific item} 	localStorage.removeItem('score')}
clear()} 	Delete all localStorage data} 	localStorage.clear()}
key(index)} 	Get key name by index} 	localStorage.key(0)}
*/