<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    require 'clasesPHP/Registro.php';

    session_start();
    /**
     * Función para tratar las imágenes recibidas, se guardan en una carpeta
     * concreta y se recogen los nombres de los archivos en un archivo json
     * 
     * @return boolean|string
     */
    function tratarImagenes(){
        $ruta = array();
        if(array_key_exists('imagenes', $_POST)){
            if(count($_FILES) < 4){
               for($i = 0; $i < count($_FILES); $i++){
                    move_uploaded_file($_FILES[$i]["tmp_name"], "../privado/imagenes/".$_FILES[$i]["name"]);
                    //$ruta[] = "../images/".$_FILES[$i]["name"];
                    //Mejor no guardar la ruta completa porque puede dar errores según desde donde se llame
                    $ruta[] = $_FILES[$i]["name"];
                }
            }
            if(count($_FILES) > 3){
                for($i = 0; $i < 3; $i++){
                    move_uploaded_file($_FILES[$i]["tmp_name"], "../privado/imagenes/".$_FILES[$i]["name"]);
                    $ruta[] = $_FILES[$i]["name"];
                }
            }
            $_FILES = [];
        } else {
            return false;
        }
        return json_encode($ruta);
    }
    /**
     * Escribe la respuesta pertinente según el parámetro recibido
     * 
     * @param boolean $verdadero
     */
    function escribirRespuesta($verdadero){
        if($verdadero){
            echo 'Registro correctamente realizado';
        }
        if(!$verdadero){
            echo 'ha ocurrido un error, no se ha podidor realizar'
                    . 'el registro. Inténtalo de nuevo más tarde.';
        }
    }
    //Si el array sesion tiene algo y el tipo de usuario es un biólogo... 
    if (count($_SESSION) != 0 && $_SESSION['tipoUsuario'] == 'biologos'){
        $usuario = $_SESSION['usuario'];
        //si me envían el índice 'torretas', devuelvo la información de las torretas
        if(isset($_POST['torretas'])){
            echo json_encode(Registro::devolverDatos("select * from torretas", null));
        }
        //Si me envían el índice 'mostrar', muestro la información de las especies registradas
        if(isset($_POST['mostrar'])){
            echo json_encode(Registro::devolverDatos("select * from especies", null));
        }
        //Si en array POST existe 'nombreEspecie', entonces valido y guardo en la base de datos una nueva Especie
        if(array_key_exists('nombreEspecie', $_POST)){
            $errores = 0;
            $nombreEspecie = Validar::especie($_POST['nombreEspecie']);
            if(array_key_exists('reino', $_POST)){
                $reino = Validar::especie($_POST['reino']);
            } else {
                $reino = false;
            }
            if(array_key_exists('clase', $_POST)){
                $clase = Validar::especie($_POST['clase']);
            }else {
                $clase = false;
            }
            if(array_key_exists('orden', $_POST)){
                $orden = Validar::especie($_POST['orden']);
            } else {
                $orden = false;
            }
            if(array_key_exists('familia', $_POST)){
                $familia = Validar::especie($_POST['familia']);
            } else {
                $familia = false;
            }
            if(array_key_exists('periodoMigratorio', $_POST)){
                $periodoMigratorio = Validar::migracion($_POST['periodoMigratorio']);
            } else {
                $periodoMigratorio = false;
            }
            if(array_key_exists('caracteristicas', $_POST)){
                $caracteristicas = Validar::camposTexto($_POST['caracteristicas']);
            } else {
                $caracteristicas = false;
            }
            if(!$nombreEspecie){
                echo 'El nombre de la especie no es correcto. ';
                $errores++;
            } 
            if(!$reino){
                echo 'El reino de la especie no es correcto. ';
                $errores++;
            }
            if(!$clase){
                echo 'La clase de la especie no es correcta. ';
                $errores++;
            }
            if(!$orden){
                echo 'El orden de la especie no es correcto. ';
                $errores++;
            }
            if(!$familia){
                echo 'La familia no es correcta. ';
                $errores++;
            }
            if(!$periodoMigratorio){
                echo 'El periodo migratorio no está correctamente establecido. ';
                $errores++;
            }
            if(!$caracteristicas){
                echo 'No se han introducido las características de la especie. ';
                $errores++;
            }
            if($errores > 0){
                echo 'No se han completado todos los campos requeridos';
            } else {
                if(!Registro::devolverDatos('select * from especies where especie = ?', 
                            array($nombreEspecie))){
                    $rutaJson = tratarImagenes();
                    $consulta = array($nombreEspecie, $reino, $clase, $orden, $familia, 
                            $periodoMigratorio, $caracteristicas);
                    if($rutaJson){
                        $consulta[] = $rutaJson;
                        if(Registro::operarCommit('insert into especies (especie, '
                                . 'reino, clase, orden, familia, periodoMigratorio, '
                                . 'caracteristicas, imagenes) values(?, ?, ?, ?, ?, '
                                . '?, ?, ?)', $consulta)){
                            escribirRespuesta(true);
                        } else {
                            escribirRespuesta(false);
                            return false;
                        }
                    } else {
                        if(Registro::operarCommit('insert into especies (especie, '
                                . 'reino, clase, orden, familia, periodoMigratorio, '
                                . 'caracteristicas) values(?, ?, ?, ?, ?, ?, ?)', $consulta)){
                            escribirRespuesta(true);
                        } else {
                            escribirRespuesta(false);
                            return false;
                        }
                    }
                } else {
                    echo 'La especie ya está registrada.';
                }
            }
        }
    } else {
        //Y si no existen esos índices, redirecciono a reidrecciones.php
        header('Location: ../php/redirecciones.php');
    }

    