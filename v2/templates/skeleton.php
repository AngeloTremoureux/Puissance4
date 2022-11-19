<!DOCTYPE html>
<html>

<head>
    <?php
    require_once(PATH_TO_TEMPLATES . '/header.php');
    ?>
</head>

<body>
    <noscript>
        <div class="container-fluid">
            <div class="alert alert-danger" role="alert">
                Erreur: Le plug-in Javascript est requis pour charger le jeu. Merci de l'activer pour jouer.
            </div>
        </div>
        <style type="text/css">
            .hide-nojs {
                display: none;
            }
        </style>
    </noscript>
    <div class="hide-nojs">
        <div class="container-fluid">
            <?php
            require_once(PATH_TO_TEMPLATES . '/content.php');
            ?>
        </div>
        <?php
        require_once(PATH_TO_TEMPLATES . '/params.php');
        ?>
    </div>
</body>

</html>