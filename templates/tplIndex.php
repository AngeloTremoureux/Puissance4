<!DOCTYPE html>
<html>
    <head>
        <title>Puissance 4</title>
        <meta charset="utf-8">
        <script src="https://kit.fontawesome.com/f1e20245fc.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="styles/style.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="scripts/piece_add.js"></script>
        <script type="text/javascript" src="scripts/game_manager.js"></script>
        <script type="text/javascript" src="scripts/robot_manager.js"></script>
        <script type="text/javascript" src="scripts/match_manager.js"></script>
        <script type="text/javascript" src="scripts/isWinner_manager.js"></script>
        <script type="text/javascript" src="scripts/isWinner_call.js"></script>
        <script type="text/javascript" src="scripts/main.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            game.init(<?php echo $game->getNbCase('x') . ', ' . $game->getNbCase('y') ?>);
            jeton.init();
            jQuery(document).ready(function ($) {
                game.createBackground();
            });
        </script>

        <div class="container-fluid">
            <div id="box">
                <h2>Puissance 4</h2>
                <div id="game">
                    <p id="tour">A toi de commencer !</p>
                </div>
                <a href="#" onclick="resetGame();">Relancer</a>
                <a href="#" onclick="clearGame();">Effacer</a>
                <a href="#" onclick="setBot('yellow');">AutoBot</a>
                <a href="#" onclick="openParam()">Paramètres</a>
            </div>
        </div>
        <div id="preview" style="display: none;">
            <!-- red_circle -->
            <div id="red_circle">
                <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <defs> <radialGradient gradientUnits="userSpaceOnUse" cx="327" cy="246.978" r="91.742" id="gradient-0" spreadMethod="repeat" gradientTransform="matrix(0.218003, 0, 0, 0.218003, 255.713331, 193.153387)"> <stop offset="0" style="stop-color: rgba(255, 0, 0, 1)"/> <stop offset="1" style="stop-color: rgba(153, 0, 0, 1)"/> </radialGradient> </defs> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 154, 154);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; fill: url(#gradient-0); stroke: rgb(0, 0, 0); stroke-linejoin: round; stroke-dashoffset: 35px;" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
            </div>
            <!-- basic_circle -->
            <div id="basic_circle">
                <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 255, 255);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(94, 135, 255);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
            </div>
            <!-- yellow_circle -->
            <div id="yellow_circle">
                <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 248, 175);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(255, 236, 27);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
            </div>
        </div>

        <div id="dialog" title="Paramètres" style="">
            <label for="nbCaseY">Nombre de cases (Verticale)</label>
            <input type="number" min="4" max="20" step="1" name="nbCaseY" id="nbCaseY" value="<?php echo $game->getNbCase('y'); ?>" class="text ui-widget-content ui-corner-all">
            <label for="nbCaseX">Nombre de cases (Horizontale)</label>
            <input type="number" min="4" max="20" step="1" name="nbCaseX" id="nbCaseX" value="<?php echo $game->getNbCase('x'); ?>" class="text ui-widget-content ui-corner-all">
        </div>
    </body>
</html>