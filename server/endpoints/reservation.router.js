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
router.get("/all", async ctx=>{
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
router.get("/:roomNo", async ctx=>{
    const roomNo = ctx.request.params.roomNo;
    ctx.response.set('content-type','application/json');
    await readDocument(Reservation.COLLECTION_NAME,"roomNo",roomNo).then(
        function (res){
            ctx.body = res;
        }
    )
})
router.put("/:roomNo", async ctx=>{
    const roomNo = ctx.request.params.roomNo;
    const reservationRaw = ctx.request.body.reservation;
    let reservation = new Reservation();
    Object.assign(reservation,reservationRaw);
    ctx.response.set('content-type','application/json');
    await updateDocument(Reservation.COLLECTION_NAME,"roomNo",roomNo,reservation.getReservation());
    ctx.body = "success";
})
router.delete("/:roomNo", async ctx=>{
    const roomNo = ctx.request.params.roomNo;
    await deleteDocument(Reservation.COLLECTION_NAME,"roomNo",roomNo);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
})

exports.ReservationEndpoint=router;


