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
    singlep.defaultValue = "checked";
    sens.defaultValue = "20";
    bspeed.defaultValue = "8";   
    gspeed.defaultValue = "270";  
    mscore.defaultValue = "10"; 
    mtime.defaultValue = "-1";
    aispeed.defaultValue = "3.25";
}

function saveSettings(){
    localStorage.setItem("singlep", singlep.value); //checked/interminate/""
    console.log(singlep.value);
    
    localStorage.clear();
    localStorage.setItem("sens", sens.value);
    localStorage.setItem("bspeed", bspeed);
    localStorage.setItem("gspeed", gspeed.value);
    localStorage.setItem("mscore", mscore.value);
    localStorage.setItem("mtime", mtime.value);
    aispeed.value = aispeed.value.replace(",",".");
    localStorage.setItem("aispeed", aispeed.value);

    console.log("|---------Settings---------|\nsensitivity: " + sens.value + "\nball speed: " + bspeed.value + "\ngame speed: " + gspeed.value + "\nmax score: " + mscore.value + "\nmax time: " + mtime + "\nai speed: " + aispeed + "\n|--------------------------|");
    console.log("game saved");
}

/*
setItem(key, value) } 	Store data (string only)} 	localStorage.setItem('score', 100)}
getItem(key)} 	Retrieve data (returns null if not found)} 	let score = localStorage.getItem('score')}
removeItem(key)} 	Delete specific item} 	localStorage.removeItem('score')}
clear()} 	Delete all localStorage data} 	localStorage.clear()}
key(index)} 	Get key name by index} 	localStorage.key(0)} 
*/