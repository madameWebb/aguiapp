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
     * Valida y comprueba que el dato a modificar sea válido,
     * y devuelve un string valido. 
     * Esta función no sirve para comprobar la clave.
     * 
     * @param string $indice del array
     * @param array $datosM array asociativo
     * @param Objeto $usuario Invitado | Biologo
     * @return string dato válido
     */
    function devolverDatoValido($indice, $metodo1, $datosM, $usuario, $metodo2){
        if(array_key_exists($indice, $datosM)){
            $aux = Validar::$metodo1($datosM[$indice]);
            $variable = !$aux ? $usuario->$metodo2() : $aux;
		} else {
            $variable = $usuario->$metodo2();
        }
        return $variable;
    }
    //Siempre debe haber una sesión iniciada, e intento controlar que la sesión 
    //existente en el servidor no pertenezca a otra web
    if (count($_SESSION) != 0 && isset($_SESSION['tipoUsuario'])){
        //Si en el array POST viajan estos índices...
        if(isset($_POST['datosM']) && isset($_POST['tipo'])){
            $usuario = $_SESSION['usuario'];
            //Se recuperan los datos en un array
            $datosM = json_decode($_POST['datosM'], true);
            $tipo = $_POST['tipo'];
            $nombre = devolverDatoValido('nombreApellido', 'nombre', $datosM, $usuario, 'getNombreApellido');
            $mail = devolverDatoValido('mail', 'mail', $datosM, $usuario, 'getMail');
            
            if(array_key_exists('claveAcceso', $datosM)){
                $auxClave = Validar::clave($datosM['claveAcceso']);
                $clave = ($auxClave == $_SESSION['claveI']) ? $_SESSION['claveI'] : $clave = $auxClave;
            } else {
                $clave = $_SESSION['claveI'];
            }
            if($tipo == 'invitados'){//tipoLogin mail o usuario 
                //NO debería haber nada a false aquí, pero por si las moscas.
                if(!$nombre || !$mail || !$clave){
                    echo 'No se ha podido completar la operación para los usuarios.';
                    return false;
                } else {
                    
                               
                    if(($nombre != $usuario->getNombreApellido() || 
                            !password_verify($clave, $usuario->getClaveAcceso())) 
                            && $mail == $usuario->getMail()){
                        $auxId = Registro::devolverDatos("select id from invitados where usuario = ?", array($usuario->getUsuario()));
                        $idUsuario = $auxId ? $auxId->fetchAll() : false;
                        $datosInvitado = array(password_hash($clave, PASSWORD_DEFAULT), $usuario->getUsuario());
                        $datosPersona = array($nombre, $idUsuario[0]['id']);
                        if(Registro::operarCommitDoble("update invitados set claveAcceso = ? where usuario = ? ", 
                                "update personas set nombreApellido = ? where idInvitado = ?", $datosInvitado, $datosPersona)){
                            echo 'Modificación correctamente realizada. Reinicia la sesión par'
                                . 'a actualizar los cambios. ';
                        } else {
                            echo 'No ha sido posible realizar el cambio. Consulta con el administrador del sistema.';
                            return false;
                        }
                    } else if($nombre != $usuario->getNombreApellido() || 
                        !password_verify($clave, $usuario->getClaveAcceso())
                        || $mail != $usuario->getMail()){
                            $auxId = Registro::devolverDatos("select id from invitados where usuario = ?", array($usuario->getUsuario()));
                            $idUsuario = $auxId ? $auxId : false;
                            if(!Registro::devolverDatos("select * from invitados where mail = ?", array($mail))){
                                $datosInvitado = array(password_hash($clave, PASSWORD_DEFAULT), $mail, $usuario->getUsuario());
                                $datosPersona = array($nombre, $mail, $idUsuario[0]['id']);
                                if(Registro::operarCommitDoble("update invitados set claveAcceso = ?, mail = ? where usuario = ? ", 
                                        "update personas set nombreApellido = ?, mail = ? where idInvitado = ? ", 
                                        $datosInvitado, $datosPersona)){
                                    echo 'Modificación correctamente realizada. Reinicia la sesión par'
                                        . 'a actualizar los cambios. ';
                            } else {
                                    return false;
                                }   
                            } else {
                                echo 'El mail introducido ya está en uso.';
                                return false;
                            }
                    } else {
                        echo 'No se ha podido llevar a cabo el cambio. Vuelve a intentarlo más tarde. ';
                    }
                }
            } else if($tipo == 'biologos'){//tipoLogin dni
                $telefono = devolverDatoValido('telefono', 'telefono', $datosM, $usuario, 'getTelefono');
                $direccion = devolverDatoValido('direccion', 'direccion', $datosM, $usuario, 'getDireccion');
                $provincia = devolverDatoValido('provincia', 'provincia', $datosM, $usuario, 'getProvincia');
                $fechaTitulo = devolverDatoValido('fechaTitulacion', 'fecha', $datosM, $usuario, 'getFechaTitulacion');
                
                if(!$nombre || !$mail || !$clave || !$telefono || !$direccion || !$provincia || !$fechaTitulo){
                    echo 'Datos incorrectos. No se ha podido completar la operación para el biólogo.';
                    return false;
                } else {
                    if($nombre != $usuario->getNombreApellido() || $mail != $usuario->getMail() 
                            || !password_verify($clave, $usuario->getClaveAcceso())
                            || $telefono != $usuario->getTelefono() || 
                            $direccion != $usuario->getDireccion() 
                            || $provincia != $usuario->getProvincia() || 
                            $fechaTitulo != $usuario->getFechaTitulacion()){

                        $consulta = array(password_hash($clave, PASSWORD_DEFAULT), $fechaTitulo, $direccion, $provincia, $usuario->getDni());
                        $consultaP = array($nombre, $mail, $telefono, $usuario->getDni());
                        if(Registro::operarCommitDoble('update biologos set claveAcceso = ?, fechaTitulacion = ?, '
                                . 'direccion = ?, provincia = ? where dni = ?',
                            'update personas set nombreApellido = ?, mail = ?, telefono = ? where dni = ?',
                            $consulta, $consultaP)){
                            echo 'Modificación correctamente realizada. Reinicia la sesión par'
                            . 'a actualizar los cambios. ';
                        }else{
                            echo 'Ha ocurrido un error, la operación no pudo completarse';
                            return false;
                        }
                    } else {
                        echo 'Datos duplicados para el biólogo';
                    }
                }
            }
        } else {
            echo 'Ha ocurrido un error. ';
        }
    } else {
        //Y si no existen esos índices, redirecciono a reidrecciones.php
        header('Location:../php/redirecciones.php');
    }