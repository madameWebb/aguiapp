/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Contiene el nombre de los índices (id) del formulario de biólogos.
 * 
 * @type Array
 */
var camposB = ['Nombre', 'NIF', 'Email', 'Telefono', 'Direccion', 'Provincia', 'fechaTitulo', 'Clave'];
/**
 * Contiene el nombre de los índices (id) de los invitados.
 * 
 * @type Array
 */
var camposU = ['Nombre', 'Usuario','Email', 'Clave'];
/**
 * Recoge los campos válidos del formulario.
 * 
 * @type Map
 */
var guardarValidos = new Map();
/**
 * Guarda el objeto creado.
 * 
 * @type Invitado|Biologo
 */
var registro;
/**
 * Escribe el formulario inicial en el que se solicita el modo de registro
 * 
 * @return {undefined}  
 */
function crearFormularioInicial(){
    let madre = document.getElementById('registrar').appendChild(document.createElement('form'));
    madre.setAttribute('id', 'formInicial');
    madre.classList.add('form-signin', 'd-flex', 'flex-column', 'align-items-center');
    madre.appendChild(document.createElement('h2'));
    madre.lastElementChild.classList.add('lead', 'fw-bold');
    madre.lastElementChild.appendChild(document.createTextNode('Elige como quieres registrarte: '));
    let hija = madre.appendChild(document.createElement('div'));
    hija.classList.add('btn-group', 'd-flex', 'flex-wrap', 'flex-md-nowrap', 'w-75', 'justify-content-center');
    hija.appendChild(Pagina.crearInputId('formUsuario', 'button', 'Registrarse como usuario'));
    hija.lastElementChild.classList.add('btn', 'btn-secondary', 'text-personalizado');
    hija.appendChild(Pagina.crearInputId('codigoRB', 'password'));
    hija.lastElementChild.classList.add('form-control', 'bg-naranjaCazulT');
    hija.lastElementChild.setAttribute('name', 'biologos');
    hija.lastElementChild.setAttribute('placeholder', 'código de biólogo');
    hija.appendChild(Pagina.crearInputId('formBiologo', 'button', 'Registrarse como Biólogo'));
    hija.lastElementChild.classList.add('btn', 'btn-secondary', 'text-personalizado');
}
/**
 * Crea la barra de progreso y pone un pequeño retraso en la 
 * carga de los formularios para que se vea la barra de progreso
 * 
 * @param {string} idBoton 
 * @param {string} campos 
 * 
 * @return {undefined}  
 */
function llamarFormularios(idBoton, campos){
    Pagina.crearBarraProgreso('registrar');
    setTimeout(function(){
        document.getElementById('registrar').removeChild(document.getElementById('barraProgreso'));
        construirFormulario(idBoton, campos);
        construirCondiciones();
        comprobarCampos(idBoton);
        comprobarFormulario(campos);
    }, 1500);
}
/**
 * Construye el formulario de registro a partir del array y el id que se le pase
 * 
 * @param {string} idBoton
 * @param {array} campos
 * 
 * @return {undefined}
 */
