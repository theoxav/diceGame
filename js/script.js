 'use strict'



 //SELECTING ELEMENTS//

 const player1 = document.getElementById('player1')
 const player2 = document.getElementById('player2');

 const labelPlayer1 = document.querySelector('.player1-label');
 const labelPlayer2 = document.querySelector('.player2-label');

 const score1 = document.querySelector('.score1');
 const score2 = document.querySelector('.score2');

 const currentScore1= document.querySelector('.current-score1');
 const currentScore2 = document.querySelector('.current-score2');
 
 const diceImg = document.querySelector('#dice-img');
 const btnRoll = document.querySelector('#roll-dice');
 const btnHold = document.querySelector('#hold');
 const newGame = document.querySelector('#btn-new-game');

 const rules = document.querySelector('.rules');
 
 //VARIABLES//
 let scores;
let currentScore;
let activePlayer;
let playing;




// FUNCTION INIT//
const init = ()=> {
  scores =[0,0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  score1.textContent=0;
  score2.textContent=0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  labelPlayer1.textContent = "Player 1 ";
  labelPlayer2.textContent = "Player 2";
  player1.classList.add('active');
  player1.classList.remove('winner')
  diceImg.classList.add('dice-hidden');
  player2.classList.remove('active');
  player2.classList.remove('winner')


};
init();

//FUNCTION SWITCH PLAYER
const switchPlayer = ()=>{
  document.querySelector(`.current-score${activePlayer}`)
  .textContent =0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('active');
  player2.classList.toggle('active');

};

//ROLL FUNCTION//
btnRoll.addEventListener('click', () => {
    if (playing) {
      
        //1.generating a randomdice roll
        let dice = Math.trunc(Math.random() * 6) + 1;
  
        //2.Display dice
        diceImg.classList.remove('dice-hidden');
  
        //responsive dice
        if(window.matchMedia("(min-width :767px)").matches){
          diceImg.style.backgroundImage = `url(/img/web/dice-${dice}.png)`;
        }
        else{
          diceImg.style.backgroundImage = `url(/img/mobile/dice-${dice}.png)`;
        }
        if(dice !== 1){
          //add dice to the current score
          currentScore +=dice;
          document.querySelector(`.current-score${activePlayer}`).textContent = currentScore;
        }
        else{
          switchPlayer();
        }
    
    }
} );

//FUNCTION HOLD//
btnHold.addEventListener('click', () => {
  if(playing) {

    //1.Add current score to active player score
    scores[activePlayer-1] +=currentScore;

    //scores[1] = scores[1] + currentScore;
    document.querySelector(`.score${activePlayer}`).textContent = `${scores[activePlayer-1]}`;
  
    if (scores[activePlayer-1] >= 100){
      playing = false;
      diceImg.classList.add('hidden');
      document
       .querySelector(`#player${activePlayer}`)
       .classList.add('winner');
      
       document.querySelector(`.player${activePlayer}-label`).textContent = `Player ${activePlayer} Win !`;
     
    } else{
      //next player
      switchPlayer();
    }
  }
});

//FUNCTION NEW GAME//
newGame.addEventListener('click' , () => {
  init();
})






    