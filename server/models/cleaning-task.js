exports.CleaningTask = class CleaningTask{
    static COLLECTION_NAME = "cleaning";
    constructor() {
        this.roomNo="";
        this.status="";
        this.date="";
        this.assignedTo="";
        this.priority="";
    }
    addCleaningTask(data){
        Object.assign(this,data);
        //this.date = new Date().toLocaleDateString() // today
    }
    getCleaningDetails(){
        return {"roomNo":this.roomNo,"status":this.status,"date":this.date,"assignedTo":this.assignedTo,"priority":this.priority};
    }
}