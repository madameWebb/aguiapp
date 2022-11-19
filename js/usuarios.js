/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea el contendor principal
 * 
 * @return {Boolean}
 */
function crearContenedor(){
    let hecho = true;
    if(Pagina.crearContenedorVariable('main', 'contenidoVariable', 'contenido')){
        Pagina.crearTituloVariable('contenido', 'h1', 'tituloCV');
    } else {
        hecho = false;
    }
    return hecho;
}
/**
 * Función recursiva, carga el contenido en función del índice que se le pasa
 * 
 * @param {string} indice indica el tipo de contenido a cargar
 * 
 * @return {undefined}
 */
function cargarContenido(indice){
    if(crearContenedor()){
        if(indice === 'inicio'){
            document.getElementById('tituloCV').appendChild(document.createTextNode('Últimas especies registradas'));
            cargarUltimas();
        }
        if(indice === 'comentarios'){
            document.getElementById('tituloCV').appendChild(document.createTextNode('Mis comentarios sin responder'));
            cargarComentarios();
        }
        if(indice === 'respuestas'){
            document.getElementById('tituloCV').appendChild(document.createTextNode('Mis comentarios y sus respuestas'));
            //cargarRespuestas();
        }
        if(indice === 'especies'){
            document.getElementById('tituloCV').appendChild(document.createTextNode('Todas las especies registradas'));
            //cargarTodas();
        }
    } else if(document.getElementById('contenido') !== null){
        Pagina.crearContenedorVariable('main', 'contenido', 'contenidoVariable');
        cargarContenido(indice);
    }
}
/**
 * Carga las últimas especies registradas... En este momento, todas, en algún 
 * serán cinco como mucho
 * 
 * @return {undefined}
 */
