module.exports = {

    /**
     * Retorna a data atual sem incluir horas, minutos e segundos.
     * Formato: yyyy-mm-dd
     */
    getDate() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },

    /**
     * Retorna a data atual incluindo horas, minutos e segundos.
     * Formato: yyyy-mm-dd hh:mm:ss
     */
    getFullDate() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    }
}