// document.querySelector('h3').style.width="100vw";
document.querySelector('h3').style.height="40px";
// document.querySelector('h3').style.border="2px solid black";
document.querySelector('h3').style.textAlign="center";
// document.querySelector('h3').style.backgroundColor="red";

const body = document.querySelector(`body`);
body.style.padding = "0";
body.style.margin = "0";
body.style.boxSizing = "border-box";
body.style.display = "flex";
body.style.height = "100vh";

const timer = document.getElementById("root");
timer.style.fontFamily = "algerian";
timer.style.fontSize = "100px";
timer.style.margin = "auto";


setInterval(clock, 1000);
let colors = ["black", "blue", "purple", "orange", "pink", "whitesmoke","green"];
let s = colors.length;
body.addEventListener("keypress", keyhandle);
let f = 100;

function clock() {
    const date = new Date();
    const now = date.toLocaleTimeString();
    timer.innerHTML = now.toUpperCase();
    // timer.style.border="2px solid black";
}

function keyhandle(key) {
    let k = key.key;
    if (k != "+" && k != "-" && k != "Enter") {
        let bg = colors[Math.floor(Math.random() * s)]; 
        body.style.backgroundColor = bg;
        if (bg == "black") {
            timer.style.color = "white";
        }
        else {
            timer.style.color = "black";
        }
    }
    else if (k == "Enter") {
        removeKeyHandler();
    }
    else {
        if (k == "+" || k == "=") f = f + 1;
        if (k == "-" || k == "_") f = f - 1;
    }
    timer.style.fontSize = `${f}px`;
}

function removeKeyHandler() {
    body.removeEventListener("keypress", keyhandle);
    body.style.backgroundColor = "Red";  
    fixed.innerText="Stopped Refresh ";
    fix();
}

function fix(){
    let f=document.getElementById("fixed");
    f.style.fontSize="100px";
    f.innerText="HEYY Refresh";
    // f.style.border="2px solid black";
    f.style.margin="auto";
}
