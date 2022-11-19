/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * 
 * Crea usuarios de tipo Invitado
 * 
 * @type Invitado
 */
class Invitado{
    /**
     * Constructor de 4 parámetros
     * 
     * @param {string} nombreApellido
     * @param {string} usuario
     * @param {string} mail
     * @param {string} claveAcceso
     * 
     * @return {Invitado}
     */
    constructor(nombreApellido, usuario, mail, claveAcceso){
        this.nombreApellido = nombreApellido;
        this.usuario = usuario;
        this.mail = mail;
        this.claveAcceso = claveAcceso;
    }
    /**
     * Modifica el nombre y apellido del usuario, no devuelve nada.
     * 
     * @param {string} nombreApellido
     * 
     * @return {undefined}
     */
    setNombreApellido(nombreApellido){
        this.nombreApellido = nombreApellido;
    }
    /**
     * Modifica el nombre de usuario del usuario, no devuelve nada.
     * 
     * @param {string} usuario
     * 
     * @return {undefined}
     */
    setUsuario(usuario){
        this.usuario = usuario;
    }
    /**
     * Modifica el mail del usuario, no devuelve nada.
     * 
     * @param {string} mail
     * @return {undefined}
     */
    setMail(mail){
        this.mail = mail;
    }
    /**
     * Función para modificar la clave de acceso del usuario, no devuelve nada.
     * 
     * @param {string} claveAcceso
     * 
     * @return {undefined}
     */
    setClaveAcceso(claveAcceso){
        this.claveAcceso = claveAcceso;
    }

}
