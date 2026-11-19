const { handleTelegramRequest } = require('../src/telegram');
const { sendJson } = require('../src/http-utils');
module.exports = async (req,res) => { if(req.method!=='POST') return sendJson(res,405,{error:'Method Not Allowed'}); return handleTelegramRequest(req,res); };
