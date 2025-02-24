
const root = document.getElementById("root");

async function fetching() {
    let in1 = document.getElementById("input1");
    let user1 = in1.value; 
    
    let in2=document.getElementById("input2");
    let user2 = in2.value; 
    

    let response1 = await fetch(`https://codeforces.com/api/user.info?handles=${user1}&checkHistoricHandles=false`);
    let response2 = await fetch(`https://codeforces.com/api/user.info?handles=${user2}&checkHistoricHandles=false`);


    let raw1 = await response1.json();
    let raw2 = await response2.json();
    let data1 = raw1.result[0];
    let data2 = raw2.result[0]; 
    createcard(data1);
    createcard(data2); 
}


function createcard(data) {
    let card = document.createElement("div");
    card.className="cards";

    let profile = document.createElement('div');
    profile.className="ps";
    let details = document.createElement('div');
    details.className="ds";


    let uname = document.createElement("h2");
    let rate = document.createElement('h2');
    let f = document.createElement("h2");
    let ranks = document.createElement("h1");


    let handle = `${data.handle}`;
    let fc = `${data.friendOfCount}`;
    let rank = data.maxRank.toUpperCase();
    let avatar = document.createElement('img');
    let simage = data.titlePhoto;
    console.log(simage)
    avatar.src = `${simage}`;
    profile.appendChild(avatar);
    rate.innerText = `Rating : ${data.rating}`;
    uname.innerText = `UserId: ${handle}`;
    f.innerText = `Friends: ${fc}`;
    ranks.innerText = `${rank}`;

    details.appendChild(ranks);
    details.appendChild(rate);
    details.appendChild(uname)
    details.appendChild(f)

    card.appendChild(profile);
    card.appendChild(details);
    // console.log(fc);
    root.appendChild(card);

    // st(card, details, profile);
}

// function st(card, details, profile) {
//     // card.style.display = "flex";
//     // card.style.border = "2px solid blue";
//     // card.style.padding = "5px";



//     // details.style.marginLeft = "5px";
 
// }


