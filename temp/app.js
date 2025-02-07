const e = document.getElementById("root");
const a=document.createElement("ul");
const b=document.createElement("li");
const c=document.createElement("li");
const d=document.createElement("li");

b.innerText="Student"; 
c.innerText="sandeep"; 
d.innerText="Vishal";

// a.append(b,c);
a.appendChild(b,c,d);


e.appendChild(a);
