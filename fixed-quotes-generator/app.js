const b = document.querySelector('body');

// console.log(typeof b);
const container=document.getElementById("root");

const topbar=document.createElement('div');
topbar.innerHTML="<h1>Hello there</h1>";

const content=document.createElement('div');
content.innerText=`hello`;
content.innerHTML=`<h1>hello</h1>`;


container.style.backgroundColor="grey";
container.style.textAlign="center";

container.append(topbar);
container.append(content);

