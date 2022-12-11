export class Utils {
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getRandomObject(objectList: any[]): any {
    return objectList[Utils.getRandomInt(0, objectList.length)];
  }

  static getRandomTeam(): 'red' | 'yellow' {
    const listeDeCouleurs: ['yellow', 'red'] = ["yellow", "red"];
    const nombreAleatoire = Math.floor(Math.random() * listeDeCouleurs.length);
    return listeDeCouleurs[nombreAleatoire];
  }

  static getOpposingTeam(team: 'red' | 'yellow') {
    if (team == 'red') {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  static parseURLParams(url: string) {
    var queryStart = url.indexOf("?") + 1,
      queryEnd = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms: any = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }
}
