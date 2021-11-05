var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getEntierAleatoire = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    Utils.getElementAleatoire = function (liste) {
        var longueurListe = liste.length;
        var entierAleatoireIndexeParListe = Utils.getEntierAleatoire(0, longueurListe);
        return liste[entierAleatoireIndexeParListe];
    };
    Utils.array2DContainsArray = function (array2D, arraySearch) {
        var itemString = JSON.stringify(arraySearch);
        var contains = array2D.some(function (element) {
            return JSON.stringify(element) === itemString;
        });
        return contains;
    };
    Utils.getIndexOf2DArray = function (array2D, index) {
        for (var i = 0; i < array2D.length; i++) {
            var currentArray = array2D[i];
            if (currentArray[0] == index[0] && currentArray[1] == index[1]) {
                return i;
            }
        }
    };
    Utils.getCouleurEquipeAleatoire = function () {
        var listeDeCouleurs = ["yellow", "red"];
        var nombreAleatoire = Math.floor(Math.random() * listeDeCouleurs.length);
        return listeDeCouleurs[nombreAleatoire];
    };
    Utils.getCouleurEquipeAdverse = function (couleurEquipeActuelle) {
        if (couleurEquipeActuelle == 'red') {
            return 'yellow';
        }
        else {
            return 'red';
        }
    };
    return Utils;
}());
export { Utils };
//# sourceMappingURL=Utils.js.map