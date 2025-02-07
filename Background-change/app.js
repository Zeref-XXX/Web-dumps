const e = document.getElementById("root");
const body = document.querySelector('body');
const reset = document.getElementById('reset');
const h = document.querySelector('h1');

reset.addEventListener('click', (event) => {
    document.body.style.backgroundColor = "whitesmoke";
    // console.log(event.target);
    h.style.backgroundColor="yellow";
    h.style.color = "white";

})

e.addEventListener('click', (event) => {
    h.style.color = "black";
    document.body.style.backgroundColor = event.target.id;
})