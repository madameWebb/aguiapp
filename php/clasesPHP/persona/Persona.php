<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * @see class Biologo
 */
require 'clasesPHP/persona/Biologo.php';
/**
 * @see class Invitado
 */
require 'clasesPHP/persona/Invitado.php';
/**
 * Clase Persona, para crear objetos de tipo persona
 */
class Persona{
    /**
     * @var string nombre y apellidos
     */
    private $nombreApellido;
    /**
     * @var string NIF de la persona, puede ser null
     */
    private $dni;
    /**
     * @var string el mail de la persona
     */
    private $mail;
    /**
     * @var string el teléfono de la persona, puede ser null 
     */
    private $telefono;
    /**
     * constructor de 4 parámetros, recibe como parámetros los datos solicitados.
     * 
     * @param string $nombreApellido
     * @param string $dni
     * @param string $mail
     * @param string $telefono
     * 
     * @return Persona
     */
    function __construct($nombreApellido, $dni, $mail, $telefono) {
        $this->nombreApellido = $nombreApellido;
        $this->dni = $dni;
        $this->mail = $mail;
        $this->telefono = $telefono;
    }
    /**
     * Muestra el nombre y el apellido de la persona
     * 
     * @return string 
     */
    function getNombreApellido() {
        return $this->nombreApellido;
    }
    /**
     * Muestra el NIF de la persona
     * 
     * @return string
     */
    function getDni() {
        return $this->dni;
    }
    /**
     * Muestra el mail de la persona
     * 
     * @return string
     */
    function getMail() {
        return $this->mail;
    }
    /**
     * Muestra el teléfono de la persona
     * 
     * @return string
     */
    function getTelefono() {
        return $this->telefono;
    }
    /**
     * Modifica el atributo nombreApellido
     * 
     * @param string $nombreApellido
     * 
     * @return void
     */
    function setNombreApellido($nombreApellido) {
        $this->nombreApellido = $nombreApellido;
    }
    /**
     * Modifica el atributo dni
     * 
     * @param string $dni
     * 
     * @return void
     */
    function setDni($dni) {
        $this->dni = $dni;
    }
    /**
     * Modifica el atributo mail
     * 
     * @param string $mail
     * 
     * @return void
     */
    function setMail($mail) {
        $this->mail = $mail;
    }
    /**
     * Modifica el atributo teléfono
     * 
     * @param string $telefono
     * 
     * @return void
     */
    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }
    /**
     * Muestra un formulario para la modificación de los datos guardados
     * 
     * @return void
     */
    function editarInformacion(){
    ?>
        <p><label for="nombre"/>Nombre: 
        <input type="text" id="nombre" placeholder="<?php echo $this->nombreApellido;?>" autocomplete="off"/></p>
        <p><label for="dni"/>NIF:  <?php echo $this->dni;?> 
        <p><label for="mail"/>Mail: 
        <input type="text" id="mail" placeholder="<?php echo $this->mail;?>" autocomplete="off"/></p>
        <p><label for="telefono"/>Teléfono: 
        <input type="text" id="telefono" placeholder="<?php echo $this->telefono;?>" autocomplete="off"/></p>
    <?php        
    }
    /**
     * Muestra los datos guardados por el objeto
     * 
     * @return void
     */
    function mostrarInformacion(){
    ?>
        <table id="tablaP">
            <tbody id="tbodyP">
                <tr>
                    <td>Nombre: </td>
                    <td><?php echo $this->nombreApellido;?></td>
                </tr>
                <tr>
                    <td>NIF: </td>
                    <td><?php echo $this->dni;?></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><?php echo $this->mail;?></td>
                </tr>
                <tr>
                    <td>Teléfono: </td>
                    <td><?php echo $this->telefono;?></td>
                </tr>
            </tbody>
        </table>
    <?php
    }
}
?>