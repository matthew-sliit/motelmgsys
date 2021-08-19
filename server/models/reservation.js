exports.Reservation = class Reservation{
    static COLLECTION_NAME = "reservations";
    constructor() {
        this.roomNo = "";
        this.type = "";
        this.email = "";
        this.date = "";
        this.roomCount = 0;
        this.nightCount = 0;
    }
    addReservation(reservation){
        Object.assign(this,reservation);
        //this.date = new Date().toLocaleDateString() // today
    }
    getReservation(){
        return {"roomNo":this.roomNo,"type":this.type,"email":this.email,"date":this.date,"roomCount":this.roomCount,"nightCount":this.nightCount};
    }
}