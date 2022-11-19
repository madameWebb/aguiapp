/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Inicializado a 0, cuenta si hay errores en los campos del login
 * 
 * @type integer
 */
var contadorErrores = 0;
/**
 * Recoge los valores de los campos del formulario de acceso.
 * 
 * @return {undefined}
 */
function recogerCampos(){
    let usuario = document.getElementById('usuario');
    let clave = document.getElementById('clave');
    usuario.addEventListener('blur', function(){
        if(Validar.email(this) || Validar.usuario(this) || Validar.nif(this.value)){
            esCorrecto('usuario', this.value);
            contadorErrores = 0;
        } else {
            esIncorrecto('usuario');
            contadorErrores++;
        }
    }, false);
    
    clave.addEventListener('blur', function(){
        if((!Validar.clave(this))){
            esIncorrecto('clave');
            contadorErrores++;
        } else {
            esCorrecto('clave', this.value);
            contadorErrores = 0;
        }
    }, false);
}
/**
 * Vigila dónde se produce el evento click en la página.
 * 
 * @return {undefined}
 */
function vigilarClickLogin(){
    document.getElementById('loguearse').addEventListener('click', function(){
        if(!sonValidosCampos('usuario') || !sonValidosCampos('clave') || contadorErrores !== 0) {
            Pagina.escribirTlcdedc('mostrarError', 'Todos los campos deben estar debidamente cumplimentados');
        } else {
            let tipoLogin = definirTipoLogin(usuario);
            document.getElementById('mostrarError').innerHTML = '';
            //Comunicar al servidor
            comunicarLogin(tipoLogin, usuario.value, clave.value);
        }
    }, false);
    document.getElementById('inicio').addEventListener('click', function(){
        window.location.href = 'index.html';
    }, false);
    document.getElementById('registro').addEventListener('click', function(){
        window.location.href = 'registro.html';
    }, false);
    document.getElementById('volver').addEventListener('click', function(){
        window.location.href = 'index.html';
    }, false);
    document.getElementById('logo').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementById('login').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementsByTagName('main').item(0).addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
}
/**
 * Da valores de estilo y atributos a los input si no son correctos
 * 
 * @param {string} idInput id del input
 * 
 * @return {undefined}
 */
function esIncorrecto(idInput){
    document.getElementById(idInput).setAttribute('placeholder', idInput + ' incorrecto/a');
    document.getElementById(idInput).classList.add('is-invalid');
    document.getElementById(idInput).style.backgroundColor = 'pink';
}
/**
 * Da valores de estilo y atributos a los input si son correctos
 * 
 * @param {string} idInput ide del input
 * @param {string} valor que es recogido
 * 
 * @return {undefined}
 */
function esCorrecto(idInput, valor){
    document.getElementById(idInput).style.backgroundColor = '';
    document.getElementById(idInput).value = valor;
    document.getElementById(idInput).classList.remove('is-invalid');
}
/**
 * Devuelve verdadero o falso si los campos son válidos
 * 
 * @param {string} campo id del campo del formulario
 * 
 * @return {Boolean}
 */
function sonValidosCampos(campo){
    let sonValidos;
    if(document.getElementById(campo) !== null){
        if(document.getElementById(campo).value === '' ||
                document.getElementById(campo) === 0){
            sonValidos = false; 
        } else {
            sonValidos = true;
        }
    }
    return sonValidos;
}
/**
 * Define como se está logueando el usuario según el parámetro introducido
 * 
 * @param {string} variable recibida, contiene un mail, nombre de usuario o dni
 * 
 * @return {string}
 */
function definirTipoLogin(variable){
    let tipoLogin; 
    if(Validar.email(variable)){
        tipoLogin = 'mail';
    }else if(Validar.usuario(variable)){
        tipoLogin = 'usuario';
    } else {
        tipoLogin = 'dni';
    }
    return tipoLogin;
}
/**
 * Recoge el usuario logueado y lo guarda en localStorage
 * 
 * @return {Boolean}
 */
