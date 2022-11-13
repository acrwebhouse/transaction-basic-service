const mongoDB = require('./mongoDB')
const config = require('../setting/config').config;
const collectionName = config.mongoDBCollection.userCollection;
exports.mongoDBInit = function(port,mongoDBName) {
  console.log('mongodb name:'+mongoDBName);
  console.log('mongodb port:'+port);
  mongoDB.init(port,mongoDBName,(result) => {
    if (result) {
      console.log('\x1b[32m mongodb open success \x1b[37m');
    } else {
      console.log('\x1b[31m mongodb open fail \x1b[37m');
      process.exit();
    }
  });
}
