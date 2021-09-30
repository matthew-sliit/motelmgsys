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
    isContactValid(){
        const number_regex = /^[\d]{10,15}$/;
        return number_regex.test(this.contact);
    }
    isEmailValid(){
        const email_regex = /[\w]*[@]([\w]*\.[\w]{1,})$/;
        return email_regex.test(this.email);
    }
    setPassword(password){
        this.#password = crypto.createHash('sha256').update(password).digest('hex');
    }
    isNicValid(){
        const nic_regex_old = /^[0-9]{8}[vxVX]$/; //8 digits + 1 special character
        //11 digits + VX or vx or a number
        const nic_regex_2016 = /^[0-9]{11}([vxVX]|[0-9])$/;
        if(nic_regex_old.test(this.nic)){
            //has 9 digits
            return true;
        }else return nic_regex_2016.test(this.nic);
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