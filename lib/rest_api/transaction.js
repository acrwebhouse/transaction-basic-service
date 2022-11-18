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
                companyId: '636fcdc30653bf00212481a3'
            }
        }*/ 
        const houseId = req.body.houseId
        const userId = req.body.userId
        const actualPrice = req.body.actualPrice
        const serviceCharge = req.body.serviceCharge
        const startRentDate = req.body.startRentDate
        const endRentDate = req.body.endRentDate
        const companyId = req.body.companyId
        const response = {
            'status':true,
            'data':''
        }
        transaction.addTransaction(houseId,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,(result,data)=> {
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
                companyId: '636fcdc30653bf00212481a3'
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
        const response = {
            'status':true,
            'data':''
        }
        transaction.editTransaction(id,houseId,userId,companyId,actualPrice,serviceCharge,transactionDate,startRentDate,endRentDate,(result,data)=> {
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
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        #swagger.parameters['salesInfo'] = {
            in: 'query',
            type: 'string',
            schema: "{\"city\":\"台北市\",\"area\":\"文山區\"}"
        }
        */ 
        let isDelete = req.query.isDelete
        let skip = req.query.skip
        let limit = req.query.limit
        let salesInfo = req.query.salesInfo
        const name = req.query.name
        skip = skip*1;
        limit = limit*1
        if(isDelete == 'true'){
            isDelete = true
        }else{
            isDelete = false
        }
        const queryInfo = {
            isDelete
        }
        let sort;
        let roles;
        try{
            sort = JSON.parse(req.query.sort)
        }catch(e){
            sort = {}
        }
        try{
            salesInfo = JSON.parse(req.query.salesInfo)
            if(utilsValue.isValid(salesInfo.city)){
                queryInfo['rolesInfo.sales.scope.city'] = salesInfo.city
            }
            if(utilsValue.isValid(salesInfo.area)){
                queryInfo['rolesInfo.sales.scope.area'] = salesInfo.area
            }
        }catch(e){
            salesInfo = {}
        }
        try{
            roles = JSON.parse(req.query.roles)
            queryInfo.roles = roles
        }catch(e){
            roles = []
        }

        if(utilsValue.isValid(name)){
            queryInfo.name =new RegExp(name);
        }

        const response = {
            'status':true,
            'data':''
        }

        // res.send(response)

        transaction.getTransactionList(queryInfo,skip,limit,sort,(result,data)=> {
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