<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Clase para validar cualquier tipo de dato que se le pase
 */
class Validar{
    /**
     * Limpia los campos de texto de cualqiuer caracter extraño y elimina los 
     * espacios en blanco al principio y al final
     * 
     * @param string $variable contiene el dato a limpiar
     * @return boolean el dato o false si el campo está vacío
     */
    public static function camposTexto($variable){
        $limpio = htmlspecialchars(trim(strip_tags($variable)), ENT_QUOTES, "ISO-8859-1");
        if(empty($limpio) || ctype_space($limpio)){
            return false;
        } 
        return $limpio;
    }
    /**
     * Valida que el dato nombre y apellido encajen en un patrón
     * 
     * @param type $variable el dato a validar
     * @return boolean el nombre o false si no encaja en el patrón
     */
    static function nombre($variable){
        $nombre = Validar::camposTexto($variable);
        if (!preg_match ('/^([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü]+[\s]){1,2}([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü]+[\s]?){1}$/', $nombre)){
            return false;
        }
        return $nombre;
    }
    /**
     * Valida que el dato usuario encaje en un patrón. No puede empezar por un
     * número y debe constar de al menos 3 caracteres, los dos primeros letras.
     * 
     * @param type $variable el dato a validar
     * @return boolean el nombre de usuario o false si no encaja en el patrón
     */
    static function usuario($variable){
        $usuario = Validar::camposTexto($variable);
        if (!preg_match ('/^([A-ZÑÁÉÍÓÚa-zñáéíóúü]){2}([A-ZÑÁÉÍÓÚa-zñáéíóúü0-9]){1,8}$/', $usuario)){
            return false;
        }
        return $usuario;
    }
    /**
     * Función privada para validar que la letra del DNI es correcta
     * 
     * @param int $numero del DNI
     * @param string $letra del DNI
     * @return boolean
     */
    private static function letraDni($numero, $letra){
        $esCorrecto = false;
        if($numero % 23 >= 0 && $numero % 23 <= 22){
            $letrasNif = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 
                        'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 
                        'H', 'L', 'C', 'K', 'E'];
            if ($letrasNif[$numero % 23] == $letra){
                $esCorrecto = true;
            } 
        }
        return $esCorrecto;
    }
    /**
     * Valida que el número del DNI encaja en un patrón y comprueba que es un 
     * dni real
     * 
     * @param string $variable NIF completo
     * @return boolean false o el número si es verdadero
     */
    static function dni($variable){
        $dni = Validar::camposTexto($variable);
        if (!preg_match ('/^\d{8}[a-zA-Z]$/', $dni)){
            return false;
        } else {
            if (!Validar::letraDni(((int) substr($dni, 0, 8)), strtoupper(substr($dni, -1)))){
                return false;
            }
        }
        return $dni;
    }
    /**
     * Valida que el mail introducido pueda ser correcto
     * 
     * @param string $variable mail
     * @return boolean el mail o false si no es correcto
     */
    static function mail($variable){
        $mail = Validar::camposTexto($variable);
        if(filter_var($mail, FILTER_VALIDATE_EMAIL)){
            return $mail;
        } else {
            return false;
        }
    }
    /**
     * Valida que el teléfono introducido pueda se correcto, para lo cual debe 
     * empezar por 9, 8, 7 o 6
     * 
     * @param string $variable número de teléfono
     * @return boolean el dato o false si no es verdadero
     */
    static function telefono($variable){
        $telefono = Validar::camposTexto($variable);
        if (!preg_match ('/^[9876]{1}[0-9]{8}$/', $telefono)){
            return false;
        }
        return $telefono;
    }
    /**
     * Valida que la dirección introducida corresponda con un patrón válido y
     * el campo no esté vacio
     * 
     * @param string $variable le dirección
     * @return boolean la dirección o false si no es correcto
     */
    static function direccion($variable){
        $direccion = Validar::camposTexto($variable);
        if (!preg_match ('/(([A-ZÑÁÉÍÓÚa-zñáéíóúü])+\s*){1,10}(\d*\s*)(-*\s*\d*([A-ZÑÁÉÍÓÚa-zñáéíóúü])*\s*)(-*\s*\d*)$/', $direccion)){
            return false;
        }
        return $direccion;
    }
    /**
     * Valida que la provincia sea correcta y no esté en blanco
     * 
     * @param string $variable provincia
     * @return boolean el campo o false en caso de no ser correcto
     */
    static function provincia($variable){
        $provincia = Validar::camposTexto($variable);
        if(empty($provincia) || ctype_space($provincia)){
            return false;
        }
        return $provincia;
    }
    /*
     * Función privada para comprobar que la fecha introducida no es mayor que 
     * la fecha actual
     * 
     * @param int $dia introducido
     * @param int $mes introducido
     * @param int $anno introducido
     * @return boolean verdadero o falso según el resultado 
     */
    private static function esCorrectaFecha($dia, $mes, $anno){
        return (date_create($anno.'-'.$mes.'-'.$dia) <= date_create());
    }
    /*
     * Funcion privada valida que los días introducidos se corresponden con el 
     * mes introducido y llama a otra función que verifica si la fecha es menor
     * o igual que la fecha actual
     * 
     * @param int $anno introducido
     * @param int $mes introducido
     * @param int $dia introducido
     * @return boolean verdadero o falso según el resultado
     */
    private static function esCorrectoDia($anno, $mes, $dia){
        if(preg_match('/^((0[469]|11))$/', $mes)){
            if(preg_match('/^(0([1-9])|[1-2][\d]|30)$/', $dia)){
                return Validar::esCorrectaFecha($dia, $mes, $anno);
            }
        } else if (preg_match('/^((02))$/', $mes)){
            if(preg_match('/^(0([1-9])|[1-2][\d])$/', $dia)){
                if(preg_match('/^(29)$/', $dia)){
                    if ((($anno % 4 === 0) && ($anno % 100 !== 0)) || ($anno % 400 === 0)){
                        return Validar::esCorrectaFecha($dia, $mes, $anno);
                    }
                }else {
                    return Validar::esCorrectaFecha($dia, $mes, $anno);
                }
            }  
        } else if (preg_match('/^((0[13578]|1[02]))$/', $mes)){
            if(preg_match('/^(0([1-9])|[1-2][\d]|3[01])$/', $dia)){
                return Validar::esCorrectaFecha($dia, $mes, $anno);
            }
        } 
    }
    /**
     * Verifica qu ela fecha responde a un patrón válido y en ese caso comprueba
     * que la fecha corresponda con un día y mes acordes y que la fecha 
     * introducida no sea mayor que la fecha actual
     * 
     * @param string $variable la fecha introducida
     * @return boolean verdadero si la fecha es correcta y falso si no lo es
     */
    static function fecha($variable){
        $fecha = Validar::camposTexto($variable);
        if (!preg_match ('/^((\d){4}[\-]([0]?[1-9]|1[0-2])[\-]([0]?([1-9])|[1-2][\d]|3[0-1]))$/', $fecha)){
            return false;
        } else {
            $aux = explode('-', $fecha);
            if(!checkdate((int) $aux[1], (int) $aux[2], (int) $aux[0])){
                return false;
            }else {
                $aux = explode('-', $fecha);
                if(!Validar::esCorrectoDia($aux[0], $aux[1], $aux[2])){
                    return false;
                }
            }
        }
        return $fecha;
    }
    /**
     * Verifica que la clave introducida responda a un patrón válido
     * 
     * @param string $variable la clave introducida
     * @return boolean la clave o falso si no es correcta
     */
    static function clave($variable){
        $clave = Validar::camposTexto($variable);
        if (!preg_match ('/^(?=(?:.*\d))(?=(?:.*[A-Za-z]))\S{6,8}$/', $clave)){
            return false;
        }
        return $clave;
    }
    /**
     * Verifica que la especie introducida responda a un patrón válido
     * 
     * @param string $variable
     * @return boolean
     */
    static function especie($variable){
        $especie = Validar::camposTexto($variable);
        if (!preg_match ('/^[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü\s]{1,49}$/', $especie)){
            return false;
        }
        return $especie;
    }
    /**
     * Verifica que el periodo migratorio introducido responda a un patrón válido
     * 
     * @param string $variable
     * @return boolean
     */
    static function migracion($variable){
        $migracion = Validar::camposTexto($variable);
        if (!preg_match ('/^(Primavera|Verano|Otoño|Invierno|No)$/', $migracion)){
            return false;
        }
        return $migracion;
    }
    /**
     * Verifica que el código de especie introducido responda a un patrón válido
     * 
     * @param string $variable
     * @return boolean
     */
    static function codigoE($variable){
        $codigo = Validar::camposTexto($variable);
        if (!preg_match ('/^[^AEIOUÁÉÍÓÚÑáéíóúña-z]{1}\d{4}$/', $codigo)){
            return false;
        }
        return $codigo;
    }
    /**
     * Verifica que el peso introducido responda a un patrón válido
     * 
     * @param string $variable
     * @return boolean
     */
    static function peso($variable){
        $peso = Validar::camposTexto($variable);
        if (!preg_match ('/^(\d|\d{2}|\d{3}|\d{4}|(1\d{4})|20000)[\s]?$$/', $peso)){
            return false;
        }
        return $peso;
    }
    /**
     * Verifica que las dimensiones introducidas respondan a un patrón válido
     * 
     * @param string $variable
     * @return boolean
     */
    static function dimensiones($variable){
        $dimensiones = Validar::camposTexto($variable);
        if (!preg_match ('^(\d|\d{2}|([12]\d{2})|300)(\s\/\s)(\d|\d{2}|([12]\d{2})|300)[\s]?$/', $dimensiones)){
            return false;
        }
        return $dimensiones;
    }
}
