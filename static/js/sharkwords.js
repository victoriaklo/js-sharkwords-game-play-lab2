const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let correctGuesses = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = word => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

const disableAllLetterButtons = () => {
  const buttons = document.querySelectorAll("button");

  for (const button of buttons) {
    button.disabled = true;
  }
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  // word AND letter needs to be passed in function

  const correctLetters = document.querySelectorAll(`div.${letter}`);

  // then iterate through word to check correct letter
  for (const checkLetter of correctLetters) {
    checkLetter.innerHTML = letter;
    // display correct letter in the game
    correctGuesses += 1;
  }

  // if isLetterInWord returns true, then update contents of divs with 'letter';

  if (correctGuesses === word.length) { 
    disableAllLetterButtons();
    document.querySelector('#win').style.display = 'block';
  } 
};  

// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  // if (isLetterInWord() === false) {
  numWrong += 1;
  document.querySelector('#shark-img img').setAttribute('src', `/static/images/guess${numWrong}.png`);
 
  // Replace this with your code
  if (numWrong === 5) {
    disableAllLetterButtons();
    document.querySelector('#play-again').style.display = 'block';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.

  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    
    button.addEventListener('click', (evt) => {
      // clickBtn is the letter that is clicked and disables the button
      const clickBtn = evt.target;
      disableLetterButton(clickBtn);
      // get the letter from clickBtn and assign variable to 'letter'
      let letter = clickBtn.textContent;
    

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter, word);
      } else {
        handleWrongGuess(letter);
      }
    });   
  } 


  // add an event handler to handle clicking on the Play Again button
  
  document.querySelector('#play-again').addEventListener('click', resetGame);
  document.querySelector('#win').addEventListener('click', resetGame);

})();
