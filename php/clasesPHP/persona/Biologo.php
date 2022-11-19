<?php
/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


/**
 * Clase Biologo
 * 
 * @extends class Persona
 */
class Biologo extends Persona{
    /**
     * @var string la fecha de titulación del biólogo
     */
    private $fechaTitulacion;
    /**
     * @var string la dirección del biólogo
     */
    private $direccion;
    /**
     * @var string la provincia de residencia del biólogo
     */
    private $provincia;
    /**
     * @var string la clave de acceso al sitio web
     */
    private $claveAcceso;
    /**
     * Constructor de 8 parámetros, devuelve el objeto de tipo Biologo
     * 
     * @param string $nombreApellido
     * @param string $dni
     * @param string $fechaTitulacion
     * @param string $direccion
     * @param string $provincia
     * @param string $mail
     * @param string $telefono
     * @param string $claveAcceso
     * 
     * @return Biologo
     */
    public function __construct($nombreApellido, $dni, $fechaTitulacion, $direccion, $provincia, $mail, $telefono, $claveAcceso) {
        parent::__construct($nombreApellido, $dni, $mail, $telefono);
        $this->fechaTitulacion = $fechaTitulacion;
        $this->direccion = $direccion;
        $this->provincia = $provincia;
        $this->claveAcceso = $claveAcceso;
    }
    /**
     * @return string la fecha de titulación
     */
    function getFechaTitulacion() {
        return $this->fechaTitulacion;
    }
    /**
     * @return string la dirección de residencia del biólogo
     */
    function getDireccion() {
        return $this->direccion;
    }
    /**
     * @return string la provincia del biólogo
     */
    function getProvincia() {
        return $this->provincia;
    }
    /**
     * @return string la clave de acceso del biólogo
     */
    function getClaveAcceso() {
        return $this->claveAcceso;
    }
    /**
     * Modifica la fecha de titulación
     * 
     * @param string $fechaTitulacion
     * 
     * @return void
     */
    function setFechaTitulacion($fechaTitulacion) {
        $this->fechaTitulacion = $fechaTitulacion;
    }
    /**
     * Modifica la dirección
     * 
     * @param string $direccion
     * 
     * @return void
     */
    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }
/**
     * Modifica la provincia
     * 
     * @param string $provincia
     * 
     * @return void
     */
    function setProvincia($provincia) {
        $this->provincia = $provincia;
    }
    /**
     * Modifica la clave de acceso
     * 
     * @param string $claveAcceso
     * 
     * @return void
     */
    function setClaveAcceso($claveAcceso) {
        $this->claveAcceso = $claveAcceso;
    }
    /**
     * Muestra la información del biólogo
     * 
     * @return void
     */
    public function mostrarInformacion(){
    ?>
        <table id="tablaB">
            <tbody id="tbodyB">
                <tr>
                    <td>Nombre: </td>
                    <td><?php echo parent::getNombreApellido();?></td>
                </tr>
                <tr>
                    <td>NIF: </td>
                    <td><?php echo parent::getDni();?></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><?php echo parent::getMail();?></td>
                </tr>
                <tr>
                    <td>Teléfono: </td>
                    <td><?php echo parent::getTelefono();?></td>
                </tr>
                <tr>
                    <td>Dirección: </td>
                    <td><?php echo $this->direccion;?></td>
                </tr>
                <tr>
                    <td>Provincia: </td>
                    <td><?php echo $this->provincia;?></td>
                </tr>
                <tr>
                    <td>Fecha de titulación: </td>
                    <td><?php echo $this->fechaTitulacion;?></td>
                </tr>
            </tbody>
        </table>
    <?php
    }
    /**
     * Permite la recogida de datos para modificar los campos necesarios
     * 
     * @return void
     */
    public function editarInformacion() {
        parent::editarInformacion();
    ?>
        <p><label for="direccion"/>Dirección: 
        <input type="text" id="direccion" placeholder="<?php echo $this->direccion;?>" autocomplete="off"/></p>
        <p><label for="provincia"/>Provincia: 
        <select id="provincia">
            <option value="">Escoje una opción</option>
            <option value="La Coruña"<?php if ($this->provincia == 'La Coruña') {
                echo "selected=\"selected\"";} ?>>La Coruña</option>
            <option value="Lugo"<?php if ($this->provincia == 'Lugo') {
                echo "selected=\"selected\"";} ?>>Lugo</option>
            <option value="Orense"<?php if ($this->provincia == 'Orense') {
                echo "selected=\"selected\"";} ?>>Orense</option>
            <option value="Pontevedra"<?php if ($this->provincia == 'Pontevedra') {
                echo "selected=\"selected\"";} ?>>Pontevedra</option>
        </select></p>
        <p><label for="fechaTitulacion"/>Fecha de titulación: 
        <input type="date" id="fechaTitulacion" value="<?php echo $this->fechaTitulacion;?>"/></p>
        <p><label for="claveM"/>Clave: 
        <input type="password" id="claveM" placeholder="contraseña" autocomplete="new-password"/></p>
    <?php  
    }

}