function construirFormulario(idBoton, campos){
    let padre = document.getElementById('registrar').appendChild(document.createElement('form'));
    padre.setAttribute('id', 'formRegistro');
    padre.classList.add('form-signin', 'd-flex', 'flex-column');
    let divPadre = padre.appendChild(document.createElement('div'));
    divPadre.classList.add('form-group', 'row', 'mb-3', 'mt-1');
    divPadre.appendChild(document.createElement('div'));
    divPadre.lastElementChild.setAttribute('id', 'rellenar');
    let divHijo = divPadre.appendChild(document.createElement('div'));
    divHijo.classList.add('d-flex', 'flex-column', 'w-50', 'ms-auto', 'me-auto');
        for (let i = 0; i < campos.length; i++){
            let divFinal = divHijo.appendChild(document.createElement('div'));
            divFinal.classList.add('col-12', 'd-flex', 'flex-wrap', 'flex-md-nowrap', 'justify-content-sm-center', 'm-2');
            divFinal.appendChild(document.createElement('label'));
            divFinal.lastChild.setAttribute('for', campos[i]);
            divFinal.lastChild.classList.add('form-control', 'bg-transparent', 'border-0', 'w-50', 'shadow');
            divFinal.lastChild.setAttribute('id', campos[i] + 'L');
            if(campos[i] === 'fechaTitulo'){
                divFinal.lastChild.appendChild(document.createTextNode('Fecha de titulación: '));
            } else {
                divFinal.lastChild.appendChild(document.createTextNode(campos[i] + ': '));
            }
            if(campos[i] === 'Provincia'){
				divFinal.appendChild(document.createElement('select'));
			} else {
				divFinal.appendChild(document.createElement('input'));
			}
            divFinal.lastChild.setAttribute('id', campos[i]);
            divFinal.lastChild.classList.add('form-control', 'bg-naranjaCazulT', 'shadow');
            document.getElementById(campos[i]).setAttribute('autocomplete', 'off');
        }
        padre.appendChild(document.createElement('div'));
        padre.lastElementChild.classList.add('d-flex', 'justify-content-center');
        let divBtn = padre.lastElementChild.appendChild(document.createElement('div'));
        divBtn.classList.add('btn-group', 'w-25', 'd-flex', 'justify-content-center');
        divBtn.appendChild(document.createElement('input'));
        divBtn.lastElementChild.setAttribute('id', 'registrarse');
        document.getElementById('registrarse').setAttribute('type', 'button');
        document.getElementById('registrarse').setAttribute('class', 'btn btn-secondary text-personalizado');
        document.getElementById('registrarse').setAttribute('value', 'Registrarse');
        divBtn.appendChild(document.createElement('input'));
        divBtn.lastElementChild.setAttribute('id', 'cancelarRegistro');
        document.getElementById('cancelarRegistro').setAttribute('type', 'button');
        document.getElementById('cancelarRegistro').classList.add('btn', 'btn-outline-success');
        document.getElementById('cancelarRegistro').setAttribute('value', 'Cancelar');
        if(document.getElementById('barraProgreso') !== null)
            document.getElementById('registrar').removeChild(document.getElementById('barraProgreso'));
        escucharArrepentidos();   
        darAtributosForm(idBoton, campos);
}
/**
 * Escucha a los arrepentidos que deciden no registrarse
 * 
 * @return {undefined}  
 */
function escucharArrepentidos(){
    document.getElementById('cancelarRegistro').addEventListener('click', function(){
        document.getElementById('registrar').removeChild(document.getElementById('formRegistro')); console.log(document.getElementById('mostrarError'))
        if(document.getElementById('mostrarError').innerHTML !== '')
        document.getElementById('mostrarError').removeChild(document.getElementById('mostrarError').firstElementChild);
            crearFormularioInicial();
            iniciarRegistro();
    }, false);
}
/**
 * Escribe las condiciones para rellenar el formulario.
 * 
 * @return {undefined}  
 */
 function construirCondiciones(){
    document.getElementById('rellenar').classList.add('w-100', 'ps-5', 'pe-5', 'mb-4',  'shadow');
    document.getElementById('rellenar').innerHTML =
        '<p>Cómo rellenar correctamente este formulario:</p>\n\
        <ul>\n\
            <li>Todos los campos son obligatorios y deben ser cumplimentados.</li>\n\
            <li>Tu nombre debe constar de un <b>Nombre</b> y uno o dos <b>Apellidos</b>, la primera letra en mayúsculas.</li>\n\
            <li>El usuario siempre debe empezar por dos letras <b>minúsculas</b>.</li>\n\
            <li>Puedes registrar un teléfono móvil o fijo.</li>\n\
            <li>La dirección no debe llevar "/" o ".", pero puede llevar "-", como en el ejemplo.</li>\n\
            <li>La clave debe contener entre 6 y 8 caracteres.</li>\n\
        </ul>';
}
/**
 * Otorga los atributos correspondientes a los elementos a partir del id y el 
 * array que se le pasa
 * 
 * @param {string} idBoton
 * @param {array} campos
 * 
 * @return {undefined}
 */
 function darAtributosForm(idBoton, campos){
    for (let i = 0; i < campos.length; i++){
        document.getElementById(campos[i]).setAttribute('name', campos[i]);
        document.getElementById(campos[i]).setAttribute('required', 'required');
        if(campos[i] === 'Nombre' || campos[i] === 'Usuario' || campos[i] === 'NIF' || campos[i] === 'Direccion'){
            document.getElementById('Nombre').setAttribute('type', 'text');
        }
    }
    document.getElementById('Nombre').setAttribute('placeholder', 'nombre y apellidos*');
    document.getElementById('Email').setAttribute('type', 'email');
    document.getElementById('Email').setAttribute('placeholder', 'ejemplo@ejemplo.com*');
    document.getElementById('Clave').setAttribute('type', 'password');
    document.getElementById('Clave').setAttribute('placeholder', 'contraseña*');
    document.getElementById('Clave').setAttribute('autocomplete', 'new-password*');
    if(idBoton === 'formUsuario'){
        document.getElementById('Usuario').setAttribute('placeholder', 'usuario*');
    } else if (idBoton === 'formBiologo'){
        let provincias = ['La Coruña', 'Lugo', 'Orense', 'Pontevedra'];
        document.getElementById('NIF').setAttribute('placeholder', '12345678Z*');
        document.getElementById('Telefono').setAttribute('type', 'tel');
        document.getElementById('Telefono').setAttribute('placeholder', '986896698*');
        document.getElementById('Direccion').setAttribute('placeholder', 'Av Jazz 12 - 4B - 36200*');
        document.getElementById('fechaTitulo').setAttribute('type', 'date');
        document.getElementById('ProvinciaL').removeAttribute('for');
		document.getElementById('Provincia').appendChild(document.createElement('option'));
        document.getElementsByTagName('option').item(0).setAttribute('value', '');
        document.getElementsByTagName('option').item(0).appendChild(document.createTextNode('Escoje una opción'));
        for (let i = 0; i < provincias.length; i++){
            document.getElementById('Provincia').appendChild(document.createElement('option'));
            document.getElementsByTagName('option').item(i + 1).setAttribute('value', provincias[i]);
            document.getElementsByTagName('option').item(i + 1).appendChild(document.createTextNode(provincias[i]));
        }
    }
}
/**
 * Muestra las respuestas del servidor y modifica el DOM según estas respuestas
 * 
 * @param {string} respuesta
 * 
 * @return {undefined}
 */
