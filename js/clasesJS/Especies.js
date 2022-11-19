/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea objetos especie.
 * 
 * @type Especie
 */
class Especie {
    /**
     * Constructor vacio, con parámetros por defecto, devuelve una Especie a la 
     * que se le van pasando los parámetros a posteriori.
     * 
     * @return {Especie}
     */
    constructor(){
        /*
         * {string}
         */
        this.nombreEspecie = 'nombreEspecie';
        /*
         * {string}
         */
        this.reino = 'reino';
        /*
         * {string}
         */
        this.clase = 'clase';
        /*
         * {string}
         */
        this.orden = 'orden';
        /*
         * {string}
         */
        this.familia = 'familia';
        /*
         * {string}
         */
        this.periodoMigratorio = 'periodo migratorio';
        /*
         * {string}
         */
        this.caracteristicas = 'características';
    }
    /**
     * Establece el número de especímenes de la especie registrada.
     * 
     * @param {int} poblacion
     * 
     * @return {undefined}
     */
    agregarPoblacion(poblacion){
        this.poblacion = poblacion;
    }
    /**
     * Agrega individuos a la población de la Especie
     * 
     * @return {undefined}
     */
    sumarPoblacion(){
        this.poblacion++;
    }
    /**
     * Elimina individuos de la población de la Especie
     * 
     * @return {undefined}
     */
    restarPoblacion(){
        this.poblacion--;
    }
    /**
     * Escribe las condiciones que se deben cumplir para el registro de las Especies
     * 
     * @return {String}
     */
     static escribirCondicionesRES(){
        return '<p>Información importante para cumplimentar el registro: </p><ul>\n\
            <li>Todos los campos, excepto las imágenes son obligatorios.</li>\n\
            <li>El nombre de la especie, la clase, el orden y la familia, \n\
                empiezan por una letra mayúscula y pueden contener varias \n\
                palabras.</li>\n\
            <li>El periodo migratorio responde al patrón Primavera, Verano, \n\
                Otoño, Invierno o No (en caso de que no sea pertinente), \n\
                con la primera letra en mayúscula.</li>\n\
            <li>La descripción admite hasta 10000 caracteres incluidos los \n\
                saltos de linea, no debe ir vacia ni contener caracteres \n\
                extraños.</li>\n\
            <li>Puedes subir hasta tres imágenes,  de la especie, pero el \n\
                resto de los campos deben estar cubiertos.</li></ul>';
    }
    
}

/**
 * Crea objetos Especimen.
 * 
 * @type Especimen
 */
class Especimen{
    /**
     * Constructor vacio, con parámetros por defecto, devuelve un Especimen al 
     * que se le van pasando los parámetros a posteriori.
     * 
     * @returns {Especimen}
     */
    constructor(){
        /*
         * {string} es el código del microchip del especimen
         */
        this.codigoRegistro = 'codigo de registro';//especimen
        /*
         * {string} es la especie a la que pertenece
         */
        this.especie = 'especie';
        /*
         * {string}
         */
        this.peso = 'peso';
        /*
         * {string}
         */
        this.dimensiones = 'dimensiones';
        /*
         * {string}
         */
        this.fechaRegistro = 'fechaRegistro';
    }
    /**
     * Agrega el dni de la persona responsable de agregar al especimen
     * 
     * @param {string} registrador
     * 
     * @return {undefined}
     */
    agregarRegistrador(registrador){
        this.registrador = registrador;
    }
    /**
     * Agrega las características que definen al individuo dentro de la especie
     * 
     * @param {string} caracteristicas
     * 
     * @return {undefined}
     */
    agregarCaracteristicas(caracteristicas){
        this.caracteristicas = caracteristicas;
    }
    /**
     * Escribe las condiciones que se deben cumplir para el registro de los Especimenes
     * 
     * @return {String}
     */
     static escribirCondicionesREn(){
        return '<p>Información importante para cumplimentar el registro: </p><ul>\n\
            <li>Todos los campos marcados con asterisco son obligatorios.</li>\n\
            <li>El número de chip, corresponde con una letra mayúscula, que no \n\
                sea vocal, seguido de 4 numeros</li>\n\
            <li>La especie debe empezar por una letra mayúscula y estar \n\
                registrada en nuestra BBDD</li>\n\
            <li>El peso es un número que será interpretado en gramos; si el \n\
                animal pesa 14 kilos se introducirá 14000</li>\n\
            <li>Las dimensiones a registrar corresponden a dos valores separados\n\
                 por / entre espacios, el primer valor, en caso de las aves es \n\
                el largo del pico a la cola, el segundo es la envergadura de \n\
                las alas; en el caso de otros animales, el primer valor es el \n\
                largo de la cabeza a la cola y el segundo, el alto hasta la \n\
                cruz.</li> \n\
            <li>Se introducirá una fecha de registro que no será posterior a la \n\
                fecha actual </li>\n\
            <li>Se pueden agregar las características se consideren pertinentes\n\
                 para el reconocimiento del individuo.</li>\n\
            <li>También se podrán hasta 3 fotos, en caso necesario.</li> \n\
            <li>Todos los son obligatorios excepto las características y \n\
                la imagen.</li></ul>';
    }
}

