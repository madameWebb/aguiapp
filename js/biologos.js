/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea una Especie por defecto
 * 
 * @type Especie
 */
var clan = new Especie();
/**
 * Recoge los nombres de los atributos por defecto de una Especie
 * 
 * @type Array
 */
var clanArray = Object.keys(clan);
/**
 * Campos que se validan de forma común en el objeto Especie, es decir, son del 
 * mismo tipo y responden al mismo patrón
 * 
 * @type Number
 */
var comunesClan = 5;
/**
 * Crea un Especimen por defecto
 * 
 * @type Especimen
 */
var individuo = new Especimen();
/**
 * Recoge los nombres de los atributos por defecto de un Especimen
 * 
 * @type Array
 */
var individuoArray = Object.keys(individuo);
/**
 * Crea una Torreta por defecto
 * 
 * @type Torreta
 */
var torreta = new Torreta();
/**
 * Recoge los nombres de los atributos por defecto de una Torreta
 * 
 * @type Array
 */
var torretaArray = Object.keys(torreta);
/**
 * Recoge todos los datos introducidos que sean válidos
 * 
 * @type FormData
 */
var guardarValidos = new FormData();

//Se introducen en los arrays los nombres de los atributos que puedan faltar
clanArray.push('imagen');
individuoArray.push('caracteristicas');
individuoArray.push('imagen');

/**
 * Crea el contenedor para las condiciones que han de cumplir los campos de los
 * formularios para ser validados
 * 
 * @param {string} condiciones
 * 
 * @return {Boolean} true si se completo el proceso, false si no se pudo completar
 */
function crearContenedor(condiciones){
    let hecho = true;
    if(Pagina.crearContenedorVariable('main', 'contenidoVariable', 'contenido')){
        Pagina.crearTituloVariable('contenido', 'h2', 'tituloCV');
        document.getElementById('contenido').appendChild(document.createElement('div'));
        document.getElementById('contenido').lastElementChild.setAttribute('id', 'condiciones');
        //escribinmos las condiciones
        document.getElementById('condiciones').innerHTML = condiciones;
    } else {
        hecho = false;
    }
    return hecho;
}
/**
 * Crea distintos formularios según los parámetros que se le pasen
 * 
 * @param {string} titulo es el título del formulario
 * @param {Array} campos son los nombres de los id y los títulos del campo
 * @param {string} tipoFormulario indica que tipo de formulario va a construir
 * @param {string} condiciones explican la forma de rellenar el formulario
 * 
 * @return {undefined}
 */
function crearFormularios(titulo, campos, tipoFormulario, condiciones){
    //Si se ha podido crear el contenedor
    if(crearContenedor(condiciones)){
        //Cogemos y lo metemos en una variable
        let madre = document.getElementById('contenido');
        //Le damos un valor textual al título creado en la otra función
        document.getElementById('tituloCV').appendChild(document.createTextNode(titulo));
        //Creamos el formulario
        madre.appendChild(document.createElement('form'));
        //Y lo identificamos con su tipo
        madre.lastElementChild.setAttribute('id', tipoFormulario);
        //Y lo metemos en una variable
        let padre = document.getElementById(tipoFormulario);
        //Repetiremos la operación siguiente mientras existan campos en el array
        for(let i = 0; i < campos.length; i++){
            //Creamos un label
            padre.appendChild(document.createElement('label'));
            //Y lo nombramos
            padre.lastElementChild.setAttribute('id', campos[i] + 'L');
            //Y le decimos a quien pertenece
            document.getElementById(campos[i] + 'L').setAttribute('for', campos[i]);
            //Creamos un input
            padre.appendChild(document.createElement('input'));
            //Y lo nombramos
            padre.lastElementChild.setAttribute('id', campos[i]);
            //Le damos tipo y otros atributos
            document.getElementById(campos[i]).setAttribute('type', 'text');
            document.getElementById(campos[i]).setAttribute('required', 'required');
            //Creamos otro label que contendrá el error, en caso de producirse
            padre.appendChild(document.createElement('label'));
            //Lo identificamos y le damos atributos
            padre.lastElementChild.setAttribute('id', campos[i] + 'I');
            document.getElementById(campos[i] + 'I').style.color = 'red';
        }
    //ahora bien, si el 'contenido' estaba lleno significa que el contenedor
    //'contenidoVariable' no existe
    } else if(document.getElementById('contenido') !== null){
        Pagina.crearContenedorVariable('main', 'contenido', 'contenidoVariable');
        crearFormularios(titulo, campos, tipoFormulario, condiciones);
    }
}
/**
 * Aporta los atributos pertinentes al formulario de registro de Especies
 * 
 * @return {undefined}
 */
