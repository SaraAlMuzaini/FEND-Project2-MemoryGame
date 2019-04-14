/*
 * Create a list that holds all of your cards
 */
 // const allCardsList = Array.from(document.querySelectorAll('.deck li'));

 // const deck = document.querySelector('.deck'); // deck is the class for the unordered list 
 // const moveTxt = document.querySelector('.moves'); //the text of moves numbers
 // const rest = document.querySelector('.restart');
 // // const scoreStars = document.querySelector('.stars');
 // // const allStarsList = Array.from(document.querySelectorAll('.stars'));
 // let movesCount = 0; // Counter to keep track for the move	
 // let stars = 3;
 // let CardsToMached = [];
//All verabels need in this project with Event listener verabels
let timer;
let minutes;
let seconds; 
const stars = 3;
let starsCount = stars;
const deck = document.querySelector('.deck'); // deck is the class for the unordered list 
const moveTxt = document.querySelector('.moves');
const rest = document.querySelector('.restart');
const secondStar = document.querySelector('.second-star');
const thirdStar = document.querySelector('.third-star');
const firstStar = document.querySelector('.first-star');
const modal = document.querySelector('.modal');
const modalMassege = document.querySelector('.modalMassege');
const modalClose = document.querySelector('.close');
const startAgain = document.querySelector('.startAgain');

// All list need in this project
/*
 * Create a list that holds all of your cards
 */
const allCardsList = Array.from(document.querySelectorAll('.deck li'));
let machedCardsList = [];
let toChickList = [];
let isGameStarted = false;
let movesCount = 0;


// All functions need in this project

function addToMatchedCards(toChickList) {
	toChickList[0].classList.toggle('match');
	toChickList[1].classList.toggle('match');
	machedCardsList.push(toChickList[0]);
	machedCardsList.push(toChickList[1]);
}

function isGameEnd(toChickList) {
	if(machedCardsList.length===16)
		return true;
	else
		return false;
}
function setMassege() {
	// body...
	// <!-- Congratulations!    
    // The <em>Time</em> you took to win the game is:
    // <p class="modal-msg Timer">Your <em>star rating </em> is: </p>
	const massege = `Congratulations!<br><br>
	The <em>Time</em> you took to win the game is:
	${minutes} minutes and ${seconds} seconds.
    <br>The <em>Star</em> rating you get is: ${starsCount} stars.<br><br>`;
    modalMassege.innerHTML = massege;
}
function winGame() {
	// body...
	modal.style.display = "block";
 	clearInterval(timer);
	setMassege()
}

function chickifMatched(toChickList) {
	// body...
	if (toChickList[0].firstElementChild.className === toChickList[1].firstElementChild.className) 
	//   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	{
 
		addToMatchedCards(toChickList);
		toChickList = [];

		//Chick if the cards all matched and the game end !
		if(isGameEnd()){
			console.log("WIN, the Game End");
			winGame();
		}
	}
	else 			
	//   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	{
		setTimeout(() => {
		closeAllCard(toChickList);	
		toChickList = [];
		}, 500);
	}	
	setMovesCount(); 
}
function closeCard(card) {
	card.classList.remove('open' ,'show' , 'match');
}
function closeAllCard(cardList) {
	for (var i = 0; i < cardList.length; i++) {
		closeCard(cardList[i]);
	}
}
function openCard(card) {
	// body...
	card.classList.toggle('open');
	card.classList.toggle('show');
}
function openAllCard(cardList) {
	// body...
	for(card of cardList )
		openCard(card);
}


function shuffleCards() {
	// body...
	console.log(allCardsList);
	const shuffledCards = shuffle(allCardsList);

 	for (cards of shuffledCards)
 	{
 		deck.appendChild(cards);
 	}	
 	console.log(shuffledCards);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function setStars() {

	if(movesCount < 19){
		starsCount = 3;
		firstStar.style.display = "block";
		secondStar.style.display = "block";
		thirdStar.style.display = "block";
	}
	if(movesCount <= 25 && movesCount >= 19){
		//display 2 stars
		starsCount = 2;
		thirdStar.style.display = "none";
	}
	else if(movesCount > 25){
		//display 1 stars
		starsCount = 1;
		secondStar.style.display = "none";
		thirdStar.style.display = "none";
	}
}

function setMovesCount() {
	// body...
	movesCount++;
	moveTxt.textContent = movesCount;
	setStars();
}

function timerStart() {
	// body...
	// code from : http://jsfiddle.net/fc37nckg/
	var sec = 0;

	function pad(val) {
	    return val > 9 ? val : "0" + val;
	}
		timer = setInterval(function () {

	    seconds =(pad(++sec % 60));
	    minutes = (pad(parseInt(sec / 60, 10)));
	    document.getElementById("seconds").innerHTML = seconds;
	    document.getElementById("minutes").innerHTML =minutes;
	}, 1000);
}


function setOpenfirst(allCardsList) {
	// body...
	for(card of allCardsList){
		card.classList.remove('show','open','match');
		card.classList.toggle('open');
		card.classList.toggle('show');
	}

}
function startGame() {
	modal.style.display = "none";
    machedCardsList = [];
	toChickList = [];
	isGameStarted = true;
	movesCount = 0;
	moveTxt.textContent = movesCount;
	setStars();
	// 1st: Shuffle the card !
	shuffleCards();
	// 2nd: open all the cards to show it in some time (2secs) then close!
		setOpenfirst(allCardsList);
		setTimeout(function(){ closeAllCard(allCardsList); }, 3000);

	setTimeout(function(){ timerStart(); }, 2000);
}
//addEventListener to reset butten 
rest.addEventListener('click', function () {
	// body...
	startGame();
});

//addEventListener to "Play Again?" Butten in the modal 
startAgain.addEventListener('click', function () {
	// body...
	startGame();
});

modalClose.addEventListener('click', function () {
	// body...
	modal.style.display = "none";
});
//addEventListener to all cards
deck.addEventListener('click', event => {
	const clickTarget = event.target;
// it is card & its not matched alraddy & toChickList is less than 2=(1 or 0) & not opened allraddy! 
	if (
		clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match') &&
		toChickList.length < 2 && !toChickList.includes(clickTarget) ) 
	{
		// call fuction to display the card's symbol pass the clicked  card 
		openCard(clickTarget);
		toChickList.push(clickTarget);
		if(toChickList.length == 2)
		{
			// if the list already has another card, check to see if the two cards match
			chickifMatched(toChickList);
			toChickList=[];
		}
	}
	});
