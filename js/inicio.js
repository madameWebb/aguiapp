/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Comprueba si existe una sesión y redirecciona en función de si es verdadero 
 * o falso.
 * 
 * @param {string} variable url
 * 
 * @return {Boolean}
 */
function dirigirEnlaces(variable){ 
    let preguntaSesion = new XMLHttpRequest();
    preguntaSesion.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            if(this.responseText === 'true'){
                window.location.href = './php/redirecciones.php';
            } else {
                window.location.href = variable;
            }
        }
    };
    Registro.comunicarServidor(preguntaSesion, 'php/sesionActiva.php', '');
}
/**
 * Inicia las funcionalidades de la página
 * 
 * @return {undefined}
 */
function iniciar(){
    Pagina.escribirNoScript('primerD');
    Pagina.escribrirNav('inicio');
    Pagina.escribirFooter();
    Pagina.escribirModal();
    Pagina.modificarClases('tercerD', 'navbarSupportedContent', 'show');
    Pagina.modificarClases('logo', 'navbarSupportedContent', 'show');
    Pagina.modificarClases('informacion', 'navbarSupportedContent', 'show');
    document.getElementById('login').addEventListener('click', function(){
        dirigirEnlaces('login.html');
    }, false);
    document.getElementById('registro').addEventListener('click', function(){
        dirigirEnlaces('registro.html');
    }, false);
    document.getElementById('logo').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementById('parteh11').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementById('parteh12').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementById('inicio').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementsByTagName('main').item(0).addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
}
window.addEventListener('load', iniciar, false);