function cargarUltimas(){
    let info = new XMLHttpRequest();
    info.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
			let recibido = this.responseText;
			let entradas = recibido !== '' ? JSON.parse(this.responseText) : new Array();
			if(entradas.length > 0){
                let padre = document.getElementById('contenido');
                padre.appendChild(document.createElement('div'));
                padre.getElementsByTagName('div').item(0).setAttribute('id','contenedorEntradas');
                let madre = document.getElementById('contenedorEntradas');
                madre.setAttribute('class', 'd-flex flex-column m-auto align-items-center');
                for(let i = 0; i < entradas.length; i++){
                    madre.appendChild(document.createElement('div'));
                    madre.lastElementChild.setAttribute('id', 'entrada' + i);
                    let entrada = document.getElementById('entrada' + i);
                    entrada.setAttribute('class', 'card w-100 me-auto ms-auto mb-3 me-sm-5 ms-sm-5 p-2 bg-info bg-opacity-25 shadow');
                    //IMAGENES
                    /**
                     * 
                     * @param {string} entrada 
                     * @param {string} imagenes 
                     */
                     function tratarImagenes(entrada, imagenes){
                        let contImg = entrada.lastElementChild;
                        let cantidad = imagenes.length === 3 ? imagenes.length - 1 : imagenes.length;
                        for(let j = 0; j < cantidad; j++){
                            contImg.appendChild(document.createElement('img'));
                            contImg.lastElementChild.setAttribute('src', 'imagenes/' + imagenes[j]);
                            contImg.lastElementChild.setAttribute('alt', imagenes[j]);
                            contImg.lastElementChild.classList.add('rounded', 'mx-auto', 'd-block','imgUsuarios');
                        }
                        return contImg.lastElementChild;
                    }
                    let imagen1 = '';
                    if(entradas[i]['imagenes'] !== null){
                        entrada.appendChild(document.createElement('div'));
                        entrada.lastElementChild.classList.add('w-100', 'p-2', 'd-flex', 'flex-md-nowrap', 'card-img-top');
                        let imagenes = JSON.parse(entradas[i]['imagenes']);
                        if(imagenes.length === 1){
                            tratarImagenes(entrada, imagenes).setAttribute('class', 'rounded mx-auto d-block w-75');
                        } else if (imagenes.length === 2){
                            tratarImagenes(entrada, imagenes);
                        } else {
                            tratarImagenes(entrada, imagenes);
                            imagen1 = imagenes[2];
                        }
                    }
                    let contTxt = entrada.appendChild(document.createElement('div'));
                    contTxt.setAttribute('class', 'card-body');
                    //TITULO
                    contTxt.appendChild(document.createElement('h2'));
                    contTxt.lastElementChild.setAttribute('class', 'card-title');
                    contTxt.lastElementChild.appendChild(document.createTextNode(entradas[i]['especie']));
                    //TEXTOS
                    let contTabla = contTxt.appendChild(document.createElement('div'));
                    contTabla.setAttribute('class', 'd-none d-md-flex w-100');
                    
                    let arrayTabla = new Array();
                    //TABLA REINO CLASE ORDEN...
                    if(entradas[i]['periodoMigratorio'] === 'No'){
                        arrayTabla = [['Reino', entradas[i]['reino']], ['Clase', entradas[i]['clase']], 
                                      ['Orden', entradas[i]['orden']], ['Familia', entradas[i]['familia']]];
                    } else {
                        arrayTabla = [['Reino', entradas[i]['reino']], ['Clase', entradas[i]['clase']], 
                                      ['Orden', entradas[i]['orden']], ['Familia', entradas[i]['familia']],
                                       ['periodoMigratorio', entradas[i]['periodoMigratorio']]];
                    }
                    let tabla = contTabla.appendChild(document.createElement('table'));
                    tabla.setAttribute('class', 'ms-auto me-auto table table-primary text-personalizado2');
                    // let tabla = contTxt.lastElementChild;
                    tabla.appendChild(document.createElement('tr'));
                    for(let j = 0; j < arrayTabla.length; j++){
                        tabla.lastElementChild.appendChild(document.createElement('th'));
                        tabla.lastElementChild.setAttribute('scope', 'col');
                        if(arrayTabla[j][0].includes('periodoMigratorio')){
                            tabla.lastElementChild.lastElementChild.appendChild(document.createTextNode('Migración'));
                        } else {
                            tabla.lastElementChild.lastElementChild.appendChild(document.createTextNode(arrayTabla[j][0]));
                        }
                    }
                    tabla.appendChild(document.createElement('tr'));
                    for(let j = 0; j < arrayTabla.length; j++){
                        tabla.lastElementChild.appendChild(document.createElement('td'));
                        tabla.lastElementChild.lastElementChild.appendChild(document.createTextNode(arrayTabla[j][1]));
                    }
                    //Otra tabla
                    let contTabla1 = contTxt.appendChild(document.createElement('div'));
                    contTabla1.setAttribute('class', 'd-flex d-md-none w-100');
                    let tabla1 = contTabla1.appendChild(document.createElement('table'));
                    tabla1.setAttribute('class', 'ms-auto me-auto table table-primary text-personalizado2');
                    for(let j = 0; j < arrayTabla.length; j++){
                        tabla1.appendChild(document.createElement('tr'));
                        tabla1.lastElementChild.appendChild(document.createElement('th'));
                        tabla1.lastElementChild.setAttribute('scope', 'row');
                        if(arrayTabla[j][0].includes('periodoMigratorio')){
                            tabla1.lastElementChild.lastElementChild.appendChild(document.createTextNode('Migración'));
                        } else {
                            tabla1.lastElementChild.lastElementChild.appendChild(document.createTextNode(arrayTabla[j][0]));
                        }
                        tabla1.lastElementChild.appendChild(document.createElement('td'));
                        tabla1.lastElementChild.lastElementChild.appendChild(document.createTextNode(arrayTabla[j][1]));
                    }
                    //PARRAFOS
                    let parrafos = entradas[i]['caracteristicas'].split('\r\n');
                    let aux = new Array();
                    for(let j of parrafos) j && aux.push(j);
                    parrafos = aux;
                    //delete aux;
                    contTxt.appendChild(document.createElement('div'));
                    contTxt.lastElementChild.setAttribute('id', 'entradaAcordeon' + i);
                    contTxt.lastElementChild.setAttribute('class', 'accordion');
                    let acordeonItem = contTxt.lastElementChild.appendChild(document.createElement('div'));
                    acordeonItem.setAttribute('class', 'accordion-item');
                    let tituloAc = acordeonItem.appendChild(document.createElement('h2'));
                    tituloAc.setAttribute('id', 'tituloAc' + i);
                    tituloAc.setAttribute('class', 'accordion-header');
                    tituloAc.appendChild(document.createElement('button'));
                    tituloAc.lastElementChild.setAttribute('class', 'accordion-button');
                    tituloAc.lastElementChild.setAttribute('type', 'button');
                    tituloAc.lastElementChild.setAttribute('data-bs-toggle', 'collapse');
                    tituloAc.lastElementChild.setAttribute('data-bs-target','#colapsado' + i);
                    tituloAc.lastElementChild.setAttribute('aria-expanded', 'false');
                    tituloAc.lastElementChild.setAttribute('aria-controls', 'colapsado' + i);
                    tituloAc.lastElementChild.appendChild(document.createTextNode('Leer más'));
                    let colapsado = contTxt.appendChild(document.createElement('div'));
                    colapsado.setAttribute('id', 'colapsado' + i);
                    colapsado.classList.add('accordion-collapse', 'collapse');
                    colapsado.setAttribute('aria-labelledby', 'tituloAc' + i);
                    colapsado.setAttribute('data-bs-parent', '#entradaAcordeon' + i);
                    let cuerpoColap = colapsado.appendChild(document.createElement('div'));
                    cuerpoColap.setAttribute('class', 'accordion-body d-flex')
                    let cuerpoTarjeta = cuerpoColap.appendChild(document.createElement('div'));
                    cuerpoTarjeta.setAttribute('class', 'shadow-lg p-3 bg-fondo bg-opacity-25 rounded');
                    if(imagen1 !== ''){
                        let contImg = cuerpoTarjeta.appendChild(document.createElement('div'));
                        contImg.setAttribute('class', 'w-50 rounded float-start m-2 m-3 ratio ratio-4x3');
                        contImg.appendChild(document.createElement('img'));
                        contImg.lastElementChild.setAttribute('class', 'w-100');
                        contImg.lastElementChild.setAttribute('src', 'imagenes/' + imagen1);
                    }

                    for(let j = 0; j < parrafos.length; j++){
                        cuerpoTarjeta.appendChild(document.createElement('p'));
                        cuerpoTarjeta.lastElementChild.appendChild(document.createTextNode(parrafos[j]));
                    }
                    //CREAR BOTON COMENTAR
                    entrada.appendChild(document.createElement('button'));
                    entrada.lastElementChild.setAttribute('id', 'comentar' + i);
                    entrada.lastElementChild.setAttribute('type', 'button');
                    entrada.lastElementChild.setAttribute('class', 'btn btn-secondary text-personalizado pt-1 pb-1 mb-3 mt-2 ms-auto me-auto')
                    entrada.lastElementChild.appendChild(document.createTextNode('Hacer comentario'));
                    document.getElementById('comentar' + i).addEventListener('click', function(){
                        //Dentro del contenedorEntradas se crea una ventana modal
                        if(document.getElementById('vModal') === null) hacerComentario(entradas[i]['especie']);
                        else document.body.removeChild(document.getElementById('vModal'));
                    }, false);
                }
            } else {
                let padre = document.getElementById('contenido');
                padre.appendChild(document.createElement('p'));
                padre.lastElementChild.setAttribute('id', 'mostrarError');
                Pagina.escribirRegistroE('mostrarError', 'Aún no hay entradas que mostrar.');
            }
        }
    };
    Registro.comunicarServidor(info, '../php/operacionesInvitados.php', 'especies=');
}
/**
 * Crea una ventana modal para insertar el comentario
 * 
 * @param {string} especie sobre la que se comenta
 * 
 * @return {undefined}
 */
