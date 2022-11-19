<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    include 'clasesPHP/Validar.php';

    /**
     * Comprueba que el código para el registro de biólogos es correcto.
     * 
     * @param string $variable
     * @return string
     */
    function comprobarCodigo($variable){
        $codigo = Validar::camposTexto($variable);
        if (!preg_match ('/renaido/', $codigo)){
            return 'false';
        }
        return 'true';
    }
    //Recibe la petición de comprobación del código y procede
    if(isset($_POST['codigo'])){
        $codigo = $_POST['codigo'];
        if(Validar::camposTexto($codigo)){
            echo comprobarCodigo($codigo);
        }
    }
    
    