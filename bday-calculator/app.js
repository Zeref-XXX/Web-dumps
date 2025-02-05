
function calculate() {

    const element = document.getElementById('root');
    let cdate = new Date();

    let day = document.getElementById('day');
    let year = cdate.getFullYear();
    const month = document.getElementById('month');

    
    const udate = new Date(`${year}-${month.value}-${day.value}`);
    
    let diff = udate - cdate;
    console.log(diff);
    let dayleft = Math.floor((diff) / (1000 * 60 * 60 * 24));
    const hoursleft = Math.floor((udate - cdate) / (1000 * 60 * 60) % 24);
    const minleft = Math.floor((udate - cdate) / (1000 * 60) % 60);
    const secleft = Math.floor((udate - cdate) / (1000) % 60);
    
    if (month.value != "" && day.value != "" &&month.value<=12 && day.value<=31) {
 
        element.innerHTML = `<h1> ${dayleft} Days , ${hoursleft} :    Hours: , 
        ${minleft} : mins  , ${secleft} : sec.  
        </h1>
        `;
    }
    else { 
        element.innerHTML = `<h1 className="result">Wrong input moron...</h1>`
    }

    setInterval(calculate,1000);
}