function hacerComentario(especie){
    let vModal = document.createElement('div');
    vModal.setAttribute('id', 'vModal');
    vModal.setAttribute('class', 'bg-black bg-opacity-50 m-0 vw-100 miModal');

    let dialogoModal = vModal.appendChild(document.createElement('div'));
    dialogoModal.setAttribute('class', 'modal-dialog');

    let vModalV = dialogoModal.appendChild(document.createElement('div'));
    vModalV.setAttribute('class', 'modal-content bg-fondo');

    let encabezado = vModalV.appendChild(document.createElement('div'));
    encabezado.setAttribute('class', 'modal-header border-bottom-0 m-0 ms-5 me-5 mt-2');
    encabezado.appendChild(document.createElement('h5'));
    encabezado.lastElementChild.setAttribute('class', 'modal-title text-success');
    encabezado.lastElementChild.appendChild(document.createTextNode('Haz tu comentario sobre la especie ' + especie));
    encabezado.appendChild(document.createElement('button'));
    encabezado.lastElementChild.setAttribute('id', 'cerrarX');
    encabezado.lastElementChild.setAttribute('type', 'button');
    encabezado.lastElementChild.setAttribute('class', 'btn-close');
    
    let cuerpoModal = vModalV.appendChild(document.createElement('div'));
    cuerpoModal.setAttribute('class', 'modal-body m-0 ms-5 me-5');
    let cuerpoForm = cuerpoModal.appendChild(document.createElement('form'));
    cuerpoForm.setAttribute('id', 'formComentar');
    cuerpoForm.setAttribute('class', 'form-floating');   
    cuerpoForm.appendChild(document.createElement('textarea'));
    cuerpoForm.lastElementChild.setAttribute('id', 'textareaComentarios');
    cuerpoForm.lastElementChild.setAttribute('class', 'form-control bg-dark bg-opacity-10 mb-3');
    cuerpoForm.lastElementChild.setAttribute('placeholder', 'Haz aquí tu comentario');
    cuerpoForm.lastElementChild.style.height = '100 px';
    cuerpoForm.appendChild(document.createElement('label'));
    cuerpoForm.lastElementChild.setAttribute('for', 'textareaComentarios');
    cuerpoForm.lastElementChild.appendChild(document.createTextNode('Haz aquí tu comentario'));
    cuerpoModal.appendChild(document.createElement('p'));
    cuerpoModal.lastElementChild.setAttribute('id', 'mostrarError');

    let pieModal = vModalV.appendChild(document.createElement('div'));
    pieModal.setAttribute('class', 'modal-footer border-top-0  m-0 ms-5 me-5 justify-content-between');
    pieModal.appendChild(document.createElement('button'));
    pieModal.lastElementChild.setAttribute('id', 'enviarComentario');
    pieModal.lastElementChild.setAttribute('type', 'button');
    pieModal.lastElementChild.setAttribute('class', 'btn btn-secondary text-personalizado pt-1 pb-1');
    pieModal.lastElementChild.appendChild(document.createTextNode('Enviar'));
    pieModal.appendChild(document.createElement('button'));
    pieModal.lastElementChild.setAttribute('id', 'cerrarModal');
    pieModal.lastElementChild.setAttribute('type', 'button');
    pieModal.lastElementChild.setAttribute('class', 'btn btn-outline-success pt-1 pb-1');
    pieModal.lastElementChild.appendChild(document.createTextNode('Volver'));

    document.body.insertBefore(vModal, document.getElementById('ventanaModal'));
    escucharModal(document.getElementById('textareaComentarios'), especie, dialogoModal, vModalV);
}
/**
 * Escucha los eventos producidos en la ventana modal
 * 
 * @param {string} comentario
 * @param {string} especie
 * @param {string} contenedor
 * @param {string} elementCont
 * 
 * @return {undefined}
 */
