class CardImages {
    constructor(name, filename) {
        this.name = name;
        this.filename = filename;
    }
}

let img1 = new CardImages("1up", "./images/guess/1up.png");
let img2 = new CardImages("blueshell", "./images/guess/blueshell.png");
let img3 = new CardImages("bobomb", "./images/guess/bobomb.png");
let img4 = new CardImages("luigi", "./images/guess/luigi.png");
let img5 = new CardImages("mario", "./images/guess/mario.png");
let img6 = new CardImages("star", "./images/guess/bulletbill.png");

let CardImagesarr = [img1, img2, img3, img4, img5, img6];


let gridGamecars = CardImagesarr.concat(CardImagesarr).sort
    (function () {
        return 0.5 - Math.random();
    });


let guess1 = '';
let guess2 = '';
let queue = 0;
let previousTarget; //Previous selected card
let timeout = 600; //timeout of 2 secons to show  second card
let correctAnswer = 0;
let tries = 0;
let sucess = 0;


let memoryGame = document.getElementById('memoryGame');
let board = document.createElement('section'); //Create board div
board.setAttribute('class', 'board'); //Add class named board
memoryGame.appendChild(board); //Add the div created in line 32 to memoyGames main div in HTML


for (let i = 0; i < gridGamecars.length; i++) {

    let mainCard = document.createElement('div');
    mainCard.classList.add('mainCard');
    mainCard.dataset.name = gridGamecars[i].name;

    let bImage = document.createElement('div');
    bImage.classList.add('bImage');
    bImage.style.backgroundImage = 'url(' + gridGamecars[i].filename + ')';

    let fImage = document.createElement('div');
    fImage.classList.add('fImage');

    board.appendChild(mainCard);
    mainCard.appendChild(fImage);
    mainCard.appendChild(bImage);
}



let resetTries = function resetTries() {
    guess1 = '';
    guess2 = '';
    queue = 0;
    previousTarget = null;
    tries++;


    let selected = document.querySelectorAll('.choosen'); //search all card flipped 
    selected.forEach(function (mainCard) { //Go over all the elemtns
        mainCard.classList.remove('choosen'); //Remove flipped card(class)
    });
}

let correct = function correct() {
    sucess++;
    let selected = document.querySelectorAll('.choosen');
    selected.forEach(function (mainCard) {
        mainCard.classList.add('correct');
        $('mainCard').off('click');
        correctAnswer++;
        checkIfWin(correctAnswer);
    });
};

function checkIfWin(guesses) {
    if (guesses === gridGamecars.length) {
        $("#won").text("You did it in " + tries + " tries," + (tries - sucess) + " wrong guesses");
        $('#myModal').modal('show'); //Show won message
    }
}
//If modal new game pressed,reload page  & new game
document.querySelector('button[name=NewGame]').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.reload();
});


board.addEventListener('click', function (event) {

    var cardClicked = event.target;

    if (cardClicked.nodeName === 'SECTION' || cardClicked === previousTarget || cardClicked.parentNode.classList.contains('choosen') || cardClicked.parentNode.classList.contains('correct')) {
        return;
    }
    if (queue < 2) {
        queue++;
        if (queue === 1) {
            guess1 = cardClicked.parentNode.dataset.name;
            cardClicked.parentNode.classList.add('choosen');

        }
        else {
            guess2 = cardClicked.parentNode.dataset.name;
            cardClicked.parentNode.classList.add('choosen');
        }

        if (guess1 && guess2) {
            if (guess1 === guess2) {
                setTimeout(correct, timeout);
            }
            setTimeout(resetTries, timeout);
        }
        previousTarget = cardClicked;
    }
});