function crearFormularioEspecies(){
        document.getElementById('nombreEspecieL').appendChild(document.createTextNode('Nombre especie: '));
        document.getElementById('nombreEspecie').setAttribute('placeholder', 'Garza blanca*');
        document.getElementById('reinoL').appendChild(document.createTextNode('Reino: '));
        document.getElementById('reino').setAttribute('placeholder', 'Animalia*');
        document.getElementById('claseL').appendChild(document.createTextNode('Clase: '));
        document.getElementById('clase').setAttribute('placeholder', 'Aves*');
        document.getElementById('ordenL').appendChild(document.createTextNode('Orden: '));
        document.getElementById('orden').setAttribute('placeholder', 'Pelicaniformes*');
        document.getElementById('familiaL').appendChild(document.createTextNode('Familia: '));
        document.getElementById('familia').setAttribute('placeholder', 'Ardeidae*');
        document.getElementById('periodoMigratorioL').appendChild(document.createTextNode('Periodo migratorio: '));
        document.getElementById('periodoMigratorio').setAttribute('placeholder', 'Invierno*');
        document.getElementById('caracteristicasL').appendChild(document.createTextNode('Descripción: '));
        //El campo características y el de las imágenes deben ser tradados de forma especial
        crearCaracImg('formEspecies');
        document.getElementById('caracteristicas').setAttribute('required', 'required');
        document.getElementById('caracteristicas').setAttribute('placeholder', 'La garza blanca es un '
            + 'ave grande de plumaje blanco que puede alcanzar el metro de altura...*');
}
/**
 * Aporta los atributos pertinentes al formulario de registro de Especimenes
 * 
 * @return {undefined}
 */
function crearFormularioEspecimenes(){
        document.getElementById('codigoRegistroL').appendChild(document.createTextNode('Número de chip: '));
        document.getElementById('codigoRegistro').setAttribute('placeholder', 'M0123*');
        document.getElementById('especieL').appendChild(document.createTextNode('Especie: '));
        document.getElementById('especie').setAttribute('placeholder', 'Garza blanca*');
        document.getElementById('pesoL').appendChild(document.createTextNode('Peso: '));
        document.getElementById('peso').setAttribute('placeholder', '900*');
        document.getElementById('dimensionesL').appendChild(document.createTextNode('Dimensiones: '));
        document.getElementById('dimensiones').setAttribute('placeholder', '90 / 150*');
        document.getElementById('caracteristicasL').appendChild(document.createTextNode('Características: '));
        document.getElementById('fechaRegistroL').appendChild(document.createTextNode('Fecha de registro: '));
        document.getElementById('fechaRegistro').removeAttribute('type');
        document.getElementById('fechaRegistro').setAttribute('type', 'date');
        document.getElementById('fechaRegistro').setAttribute('placeholder', '2022-03-30*');
        //El campo características y el de las imágenes deben ser tradados de forma especial
        crearCaracImg('formEspecimenes');
        document.getElementById('caracteristicas').setAttribute('placeholder', 'Datos relevantes: Un ala rota, '
            + 'le falta una pata...');
}
/**
 * Crea los campos contenedores de las características y de las imágenes
 * 
 * @param {string} tipoFormulario recibe de que tipo de formulario se trata
 * @return {undefined}
 */
