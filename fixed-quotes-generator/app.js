const b = document.querySelector('body');
let c;

function bg_colors() {
    // let c = hexCode();
    hexCode();
    b.style.backgroundColor = c;
    // console.log("inside hex");
}
function hexCode() {
    c = "#" + Math.floor(Math.random() * 10000000).toString(16);
    // console.log(c);
    // console.log(c.length);
    // console.log(typeof c);
}
setInterval(bg_colors, 4000);
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
    "It does not matter how slowly you go as long as you do not stop. – Confucius",

    "A lesson without pain is meaningless. That’s because you can’t gain something without sacrificing something. But once you have overcome it and made it your own... you will gain a heart that is stronger than everything else. — Edward Elric (Fullmetal Alchemist: Brotherhood)",

    "Fear is not evil. It tells you what your weaknesses are. And once you know your weaknesses, you can become stronger and kinder. — Gildarts Clive (Fairy Tail)",

    "Hard work is worthless for those that don’t believe in themselves. — Naruto Uzumaki (Naruto Shippuden)",

    "A person grows up when he has to. When he ceases to whine and starts doing things on his own. — Gintoki Sakata (Gintama)",

    "Power comes in response to a need, not a desire. You have to create that need. — Goku (Dragon Ball Z)",

    "Forgetting is like a wound. The wound may heal, but it has already left a scar. — Monkey D. Luffy (One Piece)",
    "Power comes in response to a need, not a desire. — Goku",
    "Hard work is worthless for those that don’t believe in themselves. — Naruto",
    "Fear is not evil. It shows you your weakness. — Gildarts",
    "A person grows up when he has to. — Gintoki",
    "Forgetting is like a wound. — Luffy",
    "Fear cuts deeper than swords. — Arya Stark (Oops! Wrong universe 😆)",
    "To know sorrow is not terrifying. — Pain",
    "In this world, the weak are the sustenance of the strong. — Ulquiorra",
    "A lesson without pain is meaningless. — Edward Elric",
    "A person becomes strong when he has something he wants to protect. — Haku",
    "Being alone is more painful than getting hurt. — Luffy",
    "The world isn’t beautiful, therefore it is. — Kino"

]

let s = arr.length
// console.log(s);

let root = document.getElementById("root");

root.innerText=arr[0];

let q = function quoteFetch() {
    let index = Math.floor(Math.random() * s);
    let quotes = arr[index];
    // console.log(typeof quotes);
    // console.log(index);
    return quotes;
}
// console.log(q());

setInterval(() => {
    // q();
    root.innerText = `${q()}`;
}, 5000);



