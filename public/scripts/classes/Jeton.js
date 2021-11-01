var jeton =
  jeton ||
  (function () {
    var listPionTeam2;
    var listPionTeam1;
    return {
      init: function () {
        this.listPionTeam1 = new Array();
        this.listPionTeam2 = new Array();
      },
      forceAdd: function(positionHorizontale, positionVerticale, couleur) {
        $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(searchPiece(couleur, positionHorizontale));
        $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team",couleur);
        if (couleur == 'yellow') {
          this.set(2, [positionHorizontale, positionVerticale]);
        } else {
          this.set(1, [positionHorizontale, positionVerticale]);
        }
      },
      add: function (event, tailleVerticale, tailleHorizontale) {
        let indexHorizontaleClicked = parseInt($(event).attr("case"));
        let placeIsNotTaken = true;
        let indexVerticale = tailleVerticale;
        if (monTour.get()) {
          while (indexVerticale > 0 && placeIsNotTaken) {
            let couleurDuPion = getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale);
            if (!couleurDuPion) {
              placeIsNotTaken = false;
              monTour.set(false);

              game.unSelect();
              this.forceAdd(indexHorizontaleClicked, indexVerticale, "red")
              game.select(event.attr('case'));
              
              let lesPionsGagnants = verifWin(tailleHorizontale, tailleVerticale, "red");
              if (lesPionsGagnants) {
                game.setWinner('red', lesPionsGagnants);
              } else {
                $("#game p#tour").text("Au tour de l'adversaire!");
                setTimeout(function () {
                  if (robotPlaceUnPion(tailleHorizontale, tailleVerticale, "yellow")) {
                    $("#game p#tour").text("Tu as perdu la partie !");
                    game.log("Puissance 4", "Perdu ! :(");
                    monTour.set(false);
                    game.unSelect();
                  } else {
                    monTour.set(true);
                    $("#game p#tour").text("A ton tour !");
                  }
                }, 50);
              }
            }
            indexVerticale--;
          }
          game.log(
            "Puissance 4",
            "Jeton en X:" + indexHorizontaleClicked + " Y:" + (indexVerticale + 1)
          );
        }
      },
      set: function (team, value) {
        if (team == 1 || team == 'red') {
          this.listPionTeam1.push(value);
        } else if (team == 2 || team == 'yellow') {
          this.listPionTeam2.push(value);
        } else {
          throw "Le joueur est introuvable";
        }
      },
      remove: function (team, value) {
        let index;
        if (team == 1 || team == 'red') {
          index = getIndexOf2DArray(this.listPionTeam1, value)
          this.listPionTeam1.splice(index, 1)
        } else if (team == 2 || team == 'yellow') {
          index = getIndexOf2DArray(this.listPionTeam2, value)
          this.listPionTeam2.splice(index, 1)
        } else {
          throw "Le joueur est introuvable";
        }
      },
      clear: function () {
        this.listPionTeam1 = [];
        this.listPionTeam2 = [];
        game.log("Puissance 4", "Les données des pions ont été effacés");
      },
      get: function (team) {
        if (team == 1 || team == 'red') {
          return this.listPionTeam1;
        } else if (team == 2 || team == 'yellow') {
          return this.listPionTeam2;
        } else {
          throw "Le joueur est introuvable";
        }
      }
    };
  })();
