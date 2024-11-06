import SibApiV3Sdk from '@getbrevo/brevo';

function sendEmailForVerification(to, code, token = null) {
    let htmlContent;

    if (token) {
        htmlContent = `
        <html>
            <body>
                <h1>Link and code for verification:</h1>
                <a href="${process.env.DOMAIN}/verification/code/${token}"><h2>click here</h2></a>
                <h1>${code}</h1>
            </body>
        </html>
        `;
        
    } else {
        htmlContent = `
        <html>
            <body>
                <h1>New code for verification:</h1>
                <h1>${code}</h1>
            </body>
        </html>
        `;
    };

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent = htmlContent
    sendSmtpEmail.sender = { "name": process.env.BREVO_SENDER_NAME + ' ' + process.env.BREVO_SENDER_SURNAME, "email": process.env.BREVO_SENDER_EMAIL };
    sendSmtpEmail.to = [{ "email": to }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": ``, "subject": "Verification for MenuApp" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    }, function (error) {
        console.error(error);
    });
};

export {
    sendEmailForVerification
};