/*
 * Create a list that holds all of your cards
 */

/*VARIAVEIS*/
let y = ""
let carta1 = "";
let carta2 = "";
let time = "";
let clicks = 0;
let matches = 0;
let pontos = 0;
var estrela = 0;
let segundos = 0;
let minutos = 0;
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

/*REINICIA O JOGO*/
function start() {
	cards = shuffle(cards);
	$('.card').removeClass('open show match');
	for(var i=0; i < cards.length; i++) {
		cards.forEach(function (item) {
			$('.deck').append(item);
		});
	}
}


/*APLICA AS CLASSES PARA ABRIR AS CARTAS SELECIONADAS*/
function openCart () {
	time = performance.now();
	if(!$(this).hasClass('match')){
		clicks = clicks+1;
		if (y<1){
			carta1 = $(this);
			carta1.addClass('open show');
			y++;
		}else if(!$(this).hasClass('open show')) {
			carta2 = $(this);
			carta2.addClass('open show');
			y = 0;
			checkCart();
		}
	}
}

/*VERIFICA SE AS CARTAS SÃO IGUAIS E APLICA A CLASSE MATCH*/
function checkCart () {
	if ((carta1 != "") & (carta2 != "")) {
		console.log('entrou');
		if(carta1.children().attr('class') == carta2.children().attr('class')) {
			carta1.addClass('match');
			carta1.removeClass('open show');
			carta2.addClass('match');
			carta2.removeClass('open show');
			matches = matches+1;
		}else {
			setTimeout(function() { 
				carta1.removeClass('open show');
				carta2.removeClass('open show');
			}, 500);
		}
	}
	
	if(matches == 8) {
		result();
	}
}

/*VERIFICA SE TODOS OS PARES FORAM ENCONTRADOS E CALCULA O RESULTADO (CLIQUES, TEMPO, E ESTRELAS) EXIBINDO O MODAL*/
function result () {
	pontos = (time/clicks).toFixed(2);
	if(pontos <= 1000.00) {
		estrela = 3;
	}else if(pontos <= 1100.00){
		estrela = 2;
	}else{
		estrela = 1;
	}

	for(var i=0; i < estrela; i++){
		console.log(estrela);
		$('.stars').append('<li><i class="fa fa-star"></i></li>');
	}

	var calc = ((time/1000)%60).toFixed(0);
	minutos  = ((time/60000)%60).toFixed(0); 
	segundos = (calc%60);

	$('.timer').html("Tempo: "+minutos+" minutos e "+segundos+" segundos"); 
	$('.clicks').html("Total de cliques: "+clicks);
	$('.modal').slideDown();
}

/*CHAMA A FUNÇÃO openCart QUANDO UMA CARTA É CLICADA*/
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