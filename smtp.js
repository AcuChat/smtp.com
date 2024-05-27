require('dotenv').config();
const axios = require('axios');

const { SMTP_COM_API_KEY, SMTP_COM_CHANNEL } = process.env;

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

const axiosPost =  async (endpoint, data) => {
    const request = {
        url: base + endpoint,
        method: 'post',
        headers: {
            Authorization: `Bearer ${SMTP_COM_API_KEY}`,
            Accept: 'application/json'
        },
        data
    }

    try {
        const response = await axios(request);
        return response.data;
    } catch (err) {
        console.error(JSON.stringify(err, null, 4));
        return false;
    }
}

const accountInfo = async () => await axiosGet("/account");
const allChannelsInfo = async () => await axiosGet("/channels");

const sendMessage = async (fromName, fromAddress, toAddress, subject, html, toName = '') => {
    const sendingInfo = {
        "channel": SMTP_COM_CHANNEL,
        "recipients": {
          "to": [
            {
              "name": toName,
              "address": toAddress
            }
          ]
        },
        "originator": {
          "from": {
            "name": fromName,
            "address": fromAddress
          }
        },
        "subject": subject,
        "body": {
          "parts": [
            {
              "type": "text/html",
              "content": html
            }
          ]
        }
      }

    return await axiosPost('/messages', sendingInfo);

}

const test = async () => {
    const html = `Just a <b>test</b> of the new email sending using env channel and toName.`
    const info = await sendMessage('RAGFix', 'no-reply@ragfix.ai', 'michaelwood33311@icloud.com', 'Channel Test with toName', html);
    console.log(JSON.stringify(info, null, 4));
}

test();