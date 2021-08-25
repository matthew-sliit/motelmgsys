exports.BurgerJoint = class BurgerJoint{
    static COLLECTION_NAME = "burgers";
    constructor() {
        this.type="";
        this.price=0;
        this.ingredients="";
        this.image="";
    }
    addBurger(type, price, ingredients){
        this.type = type;
        this.price = price;
        this.ingredients = ingredients;
    }
    getDetails(){
        return {"type":this.type,"price":this.price,"image":this.image,"ingredients":this.ingredients};
    }
}