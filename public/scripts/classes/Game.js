var game =
  (function () {
    var Px;
    var Py;
    return {
      init: function (Px, Py) {
        this.Px = Px;
        this.Py = Py;
        monTour.set(true);
        jeton.init();
        game.log(
          "Puissance 4",
          "Initialisation du jeu en " + this.Px + "x" + this.Py
        );
      },
      select: function (event, Py) {
        let num = $(event).attr("case");
        let style = $(event).attr("style");
        let placeIsNotTaken = true;
        let compteur = Py;
        while (compteur > 0 && placeIsNotTaken) {
          let teamColor = $(
            ".row[val='" + compteur + "'] .icon[case='" + num + "']"
          ).attr("team");
          if (!teamColor && !style) {
            $(".row[val='" + compteur + "'] .icon[case='" + num + "']").attr(
              "surbrillance",
              "red"
            );
            placeIsNotTaken = false;
          }
          compteur--;
        }
      },
      getPx: function () {
        return parseInt(this.Px);
      },
      getPy: function () {
        return parseInt(this.Py);
      },
      unSelect: function () {
        $(".row .icon").attr("surbrillance", "");
      },
      export: function() {
        game.log("Puissance 4", "Affichage de l'export...");
        let params = [];
        params['red']    = jeton.get('red')
        params['yellow'] = jeton.get('yellow')
        red = params['red'];
        yellow = params['yellow'];
        let request = $.ajax({
          type: 'POST',
          url: "api/export?x=" + this.Px + "&y=" + this.Py,
          data: {red:red, yellow:yellow},
          cache: false,
          timeout: 120000
        })
        request.done(function (output_success) {
          console.log(output_success)
          game.log("Puissance 4", "L'export s'est correctement terminé");
        })
        request.fail(function (http_error) {
          let server_msg = http_error.responseText;
          let code = http_error.status;
          let code_label = http_error.statusText;
          game.log("Puissance 4", "Echec lors de l'export ("+code+")");
        });
      },
      import: function(gameObject, parameters) {
        game.log("Puissance 4", "Début de l'import ...");
        game.log("Puissance 4", "Initialisation des paramètres ...");
        this.Px = gameObject.parametres.x
        this.Py = gameObject.parametres.y
        resetGame()
        game.log("Puissance 4", "Import des pions ...");
        gameObject.datas.pions.red.forEach(pionRouge => {
          jeton.forceAdd(pionRouge[0], pionRouge[1], 'red')
        });
        gameObject.datas.pions.yellow.forEach(pionYellow => {
          jeton.forceAdd(pionYellow[0], pionYellow[1], 'yellow')
        });
        if (parameters) {
          game.log("Puissance 4", "Vérification d'un potentiel gagnant ...");
          let gagnantRouge = verifWin(this.Px, this.Py, "red");
          let gagnantJaune = verifWin(this.Px, this.Py, "yellow");
          if (gagnantRouge) {
            setWinner(gagnantRouge);
            $("#game p#tour").text("Tu as gagné !");
            game.log("Puissance 4", "Gagné ! Bien joué");
            game.unSelect();
          } else if (gagnantJaune) {
            setWinner(gagnantJaune);
            $("#game p#tour").text("Tu as perdu la partie !");
            game.log("Puissance 4", "Perdu ! :(");
            monTour.set(false);
            game.unSelect();
          }
        }
        
        
        game.log("Puissance 4", "Fin de l'import");
      },
      setWinner: function(couleur, pionsGagnants) {
        if (pionsGagnants) {
          let couleur;
          $("#game .icon").css("opacity", 0.3);
          
          for (i = 0; i < pionsGagnants.length; i++) {
            let indexHorizontale = pionsGagnants[i][0]
            let indexVerticale   = pionsGagnants[i][1]
            couleur = $("#game .row").eq((indexHorizontale - 1)).find(".icon").eq((indexVerticale - 1))
            $(couleur).css("opacity", 1)
          }
        }
        if (couleur == 'red') {
          $("#game p#tour").text("Les rouges ont gagnés");
        } else if (couleur == 'yellow') {
          $("#game p#tour").text("Les jaunes ont gagnés");
        } else {
          $("#game p#tour").text("Match nul !");
        }
      },
      log: function (prefix, message) {
        console.log(
          "%c[" + prefix + "] %c" + message,
          "color: purple; font-size: 13px; font-weight: bold;",
          "font-size: 13px;"
        );
      },
      createBackground: function() {
        let Px = this.Px;
        let Py = this.Py;
        for (let i = 1; i <= this.Py; i++) {
          let rowY = '<div class="row" val="' + i + '"></div>';
          $("#game").append(rowY);
          for (let j = 1; j <= this.Px; j++) {
            $('.row[val="' + i + '"]').append(searchPiece(null, j));
          }
        }
      },
      getPositionX: function (event) {
        return $(event).attr("case");
      },
      getPositionY: function (event) {
        return $(event).parent().attr("val");
      },
    };
  })();
