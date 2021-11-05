import { Game } from "./Game";
export function ajouteUnPionDansBdd(px, py, color) {
    var gameId = 4;
    $.post("/api/pions/setList/", {
        id: gameId,
        Px: px,
        Py: py,
        Color: color
    })
        .done(function (data) {
    });
}
export function testsUnits() {
    lanceTestsUnits = new TestsUnits(game);
    lanceTestsUnits.launchTestsUnits();
}
export function playGame() {
    var game = Game.getGame();
    console.log(game);
    game.playGame();
}
export function lanceUnePartieDeRobots() {
    var robotManager = RobotManager.getRobotManager(game);
    robotManager.lanceUnePartieDeRobots();
}
export function openParam() {
    $('#dialog').removeClass('d-none');
    $("#dialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Valider": function () {
                $("#parametersValues").submit();
                $(this).dialog("close");
            },
            "Fermer": function () {
                $(this).dialog("close");
            }
        }
    });
}
export function loadParam() {
    window.location.replace('?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val());
}
//# sourceMappingURL=game_manager.inc.js.map