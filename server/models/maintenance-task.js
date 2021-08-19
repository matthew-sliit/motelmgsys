exports.MaintenanceTask = class MaintenanceTask{
    static COLLECTION_NAME = "maintenance";
    constructor() {
        this.roomNo="";
        this.description ="";
        this.date="";
        this.image="";
        this.status="";
        this.assignedTo="";
        this.cost="";
    }
    addMaintenanceTask(data){
        Object.assign(this,data);
        //this.date = new Date().toLocaleDateString() // today
    }
    getCleaningDetails(){
        return {"roomNo":this.roomNo,"status":this.status,"date":this.date,"assignedTo":this.assignedTo,"description":this.description,"cost":this.cost,"image":this.image};
    }
}