require('dotenv').config();
const axios = require('axios');

const { SMTP_COM_API_KEY } = process.env;

const base = "https://api.smtp.com/v4";

const accountInfo = async () => {
    const request = {
        url: base + '/account',
        method: 'get',
        headers: {
            Authorization: `Bearer ${SMTP_COM_API_KEY}`,
            Accept: 'application/json'
        }
    }

    try {
        const response = await axios(request);
        return response.data;
    } catch (err) {
        console.error(err);
        return false;
    }
}

accountInfo();