const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {Reservation} = require("../models/reservation");
const {saveDocument} = require("../api/mongodb.api");
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/reservation'});

router.post("/", async ctx=>{
    const reservationRaw = ctx.request.body.reservation;
    let reservation = new Reservation();
    reservation.addReservation(reservationRaw);
    saveDocument(Reservation.COLLECTION_NAME,[reservation.getReservation()]);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
})
router.get("/", async ctx=>{
    ctx.response.set('content-type','application/json');
    let found = false;
    await readAllDocuments(Reservation.COLLECTION_NAME).then(
        function (res){
            found  =true;
            ctx.body = res;
        }
    )
    if(!found){ctx.body=null;}
})
router.get("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    await readDocument(Reservation.COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            ctx.body = res[0];
        }
    )
})
router.put("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    const reservationRaw = ctx.request.body.reservation;
    let reservation = new Reservation();
    console.log(typeof reservationRaw.date);
    if(reservationRaw.date === undefined) {
        await readDocument(Reservation.COLLECTION_NAME, "_id", mongoId).then(
            function (res) {
                reservationRaw['date'] = res[0].date;
            }
        )
    }
    Object.assign(reservation,reservationRaw);
    ctx.response.set('content-type','application/json');
    await updateDocument(Reservation.COLLECTION_NAME,"_id",mongoId,reservation.getReservation());
    ctx.body = "success";
})
router.delete("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    await deleteDocument(Reservation.COLLECTION_NAME,"_id",mongoId);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
})

exports.ReservationEndpoint=router;


