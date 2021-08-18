import crypto from "crypto";
export default class Profile{
    #password = "";
    #passwordNew= undefined;
    constructor() {
        this._id="";
        this.fullname="";
        this.nic="";
        this.email="";
        this.address="";
        this.contact="";
        this.role="";
    }
    setNewPassword(password){
        this.#passwordNew = crypto.createHash('sha256').update(password).digest('hex');
    }
    setPassword(password){
        this.#password = crypto.createHash('sha256').update(password).digest('hex');
    }
    getProfileData(){
        if(this.#passwordNew!==undefined){
            return {"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"role":this.role,"address":this.address,"password":this.#password,"passwordNew":this.#passwordNew};
        }
        return {"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"role":this.role,"address":this.address,"password":this.#password};
    }
    getPassword(){
        return this.#password;
    }
    static getUserRoles(){
        return ['Bar Manager','Reception','Reservation Manager'];
    }
}