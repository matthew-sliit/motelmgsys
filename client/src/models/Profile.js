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
    isPasswordValid(password){
        if(password.length<=6){
            return "Password should have more than 6 characters";
        }else if(!/\d/.test(password)){
            return "Password should have at least 1 number";
        }else if(!/[A-Z]/.test(password)){
            return "Password should have at least 1 upper case letter";
        }else if(!/[!@#\$%\^&\*]/.test(password)){
            return "Password should have at least 1 symbol";
        }else if(!/[a-z]/.test(password)){
            return "Password should have at least 1 lower case letter";
        }
        return true;
    }
    isEmailValid(email){
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email_regex.test(String(email).toLowerCase());
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