<?php

class Bdd {

    private static $serveur  = SQL_SERVEUR;
    private static $bdd      = SQL_BDD;
    private static $user     = SQL_USERNAME;
    private static $mdp      = SQL_PASSWORD;
    private static $monPdo;
    private static $monPdoP4 = null;

    private function __construct()
    {
        Bdd::$monPdo = new PDO(
            Bdd::$serveur . ';' . Bdd::$bdd,
            Bdd::$user,
            Bdd::$mdp
        );
        Bdd::$monPdo->query('SET CHARACTER SET utf8');
    }

    public static function getPdo()
    {
        if (Bdd::$monPdoP4 == null) {
            Bdd::$monPdoP4 = new Bdd();
        }
        return Bdd::$monPdoP4;
    }

    public function getInfoPartie($id)
    {
        $requetePrepare = Bdd::$monPdo->prepare(
            'SELECT datePartie, winner, '
            . 'FROM jeux '
            . 'WHERE jeux.id = :id'
        );
        
        $requetePrepare->bindParam(':id', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
        return $requetePrepare->fetch(PDO::FETCH_ASSOC);
    }

    public function getPionsDunePartie($id)
    {
        $requetePrepare = Bdd::$monPdo->prepare(
            'SELECT localisationX as X, localisationY as Y, '
            . 'color as Color FROM pions '
            . 'WHERE pions.idJeux = :id'
        );
        
        $requetePrepare->bindParam(':id', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
        return $requetePrepare->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPions()
    {
        $requetePrepare = Bdd::$monPdo->prepare(
            'SELECT localisationX as X, localisationY as Y, '
            . 'color as Color FROM pions '
        );
        
        $requetePrepare->bindParam(':id', $id, PDO::PARAM_INT);
        $requetePrepare->execute();
        return $requetePrepare->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setPion($idJeux, $x, $y, $color)
    {
        $requetePrepare = Bdd::$monPdo->prepare(
            'INSERT INTO pions (idJeux, localisationX, localisationY, color) '
            . 'VALUES (:idJeux, :x, :y, :color)'
        );
        
        $requetePrepare->bindParam(':idJeux', $idJeux, PDO::PARAM_INT);
        $requetePrepare->bindParam(':x', $x, PDO::PARAM_INT);
        $requetePrepare->bindParam(':y', $y, PDO::PARAM_INT);
        $requetePrepare->bindParam(':color', $color, PDO::PARAM_STR);
        return $requetePrepare->execute();
    }

    public function getNextMatchId() {
        $requete = Bdd::$monPdo->query(
            'SELECT AUTO_INCREMENT FROM information_schema.tables '
            . 'WHERE table_name = \'jeux\' and table_schema = \'puissance4\''
        );
        $requete->execute();
        return $requete->fetch()[0];
    }


}