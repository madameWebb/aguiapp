<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */



/* 
 * Si la sesión tiene algo, redirige en función del tipo de dato que lleva la 
 * sesión. 
 * Si la sesión va vacía devuelve al usuario a la página de origen.
 */
    session_start();
    
    if (count($_SESSION) != 0){
        if (isset($_SESSION['tipoUsuario']) && $_SESSION['tipoUsuario'] == 'invitados'){
            //Si el usuario es un invitado se redirecciona aquí
            header('Location: ../privado/usuarios.html');
        }else if(isset($_SESSION['tipoUsuario']) && $_SESSION['tipoUsuario'] == 'biologos'){
            //si es un biólogo, se redirecciona a esta otra página
            header('Location: ../privado/biologos.html');
        } else {
            //Y si no, se envía al login
            header('Location: ../login.html');
        }
    } else {
        //si no existe la sesión, se envía de vuelta por donde vino. Esto no 
        //pasa nunca porque siempre se inicia sesión para comprobar los datos
        header('Location:' . getenv('HTTP_REFERER'));
    }
    