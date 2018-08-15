/*
 * Create a list that holds all of your cards
 */
 cards = [];
let deck = document.querySelector('.deck')
cont = deck.childNodes;
for (var i=0; i<=cont.length; i++) {
	cards[i] = cont[i];
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function start() {
	cards = shuffle(cards);
	for(var i=0; i < cards.length; i++) {
		cards.forEach(function (item) {
			document.querySelector('.deck').appendChild(item);
		});
	}
}

let y = ""
let carta1 = "";
let carta2 = "";
function openCart () {
	if (y<1){
		carta1 = $(this);
		carta1.addClass('open show');
		y++;
	}else {
		carta2 = $(this);
		carta2.addClass('open show');
		y = 0;
		checkCart();
	}
}

function checkCart () {
	if(carta1.children().attr('class') == carta2.children().attr('class')) {
		carta1.addClass('match');
		carta2.addClass('match');
	}else {
		setTimeout(function() { 
			carta1.removeClass('open show');
			carta2.removeClass('open show');
		}, 2000);
		
	}
}

$('.card').click(openCart);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */