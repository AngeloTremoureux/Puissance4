<?php

if (isset($_GET['x'], $_GET['y'], $_POST['red'], $_POST['yellow'])) {

    $tailleHorizontale = filter_input(INPUT_GET, 'x', FILTER_SANITIZE_NUMBER_INT);
    $tailleVerticale   = filter_input(INPUT_GET, 'y', FILTER_SANITIZE_NUMBER_INT);
    $pionsRed          = filter_input_array(INPUT_POST, array('red' =>  array('filter' => FILTER_VALIDATE_INT, 'flags' => FILTER_REQUIRE_ARRAY)));
    $pionsJaune        = filter_input_array(INPUT_POST, array('yellow' =>  array('filter' => FILTER_VALIDATE_INT, 'flags' => FILTER_REQUIRE_ARRAY)));

    $arrayTailleHorizontale = array('x' => $tailleHorizontale);
    $arrayTailleVerticale   = array('y' => $tailleVerticale);
    $affichageTaille = array('parametres' => array_merge($arrayTailleHorizontale, $arrayTailleVerticale));

    $arrayPions = array('pions' => array_merge($pionsRed, $pionsJaune));
    $affichagePions = array('datas' => $arrayPions);

    $affichage = array_merge($affichageTaille, $affichagePions);

    echo json_encode($affichage);

}
