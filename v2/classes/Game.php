<?php

class Game {

    private $linkTemplate;
    private $nbCaseY;
    private $nbCaseX;

    public function setTemplateInk(string $link) {
        $this->linkTemplate = $link;
    }

    public function getTemplateInk() {
        return $this->linkTemplate;
    }

    public function setCase($x, $y) {
        if (is_numeric($x) && is_numeric($y)) {
            if ($x >= 4 && $y >= 4) {
                $this->nbCaseX = $x;
                $this->nbCaseY = $y;
            } else {
                throw new Exception("Erreur de paramètres : le nombre doit être supérieur ou égale à 4", 1);
            }
        } else {
            throw new Exception("Erreur de paramètres : entiers attendus (x=" . $x . " y=" . $y . ")", 1);
        }
    }

    public function getNbCase($param) {
        if ($param == 'x') {
            if (isset($this->nbCaseX)) {
                return $this->nbCaseX;
            } else {
                throw new Exception("Aucune case X définit", 1);
            }
        } else if ($param == 'y') {
            if (isset($this->nbCaseY)) {
                return $this->nbCaseY;
            } else {
                throw new Exception("Aucune case Y définit", 1);
            }
        } else {
            throw new Exception("Erreur d'appel de fonction", 1);
        }
    }

    public function getTailleHorizontale() : int {
        return $this->nbCaseX;
    }

    public function getTailleVerticale() : int {
        return $this->nbCaseY;
    }

}
