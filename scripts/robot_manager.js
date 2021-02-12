function setBot(Color) {
    let Px = game.getPx();
    let Py = game.getPy();
    resetGame();
    RobotVsRobot(Py, Px, Color);
}

function RobotVsRobot(Py, Px, Color) {
    let returnKey = setRobot(Py, Px, Color);
    setMatch(returnKey, Px, Py, Color);
}

function setRobot(Py, Px, Color) {
    let liste = [];
    for (let i = 1; i <= Px; i++) {
        let el = $(".row[val=1] .icon[case='" + i + "']").attr('team');
        if (!el) {
            liste.push(i);
        }
    }
    let num2 = Math.floor((Math.random() * liste.length + 2) - 1);
    let num = liste[num2 - 1];
    // On parcours la liste des cases encore jouables
    let onlyOne;
    for (let i = liste.length; i > 0; i--) {
        onlyOne = true;
        // On cherche la première case disponible
        for (let j = Py; j > 0; j--) {
            let teamColor = $(".row[val='" + j + "'] .icon[case='" + liste[i - 1] + "']").attr('team');
            if (!teamColor && onlyOne) {
                onlyOne = false;
                $(".row[val='" + j + "'] .icon[case='" + liste[i - 1] + "']").attr('team', 'red');
                let isWinner_red = verifWin(Px, Py, 'red');
                $(".row[val='" + j + "'] .icon[case='" + liste[i - 1] + "']").attr('team', 'yellow');
                let isWinner_yellow = verifWin(Px, Py, 'yellow');
                $(".row[val='" + j + "'] .icon[case='" + liste[i - 1] + "']").attr('team', '');
                if (isWinner_red || isWinner_yellow) {
                    num = liste[i - 1];
                }
            }
        }
    }
    if (!num) {
        $('#game p#tour').text('La partie est nulle !');
        return 2;
    } else {
        let boucleActive = true;
        let i = Py;
        while (i > 0 && boucleActive) {
            let teamColor = $(".row[val='" + i + "'] .icon[case='" + num + "']").attr('team');
            if (!teamColor) {
                boucleActive = false;
                $(".row[val='" + i + "'] .icon[case='" + num + "']").replaceWith(searchPiece(Color, num))
                $(".row[val='" + i + "'] .icon[case='" + num + "']").attr('team', Color);
                monTour.set(true);
                jeton.set(2, [i, num]);
                $('#game p#tour').text('A ton tour !');
                isWinner = verifWin(Px, Py, Color);
                if (isWinner) {
                    setWinner(isWinner);
                    return true;
                } else {
                    return false;
                }

            }
            i--;
        }
    }


}