const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

module.exports = {
    // MAIL: ,
    // PHONENUMBER: ,
    // MAILAPPLICATION: ,

    // OFFICELOCATION: ,

    // SOCIALINSTAGRAM: ,
    // SOCIALTELEGRAM: ,
    // SOCIALFACEBOOK: ,
    // SOCIALWHATSAPP: ,

    MONGO_LOGIN: process.env.MONGO_LOGIN,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,

    SESSION_SECRET: process.env.SESSION_SECRET,

    DESTINATION: 'upload'
};