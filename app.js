const qwerty = document.getElementById('qwerty');
const keyRows = qwerty.children;
const phrase = document.getElementById('phrase');
let phraseList = phrase.firstElementChild;
const startButton = document.querySelector('.btn__reset');
const overlay = startButton.parentNode;
let missed = 0;
const phrases = [
    'I love tacos',
    'Puerto Rico',
    'Julio is my dog',
    'Banana sandwich',
    'Beef Wellington'
];
let phraseArray = getRandomPhraseAsArray(phrases);
const heartsList = document.getElementsByClassName('tries');
const retryButton = document.createElement('a');

// create reset Button but not add it to the DOM yet 
retryButton.textContent = 'Retry';
retryButton.className = 'btn__reset';
retryButton.id = 'retry';

// function that picks a phrase at random from my list of phrases and creates the split array of letters
function getRandomPhraseAsArray(arr){
    const index = Math.floor(Math.random()*(arr.length));
    return arr[index].split('');
}

// function that adds the phrase to display 
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        const letter = document.createElement('li');
        letter.textContent = arr[i];
        if ( arr[i] === ' '){
            letter.className = 'space';
        } else {
            letter.className = 'letter';
        }
        phraseList.appendChild(letter);
    }   
}

// function that checks to see whether or not the letter clicked has a match
function checkLetter(button){
    const phraseLetters = document.getElementsByClassName('letter');
    let correctLetter = null;
    for (let i = 0; i < phraseLetters.length; i++){
        const letterText = phraseLetters[i].textContent.toLowerCase();
        const buttonText = button.textContent.toLowerCase();
        if (letterText === buttonText){
            phraseLetters[i].classList.add('show');
            correctLetter = letterText;
        }
    }
    return correctLetter;
}

// function that checks the score and can declare either a win or a loss 
function checkWin(){
    const revealed = document.getElementsByClassName('show');
    const phraseLetters = document.getElementsByClassName('letter');
    let overlayText = overlay.firstElementChild;
    if (revealed.length === phraseLetters.length){
        overlay.className = 'win';
        overlayText.textContent = 'Congratulations! You Won!';
        overlay.style.display = 'flex';
    } else if (missed >= 5){
        overlay.className = 'lose';
        overlayText.textContent = 'Too bad! You lost!';
        overlay.style.display = 'flex';
    }
}

// event listener for starting the game. 
//reveals board, switches buttons, and adds a phrase 
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.appendChild(retryButton);
    overlay.removeChild(startButton);
    addPhraseToDisplay(phraseArray);
});

// event listener for resetting the game 
retryButton.addEventListener('click', () => {
    missed = 0;
    for (let i = 0; i < heartsList.length; i++){
        heartsList[i].firstElementChild.src = 'images/liveHeart.png';
    }
    phrase.removeChild(phrase.firstElementChild);
    let newUL = document.createElement('ul');
    phrase.appendChild(newUL);
    phraseList = newUL;
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    for (let i = 0; i < keyRows.length; i++){
        const keys = keyRows[i].children;
        for (let i = 0; i < keys.length; i++){
            keys[i].className = '';
            keys[i].disabled = false;
        }
    }
    overlay.style.display = 'none';
});

// event listener for selecting letters. checks for a match. 
// if miss, adds to missed count and reflects on the screen. checks for a win.
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
        const letterFound = checkLetter(e.target);
        if (letterFound === null){
            missed += 1;
            heartsList[5 - missed].firstElementChild.src = 'images/lostHeart.png';
        }
        e.target.className = 'chosen';
        e.target.disabled = true;
    }
    checkWin();
})