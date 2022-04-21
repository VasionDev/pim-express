const sendGridMail = require('@sendgrid/mail')
const dotenv = require('dotenv')

dotenv.config()
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

const getMessage = (email, subject, text) => {
    const body = text;
    return {
        to: email,
        from: process.env.SYSTEM_SENDER,
        subject: subject,
        text: body,
        html: `<strong>${body}</strong>`,
    }
}

const sendEmailUsingSendGrid = async (email, subject, text) => {
    try {
        await sendGridMail.send(getMessage(email, subject, text));
        console.log('Test email sent successfully');
        return true
    } catch (error) {
        console.error('Error sending test email');
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        return false
    }
}

module.exports = sendEmailUsingSendGrid
