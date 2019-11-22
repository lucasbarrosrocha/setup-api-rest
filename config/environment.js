const environment = {

    development: {
        URL: 'http://localhost:3000/api',
        PORT: 3000
    },

    // production: {
    //     URL: 'http://url.com/api',
    //     PORT: 3000
    // }
}

module.exports = environment[process.env.NODE_ENV || 'development'];