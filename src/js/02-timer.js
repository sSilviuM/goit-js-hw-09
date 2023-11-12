import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     selectedDate = selectedDates[0];
        if(selectedDate < options.defaultDate)  {
            startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future!');
            return;
        } 
        return startBtn.disabled = false;
    },
  };
  flatpickr(inputEl,options);

const dayEl = document.querySelector("[data-days]");
const hourEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');

startBtn.addEventListener ('click' , ()=> {
     setInterval(calculateTimeDiff , 1000);
});


function calculateTimeDiff () {
    const currentDate = new Date();
   const diff = selectedDate - currentDate;
   if (diff < 0) {
    return;
   } 
   const {days, hours, minutes, seconds} = convertMs(diff);
   dayEl.innerHTML = addLeadingZero(days);
   hourEl.innerHTML = addLeadingZero(hours);
   minutesEl.innerHTML = addLeadingZero(minutes);
   secondsEL.innerHTML = addLeadingZero(seconds);
};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
   return value.toString().padStart(2, "0");
  }