function mostrarRespuesta(respuesta){
    if(respuesta === 'Registro correctamente realizado.'){
        document.getElementById('formRegistro').reset(); 
        Pagina.escribirRegistroE('mostrarError', respuesta + ' <a href="login.html">Accede al login pinchando aquí</a>.');
    } else {
        Pagina.escribirTlcdedc('mostrarError', respuesta);
    }
}
/**
 * Establece la comunicación con el servidor y envía los datos 
 * convertidos a json por el método post
 * 
 * @return {boolean}
 */
function pasarServidor(){
    let tipo;
    let registros = JSON.stringify(registro);
    let comunicaDatos = new XMLHttpRequest();
    comunicaDatos.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            mostrarRespuesta(this.responseText);
        }
    };
    if(registro instanceof Biologo) tipo = 'biologos';
    if(registro instanceof Invitado) tipo = 'invitados';
    let peticion = 'registros=' + registros + '&tipo=' + tipo;
    Registro.comunicarServidor(comunicaDatos, 'php/registrarse.php', peticion);
}
/**
 * Crea un Invitado o un Biologo, según los datos que se le pasen y lo guarda 
 * para pasárselo al servidor
 * 
 * @param {string} campos
 * 
 * @return {undefined}
 */
function guardarObjeto(campos){
    if(campos.length === camposU.length){
        //Entonces es un invitado
        registro = new Invitado(document.getElementById(campos[0]).value,
                document.getElementById(campos[1]).value,
                document.getElementById(campos[2]).value,
                document.getElementById(campos[3]).value);
    } else if(campos.length === camposB.length) {
        //Es un biologo
        registro = new Biologo(document.getElementById(campos[0]).value,
                document.getElementById(campos[1]).value,
                document.getElementById(campos[2]).value,
                document.getElementById(campos[3]).value,
                document.getElementById(campos[4]).value,
                document.getElementById(campos[5]).value,
                document.getElementById(campos[6]).value,
                document.getElementById(campos[7]).value,);
    }
    document.getElementById('mostrarError').innerHTML = '';
    pasarServidor();
}
/**
 * Comprueba si todos los campos del formulario han sido correctamente introducidos
 * y si es así, guarda los valores y cambia de página, si no es así muestra un mensaje
 * de error
 * 
 * @param {Array} campos
 * 
 * @return {undefined}
 */
function comprobarFormulario(campos){
    document.getElementById('registrarse').addEventListener('click', function(){
        let esValido = false;
        for(let i = 0; i < campos.length; i++){
            if(document.getElementById(campos[i]) !== null){
                if(document.getElementById(campos[i]).value === '' ||
                        document.getElementById(campos[i]) === 0){
                    break;
                } else {
                    esValido = true;
                }
            }
        }
        if(esValido && guardarValidos.size === campos.length) {
            guardarObjeto(campos);
        } else {
            Pagina.escribirTlcdedc('mostrarError', 'Todos los campos deben estar debidamente cumplimentados');
        }
    }, false);
}
/**
 * Recibe como parámetro el id del formulario cuyos campos se ha de validar
 * 
 * @param {string} idForm
 * 
 * @return {undefined}
 */
