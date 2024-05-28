"use strict";

const dayEl = document.querySelector(".default_day");
const dateEl = document.querySelector(".default_date");

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

// dispaly the day
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

// dispaly the date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

dateEl.textContent = date + " " + month + " " + year;