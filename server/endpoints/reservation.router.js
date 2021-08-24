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
    let numOfReservation = 0;
    const dateNow = new Date();
    let roomsNeeds = reservation.roomCount;
    let lastReservedRoom = 0;
    let reservationsOld  =[];
    //get all reservations
    await readAllDocuments(Reservation.COLLECTION_NAME).then(
        function (res){
            res.map((r,index)=>{
                const checkedOutRooms = r.roomNo.split(",");
                checkedOutRooms.map(room => {
                    if(lastReservedRoom<parseInt(room,10||0)) {
                        lastReservedRoom = parseInt(room,10||0);
                    }
                })
                const checkOutDate = new Date(r.checkOutDate);
                if(checkOutDate<dateNow) {
                    //room now free
                    reservationsOld.push(...checkedOutRooms);
                }else{
                    for(let i=0;i<checkedOutRooms.length;i++){
                        const indexOfRoom = reservationsOld.indexOf(checkedOutRooms[i]);
                        if(indexOfRoom>-1){
                            reservationsOld.splice(indexOfRoom,1);
                        }
                    }
                }
            });
        }
    )
    //have rooms that are checked out
    if(roomsNeeds>0 && reservationsOld.length>0){
        for(let i=0;i<reservationsOld.length && roomsNeeds>0;i++){
            if((i+1)>=roomsNeeds){
                reservation.roomNo +=""+reservationsOld[i];
            }else{
                reservation.roomNo +=""+reservationsOld[i]+",";
            }
            roomsNeeds--;
        }
    }
    //no checked out rooms
    if(roomsNeeds>0){
        for(let i=1;i<=roomsNeeds;i++){
            if(i>=roomsNeeds){
                reservation.roomNo +=""+(i+lastReservedRoom);
            }else{
                reservation.roomNo +=""+(i+lastReservedRoom)+",";
            }
        }
    }
    //console.log("requiredMax: "+typeof requiredMax);
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


