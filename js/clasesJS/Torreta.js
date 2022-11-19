/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Crea objetos Torreta para el control de entradas y salidas
 * 
 * @type Torreta
 */
class Torreta{
    /**
     * Constructor sin parámetros, simplemente inicializa las variables
     * 
     * @return {Torreta}
     */
    constructor(){
        /*
         * Tipo string recoge el id de la Torreta 
         */
        this.idTorreta = '';
        /*
         * Tipo string recoge el número de chip del individuo
         */
        this.chip = '';
        /*
         * Tipo array fecha de ingreso del individuo en el parque
         */
        this.fechasEntrada = new Array();
        /*
         * Tipo array fecha de salida del individuo del parque
         */
        this.fechasSalida = new Array();
    }
    /**
     * Identifica que torreta está recogiendo la entrada o salida
     * 
     * @param {string} idTorreta
     * @return {undefined}
     */
    identificarTorreta(idTorreta){
        this.idTorreta = idTorreta;
    }
    /**
     * Identifica al especimen que entra o sale
     * 
     * @param {string} chip
     * @return {undefined}
     */
    identificarEspecimen(chip){
        this.chip = chip;
    }
    /**
     * Agrega una fecha al final de la lista en el array de entradas
     * 
     * @param {string} fecha
     * @return {undefined}
     */
    agregarFechaEntrada(fecha){
        this.fechasEntrada.push(fecha);
    }
    /**
     * Agrega una fecha al final de la lista en el array de salidas
     * @param {string} fecha
     * @return {undefined}
     */
    agregarFechaSalida(fecha){
        this.fechasSalida.push(fecha);
    }
}