function escucharModal(comentario, especie, contenedor, elementCont){
    document.getElementById('enviarComentario').addEventListener('click', function(){
        let enviarDatos = new FormData();
        if(!Validar.textarea(comentario)){
            Pagina.escribirTlcdedc('mostrarError', 'Tu comentario no debe ir vacío.');
        } else {
            enviarDatos.set('comentario', comentario.value);
            enviarComentario(enviarDatos, especie, contenedor, elementCont);
        }
    }, false);
    document.getElementById('cerrarX').addEventListener('click', function(){
        document.body.removeChild(document.getElementById('vModal'));
    }, false);
    document.getElementById('cerrarModal').addEventListener('click', function(){
        document.body.removeChild(document.getElementById('vModal'));
    }, false);    
}
/**
 * Recibe el comentario y lo envía al servidor, junto con otros datos de interés
 * 
 * @param {FormData} enviarDatos datos a enviar
 * @param {string} especie
 * @param {string} contenedor
 * @param {string} elementCont
 * 
 * @return {undefined}
 */
function enviarComentario(enviarDatos, especie, contenedor, elementCont){
    enviarDatos.set('fecha', new Date());
    enviarDatos.set('especie', especie);
    //for(let value of enviarDatos.keys()) console.log(value);
    let enviaComentario = new XMLHttpRequest();
    enviaComentario.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200) { console.log(this.responseText)
            if(this.response === '1'){
                contenedor.removeChild(elementCont);
                contenedor.appendChild(document.createElement('div'));
                contenedor.setAttribute('class', 'modal-content bg-fondo');
                contenedor.lastElementChild.appendChild(document.createElement('div'));
                contenedor.lastElementChild.lastElementChild.setAttribute('class', 'modal-body m-0 ms-5 me-5');
                contenedor.lastElementChild.lastElementChild.setAttribute('id', 'mensajeRecibido');
                Pagina.escribirRegistroE('mensajeRecibido', 'comentario correctamente recibido, en breve te responderemos');
                contenedor.appendChild(document.createElement('div'));
                contenedor.lastElementChild.setAttribute('class', 'modal-footer border-top-0  m-0 ms-5 me-5 justify-content-between');
                contenedor.lastElementChild.appendChild(document.createElement('button'));
                contenedor.lastElementChild.lastElementChild.setAttribute('id', 'continuar');
                document.getElementById('continuar').setAttribute('type', 'button');
                document.getElementById('continuar').setAttribute('class', 'btn btn-primary pt-1 pb-1')
                document.getElementById('continuar').appendChild(document.createTextNode('Continuar'));
                
                document.getElementById('continuar').addEventListener('click', function(){
                    document.body.removeChild(document.getElementById('vModal'));
                }, false);
            }
        }
    };
    Registro.comunicarServidorSC(enviaComentario, '../php/operacionesInvitados.php', enviarDatos);
}
/**
 * Carga los comentarios del usuario que no han sido respondidos
 * 
 * @return {undefined}
 */