function crearCaracImg(tipoFormulario){
    //Primero me cargo el input de características, porque va a ser un textarea
    document.getElementById(tipoFormulario).removeChild(document.getElementById('caracteristicas'));
    //Llamo al label que le pertenece y cuelgo el textarea del
    document.getElementById('caracteristicasL').appendChild(document.createElement('textarea'));
    //Le doy el id al textarea
    document.getElementById('caracteristicasL').lastElementChild.setAttribute('id', 'caracteristicas');
    //Damos al label de las imágenes su texto
    document.getElementById('imagenL').appendChild(document.createTextNode('Subir imagenes: '));
    //Modificamos los atributos del input 'imagen' ya que su tipo será file, y le damos otros 
    //atributos complementarios
    document.getElementById('imagen').removeAttribute('type');
    document.getElementById('imagen').setAttribute('type', 'file');
    document.getElementById('imagen').setAttribute('multiple', 'multiple');
    //Creamos el boton de registro
    crearBoton('Registrar', tipoFormulario);
    //Se crea un p al final para mostrar los errores
    document.getElementById(tipoFormulario).appendChild(document.createElement('p'));
    document.getElementById(tipoFormulario).lastElementChild.setAttribute('id', 'mostrarError');
    //Y se crea el botón de volver
    crearBoton('Volver', 'contenido');
}
/**
 * Crea botones para los formularios
 * 
 * @param {string} id identifica el botón
 * @param {string} hijoDe indica quien es su ascendencia
 * 
 * @return {undefined}
 */
function crearBoton(id, hijoDe){
    //Se coje el elemento donde se quiere meter el botón y se mete en una variable
    let madre = document.getElementById(hijoDe);
    //Se crea el botón
    madre.appendChild(document.createElement('input'));
    madre.lastElementChild.setAttribute('id', id);
    document.getElementById(id).setAttribute('type', 'button');
    document.getElementById(id).setAttribute('value', id);
    //si el id es 'Volver'
    if(id === 'Volver'){
        //se pone una escucha
        document.getElementById(id).addEventListener('click', function(){
            //que reinicia la página si se pulse al botón
            window.location.reload();
        }, false);    
    }
}
/**
 * Comprueba que los datos de los formularios sean correctos
 * 
 * @param {string} tipoFormulario indica si el formulario es para una Especie
 * o para un Especimen
 * 
 * @return {undefined}
 */
function comprobarDatos(tipoFormulario){ 
    //Si el formulario es para introducir especies
    if(tipoFormulario === 'formEspecies'){
        //Por cada campo del formulario común
        for(let i = 0; i < comunesClan; i++){
            //Se pone una escucha 
            document.getElementById(clanArray[i]).addEventListener('blur', function(){
                //cuando abandona el campo se comprueba que sea correcto
                if(!Validar.especie(this)){
                    //Si no lo es, se escribe el error
                    Registro.escribirError(clanArray[i] + 'I');
                } else {
                    //Si lo es, se guarda en el objeto FormData
                    guardarValidos.set(clanArray[i], this.value);
                    document.getElementById(clanArray[i] + 'I').innerHTML = '';
                }
            },false);
        }
        //se sigue el proceso anterior para todos los demás campos
        document.getElementById('caracteristicas').addEventListener('blur', function(){
            if(!Validar.textarea(this)){
                Registro.escribirError('caracteristicasI');
            } else {
                guardarValidos.set('caracteristicas', this.value);
                document.getElementById('caracteristicasI').innerHTML = '';
            }
        },false);
        document.getElementById('periodoMigratorio').addEventListener('blur', function(){
            if(!Validar.migracion(this)){
                Registro.escribirError('periodoMigratorioI');
            } else {
                guardarValidos.set('periodoMigratorio', this.value);
                document.getElementById('periodoMigratorioI').innerHTML = '';
            }
        },false);
        verificarFormulario('nombreEspecie', clanArray);
    }
    //Si el tipo de formulario es para especimenes, el proceso es similar al anterior
    if(tipoFormulario === 'formEspecimenes'){
        document.getElementById('codigoRegistro').addEventListener('blur', function(){
            if(!Validar.codigoE(this)){
                Registro.escribirError('codigoRegistroI');
            } else {
                guardarValidos.set('codigoRegistro', this.value);
                document.getElementById('codigoRegistroI').innerHTML = '';
            }
        },false);
        document.getElementById('especie').addEventListener('blur', function(){
            if(!Validar.especie(this)){
                Registro.escribirError('especieI');
            } else {
                guardarValidos.set('especie', this.value);
                document.getElementById('especieI').innerHTML = '';
            }
        },false);
        document.getElementById('peso').addEventListener('blur', function(){
            if(!Validar.peso(this)){
                Registro.escribirError('pesoI');
            } else {
                guardarValidos.set('peso', this.value);
                document.getElementById('pesoI').innerHTML = '';
            }
        },false);
        document.getElementById('dimensiones').addEventListener('blur', function(){
            if(!Validar.dimensiones(this)){
                Registro.escribirError('dimensionesI');
            } else {
                guardarValidos.set('dimensiones', this.value);
                document.getElementById('dimensionesI').innerHTML = '';
            }
        },false);
        document.getElementById('fechaRegistro').addEventListener('blur', function(){
            if(!Validar.fecha(this)){
                Registro.escribirError('fechaRegistroI');
            } else {
                guardarValidos.set('fechaRegistro', this.value);
                document.getElementById('fechaRegistroI').innerHTML = '';
            }
        },false);
        verificarFormulario('codigoRegistro', individuoArray);
    }
}
/**
 * Verificación final, al pulsar el botón de registro, comprueba que todos los
 * campos hayan sido validados y no se hayan introducido valores no permitidos
 * 
 * @param {string} tipoNombre nombre que llevarán las imágenes, corresponde con 
 *                 el nombre de la especie o el código del especimen
 * @param {string} campos del formulario
 * 
 * @return {undefined}
 */
