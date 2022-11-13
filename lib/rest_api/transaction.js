exports.on = function(app) {
    const preRestApi = '/user';
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
                endRentDate : '2022/10/11'
            }
        }*/ 
        const houseId = req.body.houseId
        const userId = req.body.userId
        const actualPrice = req.body.actualPrice
        const serviceCharge = req.body.serviceCharge
        const startRentDate = req.body.startRentDate
        const endRentDate = req.body.endRentDate
        const response = {
            'status':true,
            'data':''
        }
        user.addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editTransaction', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a user',
            schema: {
                id: '61ed2777f5178ce385654350',
                account: 'a123456789',
                password: 123456,
                name: 'Chris',
                gender: true,
                roles: [1,2,3,4],
                rolesInfo: {
                    admin:{},
                    host:{},
                    user:{},
                    sales:{},
                },
                houseIds:[],
                companyId: '61ed2777f5178ce385654350',
                phone: '0909666666',
                mail: 'acr.webhouse@gmail.com',
                lineId:'s_213456789',
                address: '台北市文山區興隆路六段66號6樓',
                bornDate : '2022/05/11',
                verify : false
            }
        }*/ 
        const id = req.body.id
        const account = req.body.account
        const password = req.body.password
        const name = req.body.name
        const gender = req.body.gender
        const roles = req.body.roles
        const rolesInfo = req.body.rolesInfo
        const houseIds = req.body.houseIds
        const phone = req.body.phone
        const address = req.body.address
        const companyId = req.body.companyId
        const mail = req.body.mail
        const lineId = req.body.lineId
        const bornDate = req.body.bornDate
        const verify = req.body.verify
        const response = {
            'status':true,
            'data':''
        }
        res.send(response)
        // user.editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,companyId,verify,(result,data)=> {
        //     response.status = result;
        //     response.data = data
        //     res.send(response);
        // })
    });

    app.delete(preRestApi + '/removeTransaction', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a user',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        console.log('====removeUsers====id==',ids)
        res.send(response)
        // user.removeUser(ids,(result,data)=> {
        //     response.status = result;
        //     response.data = data
        //     res.send(response);
        // })
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

        res.send(response)

        // user.getUserList(queryInfo,skip,limit,sort,(result,data)=> {
        //     response.status = result;
        //     response.data = data
        //     res.send(response);
        // }) 
    });

    app.get(preRestApi + '/getTransactionById', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const id = req.query.id
        const isDelete = req.query.isDelete
        const response = {
            'status':true,
            'data':''
        }
        res.send(response)
        // user.getUserById(id,isDelete,(result,data)=> {
        //     response.status = result;
        //     response.data = data
        //     res.send(response);
        // })
    });
}