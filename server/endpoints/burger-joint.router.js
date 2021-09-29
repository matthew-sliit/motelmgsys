const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {saveDocument} = require("../api/mongodb.api");
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/joint'});

const {BurgerJoint} = require("../models/burger-joint");
router.get("/",async ctx=>{
    ctx.response.set('content-type','application/json');
    await readAllDocuments(BurgerJoint.COLLECTION_NAME).then(
        function (res){
            ctx.body = res;
        }
    )
})
router.get("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    await readDocument(BurgerJoint.COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            ctx.body = res[0];
        }
    )
})
router.post("/", async ctx=>{
    const burgerDetails = ctx.request.body.burger;
    let burgerJoint = new BurgerJoint(), exists = false;
    Object.assign(burgerJoint,burgerDetails);
    ctx.response.set('content-type','application/json');
    await readDocument(BurgerJoint.COLLECTION_NAME,"type",burgerJoint.type).then(
        function (result){
            if(result.length>0){
                exists = true;
                ctx.body = "Already Added!";
            }
        }
    )
    if(!exists){
        saveDocument(BurgerJoint.COLLECTION_NAME,[burgerJoint.getDetails()]);
        ctx.body = "Successfully Added!";
    }
})
router.put("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const burgerDetails = ctx.request.body.burger;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    let burger = new BurgerJoint();
    Object.assign(burger,burgerDetails);
    if(burger.image==="ignore"){
        await readDocument(BurgerJoint.COLLECTION_NAME,"_id",mongoId).then(
            function (res){
                burger.image = res[0].image;
            }
        )
    }
    await updateDocument(BurgerJoint.COLLECTION_NAME,"_id",mongoId,burger.getDetails());
    ctx.body = "Successfully Updated!";
})
router.delete("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    await deleteDocument(BurgerJoint.COLLECTION_NAME,"_id",mongoId);
    ctx.body = "Successfully Deleted!";
})

exports.BurgerJointEndPoint=router;