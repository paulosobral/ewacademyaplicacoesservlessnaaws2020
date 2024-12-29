const moment = require('moment');
module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: moment().format(),
  };
};