function recogerUsuario(){
    let usuarioRecogido = new XMLHttpRequest();
     usuarioRecogido.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            if(this.responseText === 'false'){
                let padre = document.getElementById('mostrarError');
                padre.appendChild(document.createElement('p'));
                padre.getElementsByTagName('p').item(0).style.color = 'red';
                padre.appendChild(document.createTextNode('Ha ocurrido un error'));
            } else {
                crearSiEsTrue(this.responseText);
            } 
        }
    };
    Registro.comunicarServidor(usuarioRecogido, 'php/recogerUsuario.php', 'recoger=');
}
/**
 * Crea el objeto usuario si este existe en la base de datos.
 * 
 * @param {datosRecibidos} datosRecibidos del formulario de login
 * 
 * @return {undefined}  
 */
function crearSiEsTrue(datosRecibidos){
    let objetoUsuario;
        let datos = datosRecibidos;
        let arrayDatos = new Map();
        let auxiliar = datos.slice(1);
        let auxiliar2 = auxiliar.split('}');
        let auxiliar0 = auxiliar2[0].replaceAll('"', '');
        let auxiliar3 = auxiliar0.split(',');
        for(let i = 0; i < auxiliar3.length; i++){
            let aux = auxiliar3[i].split(':');
            arrayDatos.set(aux[0], aux[1]);
        }
        if(arrayDatos.get('tipoUsuario') === 'invitado'){
            objetoUsuario = new Invitado(arrayDatos.get('nombreApellido'),
                arrayDatos.get('usuario'),
                arrayDatos.get('mail'),
                clave = localStorage.length > 0 ? localStorage['clave'] : null);
                
        }
        if(arrayDatos.get('tipoUsuario') === 'biologo'){
            objetoUsuario = new Biologo(arrayDatos.get('nombreApellido'),
                arrayDatos.get('dni'),
                arrayDatos.get('mail'),
                arrayDatos.get('telefono'),
                arrayDatos.get('direccion'),
                arrayDatos.get('provincia'),
                arrayDatos.get('fechaTitulacion'),
                clave = localStorage.length > 0 ? localStorage['clave'] : null);
        }
        localStorage.setItem('objetoUsuario', JSON.stringify(objetoUsuario));
}
/**
 * Comunica el login al servidor, el cual verifica que exista el usuario.
 * Si es true guarda los datos en localStorage
 * 
 * @param {string} tipoLogin
 * @param {string} usuario
 * @param {string} clave
 * 
 * @return {undefined}  
 */
function comunicarLogin(tipoLogin, usuario, clave){
    let tipoUsuario;
    let comunicaLogin = new XMLHttpRequest();
    if(tipoLogin === 'dni') tipoUsuario = 'biologos';
    else tipoUsuario = 'invitados';
    let datos = new Object();
    datos.tipoLogin = tipoLogin;
    datos.usuario = usuario;
    datos.clave = clave;
    datos.tipoUsuario = tipoUsuario;
    let pasarDatos =JSON.stringify(datos);
    comunicaLogin.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            if(this.responseText === 'true'){
                recogerUsuario();
                console.log(localStorage);
                localStorage.setItem('usuario', usuario);
                localStorage.setItem('clave', clave);
                localStorage.setItem('tipoUsuario', tipoUsuario);
                document.getElementById('formLogin').reset(); 
                Pagina.crearBarraProgreso('barraProgreso');
                document.getElementsByTagName('main').item(0).getElementsByTagName('div').item(0).removeChild(document.getElementById('formLogin'));
                setTimeout(function(){
                    window.location.href = './php/redirecciones.php';
                }, 3000);
            } else {
                Pagina.escribirTlcdedc('mostrarError', this.responseText);
            }
        }
    };
    Registro.comunicarServidor(comunicaLogin, 'php/login.php', 'datos=' + pasarDatos);
}
/**
 * Inicia las funcionalidades de la página
 * 
 * @return {undefined}
 */
function iniciarLogin(){
    Pagina.comprobarSesion();
    Pagina.escribirNoScript('primerD');
    Pagina.escribrirNav('login');
    Pagina.escribirTiempo('./php/tiempo.php');
    Pagina.escribirFooter();
    Pagina.escribirModal();
    Pagina.modificarClases('informacion', 'navbarSupportedContent', 'show');
    recogerCampos();
    vigilarClickLogin();
}
window.addEventListener('load', iniciarLogin, false);