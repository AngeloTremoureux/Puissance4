class TestsUnits {
  constructor(game) {
    if (game) {
      this.game = game
    } else {
      throw new Error("Aucune partie fournit")
    }
  }
  launchTestsUnits () {
    this.defaultTailleHorizontale = this.game.getTailleHorizontale()
    this.defaultTailleVerticale   = this.game.getTailleVerticale()
    let message = "Opérations des tests unitaires : \n";
    message += "Test 1 : " + this.testUnit1() + "\n";
    message += "Test 2 : " + this.testUnit2() + "\n";
    message += "Test 3 : " + this.testUnit3() + "\n";
    message += "Test 4 : " + this.testUnit4() + "\n";
    message += "Test 5 : " + this.testUnit5() + "\n";
    message += "Test 6 : " + this.testUnit6() + "\n";
    message += "Test 7 : " + this.testUnit7() + "\n";
    message += "Test 8 : " + this.testUnit8() + "\n";
    message += "Test 9 : " + this.testUnit9() + "\n";
    message += "Test 10 : " + this.testUnit10() + "\n";
    message += "Test 11 : " + this.testUnit11() + "\n";
    this.resetTests();
    game.log("Puissance 4", message);

  }
  resetTests() {
    game.resetGame()
    this.game.tailleHorizontaleDuJeu = this.defaultTailleHorizontale;
    this.game.tailleVerticaleDuJeu   = this.defaultTailleVerticale;
  }
  testUnit1() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[4,5],[3,5],[2,5],[6,4],[3,4],[4,4],[7,4],[3,3],[4,3],[7,3],[1,4],[1,2],[1,1],[2,1],[7,2],[5,2]],"yellow":[[1,5],[6,5],[5,5],[7,5],[2,4],[5,4],[2,3],[3,2],[4,2],[4,1],[1,3],[6,3],[2,2],[7,1],[5,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[5,2],[4,3],[3,4],[2,5]]
    return (!WinnerManager.verifWin(this.game,'yellow') && JSON.stringify(WinnerManager.verifWin(this.game,'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit2() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[1,5],[3,5],[2,5],[2,3],[5,5],[7,4],[2,1],[5,4]],"yellow":[[7,5],[4,5],[2,4],[6,5],[3,4],[2,2],[4,4],[1,4]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,1],[4,2],[4,3],[4,4]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit3() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[7,5],[1,5],[7,4],[5,4],[4,2],[2,5],[1,4],[2,3],[7,2],[2,2],[3,3],[1,3],[6,4]],"yellow":[[4,5],[5,5],[3,4],[4,4],[4,3],[7,3],[4,1],[2,4],[6,5],[7,1],[5,3],[5,2],[2,1],[1,2],[6,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[3,4],[3,5],[3,6],[3,7]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit4() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[5,5],[5,4],[3,5],[4,5],[1,5],[1,4],[4,3],[6,2],[4,2],[2,3],[5,2],[7,3],[5,1],[7,1],[2,2],[2,1],[3,4],[3,3]],"yellow":[[7,5],[6,5],[6,4],[2,5],[4,4],[7,4],[6,3],[5,3],[2,4],[4,1],[6,1],[1,3],[7,2],[1,2],[1,1],[3,2],[3,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit5() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[4,5],[1,5],[7,5],[7,4],[6,2],[5,5],[5,4],[5,2],[2,2],[1,4],[4,3],[7,3],[4,2],[3,1],[7,1],[1,2],[1,1]],"yellow":[[6,5],[6,4],[2,5],[2,4],[6,3],[3,4],[6,1],[5,3],[2,3],[4,4],[1,3],[3,3],[7,2],[3,2],[4,1],[2,1],[5,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit6() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[7,4],[4,5],[5,4],[4,4],[1,4],[3,4],[4,3],[3,3],[5,2],[6,4]],"yellow":[[7,5],[5,5],[7,3],[2,5],[1,5],[7,2],[5,3],[2,4],[4,2],[3,2],[6,5]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,3],[4,4],[4,5],[4,6]]
    return (!WinnerManager.verifWin(this.game,'yellow') && JSON.stringify(WinnerManager.verifWin(this.game,'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit7() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"10"},"datas":{"pions":{"red":[[6,10],[2,10],[7,9],[1,10],[5,10],[3,9],[6,8],[6,6],[6,5],[7,7],[5,8],[3,7],[3,6],[4,8],[6,3],[4,7],[1,8],[4,5],[2,6],[2,4],[3,4],[3,3],[1,7]],"yellow":[[7,10],[3,10],[6,9],[2,9],[4,10],[1,9],[7,8],[6,7],[4,9],[2,8],[5,9],[3,8],[7,6],[5,7],[6,4],[5,6],[3,5],[4,6],[2,7],[2,5],[4,4],[6,2],[7,5],[1,6]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[9,4],[8,3],[7,2],[6,1]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit8() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"11","y":"6"},"datas":{"pions":{"red":[[1,6],[5,6],[7,6],[2,5],[11,6],[9,6],[9,5],[8,3],[3,4],[4,6],[9,4]],"yellow":[[8,6],[8,5],[2,6],[6,6],[3,6],[3,5],[8,4],[1,5],[2,4],[7,5],[9,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[6,6],[5,7],[4,8],[3,9]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit9() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"4","y":"4"},"datas":{"pions":{"red":[[4,4],[2,4],[4,2],[2,3],[4,1],[2,1],[1,2],[3,1]],"yellow":[[1,4],[4,3],[3,4],[3,3],[2,2],[1,3],[3,2],[1,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit10() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"4","y":"4"},"datas":{"pions":{"red":[[2,4],[3,4],[2,2],[2,1],[1,3],[4,2]],"yellow":[[4,4],[4,3],[2,3],[1,4],[3,3],[3,2],[4,1]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,1],[3,2],[2,3],[1,4]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit11() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"8","y":"7"},"datas":{"pions":{"red":[[1,7],[6,7],[4,6],[8,6],[3,6],[7,7],[7,6],[7,5],[5,7],[2,7],[5,6],[5,5],[5,3],[7,3],[6,5]],"yellow":[[8,7],[3,7],[4,7],[4,5],[4,4],[1,6],[8,5],[8,4],[7,4],[3,5],[6,6],[2,6],[5,4],[3,4],[7,2],[6,4]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,3],[4,4],[4,5],[4,6]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
}