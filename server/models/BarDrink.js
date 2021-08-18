exports.BarDrink = class BarDrink{
    static COLLECTION_NAME = "drinks";
    constructor() {
        this.name="";
        this.percentage=0;
        this.image="";
    }
    addDrink(name, percentage, image){
        this.name = name;
        this.percentage = percentage;
        this.image = image;
    }
    getDetails(){
        return {"name":this.name,"percentage":this.percentage,"image":this.image};
    }
}