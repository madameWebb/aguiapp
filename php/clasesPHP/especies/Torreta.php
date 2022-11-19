<?php
/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * @see class Especimen
 */
require 'Especimen.php';
/* *
 * Clase Torreta
 */
class Torreta{
    /**
     * @var string 
     */
    private $idTorreta;
    /**
     * @var string 
     */
    private $chip;
    /**
     * @var string 
     */
    private $fechasEntrada = Array();
    /**
     * @var string 
     */
    private $fechasSalida = Array();
    /**
     * Muestra el id de la Torreta
     * 
     * @return string
     */
    function getIdTorreta() {
        return $this->idTorreta;
    }
    /**
     * Muestra el número de registro del especimen
     * 
     * @return string
     */
    function getChip() {
        return $this->chip;
    }
    /**
     * Muestra el registro de las fechas de entrada del especimen
     * 
     * @return string
     */
    function getFechasEntrada() {
        return $this->fechasEntrada;
    }
    /**
     * Muestra el registro de las fechas de salida del especimen
     * 
     * @return string
     */
    function getFechasSalida() {
        return $this->fechasSalida;
    }
    /**
     * Agrega una fecha de entrada al array de fechas de entrada
     * 
     * @param string $fecha
     * 
     * @return void
     */
    public function agregarFechaEntrada($fecha){
        array_push($this->fechasEntrada, $fecha);
    }
    /**
     * Agrega una fecha de salida al array de fechas de salida
     * 
     * @param string $fecha
     * 
     * @return void
     */
    public function agregarFechaSalida($fecha) {
        array_push($this->fechasSalida, $fecha);
    }
    /**
     * Recoge el número de registro de un especimen
     * 
     * @param string $fecha
     * 
     * @return void
     */
    public function recogerChip($chip){
        $this->chip = $chip;
    }
    /**
     * Identifica la Torreta en uso
     * 
     * @param string $idTorreta
     * 
     * @return void
     */
    public function identificarTorreta($idTorreta){
        $this->idTorreta = $idTorreta;
    }
}
