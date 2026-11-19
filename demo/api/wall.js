const { handleWallRequest } = require('../src/wall-api');
module.exports = async (req,res) => handleWallRequest(req,res);
