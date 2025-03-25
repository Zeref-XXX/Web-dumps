

// document.body.style.backgroundColor = "purple";
const text=["hello","ola","amigo","dora","demon","slayer"];
const color=["aqua","pink","purple","blue","green","chocolate"];


document.addEventListener("click", (event) => {
    const size=text.length;
    const index=Math.floor(Math.random()*size);
    console.log(index);
    const x = event.clientX;
    const y = event.clientY;
    const element = document.createElement("div");
    element.className = "circle";
    element.innerText = text[index];
    element.style.color = color[index];
    element.style.left = `${x - 20}` + "px";
    element.style.top = `${y-20}` + "px";
    console.log(x, y);
    console.log(element);

    document.body.append(element)


    setTimeout(() => element.remove(), 900);

})
