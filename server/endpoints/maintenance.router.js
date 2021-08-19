const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {MaintenanceTask} = require("../models/maintenance-task");
const {Reservation} = require("../models/reservation");
const {saveDocument} = require("../api/mongodb.api");
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/maintenance'});

router.get("/",async ctx=>{
    ctx.response.set('content-type','application/json');
    let found = false;
    await readAllDocuments(MaintenanceTask.COLLECTION_NAME).then(
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
    await readDocument(MaintenanceTask.COLLECTION_NAME,"_id",mongoId).then(
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
    const maintenanceRaw = ctx.request.body.maintenance;
    let maintenance = new MaintenanceTask();
    maintenance.addMaintenanceTask(maintenanceRaw);
    saveDocument(MaintenanceTask.COLLECTION_NAME,[maintenance.getCleaningDetails()]);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.put("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const maintenanceRaw = ctx.request.body.maintenance;
    const mongoId = new mongo.ObjectId(id);
    let maintenance = new MaintenanceTask();
    Object.assign(maintenance,maintenanceRaw);
    await updateDocument(MaintenanceTask.COLLECTION_NAME,"_id",mongoId,maintenance.getCleaningDetails());
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.delete("/:id",async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    await deleteDocument(MaintenanceTask.COLLECTION_NAME,"_id",mongoId);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})

exports.MaintenanceEndpoint=router;