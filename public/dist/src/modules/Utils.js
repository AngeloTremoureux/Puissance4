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
    Utils.parseURLParams = function (url) {
        var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1 || url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), parms = {}, i, n, v, nv;
        if (query === url || query === "")
            return;
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
            if (!parms.hasOwnProperty(n))
                parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    };
    return Utils;
}());
export { Utils };
//# sourceMappingURL=Utils.js.map