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

retryButton.textContent = 'Retry';
retryButton.className = 'btn__reset';
retryButton.id = 'retry';

function getRandomPhraseAsArray(arr){
    const index = Math.floor(Math.random()*(arr.length));
    return arr[index].split('');
}

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

function checkLetter(button){
    const phraseLetters = document.getElementsByClassName('letter');
    let correctLetter = null;
    for (let i = 0; i < phraseLetters.length; i++){
        const letterText = phraseLetters[i].textContent.toLowerCase();
        const buttonText = button.textContent.toLowerCase();
        if (letterText === buttonText){
            phraseLetters[i].style.transition = '2s ease-out';
            phraseLetters[i].classList.add('show');
            correctLetter = letterText;
        }
    }
    return correctLetter;
}

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

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.appendChild(retryButton);
    overlay.removeChild(startButton);
    addPhraseToDisplay(phraseArray);
});

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

qwerty.addEventListener('click', (e) => {
    e.target.style.transition = '.5s';
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