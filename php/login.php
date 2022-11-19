<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    include 'clasesPHP/Registro.php';
    
    //Se inicia la sesion
    session_set_cookie_params(0);
    session_start();
    /**
     * Función para verificar la clave y crear las variables de la sesión
     * 
     * @param string $usuario dni, mail o nombre de usuario
     * @param string $clave clave de acceso
     * @param string $tipoLogin indica si es el dato $usuario será un dni, mail o nombre de usuario
     * @param string $tipoUsuario indica si es 'biologos' o 'invitados'
     */
    function comprobarClave($usuario, $clave, $tipoLogin, $tipoUsuario){
        if(!Registro::verificarClave($usuario, $clave)){
            echo 'La contraseña no es correcta';
        } else {
            $auxReg = Registro::devolverUsuario($tipoUsuario, $tipoLogin, array($usuario));
            if($auxReg){
                $_SESSION['tipoLogin'] = $tipoLogin;
                $_SESSION['tipoUsuario'] = $tipoUsuario;
                $_SESSION['claveI'] = $clave;
                $_SESSION['usuario'] = $auxReg;
                echo 'true';
            }
        }
    }
    //Si existe el índice 'datos' en el Array $_POST...
    if(isset($_POST['datos'])){
        $login = false;
        $datos = json_decode($_POST['datos'], true);
        $tipoUsuario = $datos['tipoUsuario'];
        $tipoLogin = $datos['tipoLogin'];
        if(isset($datos['clave'])){
            $claveR = Validar::clave($datos['clave']);
        } else {
            $claveR = '';
        }
        $errores = 0;
        //Si el tipo de usuario es invitado, hace una cosa
        if($tipoUsuario == 'invitados'){
            if($tipoLogin == 'usuario'){
                $usuario = Validar::usuario($datos['usuario']);
                if(!$usuario){ 
                    echo 'El nombre de usuario no es correcto. ';
                    $errores++;
                }
            } else if($tipoLogin == 'mail'){
                $mail = Validar::mail($datos['usuario']);
                if(!$mail){ 
                    echo 'El mail de usuario no es correcto. ';
                    $errores++;
                }
            }
            
            if(!$claveR){
                echo 'La contraseña no es correcta. ';
                $errores++;
            }
            if($errores == 0){
                if($tipoLogin == 'usuario'){
                    //Si el usuario no está registrado ya no se comprueba la contraseña
                    if(!Registro::devolverDatos('select * from invitados where usuario = ?',array($usuario))){
                        echo 'El usuario no está registrado';
                    } else {
                        comprobarClave($usuario, $claveR, $tipoLogin, $tipoUsuario);
                    }
                } else if($tipoLogin == 'mail'){
                    if(!Registro::devolverDatos('select * from invitados where mail = ?', array($mail))){
                        echo 'El email no está registrado';
                    } else {
                        comprobarClave($mail, $claveR, $tipoLogin, $tipoUsuario);
                    }
                }
            } else {
                echo 'La identificación no se ha realizado correctamente';
            }
        }
        //Si es Biólogo, hace otra
        if($tipoUsuario == 'biologos'){
            $usuario = Validar::dni($datos['usuario']);
            if(!$usuario){
                echo 'El usuario no es correcto. ';
                $errores++;
            }
            if(!$claveR){
                echo 'La contraseña no es correcta. ';
                $errores++;
            }
            if($errores == 0){
                if(!Registro::devolverDatos('select * from biologos where dni = ?', array($usuario))){
                    echo 'El biologo no está registrado';
                } else {
                    comprobarClave($usuario, $claveR, $tipoLogin, $tipoUsuario);
                }
            } else {
                echo 'La identificación no se ha realizado correctamente';
            }
        }
    }
