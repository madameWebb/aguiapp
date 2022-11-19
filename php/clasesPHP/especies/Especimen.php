<?php
/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


require 'Especie.php';
/**
 * Clase para crear Epecímenes, hereda de Especie
 */
class Especimenes extends Especie{
    /**
     * @var string 
     */
    private $codigoRegistro;
    /**
     * @var string 
     */
    private $registrador;
    /**
     * @var string 
     */
    private $especie;
    /**
     * @var string 
     */
    private $peso;
    /**
     * @var string 
     */
    private $dimensiones;
    /**
     * @var string 
     */
    private $caracteristicas;
    /**
     * @var string 
     */
    private $fechaRegistro;
    
    /**
     * Constructor de siete parámetros
     * 
     * @param string $codigoRegistro
     * @param string $registrador
     * @param string $especie
     * @param string $peso
     * @param string $dimensiones
     * @param string $caracteristicas
     * @param string $fechaRegistro
     * 
     * @return Especimen
     */
    function __construct($codigoRegistro, $registrador, $especie, $peso, $dimensiones, $caracteristicas, $fechaRegistro) {
        $this->codigoRegistro = $codigoRegistro;
        $this->registrador = $registrador;
        $this->especie = $especie;
        $this->peso = $peso;
        $this->dimensiones = $dimensiones;
        $this->caracteristicas = $caracteristicas;
        $this->fechaRegistro = $fechaRegistro;
    }
    /**
     * Agrega especie cuando no ha sido creada previamente, y porque todo especímen
     * pertenece a una especie. Recibe 6 parámetros
     * 
     * @param string $especie
     * @param string $reino
     * @param string $clase
     * @param string $orden
     * @param string $familia
     * @param string $periodoMigratorio
     * 
     * @return void
     */
    public function agregarEspecie($especie, $reino, $clase, $orden, $familia, $periodoMigratorio) {
        parent::agregarEspecie($especie, $reino, $clase, $orden, $familia, $periodoMigratorio);
    }
    //Teoricamente no es necesario meter esto aquí porque el hijo ya accedería directamente
}
