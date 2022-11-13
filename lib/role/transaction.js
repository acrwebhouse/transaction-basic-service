const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.transactionCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 

const transactionDoc = {
    houseId:'',
    userId:'',
    actualPrice:0,
    serviceCharge: 0,
    // transactionDate:'',
    startRentDate:'',
    endRentDate:'',
    isDelete:false,
    // createTime:
    // updateTime:
}

function newTransactionDoc(){
    const doc = JSON.parse(JSON.stringify(transactionDoc))
    const date = new Date();
    doc.transactionDate = date
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function getUserList(queryInfo,skip,limit,sort,callback){
    const maxLimit = 300
    if(utilsValue.isValid(queryInfo.roles)){
        queryInfo.roles = {"$all":queryInfo.roles}
    }
    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }
    
    mongoDB.queryFindAll(collectionName, queryInfo , skip, limit, sort ,(result, msg) => {
        callback(result, msg);
    })
}

function getUserById(id,isDelete,callback){
    if(isDelete == 'true'){
        isDelete = true
    }else{
        isDelete = false
    }
    if(id.length == 24){
        const doc = {
            '_id': ObjectId(id),
            'isDelete' : isDelete
        }
        mongoDB.queryFindOne(collectionName, doc, callback)
    }else{
        callback(false, 'id invalid')
    }
}

function getUserByAccount(account,password,isDelete,callback){
    if(isDelete == 'true'){
        isDelete = true
    }else{
        isDelete = false
    }
    if(utilsValue.isValid(account) && utilsValue.isValid(password)){
        const doc = {
            'account': account,
            'password': password,
            'isDelete' : isDelete
        }
        mongoDB.queryFindOne(collectionName, doc, callback)
    }else{
        callback(false, 'id invalid')
    }
}

function addTransaction(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(password)){
        const doc = newUserDoc()
        if(utilsValue.isValid(roles) === false){
            roles = []
        }
        doc.account = account
        doc.password = ''+password
        doc.address = address
        doc.houseIds = houseIds
        doc.phone = phone
        doc.name = name
        doc.gender = gender
        doc.roles = roles
        doc.rolesInfo = rolesInfo
        doc.mail = mail
        doc.bornDate = bornDate
        if(utilsValue.isValid(lineId)){
            doc.lineId = lineId
        }
        mongoDB.insert(collectionName, doc, callback);
    }else {
        callback(false, 'accout or password invalid')
    }
}

function editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,companyId,verify, callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(id) && id.length == 24){
        if(utilsValue.isValid(roles) === false){
            roles = []
        }
        const updateData = {
            password,
            name,
            gender,
            roles,
            rolesInfo,
            houseIds,
            phone,
            address,
            mail,
            bornDate,
            updateTime: new Date()
        }

        if (utilsValue.isValid(companyId) && companyId.length == 24){
            updateData.companyId = ObjectId(companyId)
        }
        if (companyId === 'empty'){
            updateData.companyId = ''
        }
        if (utilsValue.isValid(lineId)){
            updateData.lineId = lineId
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }

        if(utilsValue.isValid(verify)){
            updateData.verify = verify;
        }

        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                data.updateData=updateData
                data.updateData._id = id
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id or accout invalid')
    }
    
}

function removeUser(ids,callback){
    let isValid = true;
    for(let i = 0;i<ids.length;i++){
        if(ids[i].length!=24){
            isValid = false;
        }
    }
    if(isValid == true){
        const objectIds = []
        for(let i = 0 ;i<ids.length;i++ ){
            objectIds.push(ObjectId(ids[i]))
        }
        const searchDoc = {
            '_id': {$in : objectIds}
        }
        const updateData = {
            isDelete:true,
            updateTime: new Date()
        }
        mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}


// exports.addUser = addUser
// exports.editUser = editUser
// exports.getUser = getUser
// exports.removeUser = removeUser
// exports.getUserById = getUserById
// exports.getUserByAccount = getUserByAccount
// exports.getUserList = getUserList
// exports.getUserNoPassword = getUserNoPassword