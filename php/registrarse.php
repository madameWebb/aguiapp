<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


    include 'clasesPHP/Registro.php';
    
    session_start();
    /**
     * Recibe varios valores y comprueba si son correctos, devuelve el número de
     * errores actualizado
     * 
     * @param string/boolean $nombre
     * @param string/boolean $mail
     * @param string/boolean $clave
     * @param int $errores
     * @return int 
     */
    function comunes($nombre, $mail, $clave, $errores){
        if(!$nombre){
            echo 'El nombre no es correcto. ';
            $errores++;
        } 
        if(!$mail){
            echo 'El email no es correcto. ';
            $errores++;
        } 
        if(!$clave){
            echo 'La contraseña no es correcta. ';
            $errores++;
        }
        return $errores;
    }
    //Si existen estos índices
    if(isset($_POST['registros']) && isset($_POST['tipo'])){
        $registro = json_decode($_POST['registros'], true);
        $tipo = $_POST['tipo'];
        $nombre = Validar::nombre($registro['nombreApellido']);
        $mail = Validar::mail($registro['mail']);
        $claveR = Validar::clave($registro['claveAcceso']);
        $errores = 0;
        //Si es de tipo Invitado
        if($tipo == 'invitados'){
            //aquí se asigna la variable $usuario
            $usuario = Validar::usuario($registro['usuario']);
            if(!$usuario){ 
                echo 'El nombre de usuario no es correcto. ';
                $errores++;
            }
            $errores += comunes($nombre, $mail, $claveR, $errores);
            if($errores == 0){
                $claveR = password_hash($claveR, PASSWORD_DEFAULT);
                //Se comprueba en la base de datos si existen el usuario o mail, ya 
                //que son campos único y $usuario es clave primaria
                if(!Registro::buscarInvitado($usuario, $mail)){
                    $consulta = array($usuario, $mail, $claveR);
                    $consultaP = array($nombre, $mail);
                    if(Registro::insertarInvitado($consulta, $consultaP)){
                        echo 'Registro correctamente realizado.';
                    }
                }
            } else {
                echo 'El formulario no está correctamente cumplimentado';
            }
        }
        //si es de tipo Biólogo
        if($tipo == 'biologos'){
            //Aquí se asignan las variables propias de los biólogos
            $dni = Validar::dni($registro['dni']);
            $telefono = Validar::telefono($registro['telefono']);
            $direccion = Validar::direccion($registro['direccion']);
            $provincia = Validar::provincia($registro['provincia']);
            $fechaTitulo = Validar::fecha($registro['fechaTitulacion']);

            if(!$dni){ 
                echo 'El NIF no es correcto. ';
                $errores++;
            }
            if(!$telefono){ 
                echo 'El teléfono no es correcto. ';
                $errores++;
            }
            if(!$direccion){ 
                echo 'La dirección no es correcta. ';
                $errores++;
            }
            if(!$provincia){ 
                echo 'La provincia no es correcta. ';
                $errores++;
            }
            if(!$fechaTitulo){ 
                echo 'La fecha de titulación no es correcta. ';
                $errores++;
            }
            $errores += comunes($nombre, $mail, $claveR, $errores);
            if($errores == 0){
                $claveR = password_hash($claveR, PASSWORD_DEFAULT);
                //Se comprueba en la base de datos si existen el dni, ya 
                //que es clave primaria
                if(!Registro::devolverDatos('select * from biologos where dni = ?', array($dni))){
                    $consulta = array($dni, $claveR, $fechaTitulo, $direccion, $provincia);
                    $consultaP = array($dni, $nombre, $mail, $telefono);
                    if(Registro::operarCommitDoble('insert into biologos values(?, ?, ?, ?, ?)',
                            'insert into personas (dni, nombreApellido, mail, telefono) values(?, ?, ?, ?)',
                            $consulta, $consultaP)){
                        echo 'Registro correctamente realizado.';
                    } else {
                        echo 'Se ha producido un error, inténtelo de nuevo más tarde. ';
                   }
                } else {
                    echo 'El NIF introducido ya está en uso';
                }
            } else {
                echo 'El formulario no está correctamente cumplimentado. ';
            }
        }
    } else {
        echo 'No se han introducido los datos';
        return false;
    }
