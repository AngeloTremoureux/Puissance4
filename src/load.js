import { Game } from "./modules/Game"

$(document).ready(function() {
    console.log(getGame(Game))
})


function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./modules/', true, /\.js$/));
requireAll(require.context('./modules/', true, /\.ts$/));