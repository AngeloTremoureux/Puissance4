<div id="box">
    <h2>Puissance 4</h2>
    <div id="game">
        <p id="tour"></p>
        <?php
        for ($i = 1; $i <= $game->getTailleVerticale(); $i++) {
        ?>
            <div class="row" val="<?= $i ?>">
                <?php
                for ($j = 1; $j <= $game->getTailleHorizontale(); $j++) {
                ?>
                    <div class="col-sm">
                        <svg class="icon" case="<?= $j ?>" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                            <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 255, 255);" cx="250.76" cy="120.36" r="17.46" />
                            <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(94, 135, 255);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7" />
                        </svg>
                    </div>
                <?php
                }
                ?>
            </div>
        <?php
        }
        ?>
    </div>
    <div class="btn-group mt-4" role="group">
        <button class="btn btn-secondary" id="playButton" title="Lancer une partie de puissance 4"><i class="fas fa-dice"></i> Jouer</button>
        <button class="btn btn-secondary" id="robotButton" title="Un match de robot contre robot"><i class="fas fa-robot"></i> Robot vs Robot</button>
        <button" class="btn btn-secondary" id="optionsButton" title="Afficher les options et paramètres"><i class="fas fa-tools"></i> Options</button>
    </div>
</div>
<div class="credits position-absolute">
    <a target="_blank" href="https://angelotremoureux.fr" title="Accéder à mon portfolio">&copy; Angelo Tremoureux</a>
    <br>
    📋 Tous droits réservés (2020-<?= date('Y'); ?>)
</div>