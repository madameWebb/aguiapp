<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    require 'clasesPHP/Registro.php';

    session_start();
    //Aquí se crean los objetos Invitado o Biologo, para operar con ellos donde
    //sea conveniente.
    
    //Si hay algo en la sesión
    if (count($_SESSION) != 0){
        //Y existen estos índices
        if(isset($_SESSION['usuario']) && isset($_SESSION['tipoUsuario']) && isset($_POST['recoger'])){
            $usuario = $_SESSION['usuario'];
            //Se comprueba que tipo de usuario es y se obra en consecuencia
            if($usuario instanceof Invitado){
                $recogido = ['tipoUsuario' => 'invitado',
                    'nombreApellido' => $usuario->getNombreApellido(),
                    'usuario' => $usuario->getUsuario(),
                    'mail' => $usuario->getMail(),
                    'claveAcceso' => null];
                //Se codifica en json para pasarselo a JS
                echo json_encode($recogido);
            }
            //si es un biólogo, se hace lo propio
            if($usuario instanceof Biologo){
                $recogido = ['tipoUsuario' => 'biologo',
                    'nombreApellido' => $usuario->getNombreApellido(),
                    'dni' => $usuario->getDni(),
                    'mail' => $usuario->getMail(),
                    'telefono' => $usuario->getTelefono(),
                    'direccion' => $usuario->getDireccion(),
                    'provincia' => $usuario->getProvincia(),
                    'fechaTitulacion' => $usuario->getFechaTitulacion(),
                    'claveAcceso' => null];
                echo json_encode($recogido);
            }
        } else {
            //Y si no te redirecciono
            header('Location: ../php/redirecciones.php');
        }
    } else {
        //Y si no te redirecciono
        header('Location: ../php/redirecciones.php');
    }
    