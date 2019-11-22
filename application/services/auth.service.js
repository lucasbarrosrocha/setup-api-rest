let jwt = require('jsonwebtoken');
// Services
const RestService = require('../services/rest.service');

// Models
const {User, Permission, PermissionRole} = require('../models');

// Constants
const secret = '91d0ct9';

module.exports = {

    /**
     * Retorna um JSON Web token para um usuário
     */
    generateJWT(user) {
        return jwt.sign({id: user.id}, process.env.APP_SECRET || secret);
    },

    /**
     * Valida o token enviado no header 'authorization'
     */
    verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token)
            return RestService.internalError(res, {err: 'Token não fornecido.'});

        jwt.verify(token, process.env.APP_SECRET || secret, function (err, decoded) {
            if (err)
                return RestService.internalError(res, {err: 'Falha na autenticação do token.'});

            User.findOne({where: {id: decoded.id}}).then((user) => {
                req.user = user;
                next();
            });
        });
    },

    /**
     * Verifica se um usuário possui as permissões necessárias
     */
    checkPermissions(permissions) {
        return async function (req, res, next) {
            for (let i = 0; i < permissions.length; i++) {
                let permission = await Permission.findOne({where: {name: permissions[i]}});
                if (!permission)
                    return RestService.internalError(res, {err: 'Esta permissão não foi criada.'});

                let userPermission = await PermissionRole.findOne({
                    where: {
                        roleId: req.user.roleId,
                        permissionId: permission.id
                    }
                });
                if (!userPermission)
                    return RestService.internalError(res, {err: 'Usuário não tem permissão.'});
            }
            next();
        }
    }

}