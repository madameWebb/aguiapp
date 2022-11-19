/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Realiza las operaciones de comunicación con el servidor, el registro de 
 * usuarios y especies y varias operaciones comunes a los dos tipos de 
 * usuarios, Invitado y Biologo.
 * 
 * @type {Registro}
 */
class Registro{
    /**
     * Realiza la conexión con el servidor y envía la petición y los datos,
     * con las cabeceras del método post.
     * 
     * @param {type} comunicaDatos
     * @param {type} ruta
     * @param {type} peticion
     * 
     * @return {Boolean}
     */
    static comunicarServidor(comunicaDatos, ruta, peticion){
        comunicaDatos.open('POST', ruta, true);
        comunicaDatos.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        comunicaDatos.send(peticion);
        return false ;
    }
    /**
     * Función que establece la comunicación con el servidor y envía los datos 
     * sin cabeceras, especialmente indicado para utilizar con formData
     * 
     * @param {type} comunicaDatos
     * @param {type} ruta
     * @param {type} peticion
     * 
     * @return {Boolean}
     */
    static comunicarServidorSC(comunicaDatos, ruta, peticion){
        comunicaDatos.open('POST', ruta, true);
        comunicaDatos.send(peticion);
        return false ;
    }
    /*
    * Muestra los errores por campo en el formulario
    * Está destinada a desaparecer en cuanto de estilo a la página de biologos.html
    * 
    * @param {string} idE
    * @return {undefined}
    */
    static escribirError(idE){
       document.getElementById(idE).innerHTML = 'Dato mal introducido';
       document.getElementById(idE).style.color = 'red';
    }
    /*
     * Función para mostrar que los campos deben ir correctos
     * Igual qu ela anterior, destinada a desaparecer
     * 
     * @param {string} idE
     * @return {undefined}
     */
    static escribirTlcdedc(idE){
        document.getElementById(idE).innerHTML = 
            'Todos los campos deberían estar debidamente cumplimentados';
        document.getElementById(idE).style.color = 'red';
    }
    /**
     * Cierra la sesión en el servidor y vaciar localStorage.
     * 
     * @type XMLHttpRequest
     */
    static cerrarSesion(){
        let cerrarSesion = new XMLHttpRequest();
        cerrarSesion.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                if(this.responseText === 'true'){
                    localStorage.clear();
                }
            }
        };
        Registro.comunicarServidor(cerrarSesion, '../php/salir.php', ''); 
    }
    /*
     * Firefox no vacia el localStorage a la primera, hay que insistir... :(
     * 
     * @param {string} ruta 
     */
    static reCerrarSesion(ruta){
        let navegador = navigator.userAgent.toUpperCase();
        if(navegador.search('FIREFOX' || localStorage.length > 0) > -1) localStorage.clear();
        window.location.href = ruta;
    }
    /**
     * Devuelve un usuario de tipo Invitado o Biologo a partir de localStorage
     * 
     * @return Invitado | Biologo
     */
    static cargarUsuario(){
        let usuario;
        let auxiliar = JSON.parse(localStorage.getItem('objetoUsuario'));
        if(localStorage.getItem('tipoUsuario') === 'invitados'){
            usuario = new Invitado(auxiliar['nombreApellido'],
                auxiliar['usuario'],
                auxiliar['mail'],
                localStorage.length > 0 ? localStorage['clave'] : null);
        }
        if(localStorage.getItem('tipoUsuario') === 'biologos'){
            usuario = new Biologo(auxiliar['nombreApellido'],
                auxiliar['dni'],
                auxiliar['mail'],
                auxiliar['telefono'],
                auxiliar['direccion'],
                auxiliar['provincia'],
                auxiliar['fechaTitulacion'],
                localStorage.length > 0 ? localStorage['clave'] : null);
        }
        return usuario;
    }
    /**
     * Define que tipo de usuario está accediendo en función de su pathname
     * 
     * @return string
     */
    static definirUsuario(){
        let localizacion = window.location['pathname'].split('/');
        let usuarioTipo = '';
        if(localizacion[localizacion.length - 1] === 'usuarios.html'){
            usuarioTipo = 'invitados';
        } else if (localizacion[localizacion.length - 1] === 'biologos.html'){
            usuarioTipo = 'biologos';
        }
        return usuarioTipo;
    }  
}



