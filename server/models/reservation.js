exports.Reservation = class Reservation{
    static COLLECTION_NAME = "reservations";
    constructor() {
        this.roomNo = ""
        this.name = "";
        this.email = "";
        this.checkInDate = "";
        this.checkOutDate = "";
        this.roomCount = 0;
        this.payment = "";
        this.type = ""
    }
    addReservation(reservation){
        Object.assign(this,reservation);
        //this.date = new Date().toLocaleDateString() // today
    }
    getReservation(){
        return {"roomNo":this.roomNo,"name":this.name,"email":this.email,"checkInDate":this.checkInDate,"checkOutDate":this.checkOutDate,"roomCount":this.roomCount,"payment":this.payment,"type":this.type};
    }
}