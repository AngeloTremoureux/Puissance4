<script type="text/javascript">
    game.init(<?php echo $game->getNbCase('x') . ', ' . $game->getNbCase('y') ?>);
</script>

<div id="preview" style="display: none;">
    <!-- red_circle -->
    <div id="red_circle">
        <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <defs> <radialGradient gradientUnits="userSpaceOnUse" cx="327" cy="246.978" r="91.742" id="gradient-0" spreadMethod="repeat" gradientTransform="matrix(0.218003, 0, 0, 0.218003, 255.713331, 193.153387)"> <stop offset="0" style="stop-color: rgba(255, 0, 0, 1)"/> <stop offset="1" style="stop-color: rgba(153, 0, 0, 1)"/> </radialGradient> </defs> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 154, 154);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; fill: url(#gradient-0); stroke: rgb(0, 0, 0); stroke-linejoin: round; stroke-dashoffset: 35px;" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
    </div>
    <!-- basic_circle -->
    <div id="basic_circle">
        <div class="col-sm">
            <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 255, 255);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(94, 135, 255);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
        </div>
    </div>
    <!-- yellow_circle -->
    <div id="yellow_circle">
        <svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 248, 175);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(255, 236, 27);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
    </div>
</div>

<div id="dialog" title="Paramètres" class="d-none">
    <form method="get" action="" id="parametersValues">
        <div class="form-group">
            <label for="tailleVerticale">Taille verticale du jeu : </label>
            <input type="number" min="4" max="20" step="1" name="tailleVerticale" value="<?php echo $game->getNbCase('y'); ?>" class="text ui-widget-content ui-corner-all">
        </div>
        <div class="form-group">
            <label for="tailleHorizontale">Taille horizontale du jeu : </label>
            <input type="number" min="4" max="20" step="1" name="tailleHorizontale" value="<?php echo $game->getNbCase('x'); ?>" class="text ui-widget-content ui-corner-all">
        </div>
    </form>
</div>