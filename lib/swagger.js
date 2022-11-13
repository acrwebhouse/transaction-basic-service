const swaggerAutogen = require('swagger-autogen')();
const config = require('./setting/config').config;
const outputFile = './swagger_output.json'; // 輸出的文件名稱
// const endpointsFiles = ['./app.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以
const endpointsFiles = ['./lib/rest_api/transaction.js'];
const doc = {
    info: {
      title: 'transaction-basic-service API',
      description: 'Description',
    },
    host: config.swaggerIp+':'+config.serverPort,
    schemes: ['http'],
  };
swaggerAutogen(outputFile, endpointsFiles,doc); // swaggerAutogen 的方法