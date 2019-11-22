/**
 * @author Lucas Barros Rocha
 */
const vash = require('vash');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const SENDER = 'Setup API <noreply@setup.email.com>';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

module.exports = {

    async send(destination, subject, data) {
        if (!destination.length) return;

        let params = {

            Destination: {
                ToAddresses: [],
                BccAddresses: []
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: addBaseTemplate(data)
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: SENDER
        };

        params['Destination']['ToAddresses'] = destination;
        console.log(destination);

        let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
        let response = await sendPromise;

        console.log('Email sent: ' + response.MessageId);
    },

    /**
     * Envia um e-mail com template escolhido.
     *
     * @param {array} destination Lista de destinatários.
     * @param {string} subject Assunto do e-mail.
     * @param {string} template Nome do template desejado.
     * @param {object} data Dados que deverão estar presentes no template. Por exemplo: { search: mySearch, data: myData, ... }.
     * @param {boolean} indica se devem ser enviados 'blind copies' para os endereços cadastrados
     */
    async sendTemplated(destination, subject, template, data) {

        let html = addTemplate(template, data);

        await this.send(destination, subject, html);
    }
};

/**
 * Renderiza o template escolhido com os dados informados na model.
 *
 * @param {string} filename Nome do template desejado.
 * @param {object} model Dados que deverão estar presentes no template. Por exemplo: { search: mySearch, data: myData, ... }.
 */
function addTemplate(filename, model) {

    const html = fs.readFileSync(path.join(__dirname, `../util/assets/email-templates/${filename}.template.html`), 'utf-8');
    const template = vash.compile(html);

    return template(model);
}

function addBaseTemplate(content) {

    const template = fs.readFileSync(path.join(__dirname, '../util/assets/email-templates/base.template.html'), 'utf-8');
    const $ = cheerio.load(template);

    $('.content').append(content);

    return $.html();
}
