/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * @type Invitado|Biologo
 */
var usuario;
/**
 * Es una copia del usuario cargado origina.
 
 * @type Objects
 */
var usuarioCopia;
/**
 * Recoge los datos que han sido modificados por el usuario.
 * 
 * @type Map
 */
var camposModificados = new Map();
/**
 * Vigila los eventos click que se producen en esta página.
 * 
 * @param {string} usuarioTipo Invitado o Biologo
 * 
 * @return {undefined}
 */
function vigilarClickComunes(usuarioTipo){
    document.getElementById('miCuenta').addEventListener('click', function(){
        mostrarMiCuenta(usuarioTipo);
        Pagina.modificarClases('miCuenta', 'navbarSupportedContent', 'show', null, 'text-light');
        Pagina.modificarClases('coment', null, null, 'text-light', null);
        Pagina.modificarClases('todoEspecies', null, null, 'text-light', null);
        Pagina.escribirMigas('coment', 'todoEspecies', 'miCuenta');
        document.getElementById('vueltaP').addEventListener('click', function(){
            escucharVolverP();
            cargarContenido('inicio');
        }, false);
    }, false);
    document.getElementById('logo').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
    document.getElementById('main').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
    document.getElementById('informacion').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
    document.getElementById('principio').addEventListener('click', function(){
        escucharVolverP();
    }, false);
    document.getElementById('irLogin').addEventListener('click', function(){
        Registro.cerrarSesion();
        Registro.reCerrarSesion('../login.html');
    }, false);
    document.getElementById('cerrarSesion').addEventListener('click', function(){
        Registro.cerrarSesion();
        Registro.reCerrarSesion('../index.html');
    }, false);
}
/**
 * Escucha el id de volver al área de usuario del breadcrumbs
 * 
 * @return {undefined}
 */
function escucharVolverP(){
    Pagina.modificarClases('miCuenta', 'navbarSupportedContent', 'show', 'text-light', null);
    Pagina.modificarClases('coment', null, null, 'text-light', null);
    Pagina.modificarClases('todoEspecies', null, null, 'text-light', null);
    Pagina.escribirMigas('coment', 'todoEspecies', 'miCuenta');
}
/**
 * Crea el contenedor de datos y los muestra
 * 
 * @param {string} usuarioTipo Invitado o Biologo
 * 
 * @return {undefined}
 */
