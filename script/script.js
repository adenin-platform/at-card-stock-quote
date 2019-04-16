'use strict';

const got = require('got');

module.exports = async (activity) => {
  try {
    const symbol = 'CSCO'; // replace with desired company's stock symbol
    const response = await got(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`);
    const data = JSON.parse(response.body);

    data.quote.date = (new Date(data.quote.latestUpdate)).toISOString();

    activity.Response.Data = data;
  } catch (error) {
    let m = error.message;

    if (error.stack) m = m + ': ' + error.stack;

    activity.Response.ErrorCode = (error.response && error.response.statusCode) || 500;
    activity.Response.Data = {
      ErrorText: m
    };
  }
};
