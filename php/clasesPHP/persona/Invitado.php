<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


/**
 * Clase Invitado
 * 
 * @extends class persona
 */
class Invitado extends Persona{
    /**
     * @var string Nombre de usuario
     */
    private $usuario;
    /**
     * @var string clave de acceso al sitio web
     */
    private $claveAcceso;
    /**
     * Constructor de 4 parámetros; crea y devuelve el objeto Invitado a partir de los datos solicitados
     * 
     * @param strig $usuario
     * @param string $nombreApellido
     * @param string $mail
     * @param string $claveAcceso
     * 
     * @return Invitado
     */
    function __construct($usuario, $nombreApellido, $mail, $claveAcceso) {
        parent::__construct($nombreApellido, null, $mail, null);
        $this->usuario = $usuario;
        $this->claveAcceso = $claveAcceso;
    }
    /**
     * @return string la clave de acceso introducida
     */
    function getClaveAcceso() {
        return $this->claveAcceso;
    }
    /**
     * Modifica la clave introducida
     * 
     * @param string $claveAcceso
     */
    function setClaveAcceso($claveAcceso) {
        $this->claveAcceso = $claveAcceso;
    }
    /**
     * @return string el nombre de usuario introducido
     */
    function getUsuario() {
        return $this->usuario;
    }
    /**
     * Modifica el nombre de usuario
     * 
     * @param string $usuario
     */
    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }
    /**
     * @return string el nombre introducido
     */
    public function getNombreApellido() {
        return parent::getNombreApellido();
    }
    /**
     * Modifica el mail introducido
     * 
     * @param string $mail
     */
    public function setMail($mail) {
        parent::setMail($mail);
    }
    /**
     * Modifica el nombre y apellido introducido
     * 
     * @param string $nombreApellido
     */
    public function setNombreApellido($nombreApellido) {
        parent::setNombreApellido($nombreApellido);
    }
    /**
     * Muestra la información del objeto
     */
    public function mostrarInformacion() {
    ?>
        <table id="tablaI">
            <tbody id="tbodyI">
                <tr>
                    <td>Nombre: </td>
                    <td><?php echo parent::getNombreApellido();?></td>
                </tr>
                <tr>
                    <td>Nombre de usuario: </td>
                    <td><?php echo $this->usuario;?></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><?php echo parent::getMail();?></td>
                </tr>
            </tbody>
        </table>
    <?php
    }
    /**
     * Permite la recogida de datos para la modificación de los mismos.
     */
    public function editarInformacion() {
    ?>
        <p><label for="nombre"/>Nombre: 
        <input type="text" id="nombre" placeholder="<?php echo parent::getNombreApellido();?>" autocomplete="off"/></p>
        <p><label for="usuario"/>Usuario: <?php echo $this->usuario;?>
        <p><label for="mail"/>Mail: 
        <input type="text" id="mail" placeholder="<?php echo parent::getMail();?>" autocomplete="off"/></p>
        <p><label for="claveM"/>Clave: 
        <input type="password" id="claveM" placeholder="contraseña"  /></p>
    <?php
    }

}
