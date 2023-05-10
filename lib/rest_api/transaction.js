exports.on = function(app) {
    const preRestApi = '/transaction';
    const transaction = require('../role/transaction');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addTransaction', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a transaction',
            schema: {
                houseId: '636fce410653bf00212481a5',
                userId: '636fcdc30653bf00212481a3',
                actualPrice: 12000,
                serviceCharge: 10000,
                startRentDate : '2022/05/11',
                endRentDate : '2022/10/11',
                companyId: '636fcdc30653bf00212481a3',
                state : 1
            }
        }*/ 
        const houseId = req.body.houseId
        const userId = req.body.userId
        const actualPrice = req.body.actualPrice
        const serviceCharge = req.body.serviceCharge
        const startRentDate = req.body.startRentDate
        const endRentDate = req.body.endRentDate
        const companyId = req.body.companyId
        const state = req.body.state

        const response = {
            'status':true,
            'data':''
        }
        transaction.addTransaction(houseId,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,state,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editTransaction', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a transaction',
            schema: {
                id: '61ed2777f5178ce385654350',
                houseId: '636fce410653bf00212481a5',
                userId: '636fcdc30653bf00212481a3',
                actualPrice: 12000,
                serviceCharge: 10000,
                transactionDate : '2022/05/11',
                startRentDate : '2022/05/11',
                endRentDate : '2022/10/11',
                companyId: '636fcdc30653bf00212481a3',
                edit :{
                    actualPrice : 5000,
                    serviceCharge : 2000,
                    transactionDate : '2022/05/11',
                    startRentDate : '2022/05/11',
                    endRentDate : '2022/10/11'
                },
                state : 2
            }
        }*/ 
        const id = req.body.id
        const houseId = req.body.houseId
        const userId = req.body.userId
        const actualPrice = req.body.actualPrice
        const serviceCharge = req.body.serviceCharge
        const transactionDate = req.body.transactionDate
        const startRentDate = req.body.startRentDate
        const endRentDate = req.body.endRentDate
        const companyId = req.body.companyId
        const edit = req.body.edit
        const state = req.body.state
        const response = {
            'status':true,
            'data':''
        }
        transaction.editTransaction(id,houseId,userId,companyId,actualPrice,serviceCharge,state,edit,transactionDate,startRentDate,endRentDate,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeTransaction', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a transaction',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        transaction.removeTransaction(ids,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getTransactionList', function(req, res) {
        /*
        #swagger.parameters['userId'] = {
            in: 'query',
            type: 'string',
            schema: '61ed2777f5178ce385654350'
        }
        #swagger.parameters['companyId'] = {
            in: 'query',
            type: 'string',
            schema: '61ed2777f5178ce385654350'
        }
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['minPrice'] = {
            in: 'query',
            type: 'int',
            schema: 0
        }#swagger.parameters['maxPrice'] = {
            in: 'query',
            type: 'int',
            schema: 19999
        }
        #swagger.parameters['startTransactionDate'] = {
            in: 'query',
            type: 'string',
            schema: '2022/03/11'
        }
        #swagger.parameters['endTransactionDate'] = {
            in: 'query',
            type: 'string',
            schema: '2022/10/11'
        }
        #swagger.parameters['city'] = {
            in: 'query',
            type: 'string',
            schema: '台北市'
        }
        #swagger.parameters['area'] = {
            in: 'query',
            type: 'string',
            schema: '文山區'
        }
        #swagger.parameters['typeOfRental'] = {
            in: 'query',
            type: 'int',
            schema: 1
        }
        */ 
        let isDelete = req.query.isDelete
        let skip = req.query.skip
        let limit = req.query.limit
        let minPrice = req.query.minPrice
        let maxPrice = req.query.maxPrice
        let startTransactionDate = req.query.startTransactionDate
        let endTransactionDate = req.query.endTransactionDate
        let city = req.query.city
        let area = req.query.area
        let minServiceCharge = req.query.minServiceCharge
        let maxServiceCharge = req.query.maxServiceCharge
        let minActualPrice = req.query.minActualPrice
        let maxActualPrice = req.query.maxActualPrice
        let typeOfRental = req.query.typeOfRental
        let userId = req.query.userId
        let companyId = req.query.companyId

        skip = skip*1;
        limit = limit*1

        const response = {
            'status':true,
            'data':''
        }

        transaction.getTransactionList(userId,companyId,minPrice,maxPrice,startTransactionDate,endTransactionDate,city,area,minServiceCharge,maxServiceCharge,minActualPrice,maxActualPrice,typeOfRental,isDelete,skip,limit,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getTransactionById', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const id = req.query.id
        const isDelete = req.query.isDelete
        const response = {
            'status':false,
            'data':'no imp'
        }
        res.send(response)
    });
}