function mostrarMiCuenta(usuarioTipo){
    if(Pagina.crearContenedorVariable('main', 'contenidoVariable', 'contenido')){
        Pagina.crearTituloVariable('contenido', 'h2', 'tituloCV');
        let madre = document.getElementById('contenido');
        madre.getElementsByTagName('h2').item(0).appendChild(document.createTextNode
                ('Tus datos de registro'));
        madre.appendChild(document.createElement('div'));
        madre.getElementsByTagName('div').item(0).setAttribute('id', 'mostrar');
        mostrarDatosPersonales(usuarioTipo);
    } else {
        Pagina.crearContenedorVariable('main', 'contenido', 'contenidoVariable');
        mostrarMiCuenta(usuarioTipo);
    }
}
/**
 * Muestra los datos personales del usuario, recibe un parámetro que
 * indica de que clase es el usuario
 * 
 * @param {string} usuarioTipo Invitado o Biologo
 * 
 * @return {undefined}
 */
 function mostrarDatosPersonales(tipoUsuario){
    let recibirDatos = new XMLHttpRequest();
    recibirDatos.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let padre = document.getElementById('mostrar');
            if(this.responseText === 'false'){
                padre.appendChild(document.createElement('p'));
                padre.getElementsByTagName('p').item(0).appendChild(document.
                        createTextNode('Ha ocurrido un error, no se ha iniciado sesión'));
                padre.getElementsByTagName('p').item(0).style.color = 'red';
            } else {
                usuario = Registro.cargarUsuario();
                //Se copia al usuario. Se le asigna el objeto Objeto porque si no, lo que hace es una referencia
                //y si cambias el valor de uno, también se modifica el valor del otro.
                usuarioCopia = Object.assign({}, usuario);
                padre.innerHTML = this.responseText;
                padre.appendChild(document.createElement('input'));
                padre.getElementsByTagName('input').
                        item(padre.getElementsByTagName('input').length - 1).setAttribute('id', 'editar');
                document.getElementById('editar').setAttribute('type', 'button');
                document.getElementById('editar').setAttribute('value', 'Editar');
                //Si el usuario es un Invitado
                if(usuario instanceof Invitado){
                    padre.appendChild(document.createElement('input'));
                    padre.getElementsByTagName('input').
                                item(padre.getElementsByTagName('input').length - 1).setAttribute('id', 'eliminar');
                    document.getElementById('eliminar').setAttribute('type', 'button');
                    document.getElementById('eliminar').setAttribute('value', 'Eliminar cuenta');
                    //Se llama a esta función
                    eliminarCuenta();
                }
                padre.appendChild(document.createElement('input'));
                padre.getElementsByTagName('input').
                            item(padre.getElementsByTagName('input').length - 1).setAttribute('id', 'cancelar');
                document.getElementById('cancelar').setAttribute('type', 'button');
                document.getElementById('cancelar').setAttribute('value', 'Cancelar');
                document.getElementById('cancelar').addEventListener('click', function(){
                    window.location. reload();
                }, false);
                //Se llama a esta función
                editarDatosPersonales(tipoUsuario);
            }
        }
    };
    Registro.comunicarServidor(recibirDatos, '../php/usuarios.php', 'tipoUsuario=' + tipoUsuario + '&mostrar=');
}
/**
 * Permite modificar los datos del usuario. Recibe como parámetro
 * de que tipo de usuario se trata.
 * 
 * @param {string} usuarioTipo Invitado o Biologo
 * 
 * @return {undefined}
 */
 function editarDatosPersonales(tipoUsuario){
    document.getElementById('editar').addEventListener('click', function(){
        let editaDatos = new XMLHttpRequest();
        editaDatos.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let padre = document.getElementById('mostrar');
                if(this.responseText === 'false'){
                    padre.appendChild(document.createElement('p'));
                    padre.getElementsByTagName('p').item(0).appendChild(document.
                            createTextNode('Ha ocurrido un error, no se ha iniciado sesión'));
                    padre.getElementsByTagName('p').item(0).style.color = 'red';
                } else {
                    padre.innerHTML = '<h3>Modifica tus datos</h3>' + this.responseText;
                    padre.appendChild(document.createElement('input'));
                    padre.getElementsByTagName('input').
                            item(padre.getElementsByTagName('input').length - 1).setAttribute('id', 'guardar');
                    document.getElementById('guardar').setAttribute('type', 'button');
                    document.getElementById('guardar').setAttribute('value', 'Guardar');
                    padre.appendChild(document.createElement('input'));
                    padre.getElementsByTagName('input').
                            item(padre.getElementsByTagName('input').length - 1).setAttribute('id', 'cancelar');
                    document.getElementById('cancelar').setAttribute('type', 'button');
                    document.getElementById('cancelar').setAttribute('value', 'Cancelar');
                    //Se solicita la verificación de los campos
                    verificarCampos();
                    //Se escucha si el usuario pulsa guardar
                    document.getElementById('guardar').addEventListener('click', function(){
                        verificarTodo(tipoUsuario);
                    }, false);
                    //O si se arrepiente
                    document.getElementById('cancelar').addEventListener('click', function(){
                        mostrarDatosPersonales(tipoUsuario);
                    }, false);
                }
            }
        };
        Registro.comunicarServidor(editaDatos, '../php/usuarios.php', 'tipoUsuario=' + tipoUsuario + '&editar=');
    }, false);
}
/**
 * Elimina la cuenta de usuario de cualquier usuario que no sea
 * un Biologo.
 * 
 * @return {undefined}
 */
function eliminarCuenta(){
    /*
     * Comunica al servidor la cuenta de usuario que debe eliminar 
     * @return {undefined}
     */
    function eliminarDatos(){
        let eliminaDatos = new XMLHttpRequest();
        eliminaDatos.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                continuar(this.responseText);
            }
        };
        Registro.comunicarServidor(eliminaDatos, '../php/usuarios.php', 'eliminar=' + usuario.usuario + '&tipoUsuario=invitados');
    }
    //Se escucha el botón eliminar
    document.getElementById('eliminar').addEventListener('click', function(){
        //Se vuelve a comprobar que es un Invitado
        if(usuario instanceof Invitado){
            if(window.confirm('¿Estás seguro de eliminar tu cuenta?\nTodos tus datos serán eliminados.')){
                //Y se pide confirmación antes de eliminar los datos
                eliminarDatos();
            }
        }
    }, false);
}
/**
 * Verifica que los campos a modificar cumplan los patrones establecidos.
 * 
 * @return {undefined}
 */
