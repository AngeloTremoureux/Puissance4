function verifWin(Px, Py, Color) {
    let verification = isWinner_horizontal(Px, Py, Color);
    if (verification) {
        return verification;
    }
    verification = isWinner_vertical(Px, Py, Color);
    if (verification) {
        return verification;
    }
    verification = isWinner_diagonalTopLeft(Px, Py, Color);
    if (verification) {
        return verification;
    }
    verification = isWinner_diagonalTopRight(Px, Py, Color);
    if (verification) {
        return verification;
    } else {
        return false;
    }
}

function setWinner(Surbrillance) {
    let couleur;
    $(".icon[case]").css('opacity', 0.3);
    for (i = 0; i < Surbrillance.length; i++) {
        couleur = $('.row[val="' + Surbrillance[i][0] + '"] .icon[case="' + Surbrillance[i][1] + '"]');
        $(couleur).css('opacity', 1);
    }
}