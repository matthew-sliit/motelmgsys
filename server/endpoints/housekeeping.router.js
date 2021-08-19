const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {CleaningTask} = require("../models/cleaning-task");
const {Reservation} = require("../models/reservation");
const {saveDocument} = require("../api/mongodb.api");
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/housekeeping'});

router.get("/",async ctx=>{
    ctx.response.set('content-type','application/json');
    let found = false;
    await readAllDocuments(CleaningTask.COLLECTION_NAME).then(
        function (res){
            found = true;
            ctx.body=res;
        }
    );
    if(!found){
        ctx.body="not found!"
    }
})
router.get("/:id",async ctx=>{
    ctx.response.set('content-type','application/json');
    let found = false;
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    await readDocument(CleaningTask.COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            found=true;
            ctx.body=res[0];
        }
    )
    if(!found){
        ctx.body="not found!"
    }
})
router.post("/",async ctx=>{
    const housekeepingRaw = ctx.request.body.housekeeping;
    let housekeeping = new CleaningTask();
    housekeeping.addCleaningTask(housekeepingRaw);
    saveDocument(CleaningTask.COLLECTION_NAME,[housekeeping.getCleaningDetails()]);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.put("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const housekeepingRaw = ctx.request.body.housekeeping;
    const mongoId = new mongo.ObjectId(id);
    let housekeeping = new CleaningTask();
    Object.assign(housekeeping,housekeepingRaw);
    await updateDocument(CleaningTask.COLLECTION_NAME,"_id",mongoId,housekeeping.getCleaningDetails());
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.delete("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    await deleteDocument(CleaningTask.COLLECTION_NAME,"_id",mongoId);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})

exports.HousekeepingEndpoint=router;