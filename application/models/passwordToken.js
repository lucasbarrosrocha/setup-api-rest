module.exports = (sequelize, Sequelize) => {
    return sequelize.define('PasswordToken', {
        token: Sequelize.STRING,
        userId: Sequelize.INTEGER,
        retrieved: Sequelize.BOOLEAN
    });
};
