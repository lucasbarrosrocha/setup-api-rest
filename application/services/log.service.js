const filesystem = require('fs');
const path = require('path');

// Services
const UtilService = require('./util.service');

module.exports = {

    /**
     * Escreve uma informação no log.
     * @param {String} message Informação a ser escrita.
     */
    info(message) {
        write(`[${UtilService.getFullDate()}][INFO]: ${message}`);
    },

    /**
     * Escreve um alerta no log.
     * @param {String} message Alerta a ser escrito.
     */
    warn(message) {
        write(`[${UtilService.getFullDate()}][WARN]: ${message}`);
    },

    /**
     * Escreve um erro no log.
     * @param {String} message Erro a ser escrito. 
     */
    error(message) {
        write(`[${UtilService.getFullDate()}][ERRO]: ${message}`);
    }
};

/**
 * Escreve uma nova linha no arquivo de log.
 * @param {String} message Mensagem a ser escrita no arquivo.
 */
function write(message) {

    // A mensagem também deve ser exibida no console
    console.log(message);
    
    filesystem.appendFile(`${path.join(__dirname, '../../')}/logs/${UtilService.getDate()}.txt`, `${message}\n`, (error) => {

        if (error)
            console.log(error);
    });
}