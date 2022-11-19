<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * @see class Persona
 */
require 'persona/Persona.php';
/**
 * @see class Torreta
 */
require 'especies/Torreta.php';
/**
 * @see class Validar
 */
require 'Validar.php';
/**
 * Clase estática que recoge las funciones de registro de usuarios y especies
 */
class Registro{
    /*
     * Función privada establece la conexión con la BBDD
     * 
     * @return boolean
     */
    private static function establecerConexion(){
        $cadena_conexion = 'mysql:dbname=a4_da_parque_ecologico;host=127.0.0.1';
        $user = 'a4_da_pe';
        $clave = 'Vmgalvz7!';
        try {
            return $bd = new PDO($cadena_conexion, $user, $clave, array(PDO::ATTR_PERSISTENT => true));
        } catch (Exception $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
    /**
     * Busca y devuelve los datos que se le piden a la bbdd 
     * 
     * @param string $preparada 
     * @param array $consulta 
     * 
     * @return boolean | array false si no se puede realizar la operación o un array con los datos
     */
    public static function devolverDatos($preparada, $consulta){
        try {
            $bd = Registro::establecerConexion();
            $devuelveDatos = $bd->prepare($preparada);
            $result = $devuelveDatos->execute($consulta);
            if (!$result){
                print_r($bd->errorInfo());
                return false;
            }
            return $devuelveDatos->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
    /**
     * Realiza diversas operaciones(insert, select, update) sobre una tabla. 
     * 
     * @param string $preparada 
     * @param array $consulta 
     * 
     * @return boolean verdadero o falso según se complete o no la operación
     */
    public static function operarCommit($preparada, $consulta){
        try {
            $bd = Registro::establecerConexion();
            //se inicia la transacción
            $bd-> beginTransaction();
            $tabla = $bd->prepare($preparada);
            $result = $tabla->execute($consulta);
            //si algo no va bien se vuelve al principio y no se lleva a cabo
            if (!$result){
                $bd ->rollBack();
                print_r($bd->errorInfo());
                return false;
            }
            //Se finaliza la operación
            $bd ->commit();
            return true;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }        
    }
    /**
     * Realiza diversas operaciones(insert, select, update) sobre 
     * la base de datos. Actúa sobre dos tablas relacionadas, biologos y
     * personas, invitados y personas, especimenes y especies...
     * 
     * @param string $preparada la select a llevar a cabo en la primera tabla
     * @param string $preparadaP la select a llevar a cabo en la segunda tabla
     * @param array $consulta la consulta sobre la select en la primera tabla
     * @param array $consultaP la consulta sobre la select en la segunda tabla
     * 
     * @return boolean verdadero o falso según se complete o no la operación
     */
    public static function operarCommitDoble($preparada, $preparadaP, $consulta, $consultaP){
        try {
            $bd = Registro::establecerConexion();
            //se inicia la transacción
            $bd-> beginTransaction();
            $tablaPrincipal = $bd->prepare($preparada);
            $result1 = $tablaPrincipal->execute($consulta);
            //si algo no va bien se vuelve al principio y no se lleva a cabo
            if (!$result1){
                $bd ->rollBack();
                print_r($bd->errorInfo());
                return false;
            }
            $segundaTabla = $bd->prepare($preparadaP);
            $result2 = $segundaTabla->execute($consultaP);
            if (!$result2){
                $bd ->rollBack();
                print_r($bd->errorInfo());
                return false;
            }
            //Se finaliza la operación
            $bd ->commit();
            return true;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
    /**
     * Función de acceso público, comprueba si existe el usuario en la tabla 'usuarios'
     * a través del usuario y el mail, los cuales han de ser únicos.
     * Comunica si el usuario o el mail están en uso con un mensaje y devuelve
     * una excepción si se produce algún error.
     * 
     * ****Solo se usa para registrar invitados
     * 
     * @param string $usuario
     * @param string $mail
     * 
     * @return boolean
     */
    public static function buscarInvitado($usuario, $mail){
       if(Registro::devolverDatos('select * from invitados where usuario = ?', array($usuario))){
            echo 'El usuario introducido ya está en uso';
            return true;
        } else {
            if(Registro::devolverDatos('select * from invitados where mail = ?', array($mail))){
                echo 'El email introducido ya está en uso';
                return true;
            }
        }
    }
    /**
     * ****Solo se usa para registrar invitados
     * Tiene que sacar el id del invitado y el commit tiene que ser completo
     * 
     * @param array $consulta
     * @param array $consultaP
     * 
     * @return boolean
     */
    public static function insertarInvitado($consulta, $consultaP){
        try {
            $bd = Registro::establecerConexion();
            $bd-> beginTransaction();
            $invitado = $bd->prepare('insert into invitados (usuario, mail, claveAcceso) values(?, ?, ?)');
            $result1 = $invitado->execute($consulta);
            if (!$result1){
                $bd ->rollBack();
                print_r($bd->errorInfo());
                return false;
            }
            $consultaP[] = $bd ->lastInsertId();
            $persona = $bd->prepare('insert into personas (nombreApellido, mail, idInvitado) values(?, ?, ?)');
            $result2 = $persona->execute($consultaP);
            if (!$result2){
                $bd ->rollBack();
                print_r($bd->errorInfo());
                return false;
            }
            $bd ->commit();
            return true;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
    /**
     * Función para verificar si la clave introducida corresponde con el usuario
     * introducido
     * 
     * @param string $consulta puede ser mail, dni o nombre de usuario
     * @param string $clave de acceso al sitio web
     * 
     * @return boolean si la contraseña es correcta o falsa
     */
    public static function verificarClave($consulta, $clave){
        if(Validar::dni($consulta)){
            $preparada = 'select claveAcceso from biologos where dni = ?';
        } else if(Validar::mail($consulta)){
            $preparada = 'select claveAcceso from invitados where mail = ?';
        } else if(Validar::usuario($consulta)){
            $preparada = 'select claveAcceso from invitados where usuario = ?';
        } else {
            echo 'No se ha podido validar el dato. ';
            return false;
        }
        try {
            $bd = Registro::establecerConexion();
            $buscarUsuario = $bd->prepare($preparada);
            $result = $buscarUsuario->execute(array($consulta));
            if($buscarUsuario->rowCount() == 1){
                foreach ($buscarUsuario as $usuario) {
                    if(password_verify($clave, $usuario['claveAcceso'])) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            if (!$result){
                print_r($bd->errorInfo());
                return false;
            }
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
    /**
     * Función para crear un objeto con los datos rescatados de la BBDD
     * 
     * @param string $tabla en la que buscar los datos ('biologos' o 'invitados')
     * @param string $tipoLogin indica si es 'dni', 'mail' o 'usuario'
     * @param array $consulta el dato a consultar
     * 
     * @return boolean|\Biologo|\Invitado falso o el objeto creado
     */
    public static function devolverUsuario($tabla, $tipoLogin, $consulta){
        try {
            //Guarda los datos devueltos en la consulta
            $datos = Registro::devolverDatos("select * from $tabla where $tipoLogin = BINARY ?", $consulta);
            //si no hay datos, devuelve false
            if(!$datos){
                echo 'No hay datos, el usuario no está registrado.';
                return false;
            }
            //si el se tipoLogin es un usuario o mail, es un invitado, se busca 
            //en la tabla persona por el idInviatos, ya que el campo usuario
            //no existe en esa tabla y el mail tampoco es único en ella.
            if ($tipoLogin == 'usuario' || $tipoLogin == 'mail'){
                $auxiliarInvitado[] = $datos[0]['id'];
                $persona = Registro::devolverDatos("select * from personas where idInvitado = ?", $auxiliarInvitado);
                if(!$persona){
                    //Si no hay persona, no hay usuario, devuelve false, porque no está registrado
                    echo 'No hay persona invitado';
                    return false;
                }
                $usuario = new Invitado($datos[0]['usuario'], $persona[0]['nombreApellido'], $persona[0]['mail'], $datos[0]['claveAcceso']);
            } 
            if ($tipoLogin == 'dni'){
                $auxiliarBiologo[] = $datos[0]['dni'];
                $persona = Registro::devolverDatos("select * from personas where dni = ?", $auxiliarBiologo);
                if(!$persona){
                    echo 'No hay persona biologo';
                    return false;
                }
                $usuario = new Biologo($persona[0]['nombreApellido'], $persona[0]['dni'], 
                        $datos[0]['fechaTitulacion'], $datos[0]['direccion'], $datos[0]['provincia'], 
                        $persona[0]['mail'], $persona[0]['telefono'], $datos[0]['claveAcceso']);
            }
            return $usuario;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            return false;
        }
    }
}
