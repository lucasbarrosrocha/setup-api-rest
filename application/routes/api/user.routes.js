const express = require('express');

const Controller = require('../../controllers/user.controller');
const AuthService = require('../../services/auth.service');
const UserService = require('../../services/user.service');

let router = express.Router();

router.get('/', AuthService.verifyToken, AuthService.checkPermissions(['GET_USERS']), UserService.getAll, Controller.getAll);
router.get('/:id', AuthService.verifyToken, AuthService.checkPermissions(['GET_USERS']), UserService.getOne, Controller.getOne);
router.put('/', AuthService.verifyToken, UserService.update, Controller.update);
router.put('/password', AuthService.verifyToken, Controller.forgotPassword);
router.put('/password/:token', Controller.retrievePassword);
router.post('/login', UserService.login, Controller.login);


module.exports = router;
