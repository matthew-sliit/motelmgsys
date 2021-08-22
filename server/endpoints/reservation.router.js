const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {countOfDocuments} = require("../api/mongodb.api");
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
    let numOfReservation = 0, roomsTaken = 0;
    const dateNow = new Date();
    //get all reservations
    await readAllDocuments(Reservation.COLLECTION_NAME).then(
        function (res){
            res.map(r=>{
                const checkOutDate = new Date(r.checkOutDate);
                if(checkOutDate>=dateNow){
                    //not already checked out then room is reserved
                    numOfReservation+= (parseInt(r.roomCount,10)||0)
                }
            });
            numOfReservation++;
        }
    )
    //require rooms addition to already reserved
    const requiredMax = numOfReservation + (parseInt(reservation.roomCount,10)||0);
    //console.log("requiredMax: "+typeof requiredMax);
    for(let i=numOfReservation;i<requiredMax;i++){
        if((i+1)===requiredMax){
            reservation.roomNo+=""+i;
        }else{
            reservation.roomNo+=""+i+",";
        }
    }
    //console.log("numOfReservations :"+reservation.roomNo);
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


