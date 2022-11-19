<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    require 'clasesPHP/Registro.php';
    
    session_start();
    //Se comprueba si hay una sesión activa
    if (count($_SESSION) != 0 && isset($_SESSION['tipoLogin'])){
        //Se comprueba que los datos de sesión y usuario coinciden
        if(isset($_POST['tipoUsuario']) && isset($_SESSION['tipoUsuario']) && 
                $_POST['tipoUsuario'] == $_SESSION['tipoUsuario']){
            $usuario = $_SESSION['usuario'];
            //Si existe el índice 'mostrar', se muestran los datos de usuario
            if(isset($_POST['mostrar'])){
                $usuario->mostrarInformacion();
            }
            //si existe el índice 'editar', se da acceso a la edición de datos
            if(isset($_POST['editar'])){
                $usuario->editarInformacion();
            }
            //si existe el índice 'eliminar', entonces se eliminan los datos de 
            //la bbdd
            if(isset($_POST['eliminar'])){
                if($usuario instanceof Invitado){
                    $nombreUsuario = $_POST['eliminar'];
                    $consulta[] = $nombreUsuario;
                    $auxiliar = Registro::devolverDatos("select id from invitados where usuario = ?", $consulta);
                    $resultado = $auxiliar;
                    $idUsuario[] = $resultado[0]['id'];
                    if(!Registro::operarCommitDoble("delete from invitados where usuario = ? ", 
                            "delete from personas where idInvitado = ?", $consulta, $idUsuario)){
                        return false;
                    } else {
                        echo 'Todos tus datos han sido correctamente eliminados. ';
                    }
                } else {
                    echo 'No tienes permiso para estar aquí. ';
                }
            }
        } else {
            echo 'false';
        }
    } else {
        header('Location: ../php/redirecciones.php');
    }
    