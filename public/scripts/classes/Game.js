var game =
  (function () {
    var Px;
    var Py;
    return {
      init: function (Px, Py) {
        this.Px = Px;
        this.Py = Py;
        this.disable()
        jeton.init();
        game.log(
          "Puissance 4",
          "Initialisation du jeu en " + this.Px + "x" + this.Py
        );
      },
      select: function (indexHorizontale) {
        indexHorizontale = parseInt(indexHorizontale)
        let indexVerticale = game.getPy();
        while (indexVerticale > 0) {
          let teamColor = getColorOfPionPlaced(indexHorizontale, indexVerticale)
          if (!teamColor) {
            let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
            couleur.attr("surbrillance", "red");
            return;
          }
          indexVerticale--;
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
      setMessage: function (message) {
        $("#game p#tour").text(message);
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
            this.setMessage("Tu as gagné !");
            game.log("Puissance 4", "Gagné ! Bien joué");
            game.unSelect();
          } else if (gagnantJaune) {
            setWinner(gagnantJaune);
            this.setMessage("Tu as perdu la partie !");
            game.log("Puissance 4", "Perdu ! :(");
            monTour.set(false);
            game.unSelect();
          }
        }
        
        
        game.log("Puissance 4", "Fin de l'import");
      },
      setWinner: function(couleur, pionsGagnants) {
        game.disable()
        if (pionsGagnants) {       
          for (i = 0; i < pionsGagnants.length; i++) {
            let indexVerticale = pionsGagnants[i][0]
            let indexHorizontale   = pionsGagnants[i][1]
            let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
            $(couleur).css("opacity", 1)
          }
        }
        if (couleur == 'red') {
          this.setMessage("Les rouges ont gagnés");
        } else if (couleur == 'yellow') {
          this.setMessage("Les jaunes ont gagnés");
        } else {
          this.setMessage("Match nul !");
        }
      },
      log: function (prefix, message) {
        console.log(
          "%c[" + prefix + "] %c" + message,
          "color: purple; font-size: 13px; font-weight: bold;",
          "font-size: 13px;"
        );
      },
      disable: function() {
        $("#game .icon").css("opacity", 0.3)
        monTour.set(false)
      },
      enable: function() {
        $("#game .icon").css("opacity", 1)
        monTour.set(true)
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
