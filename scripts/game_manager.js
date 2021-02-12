function searchPiece(name, initCase){
	let red_circle = $("#preview #red_circle");
	let yellow_circle = $("#preview #yellow_circle");
	let basic_circle = $("#preview #basic_circle");
	if (initCase) {
		if (name == 'red') {
			$(red_circle).children().attr('case', initCase);
			return $(red_circle).html();
		}
		else if (name == 'yellow') {
			$(yellow_circle).children().attr('case', initCase);
			return $(yellow_circle).html();
		}
		else {
			$(basic_circle).children().attr('case', initCase);
			return $(basic_circle).html();
		}
	}
	else {
		if (name == 'red') {
			return $(red_circle).html();
		}
		else if (name == 'yellow') {
			return $(yellow_circle).html();
		}
		else {
			return $(basic_circle).html();
		}
	}
	
}

function clearGame(){
	$(".row").remove();
}

function resetGame(){
	let Px = game.getPx();
	let Py = game.getPy();
	clearGame();
	game.createBackground(Px, Py);
	$("#tour").text("A toi de commencer !");
	monTour.set(true);
	$(".icon").attr('style', '');
}