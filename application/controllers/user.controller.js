// Services
const LogService = require('../services/log.service');
const RestService = require('../services/rest.service');
const UserService = require('../services/user.service');

// Models
const { User } = require('../models');

// Libraries
const bcrypt = require('bcryptjs');

module.exports = {

    async login(req, res) {
        try {
            const response = res.locals.response;

            LogService.info(`Login realizado com sucesso! ID do usuário: ${response.user.id}`);
            RestService.ok(res, response);
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

    async getAll(req, res) {
        try {
            const users = res.locals.users;

            LogService.info(`Busca por todos usuários realizada com sucesso`);
            RestService.ok(res, users);
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

    async getOne(req, res) {
        try {
            const user = res.locals.user;

            LogService.info(`Busca por usuário realizada com sucesso. ID: ${user.id}`);
            RestService.ok(res, user);
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

    async update(req, res) {
        try {
            LogService.info(`Usuário atualizado com sucesso. ID: ${req.params.id}`);
            RestService.ok(res, "Usuário atualizado");
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

    async forgotPassword(req, res) {
        try {
            LogService.info(`Iniciando envio de e-mail de recuperação de senha.`);

            let response = await UserService.forgotPassword(req.user);

            LogService.info(`E-mail de recuperação de senha enviado. ID do usuário: ${req.user.id}`);
            RestService.ok(res, response);
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

    async retrievePassword(req, res) {
        try {
            LogService.info(`Iniciando recuperação de senha.`);

            let response = await UserService.retrievePassword(req, res);

            LogService.info(`Recuperação de senha concluída com sucesso. ID do usuário: ${response}`);
            RestService.ok(res, "Senha atualizada com sucesso!");
        } catch (error) {
            LogService.error(error.stack || error);
            RestService.internalError(res, error);
        }
    },

};