function comprobarCampos(idForm){
    document.getElementById('Nombre').addEventListener('blur', function(){
        if(!Validar.nombre(this)){
            document.getElementById('Nombre').classList.add('is-invalid');
        } else {
            guardarValidos.set('nombre', this.value);
            document.getElementById('Nombre').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('Email').addEventListener('blur', function(){
        if(!Validar.email(this)){
            document.getElementById('Email').classList.add('is-invalid');
        } else {
            guardarValidos.set('mail', this.value);
            document.getElementById('Email').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('Clave').addEventListener('blur', function(){
        if(!Validar.clave(this)){
            document.getElementById('Clave').classList.add('is-invalid');
        } else {
            guardarValidos.set('clave', this.value);
            document.getElementById('Clave').classList.remove('is-invalid');
        }
    }, false);
    if(idForm === 'formUsuario'){
        comprobarCamposI();
    } else if(idForm === 'formBiologo'){
        comprobarCamposB();
    }
}
/**
 * Complementa a comprobarCampos, comprueba los datos que sólo 
 * pertenecen a los invitados
 * 
 * @return {undefined}
 */
function comprobarCamposI(){
    document.getElementById('Usuario').addEventListener('blur', function(){
        if(!Validar.usuario(this)){
            document.getElementById('Usuario').classList.add('is-invalid');
        } else {
            guardarValidos.set('usuario', this.value);
            document.getElementById('Usuario').classList.remove('is-invalid');
        }
    }, false);
}
/**
 * Complementa a comprobarCampos, comprueba los datos que sólo 
 * pertenecen a los biólogos 
 * 
 * @return {undefined}
 */
function comprobarCamposB(){
    document.getElementById('NIF').addEventListener('blur', function(){
        if(!Validar.nif(this.value)){
            document.getElementById('NIF').classList.add('is-invalid');
        } else {
            guardarValidos.set('dni', this.value);
            document.getElementById('NIF').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('Telefono').addEventListener('blur', function(){
        if(!Validar.telefono(this)){
            document.getElementById('Telefono').classList.add('is-invalid');
        } else {
            guardarValidos.set('telefono', this.value);
            document.getElementById('Telefono').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('Direccion').addEventListener('blur', function(){
        if(!Validar.direccion(this)){
            document.getElementById('Direccion').classList.add('is-invalid');
        } else {
            guardarValidos.set('direccion', this.value);
            document.getElementById('Direccion').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('Provincia').addEventListener('blur', function(){
        if(!Validar.provincia(this)){
            document.getElementById('Provincia').classList.add('is-invalid');
        } else {
            guardarValidos.set('provincia', this.value);
            document.getElementById('Provincia').classList.remove('is-invalid');
        }
    }, false);
    document.getElementById('fechaTitulo').addEventListener('blur', function(){
        if(!Validar.fecha(this)){
            document.getElementById('fechaTitulo').classList.add('is-invalid');
        } else {
            guardarValidos.set('fechaTitulo', this.value);
            document.getElementById('fechaTitulo').classList.remove('is-invalid');
        }
    }, false);
}
/**
 * Inicia todos los procesos
 * 
 * @return {undefined}
 */
function iniciarRegistro(){
    //Crear, eliminar formularios
    document.getElementById('formUsuario').addEventListener('click', function(){
        document.getElementById('registrar').removeChild(document.getElementById('formInicial'));
        llamarFormularios('formUsuario', camposU);
    }, false);
    document.getElementById('formBiologo').addEventListener('click', function(){
        let comunicarCodigo = new XMLHttpRequest();
        comunicarCodigo.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                if(this.responseText !== 'true'){
                    document.getElementById('codigoRB').setAttribute('placeholder', 'Código incorrecto');
                    document.getElementById('codigoRB').classList.add('is-invalid');
                } else {
                    document.getElementById('registrar').removeChild(document.getElementById('formInicial'));
                    llamarFormularios('formBiologo', camposB);
                }
            }
        };
        Registro.comunicarServidor(comunicarCodigo, 'php/comprobarCodigo.php', 'codigo=' + document.getElementById('codigoRB').value);
    }, false);
    document.getElementById('volver').addEventListener('click', function(){
        window.location.href = 'index.html';
    }, false);
    document.getElementById('logo').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementById('registro').addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show', null, null);
    }, false);
    document.getElementsByTagName('main').item(0).addEventListener('click', function(){
        Pagina.modificarClases(null, 'navbarSupportedContent', 'show');
    }, false);
}
/**
 * Inicia todas las funcionalidades de la página
 * 
 * @return {undefined}  
 */
function cargarRegistro(){
    Pagina.comprobarSesion();
    Pagina.escribirNoScript('primerD');
    Pagina.escribrirNav('registrarse');
    Pagina.escribirTiempo('./php/tiempo.php');
    crearFormularioInicial();
    Pagina.escribirFooter();
    Pagina.escribirModal();
    Pagina.modificarClases('informacion', 'navbarSupportedContent', 'show');
    iniciarRegistro();
}
window.addEventListener('load', cargarRegistro, false);