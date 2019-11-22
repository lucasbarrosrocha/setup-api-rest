// Models
const {User, PasswordToken} = require('../models');

// Services
const AuthService = require('../services/auth.service');
const RestService = require('../services/rest.service');
const MailService = require('../services/mail.service');
const LogService = require('../services/log.service');

// Libraries
const bcrypt = require('bcryptjs');

// Util
const TokenGenerator = require('../util/security/tokenGenerator');

module.exports = {

    /**
     * Criptografa a senha utilizando bcrypt
     */
    async hashPassword(req, res, next) {
        LogService.info('Iniciando criação de usuário.');
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        res.locals.user =  {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            crmProvince: req.body.crmProvince,
            crm: req.body.crm
        };
        next();
    },

    /**
     * Valida os atributos e cria um novo usuário.
     */
    async createUser(req, res, next) {
        let user = res.locals.user;
        if (!user.name)
            return RestService.badRequest(res, "Nome não fornecido.", next);
        if (!user.email)
            return RestService.badRequest(res, "Email não fornecido.", next);
        if (!user.password)
            return RestService.badRequest(res, "Senha não fornecida.", next);
        if (!user.birthDate)
            return RestService.badRequest(res, "Data de nascimento não fornecida.", next);
        if (!user.gender)
            return RestService.badRequest(res, "Sexo não fornecido.", next);

        let userExists = await User.findOne({where: {email: user.email}});
        if (userExists)
            return RestService.badRequest(res, "Já existe um usuário cadastrado com este email.", next);

        user = await User.create(user);
        const jwt = AuthService.generateJWT(user);
        delete user.dataValues['password'];

        res.locals.user = user;
        res.locals.jwt = jwt;
        next();
    },

    /**
     * Verifica se um email e senha são válidos para algum usuário.
     */
    async login(req, res, next) {
        LogService.info(`Iniciando login.`);
        let body = req.body;

        if (!body.email) {
            return RestService.badRequest(res, "Email não fornecido.");
        } else if (!body.password) {
            return RestService.badRequest(res, "Senha não fornecida.");
        }

        const user = await User.findOne({
            where: {email: body.email}
        });

        if (!user || (!bcrypt.compareSync(body.password, user.password))) {
            return RestService.badRequest(res, "Usuário e/ou senha incorretos.");
        }

        let jwt = AuthService.generateJWT(user);
        delete user.dataValues['password'];

        res.locals.response = {
            user: user,
            jwt: jwt
        };
        next();
    },

    /**
     * Retorna todos os usuários
     */
    async getAll(req, res, next) {
        LogService.info(`Iniciando get de todos usuários.`);
        res.locals.users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        next();
    },

    /**
     * Retorna um usuário específico
     */
    async getOne(req, res, next) {
        LogService.info(`Iniciando get de usuário.`);
        res.locals.user =  await User.findByPk(req.params.id, {
            attributes: {
                exclude: ['password']
            }
        });
        next();
    },

    /**
     * Atualiza um usuário autenticado
     */
    async update(req, res, next) {
        LogService.info(`Iniciando atualização de usuário.`);
        await User.update(user, {where: {id: req.user.id}});
        next();
    },

    /**
     * Gera um token de recuperação de senha para um usuário
     */
    async forgotPassword(user) {
        let token = TokenGenerator(24, true);
        let unique = false;
        let existingToken;

        while (!unique) {
            existingToken = await PasswordToken.findOne({where: {token: token}});

            if (existingToken) {
                token = TokenGenerator(24, true);
            } else {
                unique = true;
            }
        }

        await MailService.send([user.email], "Recuperação de senha", forgotPassword(user, token));

        return await PasswordToken.create({
            userId: user.id,
            token: token
        });
    },

    /**
     * Recebe um token de recuperação de senha e altera a senha do usuário dono do token
     */
    async retrievePassword(req, res) {
        if (!req.params.token)
            return RestService.badRequest(res, "Token de recuperação de senha não fornecido.");

        if (!req.body.password)
            return RestService.badRequest(res, "Nova senha não fornecida.");

        let passwordToken = await PasswordToken.findOne({where: {token: req.params.token}});

        if (!passwordToken)
            return RestService.badRequest(res, "Token de recuperação de senha inexistente.");

        let expirationDate = new Date(passwordToken.createdAt);
        expirationDate.setDate(expirationDate.getDate() + 3);
        if (new Date > expirationDate)
            return RestService.badRequest(res, "Token de recuperação de senha expirado.");

        if (passwordToken.retrieved)
            return RestService.badRequest(res, "Token de recuperação de senha já utilizado.");

        let user = await User.findOne({where: {id: passwordToken.userId}});

        if (!user)
            return RestService.badRequest(res, "Token inválido.");

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        await User.update({password: hashedPassword}, {where: {id: user.id}});
        await PasswordToken.update({retrieved: true}, {where: {id: passwordToken.id}});

        return passwordToken.userId;
    }

};

function forgotPassword(user, token) {
    return `Olá <strong>${user.name ? ', ' + user.name.split(' ')[0] : ''}</strong>! Tudo bem?<br><br>
        Você solicitou a alteração da sua senha de acesso ao aplicativo SETUP. Clique no botão abaixo para renová-la.<br><br>

        <a class="button btn btn-primary" href="www.google.com.br">Recuperar senha!</a><br><br>
        <strong>IMPORTANTE:</strong><br>
        <ul>
            <li>
                Se você <strong>não fez</strong> este pedido, não se preocupe. Nada será modificado em sua conta.
            </li>
        </ul><br>`

}