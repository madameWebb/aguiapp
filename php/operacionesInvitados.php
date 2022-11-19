<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


require 'clasesPHP/Registro.php';

    session_start();
    //Si el array sesion tiene algo y el tipo de usuario es un invitado... 
    if (count($_SESSION) != 0 && $_SESSION['tipoUsuario'] == 'invitados'){
        $usuario = $_SESSION['usuario'];
        //Si existe este índice, te muestro las Especies registradas
        if(isset($_POST['especies'])){
            echo json_encode(Registro::devolverDatos("select * from especies", null));
        }
        //si existe este otro, registro tu comentario
        if(isset($_POST['comentario'])){
            if(!Validar::camposTexto($_POST['comentario'])){
                echo 'No se puede registrar un comentario vacío.';
            } else {
                $comentario = Validar::camposTexto($_POST['comentario']);
                $idUsuarioArray = Registro::devolverDatos("select id from invitados where usuario = ?", array($usuario->getUsuario()));
                $idUsuario = $idUsuarioArray[0]['id'];
                $preparada = 'insert into comentarios (fecha, idInvitado, especie, comentario) '
                        . 'values (:fecha, :idInvitado, :especie, :comentario)';
                $consulta = array(':fecha' => substr($_POST['fecha'], 0, strrpos($_POST['fecha'], 'GMT+')), ':idInvitado' => $idUsuario,
                        ':especie' => $_POST['especie'], ':comentario' => $comentario);

                if(Registro::operarCommit($preparada, $consulta)){
                    echo true;
                }
            }
        }
        //Si existe este índice te muestro tus comentarios sin responder
        if(isset($_POST['comentarios'])){
            $idUsuarioArray = Registro::devolverDatos("select id from invitados where usuario = ?", array($usuario->getUsuario()));
            $arrayComentarios = Registro::devolverDatos("select * from comentarios where idInvitado = ?", array($idUsuarioArray[0]['id']));
            $aux = array();
            for($i = 0; $i < count($arrayComentarios); $i++){
                if(in_array('', $arrayComentarios[$i])){
                    $aux[] = $arrayComentarios[$i];
                }
            }
            
            echo json_encode($aux);
        }
    } else {
        //Y si no te redirecciono
        header('Location: ../php/redirecciones.php');
    }
