/*
 * Create a list that holds all of your cards
 */

/*VARIAVEIS*/
let t0 = 0;
let t1 = 0;
let y = ""
let carta1 = "";
let carta2 = "";
let time = 0;
let clicks = 0;
let matches = 0;
var estrela = 0;
let segundos = 0;
let minutos = 0;
let cards = [];
let deck = document.querySelector('.deck')
cont = deck.childNodes;
for (var i=0; i<=cont.length; i++) {
	cards[i] = cont[i];
}
let init = false;
let restart = false;
let intervalo;
let unmatched = 0;



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
	t1 = performance.now();
	/*ZERANDO VARIAVEIS*/
	y = ""
	carta1 = "";
	carta2 = "";
	t0 = 0;
	time = 0;
	clicks = 0;
	estrela = 0;
	segundos = 0;
	minutos = 0;
	init = false;
	restart = true;
	matches = 0;
	/*FECHA O MODAL*/
	$('.modal').css('display','none');
	
	/*ZERA AS INFORMAÇÕES*/
	$('.stars li').remove();
	$('.moves').html(estrela+" Estrelas");
	$('.clicks').html(clicks+" Cliques");
	$('#segundo').html('00s');
	$('#minuto').html('00m');
	$('#hora').html('00h');
	window.clearInterval(intervalo);


}


/*APLICA AS CLASSES PARA ABRIR AS CARTAS SELECIONADAS*/
function openCart () {
	
	if(!$(this).hasClass('match')){
		if ((y==0) & (!$('.card').hasClass('open'))){
			carta1 = $(this);
			carta1.addClass('open show');
			y++;
			clicks++;
		}else if((y==1)&(!$(this).hasClass('open show'))) {
			carta2 = $(this);
			carta2.addClass('open show');
			y++;
			clicks++;
			checkCart();
		}
	}
	$('.score-panel .clicks').html(clicks+' Cliques');
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
			matches++;
		}else {
			setTimeout(function() { 
				carta1.removeClass('open show');
				carta2.removeClass('open show');
				unmatched++;
			}, 800);
		}
	}
	
	if(matches == 8) {
		result();
	}
	y = 0;
	removeEstrelas();
}

function removeEstrelas () {
	if(unmatched == 3) {
		$('.stars li:eq(0)').remove();
	}else if(unmatched == 6){
		$('.stars li:eq(0)').remove();

	}
}

/*VERIFICA SE TODOS OS PARES FORAM ENCONTRADOS E CALCULA O RESULTADO (CLIQUES, TEMPO, E ESTRELAS) EXIBINDO O MODAL*/
function result () {
	if(clicks == 16) {
		estrela = 3;
	}else if(clicks <= 22){
		estrela = 2;
	}else{
		estrela = 1;
	}

	for(var i=0; i < estrela; i++){
		console.log(estrela);
		$('.stars').append('<li><i class="fa fa-star"></i></li>');
	}

	time = performance.now() - t0;

	var calc = ((time/1000)%60).toFixed(0);
	minutos  = ((time/60000)%60).toFixed(0); 
	segundos = (calc%60);


	$('.moves').html(estrela);
	$('.timer').html("Tempo: "+minutos+" minutos e "+segundos+" segundos"); 
	$('.clicks').html("Total de cliques: "+clicks);
	$('.modal').slideDown();
}

function initGame () {
	if(init != true) {
		var s = 1;
		var m = 0;
		var h = 0;
		intervalo = window.setInterval(function() {
			if (s == 60) { 
				m++; 
				s = 0;
			}
			if (m == 60) { 
				h++; 
				s = 0; 
				m = 0; 
			}
			if (h < 10) {
				$('#hora').html('0'+h+'h'); 
			}else {
				$('#hora').html(h+'h');
			} 
			if (s < 10) {
				$('#segundo').html('0'+s+'s'); 
			}else {
				$('#segundo').html(s+ 's');
			}
			if (m < 10) {
				$('#minuto').html('0'+m+'m');
			}else {
				$('#minuto').html(m+'m');
			}		
			s++;
		},1000);
	}
	init = true;
}


/*CHAMA A FUNÇÃO openCart QUANDO UMA CARTA É CLICADA*/
$('.card').click(openCart);
$('.card').click(initGame);



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