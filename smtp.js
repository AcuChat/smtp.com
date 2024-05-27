require('dotenv').config();
const axios = require('axios');

const { SMTP_COM_API_KEY } = process.env;

const base = "https://api.smtp.com/v4";

const axiosGet =  async (endpoint) => {
    const request = {
        url: base + endpoint,
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

const accountInfo = async () => await axiosGet("/account");

const test = async () => {
    const info = await accountInfo();
    console.log(info);
}

test();