function verificarFormulario(tipoNombre, campos){
    //Declaro el tipo de formulario como string al inicializarlo
    let tipoFormulario = '';
    //Booleano para indicar si todo ha ido correctamente
    let esValido = false;
    document.getElementById('Registrar').addEventListener('click', function(){
        if(tipoNombre === 'nombreEspecie'){
            tipoFormulario = 'formEspecies';
        } else if(tipoNombre === 'codigoRegistro'){
            tipoFormulario = 'formEspecimenes';
        }
        //Se comprueba que todos los campos obligatorios hayan sido registrados
        for(let i = 0; i < campos.length - 1; i++){
            if(!guardarValidos.has(campos[i])){
                //si no es así muestra un error y sale del bucle
                Registro.escribirTlcdedc('mostrarError');
                //Pagina.escribirTlcdedc('mostrarError', 'Todos los campos deben estar debidamente cumplimentados.);
                esValido = false;
                break;
            } else {
                //si es válido, devuelve true
                esValido = true;
            }
        }
        //si es válido y hay imágenes
        if(esValido && document.getElementById('imagen').files !== undefined && 
                document.getElementById('imagen').files.length !== 0){
            let maxImg = 3; //Número máximo de imagenes a recoger
            let imagenes = document.getElementById('imagen').files; //Array de imágenes recogidas
            let nomImg = guardarValidos.get(tipoNombre).replace(/\s+/g, '');
            //nombre de la imagen sin espacios en blanco y en minúculas
            nomImg = nomImg.toLowerCase();
            guardarValidos.set('imagenes', imagenes.length);//Guarda el número de imágenes que se pasarán al servidor
            //Sólo se van a guardar 3 imágenes
            if(imagenes.length <= 3){
                for(let i = 0; i < imagenes.length; i++){
                    let imagenes = document.getElementById('imagen').files[i]['name'];
                    let extImg = imagenes.split('.');
                    //Aquí se le pasa un índice para guardar, el archivo recogido, y el nombre del archivo
                    guardarValidos.set(i, document.getElementById('imagen').files[i],
                                                    nomImg + i + '.' + extImg[extImg.length -1]);
                }
            } else if(imagenes.length > 3){
                for(let i = 0; i < maxImg; i++){
                    let imagenes = document.getElementById('imagen').files[i]['name'];
                    let extImg = imagenes.split('.');
                    guardarValidos.set(i, document.getElementById('imagen').files[i],
                                                    nomImg + i + '.' + extImg[extImg.length -1]);
                } 
            }
        }
        for(let value of guardarValidos.keys()){
            console.log(value);
        }
        //Se envía todo al servidor sólo si es válido
        if(esValido) enviarServidor(tipoFormulario);
    }, false);
}
/**
 * Envía el registro al servidor
 * 
 * @param {string} tipoFormulario indica si el formulario es para una Especie
 * o para un Especimen
 * 
 * @return {undefined}
 */