function cargarComentarios(){
    let sacarComentarios = new XMLHttpRequest();
    sacarComentarios.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let comentarios = JSON.parse(this.responseText);
            if(comentarios.length > 0){
                let padre = document.getElementById('contenido');
                for(let i = 0; i < comentarios.length; i++){
                    padre.appendChild(document.createElement('div'));
                    padre.lastElementChild.setAttribute('id','contComentario' + i);
                    let madre = document.getElementById('contComentario' + i);
                    //ID ESPECIE FECHA
                    crearContComentarios(madre, 'contId' + i, comentarios[i]['id']);
                    crearContComentarios(madre, 'contEsp' + i, comentarios[i]['especie']);
                    crearContComentarios(madre, 'contFec' + i, comentarios[i]['fecha']);
                    //COMENTARIO
                    madre.appendChild(document.createElement('div'));
                    madre.lastElementChild.setAttribute('id','contCom' + i);
                    //TEXTOS PÁRRAFOS
                    let contenedorTxt = document.getElementById('contCom' + i);
                    let parrafos = comentarios[i]['comentario'].split('\r\n');
                    let aux = new Array();
                    for(let j of parrafos) j && aux.push(j);
                    parrafos = aux;
                    //delete aux;
                    for(let j = 0; j < parrafos.length; j++){
                        contenedorTxt.appendChild(document.createElement('p'));
                        contenedorTxt.lastElementChild.appendChild(document.createTextNode(parrafos[j]));
                    }
                }
            } else {
                let padre = document.getElementById('contenido');
                padre.appendChild(document.createElement('p'));
                padre.lastElementChild.appendChild(document.createTextNode('Aún no hay entradas que mostrar.'));
            }
        }
    };
    Registro.comunicarServidor(sacarComentarios, '../php/operacionesInvitados.php', 'comentarios=');
}
/**
 * Crea los contendores para los elementos de los comentarios sin responder y
 * escribe sus contenidos
 * 
 * @param {string} contPadre
 * @param {string} idNuevo
 * @param {string} texto
 * 
 * @return {undefined}
 */
