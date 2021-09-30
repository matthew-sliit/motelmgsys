const crypto = require("crypto");
exports.Profile = class Profile{
    static PROFILE_COLLECTION_NAME = "Profiles";
    static RECRUIT_COLLECTION_NAME = "Recruitments";
    #password = "";
    constructor() {
        this._id="";
        this.fullname="";
        this.nic="";
        this.email="";
        this.address="";
        this.contact="";
        this.role="";
        //this.status = "pending";
        this.active = false;
    }
    setBan(){
        this.status = "ban";
    }
    removeBan(){
        this.status = "unban";
    }
    setPassword(password){
        this.#password = crypto.createHash('sha256').update(password).digest('hex');
    }
    setPasswordDoubleHash(password){
        const hash1 = crypto.createHash('sha256').update(password).digest('hex');
        this.#password = crypto.createHash('sha256').update(hash1).digest('hex');
    }
    setPasswordDb(password){
        this.#password = password;
    }
    formatToCorrectRole(){
        const role = this.role;
        const index = Profile.getUserRoles().indexOf(role);
        if(index<0){
            //role does not exist
            this.role = Profile.defaultRole;
        }
    }
    passwordVerified(password){
        const password2verify = crypto.createHash('sha256').update(password).digest('hex');
        return this.#password===password2verify;
    }
    getProfileData(){
        if(this.status!==undefined){
            return {"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"role":this.role,"address":this.address,"password":this.#password, "status":this.status, "active":this.active};
        }
        return {"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"role":this.role,"address":this.address,"password":this.#password, "active":this.active};
    }
    getProfileDataWithoutPassword(){
        if(this.status!==undefined){
            return {"_id":this._id,"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"address":this.address,"role":this.role, "status":this.status};
        }
        return {"_id":this._id,"fullname":this.fullname,"nic":this.nic,"email":this.email,"contact":this.contact,"address":this.address,"role":this.role};
    }
    static getUserRoles(){
        return ['Bar Manager','Reception','Reservation Manager','Maintenance Manager','Electrician','Housekeeper'];
    }
    static defaultRole = "Unknown";
}