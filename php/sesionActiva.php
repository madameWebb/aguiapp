<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


//Simplemente comprueba que la sesión está abierta y activa.si existe el índice 
//usuario es que hay una sesión activa
session_start();

    if (count($_SESSION) != 0 && array_key_exists('tipoLogin', $_SESSION)){
        echo 'true';
    } else {
        echo 'false';
    }
