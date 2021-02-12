var jeton = jeton || (function(){
	var listPionTeam1 = [];
    var listPionTeam2 = [];
    return {
        add : function(event, Py, Px) {
        	if (monTour.get()) {
        		if (Py >= 4 && Px >= 4 && Py <= game.getPy() && Px <= game.getPx())
        		{
        			let num = $(event).attr('case');
					let placeIsNotTaken = true;
					let compteur = Py;
					if (monTour.get()) {
						while (compteur > 0 && placeIsNotTaken)
						{
							let jetonHasTeam = $(".row[val='" + compteur + "'] .icon[case='" + num + "']").attr('team');
							if (!jetonHasTeam) {
								listPionTeam1.push([compteur, num]);
								$(".row[val='" + compteur + "'] .icon").attr('surbrillance', '');
								$(".row[val='" + compteur + "'] .icon[case='" + num + "']").replaceWith(searchPiece('red', num));
								$(".row[val='" + compteur + "'] .icon[case='" + num + "']").attr('team', 'red');
								game.select(event, Py);
								placeIsNotTaken = false;
								monTour.set(false);
								isWinner = verifWin(Px, Py, 'red');
								if (isWinner) {
									setWinner(isWinner);
									$('#game p#tour').text('Tu as gagné !');
									game.log("Puissance 4", "Gagné ! Bien joué");
									game.unSelect();
								}
								else {
									$('#game p#tour').text('Au tour de l\'adversaire!');
									setTimeout(function(){
										if (setRobot(Py, Px, 'yellow')) {
											$('#game p#tour').text('Damn ! Tu as perdu !');
											game.log("Puissance 4", "Perdu ! :(");
											monTour.set(false);
											game.unSelect();
										}
									}, 50);
								}
							}
							compteur--;
						}
					}
					game.log("Puissance 4", "Jeton en X:" + num + " Y:" + (compteur+1));
				
	        	}
	    		else
	    		{
	    			throw "Emplacement de pion inatteignable"; 
	    		}
    		}
			else {
				throw "Aucun jeton ne peux être ajouté actuellement."; 
			}
	        	
        },
        set : function (team, value) {
        	if (team == 1)
        	{
        		this.listPionTeam1.push(value);
        	}
        	else if (team == 2) {
        		this.listPionTeam2.push(value);
        	}
        	else {
        		throw "Le joueur est introuvable";
        	}
        },
        clear : function() {
        	this.listPionTeam1 = [];
        	this.listPionTeam2 = [];
        	game.log("Puissance 4", "Les données des pions ont été effacés");
        },
        get : function(team) {
        	if (team == 1)
        	{
        		return this.listPionTeam1;
        	}
        	else if (team == 2) {
        		return this.listPionTeam2;
        	}
        	else {
        		throw "Le joueur est introuvable";
        	}
        	
        },
        getTeam2 : function() {
        	return this.listPionTeam2;
        }
    };
}());