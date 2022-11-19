/*
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */

/**
 * Valida todos los datos introducidos en la web
 * 
 * @type Validar
 */
class Validar{
    //PERSONAS
    /**
     * Comprueba que el nombre y apellidos respondan a un patrón válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static nombre(variable){
        let regNombreApellidos = new RegExp(/^([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü]+[\s]){1,2}([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü]+[\s]?){1}$/);
        return regNombreApellidos.test(variable.value);
    }
    /**
     * Comprueba que la variable responda a un patrón válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static usuario(variable){
        let regUsuario = new RegExp(/^([A-ZÑÁÉÍÓÚa-zñáéíóúü]){2}([A-ZÑÁÉÍÓÚa-zñáéíóúü0-9]){1,8}$/);
        return regUsuario.test(variable.value);
    }
    /**
     * Comprueba que la variable responda a un patrón válido y comprueba que 
     * también sea un nif válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static nif(variable){ 
        let nif = variable;
        let esValido = false;
        let regNif = new RegExp(/^\d{8}[a-zA-Z]$/);
        if(regNif.test(nif)){
            let numero = parseInt(nif.substr(0, 8));
            let letra = nif.substr(8, 9).toUpperCase();
            if(numero % 23 >= 0 && numero % 23 <= 22){
            let letrasNif = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 
                        'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 
                        'H', 'L', 'C', 'K', 'E'];
                if (letrasNif[numero % 23] === letra){
                    esValido = true;
                } else {
                    esValido = false;
                }         
            }
        }
        return esValido;
    }
    /**
     * Comprueba que la variable responda a un patrón válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static telefono(variable){ 
        let regTelefono = new RegExp(/^[9876]{1}[0-9]{8}$/);
        return regTelefono.test(variable.value);
    }
    /**
     * Comprueba que el email responda a un patrón válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static email(variable){
        let regEmail = new RegExp(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
        return regEmail.test(variable.value);
    }
    /**
     * Coprueba que la contraseña sea válida según un patrón dado
     * La condición es que tenga entre 6 y 8 caracteres alfanuméricos
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static clave(variable){
        let regClave = new RegExp(/^(?=(?:.*\d))(?=(?:.*[A-Za-z]))\S{6,8}$/);
        return regClave.test(variable.value);
    }
    /**
     * Verifica que la dirección corresponda con un patrón válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static direccion(variable){
        //let regDireccion = new RegExp(/^(\w+\s*){1,50}$/);//Una a 50 palabras
        let regDireccion = new RegExp(/^(([A-ZÑÁÉÍÓÚa-zñáéíóúü])+\s*){1,10}(\d*\s*)(-*\s*\d*([A-ZÑÁÉÍÓÚa-zñáéíóúü])*\s*)(-*\s*\d*)$/);
        return regDireccion.test(variable.value);
    }
    /**
     * Verifica que exista una provincia seleccionada
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static provincia(variable){
        let valido = false;
        if(variable.selectedIndex !== null && variable.selectedIndex !== 0){
            valido = true;
        }
        return valido;
    }
    //ESPECIES
    /**
     * Verifica que el nombre de la especie sea válido
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static especie(variable){
        let regEspecie = new RegExp(/^[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóúü\s]{1,49}$/);
        return regEspecie.test(variable.value);
    }
    /**
     * Verifica que el periodo introducido corresponda con una estación 
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static migracion(variable){
        let regPMigracion = new RegExp(/^(Primavera|Verano|Otoño|Invierno|No)$/);
        return regPMigracion.test(variable.value);
    }
    /**
     * Limita el campo textarea a 200 caracteres
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static textarea(variable){
        let lleno = true;
        if(variable.value === null || variable.value === '' || variable.value === undefined)
            lleno = false;
        return lleno;
    }
    /**
     * Verifica que el código del especimen sea correcto en base al patrón
     * Este código debe empezar por una consonante mayúscula y estar seguido 
     * de 4 dígitos
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static codigoE(variable){
        let regCodigoE = new RegExp(/^[^AEIOUÁÉÍÓÚÑáéíóúña-z]{1}\d{4}$/);
        return regCodigoE.test(variable.value);
    }
    /**
     * Comprueba que el dato introducido es correcto
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static peso(variable){
        let regPesoG = new RegExp(/^(\d|\d{2}|\d{3}|\d{4}|(1\d{4})|20000)[\s]?$/);
        return regPesoG.test(variable.value);
    }
    /**
     * Comprueba que el dato introducido es correcto
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static dimensiones(variable){
        let regDimensiones = new RegExp(/^(\d|\d{2}|([12]\d{2})|300)(\s\/\s)(\d|\d{2}|([12]\d{2})|300)[\s]?$/);
        return regDimensiones.test(variable.value);
    }
    //TODOS
    /**
     * Comprueba que la fecha introducida tenga el formato adecuado
     * 
     * @param {string} variable
     * 
     * @return {Boolean}
     */
    static fecha(variable){
        let regEntrada = new RegExp(/^((\d){4}[\-](0[1-9]|1[0-2])[\-](0([1-9])|[1-2][\d]|3[0-1]))$/);
        if(regEntrada.test(variable.value)){
            let aux = variable.value.split('-');
            return esCorrectoDia(aux[2], aux[1], aux[0]);
        }
        /*
         * función complementaria para evaluar años bisiestos y que los días 
         * correspondan con el mes
         * 
         * @param {string} dia
         * @param {string} mes
         * @param {string} anno
         * 
         * @return {Boolean}
         */
        function esCorrectoDia(dia, mes, anno){
            if((new RegExp(/^((0[469]|11))$/)).test(mes)){
                if((new RegExp(/^(0([1-9])|[1-2][\d]|30)$/)).test(dia)){
                    return esCorrectaFecha(Number(dia), Number(mes) - 1, Number(anno));
                } 
            } else if ((new RegExp(/^((02))$/)).test(mes)){
                if((new RegExp(/^(0([1-9])|[1-2][\d])$/)).test(dia)){
                    if((new RegExp(/^(29)$/)).test(dia)){
                        if ((((Number(anno) % 4 === 0) && (Number(anno) % 100 !== 0)) || (Number(anno) % 400 === 0))){
                            return esCorrectaFecha(Number(dia), Number(mes) - 1, Number(anno));
                        }
                    } else {
                        return esCorrectaFecha(Number(dia), Number(mes) - 1, Number(anno));
                    }									
                }
            } else {
                return esCorrectaFecha(Number(dia), Number(mes) - 1, Number(anno));
            }
            /*
             * Función complementaria, verifica que la fecha introducida no es 
             * superior a la fecha actual
             * 
             * @param {string} dia
             * @param {string} mes
             * @param {string} anno
             * 
             * @return {Boolean}
             */
            function esCorrectaFecha(dia, mes, anno){
                return (new Date(anno, mes, dia) <= new Date());
            }
        }
    }
}