function enviarServidor(tipoFormulario){
    let enviar = new XMLHttpRequest();
    enviar.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            //Muestra la respuesta del servidor en este elemento, indicando si 
            //ha sido posible efectuar la operación o no
            document.getElementById('mostrarError').innerHTML = this.response;
            //resetea el formulario, por si se quiere seguir enviando registros
            document.getElementById(tipoFormulario).reset();
            //También limpia el objeto formData
            guardarValidos = new FormData();
//            for(let value of guardarValidos.values()){
//                console.log(value);
//            }
        }
    };
    //LLama a la función de la clase Registro que comunica con el servidor sin
    //enviar cabeceras
    Registro.comunicarServidorSC(enviar, '../php/operacionesBiologos.php', guardarValidos);
}
/**
 * Muestra la información de las torretas de control
 * 
 * @return {undefined}
 */
function escucharInfoTorretas(){
    if(crearContenedor('')){
        //No necesita el contenedor para las condiciones
        document.getElementById('contenido').removeChild(document.getElementById('condiciones'));
        document.getElementById('tituloCV').appendChild(document.createTextNode
            ('Información de las Torretas'));
        let info = new XMLHttpRequest();
        info.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let infoTorretas = JSON.parse(this.responseText);
                //Los datos de las torretas se muestran en una tabla
                let padre = document.getElementById('contenido');
                let tabla = document.createElement('table');
                let tr = document.createElement('tr');
                padre.appendChild(tabla);
                tabla.appendChild(tr);
                for(let i = 0; i < Object.keys(infoTorretas[0]).length; i++){
                    let th = document.createElement('th');
                    th.appendChild(document.createTextNode(Object.keys(infoTorretas[0])[i]));
                    tr.appendChild(th);
                }
                for(let i = 0; i < infoTorretas.length; i++){
                    let tr = document.createElement('tr');
                    tabla.appendChild(tr);
                    for(let j = 0; j < Object.keys(infoTorretas[i]).length; j++){
                        let td = document.createElement('td');
                        td.appendChild(document.createTextNode(infoTorretas[i][Object.keys(infoTorretas[i])[j]]));
                        tr.appendChild(td);
                    }
                }
                //Se crea el botón volver
                crearBoton('Volver', 'contenido');
            }
        };
        //Índice que le indica al servidor lo que quiere
        let peticion = 'torretas=';
        //Comunica con el servidor, y en este caso, envía cabeceras
        Registro.comunicarServidor(info, '../php/operacionesBiologos.php', peticion);
    } else if(document.getElementById('contenido') !== null){
        let madre = document.getElementById('main');
        madre.removeChild(document.getElementById('contenido'));
        madre.appendChild(document.createElement('div'));
        madre.getElementsByTagName('div').item(0).setAttribute('id', 'contenidoVariable');
        escucharInfoTorretas();
    }
}
/**
 * Inicia la ejecución de la página, escuchando los links de miCuenta y 
 * cerrarSesion
 * 
 * @return {undefined}
 */
function ejecutarPagina(){
//    document.getElementById('especies').addEventListener('click', function(){
//    }, false);
    document.getElementById('rNEspecies').addEventListener('click', function(){
        //metodo que comunique con el servidor y pase como parámetro el padre de la ventana emergente
        //window.open('../php/formEsp/registrosE.php', "Registro y modificación: Especies y especímenes", "width=750, height=400, resizable=no, scrollbars=yes, titlebar=yes");
        crearFormularios('Registrar especies', clanArray, 'formEspecies', Especie.escribirCondicionesRES());
        crearFormularioEspecies();
        comprobarDatos('formEspecies');
    }, false);
//    document.getElementById('mEspecies').addEventListener('click', function(){
//    }, false);
//    document.getElementById('especimenes').addEventListener('click', function(){
//    }, false);
    document.getElementById('rEspecimenes').addEventListener('click', function(){
        crearFormularios('Registrar especimen', individuoArray, 'formEspecimenes', Especimen.escribirCondicionesREn());
        crearFormularioEspecimenes();
        comprobarDatos('formEspecimenes');
    }, false);
//    document.getElementById('mespecimenes').addEventListener('click', function(){
//    }, false);
    document.getElementById('iTorretasC').addEventListener('click', escucharInfoTorretas, false);
//    document.getElementById('sTorretaC').addEventListener('click', function(){
//    }, false);
}
window.addEventListener('load', ejecutarPagina, false);
