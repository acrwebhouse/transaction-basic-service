const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.transactionCollection;
const houseCollectionName = config.mongoDBCollection.houseCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 

const transactionDoc = {
    houseId:'',
    userId:'',
    companyId:'',
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
//ref: https://github.com/acrwebhouse/employees-basic-service/blob/develop/lib/role/employees.js
function getTransactionList(minPrice,maxPrice,startTransactionDate,endTransactionDate,area,typeOfRental,isDelete,skip,limit,callback){
    console.log('==skip====',skip)
        console.log('==limit====',limit)
        console.log('==minPrice====',minPrice)
        console.log('==maxPrice====',maxPrice)
        console.log('==startTransactionDate====',startTransactionDate)
        console.log('==endTransactionDate====',endTransactionDate)
        console.log('==area====',area)
        console.log('==typeOfRental====',typeOfRental)
    
    const maxLimit = 300
    const queryInfo = {}

    if(isDelete == 'true'){
        isDelete = true
    }else{
        isDelete = false
    }

    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        limit = maxLimit;
    }
    
    const lookup =
    {
        from: houseCollectionName,
        localField : 'houseId',
        foreignField : '_id',
        as: 'houseData',
    }

    const match = {
        isDelete,
    }

    if(utilsValue.isValid(startTransactionDate)&&utilsValue.isValid(endTransactionDate)){
        match.transactionDate = {
            $gt: getSaveDate(startTransactionDate),
            $lte: getSaveDate(endTransactionDate),
        }
    }

    if(utilsValue.isValid(area) || utilsValue.isValid(typeOfRental) || utilsValue.isValid(minPrice) || utilsValue.isValid(maxPrice)){
        match.houseData = {$elemMatch: {}}
    }

    if(utilsValue.isValid(area)){
        match.houseData['$elemMatch'].area = area
    }
    typeOfRental = typeOfRental*1;
    if(utilsValue.isValid(typeOfRental)){
        match.houseData['$elemMatch'].saleInfo={'pet' : true}
        // match.houseData['$elemMatch'].saleInfo={$elemMatch: {}}
        // match.houseData['$elemMatch'].saleInfo['$elemMatch'].pet = true

        // match.houseData.saleInfo={$elemMatch: {}}
        // match.houseData.saleInfo['$elemMatch'].pet = true

        match.houseData['$elemMatch'].saleInfo.typeOfRental = typeOfRental
        // match.houseData['$elemMatch'].saleInfo.typeOfRental = {$eq: typeOfRental}
        // match.houseData['$elemMatch'].saleInfo['$elemMatch'] = {typeOfRental}

        
        
    }

    console.log('====match====')
    console.log(match)
    console.log('====match==stringify==')
    console.log(JSON.stringify(match))

    mongoDB.queryJoinCollectionList(collectionName, lookup,match , skip, limit ,(result, msg) => {
        callback(result, msg);
    })
}

//sample time : 2022/10/11
function getSaveDate(time){
    let result = new Date()
    if(utilsValue.isValid(time)){
        const calcu = time.split('/')
        if(calcu.length == 3){
            result.setFullYear(calcu[0], calcu[1]-1, calcu[2]);
            result.setHours(0, 0, 0);
        }
    }
    return result
}

function addTransaction(houseId,userId,companyId,actualPrice,serviceCharge,startRentDate,endRentDate,callback) {
    const doc = newTransactionDoc()
    if(utilsValue.isValid(houseId)){
        doc.houseId = ObjectId(houseId)
    }
    if(utilsValue.isValid(userId)){
        doc.userId = ObjectId(userId)
    }
    if(utilsValue.isValid(companyId)){
        doc.companyId = ObjectId(companyId)
    }
    doc.actualPrice = actualPrice
    doc.serviceCharge = serviceCharge
    doc.startRentDate = getSaveDate(startRentDate)
    doc.endRentDate = getSaveDate(endRentDate)
    mongoDB.insert(collectionName, doc, callback);

}

function editTransaction(id,houseId,userId,companyId,actualPrice,serviceCharge,transactionDate,startRentDate,endRentDate, callback) {
    if (id.length == 24){
        const updateData = {
            actualPrice,
            serviceCharge,
            updateTime: new Date()
        }

        if (utilsValue.isValid(companyId) && companyId.length == 24){
            updateData.companyId = ObjectId(companyId)
        }
        if (companyId === 'empty'){
            updateData.companyId = ''
        }
        if (utilsValue.isValid(houseId) && houseId.length == 24){
            updateData.houseId = ObjectId(houseId)
        }
        if (houseId === 'empty'){
            updateData.houseId = ''
        }
        if (utilsValue.isValid(userId) && userId.length == 24){
            updateData.userId = ObjectId(userId)
        }
        if (userId === 'empty'){
            updateData.userId = ''
        }

        if (utilsValue.isValid(transactionDate)){
            updateData.transactionDate = getSaveDate(transactionDate)
        }

        if (utilsValue.isValid(startRentDate)){
            updateData.startRentDate = getSaveDate(startRentDate)
        }

        if (utilsValue.isValid(endRentDate)){
            updateData.endRentDate = getSaveDate(endRentDate)
        }

        const searchDoc = {
            '_id': ObjectId(id)
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
        callback(false, 'id invalid')
    }
    
}

function removeTransaction(ids,callback){
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


exports.addTransaction = addTransaction
exports.editTransaction = editTransaction
exports.getTransactionList = getTransactionList
exports.removeTransaction = removeTransaction