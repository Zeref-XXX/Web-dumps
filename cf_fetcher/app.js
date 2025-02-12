

const root = document.getElementById("root");

async function fetching() {
    let inputs = document.getElementById("input");
    let v = inputs.value; 

    let response = await fetch(`https://codeforces.com/api/user.info?handles=${v}&checkHistoricHandles=false`);


    let raw = await response.json();
    let data = raw.result[0];
    // console.log(data.handle);
    // console.log(data.rating);
    createcard(data);
    // console.log(typeof data);

}


function createcard(data) {
    let card = document.createElement("div");

    let profile = document.createElement('div');
    let details = document.createElement('div');



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

    st(card, details, profile);
}

function st(card, details, profile) {
    card.style.display = "flex";
    card.style.border = "2px solid blue";
    card.style.padding = "10px";



    details.style.marginLeft = "10px";
    details.style.font
}


