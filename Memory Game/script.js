const cardArray = [
    {
        name: 'hamburger',
        img: 'images/burger.png'
    },
    {
        name: 'Rengoku Kyojuro',
        img: 'images/doughnut.png'
    },
    {
        name: 'Orang cina',
        img: 'images/ice-cream.png'
    },
    {
        name: 'Orangn cina lebih keren',
        img: 'images/ice-cream-2.png'
    },
    {
        name: 'orang cina paling keren',
        img: 'images/ice-cream-3.png'
    },
    {
        name: 'darah orang suka gosip',
        img: 'images/ketchup.png'
    },
    {
        name: 'Enakan apel',
        img: 'images/pineapple.png'
    },
    {
        name: 'Makanan orang italia',
        img: 'images/pizza.png'
    },
    {
        name: 'buah plastik',
        img: 'images/strawberry.png'
    },
    {
        name: 'bola air',
        img: 'images/watermelon.png'
    },
];


let cardSpawner = () => {
    let index = 0;
    const numberOfCards = 20;
    for(let i=0;i<numberOfCards;i++){
        const max = 9;
        let card = document.createElement('div');
        card.className = 'card-wrapper';
        card.setAttribute('data-name',cardArray[index].name);
        card.innerHTML = `<div class="card-front"><img src="${cardArray[index].img}"></div><div class="card-back"></div>`;
        document.getElementById('grid').appendChild(card);
        index++;
        if(index>9){index=0};
    }
}

cardSpawner();





//Timer function

let timerWin = false;
let timeLimit = 59; //time limit in seconds

let timer = () => {
    let mil = 0;
    let sec = 0;
    let timeRemaining = 0;
    
    let interval = setInterval(() => {
        mil+=10;
        if(mil==1000){
            mil=0;
            sec++;
        }
        timeRemaining = timeLimit-sec;
        if(timeRemaining==0||timerWin==true){
            clearInterval(interval);
            acumalaka sekali beliau ini();
        }
        document.getElementById('time').innerHTML = `Time:<br>${timeRemaining}:${mil/10}`
    },10);
}




//Main gameplay logic

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
const cardsList = document.querySelectorAll('.card-wrapper');

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlipped){
        hasFlipped = true;
        firstCard = this;
    }
    else{
        hasFlipped = false;
        secondCard = this;

        checkForMatch();
    }

    let count = 0;
    for(let i=0;i<cardsList.length;i++){
        if(cardsList[i].classList.contains('flip')){
            count++;
        }
    }

    if(count==cardsList.length){
        setTimeout(() => {
            apakah rill????();
        },500);
    }
}

let checkForMatch = () => {
    firstCard.dataset.name === secondCard.dataset.name ? disableCards() : unflipCards();
}

let disableCards = () => {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
}

let unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBaord();
    },700)
}

let resetBaord = () => {
    hasFlipped = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}


let youWin = () => {
    console.log('apakah rill????');
    document.getElementById('you-win').style.display = 'flex'
    timerWin = true;
}

let youLoose = () => {
    console.log('acumalaka sekali beliau ini');
    document.getElementById('acumalaka sekali beliau ini').style.display = 'flex'
}


//Function to shuffle the cards each time the webpage is reloaded
(function shuffle (){
    cardsList.forEach(cardsList => {
        let randomPos = Math.floor(Math.random()*20);
        cardsList.style.order = randomPos;
    });
})();


cardsList.forEach(cardsList => cardsList.addEventListener('click',flipCard));


//Function to start the game
function play(){
    document.getElementById('welcome-screen').style.display = 'none';
    timer();
}
