<?php

$gameId = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$x = filter_input(INPUT_POST, 'Px', FILTER_VALIDATE_INT);
$y = filter_input(INPUT_POST, 'Py', FILTER_VALIDATE_INT);
$color = filter_input(INPUT_POST, 'Color', FILTER_SANITIZE_STRING);

if (!empty($x) && !empty($y) && !empty($color)) {
    $result = $pdo->setPion($gameId, $x, $y, $color);
    $result = array('success' => $result);
    echo json_encode($result, JSON_PRETTY_PRINT);
} else {
    echo "Aucune donnée fournit";
}