import crypto from "crypto";
export default class Profile{
    #password = "";
    constructor() {
        this.fullname="";
        this.nic="";
        this.email="";
        this.address="";
        this.contact="";
        this.role="";
    }
    setPassword(password){
        this.#password = crypto.createHash('sha256').update(password).digest('hex');
    }
    getProfileData(){
        return {"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"role":this.role,"password":this.#password};
    }
    static getUserRoles(){
        return ['Bar Manager','Reception','Reservation Manager'];
    }
}