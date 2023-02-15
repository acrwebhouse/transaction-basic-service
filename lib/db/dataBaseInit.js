const mongoDB = require('./mongoDB')
exports.mongoDBInit = function(mongoDBName) {
  console.log('mongodb name:'+mongoDBName);
  mongoDB.init(mongoDBName,(result) => {
    if (result) {
      console.log('\x1b[32m mongodb open success \x1b[37m');
    } else {
      console.log('\x1b[31m mongodb open fail \x1b[37m');
      process.exit();
    }
  });
}
