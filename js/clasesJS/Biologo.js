/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea objetos de tipo Biologo
 * 
 * @type Biologo
 */
class Biologo{
    /**
     * Constructor de 8 parámetros
     * 
     * @param {string} nombre
     * @param {string} dni
     * @param {string} mail
     * @param {string} telefono
     * @param {string} direccion
     * @param {string} provincia
     * @param {string} fechaTitulacion
     * @param {string} claveAcceso
     * 
     * @return {Biologo}
     */
    constructor(nombre, dni, mail, telefono, direccion, provincia, fechaTitulacion, claveAcceso){
        this.nombreApellido = nombre;
        this.dni = dni;
        this.claveAcceso = claveAcceso;
        this.mail = mail;
        this.telefono = telefono;
        this.direccion = direccion;
        this.provincia = provincia;
        this.fechaTitulacion = fechaTitulacion;
    }
    /**
     * Modifica el nombre y el apellido del biologo.
     * 
     * @param {string} nombreApellido
     * 
     * @return {undefined}
     */
    setNombreApellido(nombreApellido){
        this.nombreApellido = nombreApellido;
    }
    /**
     * Modifica el dni del biologo.
     * 
     * @param {string} dni
     * 
     * @return {undefined}
     */
    setDni(dni){
        this.dni = dni;
    }
    /**
     * Modifica el mail del biologo.
     * 
     * @param {string} mail
     * 
     * @return {undefined}
     */
    setMail(mail){
        this.mail = mail;
    }
    /**
     * 
     * Modifica la clave de acceso del biologo.
     * 
     * @param {string} claveAcceso
     * 
     * @return {undefined}
     */
    setClaveAcceso(claveAcceso){
        this.claveAcceso = claveAcceso;
    }
    /**
     * 
     * Modifica el teléfono del biologo.
     * 
     * @param {string} telefono
     * 
     * @return {undefined}
     */
    setTelefono(telefono){
        this.telefono = telefono;
    }
    /**
     * 
     * Modifica la dirección del biologo.
     * 
     * @param {string} direccion
     * 
     * @return {undefined}
     */
    setDireccion(direccion){
        this.direccion = direccion;
    }
    /**
     * 
     * Modifica la provincia del biologo.
     * 
     * @param {string} provincia
     * 
     * @return {undefined}
     */
    setProvincia(provincia){
        this.provincia = provincia;
    }
    /**
     * 
     * Modifica fecha de la obtención del título de biología.
     * 
     * @param {string} fechaTitulacion
     * 
     * @return {undefined}
     */
    setFechaTitulacion(fechaTitulacion){
        this.fechaTitulacion = fechaTitulacion;
    }
}