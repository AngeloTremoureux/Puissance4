<?php

if (isset($datas[1]) && !empty($datas[1])) {
    $liste = $pdo->getPionsDunePartie($datas[1]);
    
} else {
    $liste = $pdo->getPions();
}
echo json_encode($liste, JSON_PRETTY_PRINT);
