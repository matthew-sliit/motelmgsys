const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {saveDocument} = require("../api/mongodb.api");
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/bar'});

const {BarDrink} = require("../models/bar-drink");
router.get("/",async ctx=>{
    ctx.response.set('content-type','application/json');
    await readAllDocuments(BarDrink.COLLECTION_NAME).then(
        function (res){
            ctx.body = res;
        }
    )
})
router.get("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    await readDocument(BarDrink.COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            ctx.body = res[0];
        }
    )
})
router.post("/", async ctx=>{
    const drinkDetails = ctx.request.body.drink;
    let barDrink = new BarDrink(), exists = false;
    Object.assign(barDrink,drinkDetails);
    ctx.response.set('content-type','application/json');
    await readDocument(BarDrink.COLLECTION_NAME,"name",barDrink.name).then(
        function (result){
            if(result.length>0){
                exists = true;
                ctx.body = "Already Added!";
            }
        }
    )
    if(!exists){
        saveDocument(BarDrink.COLLECTION_NAME,[barDrink.getDetails()]);
        ctx.body = "Successfully Added!";
    }
})
router.put("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const drinkDetails = ctx.request.body.drink;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    let drink = new BarDrink();
    Object.assign(drink,drinkDetails);
    if(drink.image==="ignore"){
        await readDocument(BarDrink.COLLECTION_NAME,"_id",mongoId).then(
            function (res){
                drink.image = res[0].image;
            }
        )
    }
    await updateDocument(BarDrink.COLLECTION_NAME,"_id",mongoId,drink.getDetails());
    ctx.body = "Successfully Updated!";
})
router.delete("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    await deleteDocument(BarDrink.COLLECTION_NAME,"_id",mongoId);
    ctx.body = "Successfully Deleted!";
})

exports.BarManagementEndpoint=router;
