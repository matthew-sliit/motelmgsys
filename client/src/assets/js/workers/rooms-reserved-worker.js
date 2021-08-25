'no-use'
export default function RoomsReservedWorker(r){
    let rooms = 0;
    r.data.reservationList.map(reservation=>{
        const dateNow = new Date().toLocaleDateString() // today
        const reservation_checkout_date = new Date(reservation.checkOutDate);
        const today_date = new Date(dateNow);
        if(reservation_checkout_date>=today_date){
            //reserved rooms
            const roomNos = reservation.roomNo;
            const roomsRaw = roomNos.split(",");
            rooms+=roomsRaw.length;
        }
    })
    postMessage({"roomsReserved":rooms});
}
