const e = document.getElementById("root");
const body = document.querySelector('body');
const reset = document.getElementById('reset');
const h = document.querySelector('h1');
let buttons = document.querySelectorAll('.buts');




e.addEventListener('click', (event) => {

    let col = event.target.id;
    h.style.color = "black";
    // console.log(col);
    // console.log(typeof col);
    document.body.style.backgroundColor = col;
    buttons.forEach(button => {
        button.style.color = col;
    });
    // col.style.color = col;
    if (col == "reset") {
        h.style.color = "whiteSmoke";
        document.body.style.backgroundColor = "black";
        e.style.border = "15px solid White";
    }

})

buttons.forEach(button => {
    button.style.borderRadius = "20px";
    button.style.fontSize = '3vw';
    button.style.padding = '25px ';
});





body.style.padding = "0";
body.style.margin = "0";
body.style.backgroundColor = "pink";
body.style.display = "flex";
body.style.height = "100vh";
body.style.width = "100%";
body.style.fontSize = "50px";
body.style.justifyContent = "center";
body.style.alignItems = "center";
body.style.borderRadius = "30px";


//button style

e.style.border = "12px solid black";
e.style.padding = "50px ";
e.style.textAlign = "center ";

