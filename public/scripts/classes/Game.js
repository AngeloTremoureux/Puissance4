class Game {
  constructor(tailleHorizontale, tailleVerticale) {
    this.tailleHorizontaleDuJeu = tailleHorizontale;
    this.tailleVerticaleDuJeu = tailleVerticale;
    this.listePionsRouge = new Array();
    this.listePionsJaune = new Array();
    this.monTour = new MonTour()
    this.disableGame()
    this.log(
      "Puissance 4",
      "Initialisation du jeu en " + this.tailleHorizontaleDuJeu + "x" + this.tailleVerticaleDuJeu
    );
    Game.game = this;
  }
  static getGame(tailleHorizontale, tailleVerticale) {
    if (Game.game) {
      return Game.game
    } else {
      return new Game(tailleHorizontale, tailleVerticale)
    }
  }
  searchPiece(couleur, initCase) {
    const redCircle = $('#preview #red_circle')
    const yellowCircle = $('#preview #yellow_circle')
    const defaultCircle = $('#preview #basic_circle')
    if (initCase) {
      if (couleur === 'red') {
        $(redCircle).children().children().attr('case', initCase)
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        $(yellowCircle).children().children().attr('case', initCase)
        return $(yellowCircle).html()
      } else {
        $(defaultCircle).children().children().attr('case', initCase)
        return $(defaultCircle).html()
      }
    } else {
      if (couleur === 'red') {
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        return $(yellowCircle).html()
      } else {
        return $(defaultCircle).html()
      }
    }
  }
  getColorOfPionPlaced(indexHorizontale, indexVerticale) {
    const listePionsRouge  = this.getPions(1)
    const listePionsJaune  = this.getPions(2)
  
    if (Utils.array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
      return 'red';
    }
    else if (Utils.array2DContainsArray(listePionsJaune, [indexHorizontale, indexVerticale])) {
      return 'yellow';
    }
    else {
      return false;
    }
  }
  clearGame() {
    $('.row').remove()
  }
  resetGame() {
    this.clearGame()
    this.clearPions()
    this.createBackground()
    this.disableGame()
  }
  playGame()  {
    let audio = new Audio('../public/audio/startGame.mp4');
    audio.play();
    audio = null;
    this.resetGame()
    this.setMessage("A toi de jouer !")
    this.enableGame()
  }
  select(indexHorizontale) {
    indexHorizontale = parseInt(indexHorizontale)
    let indexVerticale = this.getTailleVerticale();
    while (indexVerticale > 0) {
      let teamColor = this.getColorOfPionPlaced(indexHorizontale, indexVerticale)
      if (!teamColor) {
        let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
        couleur.attr("surbrillance", "red");
        return;
      }
      indexVerticale--;
    }
  }
  getLesColonnesNonCompletes() {
    let listeColonnesNonCompletes = [];
    for (let indexHorizontale = 1; indexHorizontale <= this.tailleHorizontaleDuJeu; indexHorizontale++) {
      if (!this.getColorOfPionPlaced(indexHorizontale, 1)) {
        listeColonnesNonCompletes.push(indexHorizontale);
      }
    }
    return listeColonnesNonCompletes;
  }
  getTailleHorizontale() {
    return parseInt(this.tailleHorizontaleDuJeu);
  }
  getTailleVerticale() {
    return parseInt(this.tailleVerticaleDuJeu);
  }
  getLesCasesPouvantEtreJouer() {
    let listeDesCasesPouvantEtreJouer = [];
    let listeColonnesNonCompletes = this.getLesColonnesNonCompletes();
    let aTrouverLePion;
    listeColonnesNonCompletes.forEach(numeroColonneHorizontale => {
      let numeroColonneVerticale = this.getTailleVerticale();
      aTrouverLePion = false;
      while (numeroColonneVerticale > 0 && !aTrouverLePion) {
        if (!Utils.array2DContainsArray(this.getPions(1), [numeroColonneHorizontale, numeroColonneVerticale])
          && !Utils.array2DContainsArray(this.getPions(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
            listeDesCasesPouvantEtreJouer.push([numeroColonneHorizontale, numeroColonneVerticale])
            aTrouverLePion = true;
          }

        numeroColonneVerticale--;
      }
    });
    return listeDesCasesPouvantEtreJouer;
  }
  export() {
    this.log("Puissance 4", "Affichage de l'export...");
    let params = [];
    params['red']    = this.getPions('red')
    params['yellow'] = this.getPions('yellow')
    red = params['red'];
    yellow = params['yellow'];
    let request = $.ajax({
      type: 'POST',
      url: "api/export?x=" + this.tailleHorizontaleDuJeu + "&y=" + this.tailleVerticaleDuJeu,
      data: {red:red, yellow:yellow},
      cache: false,
      timeout: 120000
    })
    request.done(function (output_success) {
      console.log(output_success)
      this.log("Puissance 4", "L'export s'est correctement terminé");
    })
    request.fail(function (http_error) {
      let server_msg = http_error.responseText;
      let code = http_error.status;
      let code_label = http_error.statusText;
      this.log("Puissance 4", "Echec lors de l'export ("+code+")");
    });
  }
  unSelect() {
    $(".row .icon").attr("surbrillance", "");
  }
  setMessage(message) {
    $("#game p#tour").text(message);
  }
  import (gameObject, parameters) {
    this.log("Puissance 4", "Début de l'import ...");
    this.log("Puissance 4", "Initialisation des paramètres ...");
    this.tailleHorizontaleDuJeu = gameObject.parametres.x
    this.tailleVerticaleDuJeu = gameObject.parametres.y
    resetGame()
    this.log("Puissance 4", "Import des pions ...");
    gameObject.datas.pions.red.forEach(pionRouge => {
      this.forceAddPion(pionRouge[0], pionRouge[1], 'red')
    });
    gameObject.datas.pions.yellow.forEach(pionYellow => {
      this.forceAddPion(pionYellow[0], pionYellow[1], 'yellow')
    });
    if (parameters) {
      this.log("Puissance 4", "Vérification d'un potentiel gagnant ...");
      let gagnantRouge = WinnerManager.verifWin(this, "red");
      let gagnantJaune = WinnerManager.verifWin(this, "yellow");
      if (gagnantRouge) {
        this.setWinner(gagnantRouge);
        this.setMessage("Tu as gagné !");
        this.log("Puissance 4", "Gagné ! Bien joué");
        this.unSelect();
      } else if (gagnantJaune) {
        this.setWinner(gagnantJaune);
        this.setMessage("Tu as perdu la partie !");
        this.log("Puissance 4", "Perdu ! :(");
        this.monTour.set(false);
        this.unSelect();
      }
    }
    this.log("Puissance 4", "Fin de l'import");
  }
  setWinner(couleur, pionsGagnants) {
    this.disableGame()
    if (pionsGagnants) {       
      for (let i = 0; i < pionsGagnants.length; i++) {
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
  }
  log (prefix, message) {
    console.log(
      "%c[" + prefix + "] %c" + message,
      "color: purple; font-size: 13px; font-weight: bold;",
      "font-size: 13px;"
    );
  }
  disableGame() {
    $("#game .icon").css("opacity", 0.3)
    this.monTour.set(false)
  }
  enableGame() {
    $("#game .icon").css("opacity", 1)
    this.monTour.set(true)
  }
  createBackground() {
    let Px = this.tailleHorizontaleDuJeu;
    let Py = this.tailleVerticaleDuJeu;
    for (let i = 1; i <= this.tailleVerticaleDuJeu; i++) {
      let rowY = '<div class="row" val="' + i + '"></div>';
      $("#game").append(rowY);
      for (let j = 1; j <= this.tailleHorizontaleDuJeu; j++) {
        $('.row[val="' + i + '"]').append(this.searchPiece(null, j));
      }
    }
  }
  forceAddPion(positionHorizontale, positionVerticale, couleur) {
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(this.searchPiece(couleur, positionHorizontale));
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team",couleur);
    if (couleur == 'yellow') {
      this.setPion(2, [positionHorizontale, positionVerticale]);
    } else {
      this.setPion(1, [positionHorizontale, positionVerticale]);
    }
  }
  getPositionHorizontale(event) {
    return $(event).parent().index() + 1;
  }
  addPion(indexHorizontaleClicked) {
    const tailleVerticale = this.getTailleVerticale()
    const tailleHorizontale = this.getTailleHorizontale()
    let placeIsNotTaken = true;
    let indexVerticale = tailleVerticale;
    if (this.monTour.get()) {
      while (indexVerticale > 0 && placeIsNotTaken) {
        let couleurDuPion = this.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale);
        if (!couleurDuPion) {
          placeIsNotTaken = false;
          this.monTour.set(false);
          this.unSelect();
          this.forceAddPion(indexHorizontaleClicked, indexVerticale, "red")
          
          let lesPionsGagnants = WinnerManager.verifWin(this, "red");
          if (lesPionsGagnants) {
            this.setWinner('red', lesPionsGagnants);
          } else {
            this.select(indexHorizontaleClicked);
            this.setMessage("Au tour de l'adversaire!");
            const game = this;
            setTimeout(function () {
              const audio = new Audio('../../public/audio/pop.mp4');
              audio.play();
              const robotManager = RobotManager.getRobotManager(game)
              if (robotManager.robotPlaceUnPion("yellow")) {
                game.setMessage("Tu as perdu la partie !");
                game.log("Puissance 4", "Perdu !");
                game.monTour.set(false);
                game.unSelect();
              } else {
                if (game.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale+1)) {
                  // Si le robot a joué sur la même colonne, on actualise la sélection
                  game.select(indexHorizontaleClicked);
                }
                game.monTour.set(true);
                game.setMessage("A ton tour !");
              }
            }, 50);
          }
        }
        indexVerticale--;
      }
      this.log(
        "Puissance 4",
        "Jeton en X:" + indexHorizontaleClicked + " Y:" + (indexVerticale + 1)
      );
    }
  }
  setPion(team, value) {
    if (team == 1 || team == 'red') {
      this.listePionsRouge.push(value);
    } else if (team == 2 || team == 'yellow') {
      this.listePionsJaune.push(value);
    } else {
      throw new Error("Le joueur est introuvable");
    }
  }
  removePion (team, value) {
    let index;
    if (team == 1 || team == 'red') {
      index = Utils.getIndexOf2DArray(this.listePionsRouge, value)
      this.listePionsRouge.splice(index, 1)
    } else if (team == 2 || team == 'yellow') {
      index = Utils.getIndexOf2DArray(this.listePionsJaune, value)
      this.listePionsJaune.splice(index, 1)
    } else {
      throw "Le joueur est introuvable";
    }
  }
  clearPions () {
    this.listePionsRouge = [];
    this.listePionsJaune = [];
    this.log("Puissance 4", "Les données des pions ont été effacés");
  }
  getPions (team) {
    if (team == 1 || team == 'red') {
      return this.listePionsRouge;
    } else if (team == 2 || team == 'yellow') {
      return this.listePionsJaune;
    } else {
      throw "Le joueur est introuvable";
    }
  }
}