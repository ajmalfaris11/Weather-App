"use strict";

// API key
const API = "15b9c78c017d5a4c079806d61f090cf6";

const dayEl = document.querySelector(".default_day");
const dateEl = document.querySelector(".default_date");
const btnEl = document.querySelector(".btn_search");
const inputEl = document.querySelector(".input_field");

const iconsContainer = document.querySelector(".icons");
const dayInfoEl = document.querySelector(".day_info");


const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

// ===== dispaly the day =====
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

// dispaly the date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

dateEl.textContent = date + " " + month + " " + year;

// ===== add event =====
btnEl.addEventListener("click", (e) => {
    e.preventDefault();

    // check empty value
    if(inputEl.value !== ""){
        const city = inputEl.value;
        inputEl.value = "";
        findLocation(city);
    }
    else{
        alert("Please Give City or Country Name");
    }
})

async function findLocation(city){
    iconsContainer.innerHTML="";
    dayInfoEl.innerHTML="";
    try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
        const data = await fetch(API_URL);
        const result = await data.json();

        console.log(result);

        if(result.cod !== "404"){

            // display image content of live temperature
            const imgContent = displayImageContent(result);
            iconsContainer.insertAdjacentHTML("afterbegin", imgContent);

            // display right side content
            const dayInfoContent = rightSideContent(result);
            dayInfoEl.insertAdjacentHTML("afterbegin", dayInfoContent);
            
        }else{

            // diaply when the city not avilable
             const message = ` <img src="assets/images/404error.png" alt="404Error">
             <h2 class="weather_temp">${result.cod}</h2>
            <h3 class="cloudtxt">${result.message}</h3> `;
            iconsContainer.insertAdjacentHTML("afterbegin", message);

             const daynfoContent = `<div class="content">
            <p class="title">Name</p>
            <span class="value">City Not found</span>
        </div>
        <div class="content">
            <p class="Temp">Temp</p>
            <span class="value">Not found</span>
        </div>
        <div class="content">
            <p class="Temp">HUMIDITY</p>
            <span class="value">Not found</span>
        </div>
        <div class="content">
            <p class="Temp">WIND SPEED</p>
            <span class="value">Not found</span>
        </div>`;

        dayInfoEl.innerHTML = daynfoContent;

        console.log("hello")



        }
        
    } catch (error) {
        
    }
}

function displayImageContent(data){
    return ` <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather" />
    <h2 class="weather_temp">${Math.round(data.main.temp - 273.15)}&degC</h2>
    <h3 class="cloudtxt">${data.weather[0].description}</h3> `;
}

// display the right side content
function rightSideContent(result){

    return `<div class="content">
                <p class="title">Name</p>
                <span class="value">${result.name}</span>
            </div>
            <div class="content">
                <p class="Temp">Temp</p>
                <span class="value">${Math.round(result.main.temp - 273.15)}&degC</span>
            </div>
            <div class="content">
                <p class="Temp">HUMIDITY</p>
                <span class="value">${result.main.humidity}%</span>
            </div>
            <div class="content">
                <p class="Temp">WIND SPEED</p>
                <span class="value">${result.wind.speed * 3.6}km/h</span>
            </div>`;

}

