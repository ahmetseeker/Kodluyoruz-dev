let userNameDOM = document.querySelector('#userName');
userNameDOM.innerHTML = prompt('Lütfen Adınızı Giriniz: ');

let clockDOM = document.querySelector('#clock');

function getTime () {
    let date = new Date();
    let day = date.getDay();
    let days = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
    ];

    clockDOM.innerHTML = `${("0" + date.getHours()).slice(-2)} : ${("0" + date.getMinutes()).slice(-2)} : ${("0" + date.getSeconds()).slice(-2)}   ${days[day]}`;
    setTimeout(getTime, 1000);
}

getTime();
