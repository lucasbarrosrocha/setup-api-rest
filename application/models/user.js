module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: Sequelize.STRING,
        lastLogin: Sequelize.DATE,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        birthDate: Sequelize.DATE
    });

    return User;
};