"use strict";
const IsoNo = (city) => {
    switch (city) {
        case 'Makkah': return { "iso": "sa", 'name': "مكة المكرمة" };
        case "Hadhramaut": return { "iso": "ye", 'name': "حضرموت" };
        case "Dubai": return { "iso": "ae", 'name': "دبي" };
        default: return { "iso": "", "name": "" };
    }
};
const GetData = (city, country, day, month, year) => {
    fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&month=${month}&year=${year}`)
        .then(res => res.json())
        .then(result => {
        const header = document.querySelector('header');
        const div = document.getElementById('title');
        div.innerHTML = "";
        const title = document.createElement('h1');
        title.innerText = IsoNo(city).name;
        const dateOfDay = document.createElement('p');
        dateOfDay.innerText = result.data[day].date.hijri.date;
        console.log(result.data[day].date);
        div.append(title);
        div.append(dateOfDay);
        header.append(div);
        const footer = document.querySelector('footer');
        const data = result.data[day].timings;
        footer.innerHTML = "";
        //Fajr
        let div_1 = document.createElement('div');
        div_1.classList.add('box');
        let h5_1 = document.createElement('h5');
        h5_1.innerText = "الفجر";
        let p_1 = document.createElement('p');
        p_1.innerText = data.Fajr.slice(0, 5);
        div_1.append(h5_1);
        div_1.append(p_1);
        footer.append(div_1);
        //الشروق
        let div_2 = document.createElement('div');
        div_2.classList.add('box');
        let h5_2 = document.createElement('h5');
        h5_2.innerText = "الشروق";
        let p_2 = document.createElement('p');
        p_2.innerText = data.Sunrise.slice(0, 5);
        div_2.append(h5_2);
        div_2.append(p_2);
        footer.append(div_2);
        //الظهر
        let div_3 = document.createElement('div');
        div_3.classList.add('box');
        let h5_3 = document.createElement('h5');
        h5_3.innerText = "الظهر";
        let p_3 = document.createElement('p');
        p_3.innerText = data.Dhuhr.slice(0, 5);
        div_3.append(h5_3);
        div_3.append(p_3);
        footer.append(div_3);
        //العصر
        let div_4 = document.createElement('div');
        div_4.classList.add('box');
        let h5_4 = document.createElement('h5');
        h5_4.innerText = "العصر";
        let p_4 = document.createElement('p');
        p_4.innerText = data.Asr.slice(0, 5);
        div_4.append(h5_4);
        div_4.append(p_4);
        footer.append(div_4);
        //المغرب
        let div_5 = document.createElement('div');
        div_5.classList.add('box');
        let h5_5 = document.createElement('h5');
        h5_5.innerText = "المغرب";
        let p_5 = document.createElement('p');
        p_5.innerText = data.Maghrib.slice(0, 5);
        div_5.append(h5_5);
        div_5.append(p_5);
        footer.append(div_5);
        //العشا
        let div_6 = document.createElement('div');
        div_6.classList.add('box');
        let h5_6 = document.createElement('h5');
        h5_6.innerText = "العشا";
        let p_6 = document.createElement('p');
        p_6.innerText = data.Isha.slice(0, 5);
        div_6.append(h5_6);
        div_6.append(p_6);
        footer.append(div_6);
    });
};
window.addEventListener("load", () => {
    const select = document.querySelector('select');
    let city = select.value;
    let country = IsoNo(city).iso;
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    GetData(city, country, day, month, year);
    select.addEventListener('change', () => {
        city = select.value;
        country = IsoNo(city).iso;
        GetData(city, country, day, month, year);
    });
});
