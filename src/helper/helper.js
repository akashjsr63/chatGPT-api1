const hbs = require('hbs');
const ObjectId = require('mongodb').ObjectId;

function timeAgo1(dateString) {
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const timestamp = new Date(dateString).getTime() / 1000;
  const diffSeconds = (new Date(now).getTime() / 1000) - timestamp;

  if (diffSeconds < 60) {
    return `${Math.floor(diffSeconds)} seconds ago`;
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)} minutes ago`;
  } else if (diffSeconds < 86400) {
    return `${Math.floor(diffSeconds / 3600)} hours ago`;
  } else if (diffSeconds < 2592000) {
    return `${Math.floor(diffSeconds / 86400)} days ago`;
  } else if (diffSeconds < 31536000) {
    return `${Math.floor(diffSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(diffSeconds / 31536000)} years ago`;
  }
}


const lt = hbs.registerHelper('lt', function (a, b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    if (a < b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  
const gt = hbs.registerHelper('gt', function (a, b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    if (a > b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  
  const isEq = hbs.registerHelper('isEq', function (a, b, options) {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  
 const sum=  hbs.registerHelper('sum', function (a,b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    return a+b;
  });

const localTime = hbs.registerHelper('localTime', function(timestamp) {
  // const timestamp = ObjectId(id).getTimestamp();
  const localTime = timestamp.toLocaleString();
  return localTime;
});

const timeAgo = hbs.registerHelper('timeAgo', function(dateString) {
  const time = timeAgo1(dateString);
  return time;
});

const formatResponse = hbs.registerHelper('formatResponse', function(response) {
  if(response != undefined || response != undefined){
    response= response.replace(/\n/g, '<br>');
  }
  return response;
});
  
  module.exports = {
    gt,lt,sum, isEq, localTime, timeAgo, formatResponse
  };