const sides = [
 ['F','B','F2','B2','F\'','B\''],
 ['U','D','U2','D2','U\'','D\''],
 ['R','L','R2','L2','R\'','L\'',]
]; 
const scramble = document.querySelector('.sides-container');
const start = document.querySelector('.start');
const timer = document.querySelector('.secs');
const times = document.querySelector('.times-times');
let time = 0;
let inter = 0;
let timerId;
let avg;
let attemptCounter = 0;

start.onclick = timeStart;


document.addEventListener('keyup', (e) => {
  if(e.code === 'Space') {
    inter ++;
    timeStart(inter);
  }
  if(e.code === 'Delete') {
    times.lastChild.remove();
  }
})

function scrFunc () {
  for (let i = 0; i < 7; i++) {
    for (let index = 0; index < 3; index++) {
    scramble.innerHTML = `${scramble.innerHTML} ${sides[index][Math.round(Math.random()*5)]} `;
  }
 }
}
scrFunc();

function timeStart(par) {
  let t = Date.now();
  if (par%2 === 0) {
  attemptCounter++;
  document.querySelector('.times-times').innerHTML += `<div class="avg">${attemptCounter}: &nbsp &nbsp ${timer.innerHTML}</div>`;
  clearInterval(timerId);
  zero();
  scramble.innerHTML = '';
  scrFunc();
  timeAvg();
   return;
  }
  timerId = setInterval(() => {
    time = time + (0.01 - ((Date.now() - t)/100000));
    t = Date.now();
    timer.innerHTML = time.toFixed(3);
  }, 10);
}

function zero() {
  time = 0;
  inter = 0;
}

function timeAvg () {
  avg = document.querySelectorAll('.avg');
  let tempAvg = 0;
  avg.forEach((e) => {
    let eTime = e.textContent.match(/\d*\.\d*/);
    tempAvg = +tempAvg + +eTime;
  })
  document.querySelector('.avg-all').innerHTML = `
  Average of ${times.childElementCount}: &nbsp &nbsp ${(tempAvg / times.childElementCount).toFixed(3)}`;
  if(times.childElementCount > 4) {
    let tempavg5 = [];
    tempAvg = 0;
    avg.forEach((e) => {
      let eTime = e.textContent.match(/\d*\.\d*/);
      tempavg5.push(+eTime);
    })
    for(let i = tempavg5.length - 5; i < tempavg5.length; i++) {
      tempAvg = +tempAvg + tempavg5[i];
    }
    document.querySelector('.avg-5').innerHTML = `Average of 5: &nbsp &nbsp ${(tempAvg / 5).toFixed(3)}`;
  }
}
