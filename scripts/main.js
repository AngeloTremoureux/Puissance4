var game = game || (function () {
    var Px;
    var Py;
    return {
        init: function (Px, Py) {
            this.Px = Px;
            this.Py = Py;
            monTour.set(true);
            jeton.init();
            game.log("Puissance 4", "Initialisation du jeu en " + this.Px + "x" + this.Py);
        },
        select: function (event, Py) {
            let num = $(event).attr('case');
            let style = $(event).attr('style');
            let placeIsNotTaken = true;
            let compteur = Py;
            while (compteur > 0 && placeIsNotTaken)
            {
                let teamColor = $(".row[val='" + compteur + "'] .icon[case='" + num + "']").attr('team');
                if (!teamColor && !style) {
                    $(".row[val='" + compteur + "'] .icon[case='" + num + "']").attr('surbrillance', 'red');
                    placeIsNotTaken = false;
                }
                compteur--;
            }
        },
        getPx: function () {
            return this.Px;
        },
        getPy: function () {
            return this.Py;
        },
        unSelect: function () {
            $(".row .icon").attr('surbrillance', '');
        },
        log: function (prefix, message) {
            console.log("%c[" + prefix + "] %c" + message, "color: purple; font-size: 13px; font-weight: bold;", "font-size: 13px;");
        },
        createBackground: function () {
            let Px = this.Px;
            let Py = this.Py;
            for (let i = 0; i < Py; i++) {
                let rowY = '<div class="row" val="' + (i + 1) + '"></div>';
                $('#game').append(rowY);
                for (let j = 0; j < Px; j++) {
                    $('.row[val="' + (i + 1) + '"]').append(searchPiece(null, j + 1));
                }
            }
            game.log("Puissance 4", "Chargement du contexte");

            $("#game .icon").click(function (event) {
                if (monTour.get()) {
                    jeton.add($(this), Py, Px);
                }
            });
            $("#game .icon").mouseover(function (event) {
                if (monTour.get()) {
                    game.select($(this), Py);
                }
            }).mouseout(function (event) {
                if (monTour.get()) {
                    game.unSelect();
                }
            });
        },
        getPositionX: function (event) {
            return ($(event).attr('case'));
        },
        getPositionY: function (event) {
            return ($(event).parent().attr('val'));
        },

    };
}());
var monTour = monTour || (function () {
    var monTour;
    return {
        set: function (boolMonTour) {
            this.monTour = boolMonTour;
        },
        get: function () {
            return this.monTour;
        }
    };
}());
jQuery(document).ready(function ($) {

    $("html").keydown(function () {
        let canPlay = monTour.get();
        if (canPlay) {
            let key = event.keyCode;
            if ($("#game .row .icon[surbrillance='red']").length) {
                let id = $("#game .row .icon[surbrillance='red']").attr('case');
                let caseDuPion = parseInt(id, 10);
                if (caseDuPion) {
                    if (key == 39) { // flèche droite : simulation à droite
                        caseDuPion++;
                        while ($("#game .row[val='1'] .icon[case='" + caseDuPion + "']").attr('team'))
                        {
                            caseDuPion++;
                        }
                        if (caseDuPion >= game.getPx() + 1) {
                            caseDuPion = 1;
                        }
                        $("#game .row .icon").mouseout();
                        $("#game .row[val='1'] .icon[case='" + caseDuPion + "']").mouseover();
                    } else if (key == 37) { // flèche gauche : simulation à gauche
                        caseDuPion--;
                        while ($("#game .row[val='1'] .icon[case='" + caseDuPion + "']").attr('team'))
                        {
                            caseDuPion--;
                        }
                        if (caseDuPion <= 0) {
                            caseDuPion = game.getPx();
                        }
                        $("#game .row .icon").mouseout();
                        $("#game .row[val='1'] .icon[case='" + caseDuPion + "']").mouseover();
                    } else if (key == 13 || key == 38) { // touche entré ou flèche haut : simulation d'un click
                        $("#game .row .icon[surbrillance='red']").click();
                    }
                }

            } else {
                $("#game .row .icon").mouseout();
                $("#game .row[val='1'] .icon[case='1']").mouseover();
            }
        }
    });
});

