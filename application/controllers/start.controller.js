// Services
const LogService = require('../services/log.service');
const RestService = require('../services/rest.service');

// Models
const { User } = require('../models');

module.exports = {

    async ping(req, res) {

        try {
            LogService.info('O controlador de exemplo foi chamado!');            
            RestService.ok(res, { result: 'Pong' });
            
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    }
}