const root = document.getElementById("root");

document.addEventListener("keypress", (event) => {
    root.innerText = "pressed " + event.key;
})

root.style.height = "50vh";
root.style.width = "400px";

root.style.backgroundColor = "pink";

// root.addEventListener("click",(e)=>{
//     root.innerHTML="X "+ e.clientX + ", Y "+ e.clientY;
//     console.log("mouse double");
// })

// root.addEventListener("dblclick", () => {
    //     root.innerHTML = "double clicked";
    //     console.log("mouse double");
    //     root.style.backgroundColor = "aqua";
    // })
    
    // root.addEventListener("mousedown",()=>{
    //     root.innerHTML="mouse pressed";
    // })
    // root.addEventListener("mouseup",()=>{
    //     root.innerHTML="mouse released";
    // })
    // root.addEventListener("mousemove",()=>{
    //     root.innerHTML="mouse moves";
    // })

    // root.addEventListener("mouseenter",()=>{
    //     root.innerHTML="mouse enter";
    // })
    // root.addEventListener("mouseleave",()=>{
    //     root.innerHTML="mouse leaves";
    // })
    
    // window.addEventListener("resize",()=>{
    //     root.innerHTML="resized";
    // })
    // window.addEventListener("scroll",()=>{
    //     root.innerHTML="scroll";
    // })