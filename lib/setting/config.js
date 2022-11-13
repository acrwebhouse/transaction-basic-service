require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 22000,
    'mongoDBPort': process.env.DB_PORT || 27017,
    'mongoDBIp': process.env.DB_IP || '127.0.0.1',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'userCollection': 'user'
    }
}