function verificarCampos(){
    document.getElementById('nombre').addEventListener('blur', function(){
        if(!Validar.nombre(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('nombre', this.value);
    }, false);
    document.getElementById('mail').addEventListener('blur', function(){
        if(!Validar.email(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('mail', this.value);
    }, false);
    document.getElementById('claveM').addEventListener('blur', function(){
        if(!Validar.clave(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('claveM', this.value);
    }, false);
    if(usuario instanceof Biologo){
        verificarCamposB();
    } 
}
/**
 * Verifica que los campos a modificar cumplan los patrones establecidos.
 * 
 * @return {undefined}
 */
function verificarCamposB(){
    document.getElementById('telefono').addEventListener('blur', function(){
        if(!Validar.telefono(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('telefono', this.value);
    }, false);
    document.getElementById('direccion').addEventListener('blur', function(){
        if(!Validar.direccion(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('direccion', this.value);
    }, false);
    document.getElementById('provincia').addEventListener('blur', function(){
        if(!Validar.provincia(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('provincia', this.value);
    }, false);
    document.getElementById('fechaTitulacion').addEventListener('blur', function(){
        if(!Validar.fecha(this)) this.style.backgroundColor = 'pink';
        else camposModificados.set('fechaTitulacion', this.value);
    }, false);
}
/**
 * Verifica que todos los campos a modificar sean correctos y pide confirmación
 * para el cambio.
 * 
 * @return {undefined}
 */
function verificarTodo(tipoUsuario){
    /**
     * Función para crear el mensaje a mostrar en la ventana de confirmación
     * 
     * @return {string}
     */
    function crearMensaje(){
        let mensaje = 'Vas a modificar tus datos guardados por: \n';
            for (let [key, value] of camposModificados){
                mensaje += '\t' + key + ': ' + value + '\n';
            }
        return mensaje += '¿Deseas continuar?: ';    
    }
    //Si el Map lleva algo
    if(camposModificados.size !== 0){
        if(window.confirm(crearMensaje())){
            //Si existe el indice 'nombre' se cambia el nombre del usuario y por
            // el del Map, si no, nombre es igual al nombre del usuario copiado
            //Y así con todos los campos
            let nombre = camposModificados.has('nombre') ? 
                usuario.setNombreApellido(camposModificados.get('nombre')) : usuarioCopia.nombreApellido;
            let mail = camposModificados.has('mail') ? usuario.setMail(camposModificados.get('mail')) : usuarioCopia.mail;
            let claveM = camposModificados.has('claveM') ? 
                usuario.setClaveAcceso(camposModificados.get('claveM')) : usuarioCopia.claveAcceso;
            if(usuario instanceof Biologo){
                let telefono = camposModificados.has('telefono') ? 
                    usuario.setTelefono(camposModificados.get('telefono')) : usuarioCopia.telefono; 
                let direccion = camposModificados.has('direccion') ?
                    usuario.setDireccion(camposModificados.get('direccion')) : usuarioCopia.direccion;
                let provincia = camposModificados.has('provincia') ? 
                    usuario.setProvincia(camposModificados.get('provincia')) : usuarioCopia.provincia;
                let fecha = camposModificados.has('fechaTitulacion') ? 
                    usuario.setFechaTitulacion(camposModificados.get('fechaTitulacion')) : usuarioCopia.fechaTitulacion;
            }
            //Se comunican los datos
            comunicarDatos();  
        }  
    //Y si no
    } else {
        //Se vuelve a mostrar los datos
        mostrarDatosPersonales(tipoUsuario);
    }
}
/**
 * Comunica los datos modificados al servidor y recibe una respuesta en función 
 * del tipo de objeto enviado
 * 
 * @return {undefined}
 */
function comunicarDatos(){
    let tipo;
    let datosM = JSON.stringify(usuario);
    let comunicaDatos = new XMLHttpRequest();
    comunicaDatos.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log(this.responseText);
            continuar(this.responseText);
        }
    };
    if(usuario instanceof Biologo) tipo = 'biologos';
    if(usuario instanceof Invitado) tipo = 'invitados';
    Registro.comunicarServidor(comunicaDatos, '../php/modificarDatos.php', 'datosM=' + datosM + '&tipo=' + tipo);
}
/**
 * Escribe el código html preciso para mostrar la respuesta del servidor.
 * 
 * @param {string} respuesta
 * 
 * @return {undefined}
 */
function continuar(respuesta){
    let padre = document.getElementById('main');
    padre.removeChild(document.getElementById('contenido'));
    padre.appendChild(document.createElement('p'));
    padre.getElementsByTagName('p').item(0).style.color = 'green';
    let madre = padre.getElementsByTagName('p').item(0);
    madre.appendChild(document.createTextNode(respuesta + ' '));
    madre.appendChild(document.createElement('a'));
    madre.getElementsByTagName('a').item(0).setAttribute('id', 'aqui');
    madre.getElementsByTagName('a').item(0).setAttribute('href', '');
    madre.getElementsByTagName('a').item(0).appendChild(document.createTextNode('Pincha aquí para continuar'));
    madre.appendChild(document.createTextNode('. '));
    
    Registro.cerrarSesion();
    
    document.getElementById('aqui').addEventListener('click', function(){
        window.location.href = '../login.html';
    }, false);
}
/**
 * Inicia la ejecución de la página, escuchando los links de miCuenta y 
 * cerrarSesion
 * 
 * @return {undefined}
 */
function ejecutarPagina(){
    Pagina.iniciarPagina();
    let usuarioTipo = Registro.definirUsuario();
    Pagina.escribirNoScript('primerD', 'usuarios');
    Pagina.escribrirNav('comunes', usuarioTipo);
    Pagina.escribirFooter();
    Pagina.escribirModal();
    vigilarClickComunes(usuarioTipo);
}
window.addEventListener('load', ejecutarPagina, false);