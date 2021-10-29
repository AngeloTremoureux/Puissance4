function verifWin(Px, Py, Color) {
  let verification = checkIfWinner.horizontal(Px, Py, Color);
  if (verification) {
    return verification;
  }
  verification = checkIfWinner.vertical(Px, Py, Color);
  if (verification) {
    return verification;
  }
  verification = checkIfWinner.diagonalTopLeft(Px, Py, Color);
  if (verification) {
    return verification;
  }
  verification = checkIfWinner.diagonalTopRight(Px, Py, Color);
  if (verification) {
    return verification;
  } else {
    return false;
  }
}

function verifIfPionPlacedGiveWin(tailleHorizontale, tailleVerticale, numeroColonneHorizontale, numeroColonneVerticale, couleurPion) {
  jeton.set(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale])
  let isWinner = verifWin(tailleHorizontale, tailleVerticale, couleurPion)
  jeton.remove(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale])
  return isWinner;
}