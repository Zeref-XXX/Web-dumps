const b = document.querySelector('body');
let c;

function bg_colors() {
    // let c = hexCode();
    hexCode();
    b.style.backgroundColor = c;
    console.log("inside hex");
}
function hexCode() {
    c = "#" + Math.floor(Math.random() * 10000000).toString(16);
    // console.log(c);
    // console.log(c.length);
    // console.log(typeof c);
}
setInterval(bg_colors, 1000);
// array of quotes 
let arr = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "In the middle of every difficulty lies opportunity. – Albert Einstein",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Happiness is not something ready-made. It comes from your own actions.  – Dalai Lama",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
    "Believe you can, and you're halfway there. – Theodore Roosevelt",
    "Be the change that you wish to see in the world. – Mahatma Gandhi",
    "The best way to predict the future is to create it. – Peter Drucker",
    "It does not matter how slowly you go as long as you do not stop. – Confucius"
]

let s = arr.length
console.log(s);
let root = document.getElementById("root");
let q = function quoteFetch() {
    let index = Math.floor(Math.random() * 10);
    let quotes = arr[index];
    console.log(typeof quotes);
    return quotes;
}
// console.log(q());

setInterval(() => {
    q();
    root.innerText = `${q()}`;
}, 1000);



