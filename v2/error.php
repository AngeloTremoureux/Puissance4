<?php
    $code = $_SERVER['REDIRECT_STATUS'];
    $codes = array(
        403 => 'Forbidden',
        404 => 'Not Found',
        500 => 'Internal Server Error'
    );
    $source_url = 'http'.((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 's' : '').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if (array_key_exists($code, $codes) && is_numeric($code)) {
        ?>
<!DOCTYPE html>
<html>
<head>
    <title>Erreur <?php echo $code; ?></title>
</head>
<body>
    <h1>Vous ne pouvez pas accéder à <?php print($source_url); ?></h1>
</body>
</html>
        <?php
    } else {
        die('Unknown error');
    }
?>