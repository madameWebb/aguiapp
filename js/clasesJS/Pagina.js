/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Clase para escribir los elementos comunes principales de las páginas
 * 
 * @type {Pagina}
 */
class Pagina{
    /**
     * Escribe un noscript en las páginas para comprobar si tienen habilitado JS
     * 
     * @param {string} idElemento referencia para escribir el noscript
     * @param {string} lugar donde encontrar la imagen, null por defecto
     * 
     * @return {undefined}
     */
    static escribirNoScript(idElemento, lugar = null){
        let cuerpo = document.getElementsByTagName('body').item(0);
        let noScript = document.createElement('noscript');
        //insertBefore agrega un elemento delante de otro que se especifique
        //colgado de un padre común
        cuerpo.insertBefore(noScript, document.getElementById(idElemento));
        noScript.appendChild(document.createElement('h1'));
        noScript.lastElementChild.appendChild(document.createTextNode('Comprobando si javascript está habilitado'));
        let div = noScript.appendChild(document.createElement('div'));
        let img = div.appendChild(document.createElement('img'));
        if (lugar === null){
            img.setAttribute('src', 'images/error.jpg');
        } else if(lugar === 'usuarios'){
            img.setAttribute('src', '../images/error.jpg');
        }
        img.setAttribute('alt', 'Javascript deshabilitado');
        let p = noScript.appendChild(document.createElement('p'));
        p.appendChild(document.createTextNode('Javascript está deshabilitado en su navegador web.'));
        p.appendChild(document.createTextNode('Por favor, para ver correctamente este sitio,'));
        p.appendChild(document.createElement('b'));
        p.lastElementChild.appendChild(document.createElement('i'));
        document.getElementsByTagName('i').item(0).appendChild(document.createTextNode('habilite javascript'));
        p.appendChild(document.createTextNode('.'));
        let p2 = div.appendChild(document.createElement('p'));
        p2.appendChild(document.createTextNode('Haga click en el siguiente enlace para ver las instrucciones para '));
        let a = p2.appendChild(document.createElement('a'));
        a.setAttribute('href', 'http://www.enable-javascript.com/es/');
        a.setAttribute('target', '_blank');
        a.setAttribute('alt', 'Javascript deshabilitado');
        a.setAttribute('title', 'Javascript deshabilitado');
        a.appendChild(document.createTextNode('habilitar javascript en su navegador'));
        p2.appendChild(document.createTextNode('.'));
    }
    /**
     * Escribe la barra de navegación
     * 
     * @param {string} indicePagina identifica la página activa
     * @param {string} tipoUsuario identifica el tipo de usuario, Invitado o Biologo, por defecto es null
     * 
     * @return {undefined}
     */
    static escribrirNav(indicePagina, tipoUsuario = null){
        let areaPrivada = '';
        let logo = (indicePagina === 'inicio') ? 
            '<h1 id="parteh11" class="text-primary h3 me-3">Parque </h1><img id="logo" class="navbar-brand" src="images/logo.svg" alt="logo Parque Natural A Guía" width="60" height="60" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Parque Natural A Guía"><h1 id="parteh12" class="text-primary h3">"A Guía"</h1>' :
            '<h1 id="logo" class="text-primary h3">Parque Natural "A Guía"</h1>';
        let linkInicio = (indicePagina === 'inicio') ? 
            '<a id="inicio" class="nav-link active text-light" aria-current="page" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Página principal">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16"  alt="Página principal">\n\
                    <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>\n\
                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>\n\
                </svg>\n\
            </a>': 
            '<a id="inicio" class="nav-link" href="index.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Página principal">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16"  alt="Página principal">\n\
                <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>\n\
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>\n\
                </svg>\n\
            </a>';
        let linkLoginCuenta = (indicePagina === 'login') ? 
            '<a id="login"class="nav-link active text-light" aria-current="page" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Abrir sesión">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16" alt="Login">\n\
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>\n\
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>\n\
                </svg>\n\
            </a>': 
            '<a id="login" class="nav-link"  href="login.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Abrir sesión">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16" alt="Login">\n\
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>\n\
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>\n\
                </svg>\n\
            </a>';
        let linkRegistroCerrar = (indicePagina === 'registrarse') ? 
            '<a id="registro"class="nav-link active text-light" aria-current="page" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Registro">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-heart-fill" viewBox="0 0 16 16" alt"Registro>\n\
                    <path fill-rule="evenodd" d="M10.058.501a.501.501 0 0 0-.5-.501h-2.98c-.276 0-.5.225-.5.501A.499.499 0 0 1 5.582 1a.497.497 0 0 0-.497.497V2a.5.5 0 0 0 .5.5h4.968a.5.5 0 0 0 .5-.5v-.503A.497.497 0 0 0 10.555 1a.499.499 0 0 1-.497-.499Z"/>\n\
                    <path fill-rule="evenodd" d="M4.174 1h-.57a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-.642c.055.156.085.325.085.5V2c0 .828-.668 1.5-1.492 1.5H5.581A1.496 1.496 0 0 1 4.09 2v-.5c0-.175.03-.344.085-.5Zm3.894 5.482c1.656-1.673 5.795 1.254 0 5.018-5.795-3.764-1.656-6.69 0-5.018Z"/>\n\
                </svg>\n\
            </a>': 
            '<a id="registro" class="nav-link" href="registro.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Registro">\n\
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard2-heart-fill" viewBox="0 0 16 16" alt"Registro>\n\
                    <path fill-rule="evenodd" d="M10.058.501a.501.501 0 0 0-.5-.501h-2.98c-.276 0-.5.225-.5.501A.499.499 0 0 1 5.582 1a.497.497 0 0 0-.497.497V2a.5.5 0 0 0 .5.5h4.968a.5.5 0 0 0 .5-.5v-.503A.497.497 0 0 0 10.555 1a.499.499 0 0 1-.497-.499Z"/>\n\
                    <path fill-rule="evenodd" d="M4.174 1h-.57a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-.642c.055.156.085.325.085.5V2c0 .828-.668 1.5-1.492 1.5H5.581A1.496 1.496 0 0 1 4.09 2v-.5c0-.175.03-.344.085-.5Zm3.894 5.482c1.656-1.673 5.795 1.254 0 5.018-5.795-3.764-1.656-6.69 0-5.018Z"/>\n\
                </svg>\n\
            </a>';
        if(indicePagina === 'comunes'){
            linkInicio = '<a id="inicio" class="nav-link" href="../index.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Página principal">\n\
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16" alt="Página principal">\n\
                        <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>\n\
                        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>\n\
                    </svg>\n\
                </a>';
            linkLoginCuenta = '<a id="miCuenta" class="nav-link" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Mis datos personales">\n\
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16" alt="Mis datos personales">\n\
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>\n\
                    </svg>\n\
                </a>';
            linkRegistroCerrar = '<a id="cerrarSesion" class="nav-link" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cerrar sesión">\n\
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" alt="Cerrar sesión">\n\
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>\n\
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>\n\
                    </svg>\n\
                </a>'; 
            if (tipoUsuario !== null){
                areaPrivada = 
                    '<li class="nav-item">\n\
                        <a id="principio" class="nav-link active text-personalizado5" aria-current="page" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Mi cuenta">\n\
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16" alt="Mi cuenta">\n\
                                <path fill-rule="evenodd" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L8 2.207l6.646 6.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>\n\
                                <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Zm0 5.189c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z"/>\n\
                            </svg>\n\
                        </a>\n\
                    </li>';
                if(tipoUsuario === 'invitados') {
                    areaPrivada +=  
                        '<li class="nav-item dropdown shadow-sm">\n\
                            <a id="coment" class="nav-link dropdown-toggle" href="#" id="comentarios" role="button" data-bs-toggle="dropdown" aria-expanded="false"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Comentarios">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16" alt="Comentarios">\n\
                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>\n\
                                </svg>\n\
                            </a>\n\
                            <ul class="dropdown-menu bg-secondary" aria-labelledby="comentarios">\n\
                                <li><a id="mComentarios" class="dropdown-item text-warning bg-secondary" href="#">Mis comentarios</a></li>\n\
                                <li><a id="cRespondidos" class="dropdown-item text-warning bg-secondary" href="#">Comentarios respondidos</a></li>\n\
                            </ul>\n\
                        </li>\n\
                        <li class="nav-item"><a id="todoEspecies" class="nav-link" aria-current="page" href="#"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Todas las especies registradas">\n\
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" alt="Todas las especies">\n\
                                <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>\n\
                            </svg>\n\
                        </a></li>';
                    
                } else if(tipoUsuario === 'biologos'){
    
                }
            }
        }          
        document.getElementById('barra').innerHTML = 
            '<nav class="navbar navbar-expand-lg navbar-ligth bg-dark p-1 pe-0">\n\
                <div class="container-fluid">\n\
                    <button class="navbar-toggler btn-outline-success text-personalizado3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n\
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#24fb4c" class="bi bi-list-stars" viewBox="0 0 16 16">\n\
                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>\n\
                            <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"/>\n\
                        </svg>\n\
                    </button>\n\
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">\n\
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n\
                            <li class="nav-item">'
                                + linkInicio +
                            '</li>'
                                + areaPrivada +
                            '<li class="nav-item">'
                                + linkLoginCuenta +
                            '</li>\n\
                            <li class="nav-item">'
                                + linkRegistroCerrar +
                            '</li>\n\
                            <li class="nav-item">\n\
                                <a id="informacion" class="nav-link" role="button" data-bs-toggle="modal" data-bs-target="#ventanaModal" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Más información">\n\
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16" alt="Información" title="Información">\n\
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>\n\
                                    </svg>\n\
                                </a>\n\
                            </li>\n\
                        </ul>\n\
                    </div>'
                        + logo +
                    '<button class="navbar-toggler btn-outline-success text-personalizado3" type="button" data-bs-toggle="collapse" data-bs-target="#navSearch" aria-controls="navSearch" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Buscar">\n\
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#24fb4c" class="bi bi-search-heart" viewBox="0 0 16 16">\n\
                            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>\n\
                            <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>\n\
                        </svg>\n\
                    </button>\n\
                    <div class="collapse navbar-collapse justify-content-end" id="navSearch">\n\
                        <div class="input-group input-group-sm mt-3 justify-content-end">\n\
                            <form class="d-flex" action="https://www.google.com/search" target="_blank">\n\
                                <input class="form-control border-success border-1 bg-miColor placeholder text-info w-auto ms-auto ps-2 mt-2 me-1 h-50" type="search" placeholder="Buscar" aria-label="Search">\n\
                                <button class="btn h-75 mb-2" type="submit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="buscar">\n\
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#24fb4c" class="bi bi-search-heart" viewBox="0 0 16 16">\n\
                                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>\n\
                                        <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>\n\
                                    </svg>\n\
                                </button>\n\
                            </form>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </nav>';
    }
    /**
     * Escribe el breadcrumbs según el lugar en el que se encuentra el usuario.
     * 
     * @param {string} linkC 
     * @param {string} linkT 
     * @param {string} linkM 
     * 
     * @return {undefined}
     */
    static escribirMigas(linkC, linkT, linkM){
        let comentarios = document.getElementById(linkC).classList.contains('text-light');
        let todoEspecies = document.getElementById(linkT).classList.contains('text-light');
        let miCuenta = document.getElementById(linkM).classList.contains('text-light');
        let cadena = '';

        if(comentarios){
            cadena = '<li class="breadcrumb-item active" aria-current="page">Comentarios</li>';
        } else if (todoEspecies){
            cadena = '<li class="breadcrumb-item active" aria-current="page">Todas las especies registradas</li>';
        } else if(miCuenta){
            cadena = '<li class="breadcrumb-item active" aria-current="page">Mi cuenta</li>';
        }        
        let casa = (comentarios || todoEspecies || miCuenta) ? 
        '<li class="breadcrumb-item"><a id="vueltaP" href="#">Area de usuario</a></li>' + cadena :
        '<li class="breadcrumb-item active" aria-current="page">Area de usuario</li>';
        
        document.getElementById('migas').innerHTML =
            '<ol class="breadcrumb p-0 pt-4 ps-5">\n\
                <li class="breadcrumb-item"><a href="../index.html">Inicio</a></li>\n\
                <li class="breadcrumb-item"><a id="irLogin" href="#">Login</a></li>'
                + casa +
            '</ol>';
    }
    /**
     * Escribe el footer en todas las páginas
     * 
     * @return {String}
     */
    static escribirFooter(){
        document.getElementById('pie').innerHTML = 
        '<div class="d-flex flex-wrap flex-sm-nowrap justify-content-between navbar-ligth bg-dark p-2 ps-4 pb-4 pt-4">\n\
            <ul class="col-12 justify-content-center col-sm-4 justify-content-sm-start list-unstyled d-flex ms-lg-4">\n\
                <li class="ms-3">\n\
                    <a class="text-muted" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Facebook">\n\
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#e8a104" class="bi bi-facebook" viewBox="0 0 16 16" alt="Facebook">\n\
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>\n\
                        </svg>\n\
                    </a>\n\
                </li>\n\
                <li class="ms-3">\n\
                    <a class="text-muted" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Instagram">\n\
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#e8a104" class="bi bi-instagram" viewBox="0 0 16 16" alt="Instagram">\n\
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>\n\
                        </svg>\n\
                    </a>\n\
                </li>\n\
                <li class="ms-3">\n\
                    <a class="text-muted" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Twitter">\n\
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#e8a104" class="bi bi-twitter" viewBox="0 0 16 16" alt="Twitter">\n\
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>\n\
                        </svg>\n\
                    </a>\n\
                </li>\n\
            </ul>\n\
            <aside class="col-12 justify-content-center col-lg-8 d-flex align-items-center justify-content-lg-end me-sm-5">\n\
                <span class="text-personalizado me-sm-5">&copy; 2022 Copyright MW</span>\n\
            </aside>\n\
        </div>';                
    }
    /**
     * Escribe la ventana modal de información en todas las páginas
     * 
     * @return {undefined}
     */
    static escribirModal(){
        document.getElementById('ventanaModal').innerHTML =
            '<div class="modal-dialog">\n\
                <div class="modal-content bg-fondo">\n\
                    <div class="modal-header border-bottom-0 m-0 ms-5 me-5 mt-2">\n\
                        <h5 class="modal-title text-success">Información de contacto</h5>\n\
                    </div>\n\
                    <div class="modal-body m-0 ms-5 me-5">\n\
                        <p>El parque permanece abierto todo el año, todos los días sin horario de cierre.</p>\n\
                        <p>Pero si tienes alguna duda puedes contactar con nosotros.</p>\n\
                        <p class="text-center">\n\
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="#b34806" fill="#269a06" class="bi bi-telephone-fill" viewBox="0 0 16 16">\n\
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>\n\
                            </svg></span>\n\
                            <span>698325147</span>\n\
                        </p>\n\
                        <p class="text-center">Nuestro horario de atención al público</p>\n\
                        <table class="table table-primary table-hover text-personalizado2">\n\
                            <thead>\n\
                                <tr>\n\
                                    <th scope="col"></th>\n\
                                    <th scope="col">Mañana</th>\n\
                                    <th scope="col">Tarde</th>\n\
                                </tr>\n\
                            </thead>\n\
                            <tbody>\n\
                                <tr>\n\
                                    <th scope="row">Lunes</th>\n\
                                    <td>10:00 a 12:00</td>\n\
                                    <td>16:00 a 20:00</td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <th scope="row">Martes</th>\n\
                                    <td>10:00 a 14:00</td>\n\
                                    <td>16:00 a 18:00</td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <th scope="row">Miércoles</th>\n\
                                    <td>09:00 a 14:00</td>\n\
                                    <td>17:00 a 19:00</td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <th scope="row">Jueves</th>\n\
                                    <td>09:00 a 14:00</td>\n\
                                    <td>17:00 a 19:00</td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <th scope="row">Viernes</th>\n\
                                    <td>09:00 a 15:00</td>\n\
                                    <td></td>\n\
                                </tr>\n\
                                <tr>\n\
                                    <th scope="row">Sábado</th>\n\
                                    <td>10:00 a 14:00</td>\n\
                                    <td></td>\n\
                                </tr>\n\
                            </tbody>\n\
                        </table>\n\
                    </div>\n\
                    <div class="modal-footer border-top-0  m-0 ms-5 me-5 justify-content-between">\n\
                        <div class="d-flex">\n\
                            <a class="text-muted me-2" href="#">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-facebook" viewBox="0 0 16 16">\n\
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>\n\
                                </svg>\n\
                            </a>\n\
                            <a class="text-muted me-2" href="#">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-instagram" viewBox="0 0 16 16">\n\
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>\n\
                                </svg>\n\
                            </a>\n\
                            <a class="text-muted" href="#"></a>\n\
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-twitter" viewBox="0 0 16 16">\n\
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>\n\
                            </svg>\n\
                            </a>\n\
                        </div>\n\
                        <button type="button" class="btn btn-secondary text-personalizado pt-1 pb-1" data-bs-dismiss="modal">Cerrar</button>\n\
                    </div>\n\
                </div>\n\
            </div>';
    }
    /**
     * Escribe la barra de progreso en los lugares oportunos
     * 
     * @param {string} idContenedor
     * 
     * @return {undefined} 
     */
    static crearBarraProgreso(idContenedor){
        let madre = document.getElementById(idContenedor).appendChild(document.createElement('div'));
        madre.setAttribute('id', 'barraProgreso');
        madre.classList.add('d-flex', 'justify-content-center');
        let hijo = document.getElementById('barraProgreso').appendChild(document.createElement('div'));
        hijo.classList.add('progress', 'mt-5', 'w-50');
        let hija = hijo.appendChild(document.createElement('div'));
        hija.classList.add('progress-bar', 'progress-bar-striped', 'progress-bar-animated');
        hija.setAttribute('role', 'progressbar');
        hija.setAttribute('aria-valuenow', '75');
        hija.setAttribute('aria-valuemin', '0');
        hija.setAttribute('aria-valuemax', '100');
        cargarBarraProgreso(hija);
        
        function cargarBarraProgreso(){
            var intervaloCargarBarra = setInterval(cargarBarra, 7);
            let i = 0;
            function cargarBarra(){
                hija.style.width = i + '%';
                i++;
                if (i === 101) {
                    clearInterval(intervaloCargarBarra);
                }
            }   
        }
    }
    /**
     * Recibe el apiRest del tiempo y lo escribe en donde corresponde
     * 
     * @param {string} ruta a la que debe dirigirse la comunicación ajax
     * 
     * @return {undefined}
     */    
    static escribirTiempo(ruta){
        let verTiempo = new XMLHttpRequest();
        verTiempo.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let tiempo = JSON.parse(this.responseText);
                document.getElementById('tiempo').innerHTML = 
                    '<div class="alert alert-primary d-flex w-100 me-md-3 mt-md-3 bg-warning bg-gradient bg-opacity-50" role="alert">\n\
                        <img src="http://openweathermap.org/img/w/' + tiempo['weather'][0]['icon'] + '.png" alt="Icono del tiempo en Vigo"/>\n\
                        <div class="mt-2">\n\
                            <a  data-bs-toggle="modal" data-bs-target="#tiempoModal"  role="button" class="text-decoration-none text-personalizado4h fw-bolder ms-3">El tiempo en Vigo</a>\n\
                        </div>\n\
                    </div>\n\
                    <div class="modal fade" id="tiempoModal" tabindex="-1" role="dialog" aria-labelledby="labelModal" aria-hidden="true">\n\
                        <div class="modal-dialog">\n\
                            <div class="modal-content bg-warning bg-gradient bg-opacity-25">\n\
                                <div class="modal-header border-bottom-0 m-0 ms-5 me-5 mt-2 justify-content-end">\n\
                                    <button type="button" class="btn btn-secondary text-personalizado pt-1 pb-1" data-bs-dismiss="modal">X</button>\n\
                                </div>\n\
                                <div class="modal-body m-0 ms-5 me-5">\n\
                                    <div class="order-last card m-2 border-2">\n\
                                        <div class="row g-0">\n\
                                            <div class="d-flex">\n\
                                                <img src="http://openweathermap.org/img/w/' + tiempo['weather'][0]['icon'] + '.png" alt="Icono del tiempo en Vigo"/>\n\
                                                <h5 class="card-title mt-3 ms-5 text-personalizado4h">El tiempo en Vigo</h5></n>\n\
                                            </div>\n\
                                            <div class="col-md-12">\n\
                                                <div class="card-body">\n\
                                                    <p class="text-capitalize text-personalizado4">' + tiempo['weather'][0]['description'] + ' al ' + tiempo['clouds']['all'] +'%.</p>\n\
                                                    <ul class="text-personalizado4 list-group list-unstyled">Temperaturas:\n\
                                                        <li class="list-group-item list-group-item-action list-group-item-info" >' + tiempo['main']['temp'] + '°C de media</li>\n\
                                                        <li class="list-group-item list-group-item-action list-group-item-danger"">' + tiempo['main']['temp_max']  + '°C la máxima</li>\n\
                                                        <li class="list-group-item list-group-item-action list-group-item-light">' + tiempo['main']['temp_min']  + '°C la mínima</li>\n\
                                                    </ul>\n\
                                                    <p class="text-personalizado4">Sensación térmica: ' + tiempo['main']['feels_like'] + '°C.  </p>\n\
                                                    <p class="text-personalizado4">La humedad ambiental es del ' + tiempo['main']['humidity'] + '%, y la velocidad del viento: ' + tiempo['wind']['speed'] + ' km/h</p>\n\
                                                    <p class="text-personalizado4"><small class="">Actualización en linea</small></p>\n\
                                                    <button type="button" class="btn btn-secondary text-personalizado pt-1 pb-1" data-bs-dismiss="modal">Cerrar</button>\n\
                                                </div>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="modal-footer border-top-0  m-0 ms-5 me-5 justify-content-center">\n\
                                    <div class="d-flex">\n\
                                        <a class="text-muted me-2" href="#">\n\
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-facebook" viewBox="0 0 16 16">\n\
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>\n\
                                            </svg>\n\
                                        </a>\n\
                                        <a class="text-muted me-2" href="#">\n\
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-instagram" viewBox="0 0 16 16">\n\
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>\n\
                                            </svg>\n\
                                        </a>\n\
                                        <a class="text-muted" href="#"></a>\n\
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e8a104" class="bi bi-twitter" viewBox="0 0 16 16">\n\
                                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>\n\
                                        </svg>\n\
                                        </a>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';
            }
        };
        Registro.comunicarServidor(verTiempo, ruta, '');
    }
    /**
     * Crea el contendor principal dentro de main
     * 
     * @param {string} idPrincipal 
     * @param {string} idSecundario 
     * @param {string} idNuevo 
     * 
     * @return {boolean}
     */
    static crearContenedorVariable(idPrincipal, idSecundario, idNuevo){
        //variable que devuelve si la operación se pudo realizar o no, de entrada 
        //doy por hecho que es true
        let hecho = true;
        //variable que contiene el elemento div donde se va a introducir la información
        let padre = document.getElementById(idPrincipal);
        //Básicamente si existe el contenedor 'contenidoVariable', si no existe es igual a null
        if(document.getElementById(idSecundario) !== null){
            //Me cargo ese contendor, con todo lo que tenga dentro
            padre.removeChild(document.getElementById(idSecundario));
            //Creo un contenedor nuevo
            padre.appendChild(document.createElement('div'));
            //Lo nombro
            padre.getElementsByTagName('div').item(0).setAttribute('id', idNuevo);
        } else {
            hecho = false;
        }
        return hecho;
    }
    /**
     * Crea los títulos del contenido
     * 
     * @param {string} idMadre
     * @param {string} tipoH tipo de elemento a crear
     * @param {string} idNuevo
     * 
     * @return {undefined}
     */
    static crearTituloVariable(idMadre, tipoH, idNuevo){
        let madre = document.getElementById(idMadre);
        madre.appendChild(document.createElement(tipoH));
        madre.lastElementChild.setAttribute('id', idNuevo);
        document.getElementById(idNuevo).classList.add('display-6', 'text-center', 'm-4')
    }
    /**
     * Crea un input y le da atributos
     * 
     * @param {string} id 
     * @param {string} tipo 
     * @param {string} valor 
     * 
     * @return {string}
     */
    static crearInputId(id, tipo, valor = ''){
        let nuevoInput = document.createElement('input');
        nuevoInput.setAttribute('id', id);
        nuevoInput.setAttribute('type', tipo);
        nuevoInput.setAttribute('value', valor);
        return nuevoInput;
    }
    /**
     * Escribe que los campos de un formulario deben ir correctos
     * 
     * @param {string} idE
     * @param {mensaje} mensaje
     * 
     * @return {undefined}
     */
    static escribirTlcdedc(idE, mensaje){
        document.getElementById(idE).innerHTML = 
            '<div class="alert  bg-danger bg-opacity-25 border-danger border-2 text-dark lead alert-dismissible fade show" role="alert">'
                + mensaje +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\n\
            </div>';
    }
    /**
     * Escribe una alerta que indica que el login o el registro se ha realizado correctamente
     * 
     * @param {string} idE
     * @param {mensaje} mensaje
     * 
     * @return {undefined}
     */
    static escribirRegistroE(idE, mensaje){
        document.getElementById(idE).innerHTML = 
            '<div class="alert alert-secondary border-2 text-dark lead alert-dismissible fade show" role="alert">'
                + mensaje +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\n\
            </div>';
    }
    /**
    * Inicia la página preguntando si se está logueado y, en caso negativo, 
    * redirige a la página de login.
    * 
    * @return {Boolean}
    */
    static iniciarPagina(){
        let preguntaSesion = new XMLHttpRequest();
        preguntaSesion.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                if(this.responseText === 'false'){
                    window.location.href = '../login.html';
                }
            }
        };
        Registro.comunicarServidor(preguntaSesion, '../php/sesionActiva.php', '');
    }
    /**
     * Comprueba si hay una sesión abierta y obra en consecuencia
     * 
     * @return {undefined}
     */
    static comprobarSesion(){
        let preguntaSesion = new XMLHttpRequest();
        preguntaSesion.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                if(this.responseText === 'true'){
                    if(localStorage.getItem('tipoUsuario') === 'invitados')
                            window.location.href = 'privado/usuarios.html';
                    if(localStorage.getItem('tipoUsuario') === 'biologos')
                            window.location.href = 'privado/biologos.html';    
                }
            }
        };
        Registro.comunicarServidor(preguntaSesion, 'php/sesionActiva.php', '');
    }
    /**
     * Modifica valores en las clase de la barra de navegación para que cambien sus colores
     * y/o se colapse
     * 
     * @param {string} idNav 
     * @param {string} claseR1 
     * @param {string} claseR2 
     * 
     * @param {string} claseA1 
     */
    static modificarClases(idLink = null, idNav = null, claseR1 = null, claseR2 = null, claseA1 = null){
        if(claseR1 !== null && document.getElementById(idNav).classList.contains(claseR1)){
            document.getElementById(idNav).classList.remove(claseR1);
        }
        if(claseR2 !== null && document.getElementById(idLink).classList.contains(claseR2)){
            document.getElementById(idLink).classList.remove(claseR2);
        }
        if(claseA1 !== null && !document.getElementById(idLink).classList.contains(claseA1)){
            document.getElementById(idLink).classList.add(claseA1);
        }
    }
}


