function getEntierAleatoire(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getElementAleatoire(liste) {
  let longueurListe = liste.length;
  let entierAleatoireIndexeParListe = getEntierAleatoire(0, longueurListe);
  return liste[entierAleatoireIndexeParListe];
}

function array2DContainsArray(array2D, arraySearch) {
  let itemString = JSON.stringify(arraySearch);
  let contains = array2D.some(function(element) {
    return JSON.stringify(element) === itemString;
  });
  return contains;
}

function getIndexOf2DArray(array2D, k) {
  for (var i = 0; i < array2D.length; i++) {
    var currentArray = array2D[i];
    if (currentArray[0] == k[0] && currentArray[1] == k[1]) {
      return i;
    }
  }
}


function getColorOfPionPlaced(indexHorizontale, indexVerticale) {
  listePionsRouge = jeton.get(1)
  listePionJaune  = jeton.get(2)

  if (array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
    return 'red';
  }
  else if (array2DContainsArray(listePionJaune, [indexHorizontale, indexVerticale])) {
    return 'yellow';
  }
  else {
    return false;
  }
}