function crearContComentarios(contPadre, idNuevo, texto){
    contPadre.appendChild(document.createElement('div'));
    contPadre.lastElementChild.setAttribute('id',idNuevo);
    document.getElementById(idNuevo).appendChild(document.createElement('p'));
    document.getElementById(idNuevo).lastElementChild.appendChild(document.createTextNode(texto));
}
/**
 * Escucha a los enlaces de los comentarios.
 * 
 * @param {string} idNav 
 */
function escucharComentarios(idNav){
    document.getElementById(idNav).addEventListener('click', function(){
        Pagina.modificarClases('miCuenta', 'navbarSupportedContent', 'show', 'text-light', null);
        Pagina.modificarClases('coment', null, null, null, 'text-light');
        Pagina.modificarClases('todoEspecies', null, null, 'text-light', null);
        Pagina.escribirMigas('coment', 'todoEspecies', 'miCuenta');
        document.getElementById('vueltaP').addEventListener('click', function(){
            escucharVolverP();
            cargarContenido('inicio');
        }, false);
    }, false);
}
/**
 * Ejecuta la página del usuario
 * 
 * @return {undefined}
 */
function ejecutarPagina(){
    Pagina.escribirTiempo('../php/tiempo.php');
    cargarContenido('inicio');
    //Se pone las escuchas a la nueva barra de navegación
    escucharComentarios('mComentarios');
    escucharComentarios('cRespondidos');
    document.getElementById('todoEspecies').addEventListener('click', function(){
        Pagina.modificarClases('miCuenta', 'navbarSupportedContent', 'show', 'text-light', null);
        Pagina.modificarClases('coment', null, null, 'text-light', null);
        Pagina.modificarClases('todoEspecies', null, null, null, 'text-light');
        Pagina.escribirMigas('coment', 'todoEspecies', 'miCuenta');
        document.getElementById('vueltaP').addEventListener('click', function(){
            escucharVolverP();
            cargarContenido('inicio');
        }, false);
    }, false);
    document.getElementById('principio').addEventListener('click', function(){
        cargarContenido('inicio');
    }, false);
    document.getElementById('mComentarios').addEventListener('click', function(){
        cargarContenido('comentarios');
    }, false);
    document.getElementById('cRespondidos').addEventListener('click', function(){
        cargarContenido('respuestas');
    }, false);
    document.getElementById('todoEspecies').addEventListener('click', function(){
        cargarContenido('especies');
    }, false);
}
//Se escucha cuando la ventana se ha cargado completamente
window.addEventListener('load', ejecutarPagina, false);
