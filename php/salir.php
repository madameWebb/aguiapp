<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    session_start();
    $navegadorUsuario = strtoupper($_SERVER['HTTP_USER_AGENT']);
    $firefox = 'FIREFOX';
    $encontrado = strpos($firefox, $navegadorUsuario);
    //Siempre se comprueba que la sesión está activa
    if(count($_SESSION) != 0){
        if($encontrado) {
            $_SESSION =[];
            //Se eliminan las cookies de sesión
            if (INI_get("session.use_cookies")){
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
            }
            //Se destruye la sesión
            session_destroy();
            //Devuelve un true
            echo 'true';
        }
        if (!$encontrado || isset($_SESSION['usuario']) || isset($_SESSION['tipoLogin']) || isset($_SESSION['tipoUsuario'])){  
        //significa que se logeo correctamente
            //Se vacia la sesión
            $_SESSION =[];
            //Se eliminan las cookies de sesión
            if (INI_get("session.use_cookies")){
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
            }
            //Se destruye la sesión
            session_destroy();
            //Devuelve un true
            echo 'true';
        }
    }