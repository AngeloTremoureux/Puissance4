<?php

define('DS', DIRECTORY_SEPARATOR);
define('RACINE', new DirectoryIterator(dirname(__FILE__)) . DS . ".." . DS);

require_once(__DIR__ . '/../config/config.php');
require_once(__DIR__ . '/../config/bdd.php');
require_once(PATH_TO_CLASSES . '/Bdd.php');

$pdo = Bdd::getPdo();

header('Content-Type: application/json');

$route = filter_input(INPUT_GET, 'route', FILTER_SANITIZE_STRING);
$datas = explode("/", filter_input(INPUT_GET, 'data', FILTER_SANITIZE_STRING));

switch($route) {
    case 'pions':
        if ($datas[0] == 'getList') {
            require_once(__DIR__ . '/src/getListePions.php');
        } else if ($datas[0] == 'setList') {
            require_once(__DIR__ . '/src/setListePions.php');
        } 
        break;
    case 'export':
        require_once(__DIR__ . '/src/export.php');
        break;
    default:
        echo 'Aucune routé trouvée';
        break;
}