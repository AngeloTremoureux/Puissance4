function isWinner_horizontal(Px, Py, Color) {
	// Vérification en horizontal
	let Surbrillance = [];
	let couleur;
	for (let i = 1; i <= Py; i++) {
		let count = 0;
		Surbrillance = [];
		for (let j = 1; j <= Px; j++) {
			
			couleur = $('.row[val="' + i + '"] .icon[case="' + j + '"]').attr('team');
			if (couleur == Color) {
				count++;
				Surbrillance.push([i, j]); // Surbrillance[val][case];
				if (count >= 4) {
					return Surbrillance;
				}
			}
			else {
				Surbrillance = [];
				count = 0;

			}

		}
		if (count >= 4) {
			return Surbrillance;
		}
	}
	return false;
}

function isWinner_vertical(Px, Py, Color) {
	for (let i = 0; i < Px; i++) {
		let Surbrillance = [];
		let count = 0;
		let couleur, calc, calc2;
		for (let j = 0; j < Py; j++) {
			couleur = $('.row[val] .icon[case="' + (i + 1) + '"]').eq((j)).attr('team');
			//console.log("verif vertical : case=" + (i + 1) + "val=" + j + "couleur:" + couleur + "count:" + count);
			if (couleur == Color) {
				calc = i+1;
				//console.log("+1 Count : count=" + count);
				calc2 = j+1;
				Surbrillance.push([calc2, calc]);
				count++;
				if (count >= 4) {
					return Surbrillance;
				}
			}
			else {
				Surbrillance = [];
				count = 0;
			}
		}
		if (count >= 4) {
			return Surbrillance;
		}
	}
	return false;
}

function isWinner_diagonalTopLeft(Px, Py, Color) {
	let parseVal = 4, returnParseVal = 4;
	let couleur, CombienDeMonter, count;
	let parseCaseBas = 2;
	let parseCase = 1;
	let Surbrillance = [];
	const nombreDeBoucle = Px+Py-7;
	for (let i = 0; i < nombreDeBoucle; i++) {
		count = 0;
		if (parseVal <= Py) {
			// Vérifier la ligne en diagonale
			for (let j = 0; j < returnParseVal; j++) {
				couleur = $('.row[val="' + parseVal + '"] .icon[case="' + parseCase + '"]').attr('team');
				if (couleur == Color) {
					Surbrillance.push([parseVal, parseCase]);
					count++;
					if (count >= 4) {
						return Surbrillance;
					}
				}
				else {
					count = 0;
					Surbrillance = [];
				}
				parseVal--;
				parseCase++;
			}
			parseCase = 1;
			returnParseVal++;
			parseVal = returnParseVal;
		}
		else {
			count = 0;
			parseCase = parseCaseBas;
			CombienDeMonter = Px - 1;
			Surbrillance = [];
			parseVal = Py;
			if (CombienDeMonter >= 4) {
				// Vérifier la ligne en diagonale
				for (let j = 0; j < CombienDeMonter; j++) {
					couleur = $('.row[val="' + parseVal + '"] .icon[case="' + parseCase + '"]').attr('team');
					if (couleur == Color) {
						Surbrillance.push([parseVal, parseCase]);
						count++;
						if (count >= 4) {
							return Surbrillance;
						}
					}
					else {
						count = 0;
						Surbrillance = [];
					}
					parseVal--;
					parseCase++;					
				}
				CombienDeMonter--;
				parseCaseBas++;
			}
			parseVal = Py;
			returnParseVal++;
			parseVal = returnParseVal;
		}
	}
	return false;
}

function isWinner_diagonalTopRight(Px, Py, Color) {
	let parseVal = 4, returnParseVal = 4;
	let parseCase = Px;
	let parseCase2, returnParseCase = Px - 1;
	let couleur, count;
	let Surbrillance = [];
	const nombreDeBoucle = Px + Py - 7;
	for (let i = 0; i < nombreDeBoucle; i++) {
		count = 0;
		if (parseVal <= Py) {
			// Vérifier la ligne en diagonale
			for (let j = 0; j < returnParseVal; j++) {
				couleur = $('.row[val="' + parseVal + '"] .icon[case="' + parseCase + '"]').attr('team');
				if (couleur == Color) {
					Surbrillance.push([parseVal, parseCase]);
					count++;
					if (count >= 4) {
						return Surbrillance;
					}
				}
				else {
					count = 0;
					Surbrillance = [];
				}
				parseVal--;
				parseCase--;
			}
			parseCase = Px;
			returnParseVal++;
			Surbrillance = [];
			parseVal = returnParseVal;
		}
		else {
			parseCase2 = returnParseCase;
			Surbrillance = [];
			count = 0;
			CombienDeMonter = Px - 1;
			parseVal = Py;
			if (CombienDeMonter >= 4) {
				// Vérifier la ligne en diagonale
				for (let j = 0; j < CombienDeMonter; j++) {
					couleur = $('.row[val="' + parseVal + '"] .icon[case="' + parseCase2 + '"]').attr('team');
					if (couleur == Color) {
						Surbrillance.push([parseVal, parseCase2]);
						count++;
						if (count >= 4) {
							return Surbrillance;
						}
					}
					else {
						count = 0;
						Surbrillance = [];
					}
					parseVal--;
					parseCase2--;
				}
				Surbrillance = [];
				CombienDeMonter--;
				returnParseCase--;
				count = 0;
			}
			parseVal = Py;
			returnParseVal++;
			parseVal = returnParseVal;
		}
	}
	return false;
}