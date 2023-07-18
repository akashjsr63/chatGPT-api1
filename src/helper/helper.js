const hbs = require('hbs');
const ObjectId = require('mongodb').ObjectId;

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

const localTime = hbs.registerHelper('localTime', function(id) {
  const timestamp = ObjectId(id).getTimestamp();
  const localTime = timestamp.toLocaleString();
  return localTime;
});
  
  module.exports = {
    gt,lt,sum, isEq, localTime
  };