
document.addEventListener("DOMContentLoaded", function() {
  const tilesContainer = document.querySelector('.container');
  for(let i = 0; i < 9; i++) {
    tilesContainer.innerHTML += `<div class="tile" id="${i}"></div>`;
  }
  tilesContainer.focus();
  let numb = 0;
  const displayPlayer = document.querySelector('.display-player');
  const x = document.querySelector('.playerX').innerText;
  const o = document.querySelector('.playerO').innerText;
  const announcer = document.querySelector('.announcer');
  const reset = document.getElementById('reset');
  
  let highlightpos = -1;

  const tiles = document.querySelectorAll('.tile');

  let current;

  const avatars = document.querySelector('.icons');

  const avatarContainer = document.querySelectorAll('.avatar-container');

  let winnerGame = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  let winnerTable = ["", "", "", "", "", "", "", "", ""];
  let winner = false;

  document.querySelector('.container').onclick = () => { 
    main(event.target)
  };
  
  function main(param) {
    if( param.textContent === '' && winner === false) {
      numb++;
      let id = param.id;
  
      if(numb%2 === 1) {
        param.classList.add("playerX");
        param.innerText = x;
        displayPlayer.classList.remove("playerX")
        displayPlayer.classList.add("playerO");
        displayPlayer.innerText = o;
        winnerTable[id] = 'x';
        winAcc(x);
      }
      
       if(numb%2 === 0) {
        param.classList.add("playerO");
        param.innerText = o;
        displayPlayer.classList.remove("playerO")
        displayPlayer.classList.add("playerX");
        displayPlayer.innerText = x;
        winnerTable[id] = 'o';
        winAcc(o);
      }
    }
  }
  

  function winAcc(par) {
    for(let j = 0; j < 8; j++) {
      let winWin = winnerGame[j];
      let a = winnerTable[winWin[0]];
      let b = winnerTable[winWin[1]];
      let c = winnerTable[winWin[2]];
      if(a === "" || b === "" || c === "") {
        continue;
      }
      if(a === b && b === c) {
        winner = true;
        announcer.classList.remove("hide");
        announcer.innerHTML = `Player <span class="player${par}"> ${par}</span> won`;
      }
    }
    if(!winnerTable.includes("")) {
     winner = true;
     announcer.classList.remove("hide");
     announcer.innerHTML = `<span class="player${par}"> Tie!</span>`;
    }
   }

  reset.onclick = resetFunc;

  function resetFunc() {
    winner = false;
    numb = 0;
    winnerTable = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
      document.getElementById(`${i}`).innerHTML = '';
      document.getElementById(`${i}`).classList.remove('playerO','playerX');
    }
    displayPlayer.classList.remove("playerO")
    displayPlayer.classList.add("playerX");
    announcer.classList.add("hide");
    displayPlayer.innerText = x;

    document.querySelector('.icons').innerHTML = `<img src="assets/woman.png" 
    class="avatar-icon" 
    data-item="1" alt="Avatar icon">
    <img src="assets/boy.png" 
    class="avatar-icon" data-item="2" 
    alt="Avatar icon">
    <img src="assets/girl.png" 
    class="avatar-icon" data-item="3" 
    alt="Avatar icon">
    <img src="assets/business-man.png" 
    class="avatar-icon" 
    data-item="4" alt="Avatar icon">`;

    avatarContainer.forEach((cell) => {
      cell.innerHTML = '';
    });

    tiles.forEach((cell) => {
      cell.style.background = "none";
    })

    highlightpos = -1;
    }

   avatars.addEventListener('dragstart', dragStart);

   function dragStart() {
      current = event.target;
      setTimeout(() => {
        current.classList.add('hide');
      }, 0);
   }

   function dragDrop() {
      this.append(current);
      current.classList.remove('hide');
   }

   avatarContainer.forEach((cell) => {
      cell.addEventListener('dragover', allowDrop);
      cell.addEventListener('drop', dragDrop);

      function allowDrop(e) {
      if(cell.innerHTML === '') {
        e.preventDefault();
        } else {
          current.classList.remove('hide');
        }
      }
   });


   document.onkeydown = (e) => {
     tilesContainer.focus();
     reset.blur();
     if(e.key === 'ArrowRight' && highlightpos < 8) {
       highlightpos += 1;
       if(highlightpos > 0) {
       document.getElementById(`${highlightpos - 1}`).style.background = "#12181B";
       }
       let tileties = document.getElementById(`${highlightpos}`);       
       tileties.style.background = "grey";
     }
     if(e.key === 'ArrowLeft' && highlightpos > 0) {
       highlightpos -= 1;
       document.getElementById(`${highlightpos + 1}`).style.background = "#12181B";
       let tileties = document.getElementById(`${highlightpos}`);       
       tileties.style.background = "grey";
     }
     if(e.key === 'Enter') {
       let idMain = document.getElementById(`${highlightpos}`);
       main(idMain);
    }
     if(e.key === 'Delete') {
       resetFunc();

      }
   }
});

