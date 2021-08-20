exports.Reservation = class Reservation{
    static COLLECTION_NAME = "reservations";
    constructor() {
        this.roomNo = "";
        this.name = "";
        this.type = "";
        this.email = "";
        this.payment = "";
        this.roomCount = 0;
        this.checkInDate="";
        this.checkOutDate="";
    }
    addReservation(reservation){
        Object.assign(this,reservation);
        //this.date = new Date().toLocaleDateString() // today
    }
    getReservation(){
        return {"roomNo":this.roomNo,"name":this.name,"type":this.type,"email":this.email,"checkInDate":this.checkInDate, "checkOutDate":this.checkOutDate,"roomCount":this.roomCount,"payment":this.payment};
    }
}