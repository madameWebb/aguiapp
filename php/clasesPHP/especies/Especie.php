<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea una especie con 7 parámetros, sin constructor, ya que los
 * atributos se le asignan después
 * 
 */
 class Especie{
    /**
     * Nombre
     * 
     * @var string 
     */
    private $especie;
    /**
     * @var string 
     */
    private $reino;
    /**
     * @var string 
     */
    private $clase;
    /**
     * @var string 
     */
    private $orden;
    /**
     * @var string 
     */
    private $familia;
    /**
     * @var string 
     */
    private $periodoMigratorio;
    /**
     * @var string 
     */
    private $poblacion;
    /**
     * Agrega los parámetros a la Especie creada
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
        $this->especie = $especie;
        $this->reino = $reino;
        $this->clase = $clase;
        $this->orden = $orden;
        $this->familia = $familia;
        $this->periodoMigratorio = $periodoMigratorio;
    }
    /**
     * muestra el nombre de la especie
     * 
     * @return string
     */
    public static function getEspecie() {
        return $this->especie;
    }
    /**
     * muestra el reino de la especie
     * 
     *@return string
     */
    public static function getReino() {
        return $this->reino;
    }
    /**
     * muestra la clase de la especie
     * 
     * @return string
     */
    public static function getClase() {
        return $this->clase;
    }
    /**
     * muestra el orden de la especie
     * 
     * @return string
     */
    public static function getOrden() {
        return $this->orden;
    }
    /**
     * muestra la familia de la especie
     * 
     * @return string
     */
    public static function getFamilia() {
        return $this->familia;
    }
    /**
     * muestra el periodo migratorio de la especie
     * 
     * @return string
     */
    public static function getPeriodoMigratorio() {
        return $this->periodoMigratorio;
    }
    /**
     * muestra la población en el parque de la especie
     * 
     * @return string
     */
    public static function getPoblacion() {
        return $this->poblacion;
    }
    /**
     * modifica la población de la especie 
     * 
     * @param string
     * 
     * @return void
     */
    public static function setPoblacion($poblacion) {
        $this->poblacion = $poblacion;
    }
    /**
     * Agrega individuos a la especie
     * 
     * @param string
     * 
     * @return void
     */
    public static function sumarPoblacion(){
        $this->poblacion++;
    }
    /**
     * Resta individuos a la especie
     * @param string
     * 
     * @return void
     */
    public static function restarPoblacion(){
        $this->poblacion--;
    }
 }
