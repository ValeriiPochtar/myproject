import './style.scss'
'use strict';
const calendar = document.querySelector('.calendar');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = document.querySelector('.days-grid');
const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const headerMonth = [];
const headerYear = [];
calendar.innerHTML = `<div class="month">${months[today.getMonth()]} ${today.getFullYear()}</div>
  <div class="arrows">
  <div class="prev"></div>
  <div class="next"></div>`;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');


document.addEventListener('DOMContentLoaded', main);
function main() {
  headerMonth.push(today.getMonth());
  headerYear.push(today.getFullYear());

  makingSchedule();

  prev.onclick = () => {
    if(headerMonth[0] === 0) {
      headerMonth[0] = 12;
      headerYear[0] = headerYear[0] - 1;
    }
    document.querySelector('.month').innerHTML = `${months[headerMonth[0] - 1]} ${headerYear[0]}`;
    headerMonth[0] = headerMonth[0] - 1;
    days.innerHTML = '';
    makingSchedule();
  }

  next.onclick = () => {
    if(headerMonth[0] === 11) {
      headerMonth[0] = -1;
      headerYear[0] = headerYear[0] + 1;
    }
    document.querySelector('.month').innerHTML = `${months[headerMonth[0] + 1]} ${headerYear[0]}`;
    headerMonth[0] = headerMonth[0] + 1;
    days.innerHTML = '';
    makingSchedule();
  }
 
}

function makingSchedule() {
  let monthDays = new Date(headerYear[0], (headerMonth[0] + 1), 0).getDate();
  let prevMonthDays = new Date(headerYear[0], (headerMonth[0]), 0).getDate();
  let firstDayOfWeek = new Date(headerYear[0], headerMonth[0], 1).getDay();
  for(let i = 0; i < daysofWeek.length; i++) {
    days.innerHTML +=`<div class="day dayofweek">${daysofWeek[i]}</div>`;
  }
  for(let i = (prevMonthDays - firstDayOfWeek + 1); i <= prevMonthDays; i++) {
    days.innerHTML +=`<div class="day another">${i}</div>`;
  }
  for(let i = 1; i <= monthDays; i++) {
    days.innerHTML +=`<div class="day" id="${i}">${i}</div>`;
    if(today.getDate() === i && today.getFullYear() === headerYear[0] && today.getMonth() === headerMonth[0]) {
      document.getElementById(`${i}`).classList.add('current');
    }
  }
  for(let i = days.childElementCount; i < 49; i++) {
    days.innerHTML +=`<div class="day another">${i - monthDays - firstDayOfWeek - daysofWeek.length + 1}</div>`;
  }
}