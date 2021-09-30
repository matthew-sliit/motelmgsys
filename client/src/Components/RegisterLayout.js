import React from "react";
import Profile from "../models/Profile";
import eyeIcon from '../assets/svg/eye.svg';
export default function RegisterLayout(props){
    const {register, role,roles, profileData, saveFunction,popup} = props;
    let prefix = "",profile=new Profile();
    if(register){
        prefix="Enter ";
    }else{
        Object.assign(profile,profileData);
    }

    //console.log(JSON.stringify(profileData));
    //setUserProfile Role or all Roles in registration
    function setRole_s(){
        if(register){
            return <React.Fragment>
                <input type={"text"} list={"user-roles"} className={"mx-2"} id={"user-role"}/>
                <datalist className={"mx-2"} id={"user-roles"}>{roles.map(role=>{return <option>{role}</option>})}</datalist>
            </React.Fragment>;
        }else{
            return <input type={"text"} value={role} disabled={"disabled"}/>
        }
    }
    const clearFormFunction = () =>{
        document.getElementById("user-fullname").value = "";
        document.getElementById("user-nic").value="";
        document.getElementById("user-email").value="";
        document.getElementById("user-contact").value="";
        document.getElementById("user-role").value="";
        document.getElementById("user-address").value="";
        document.getElementById('user-password').value="";
    }
    function checkPassword(){
        let editedProfile = new Profile();
        let passwordErrorMSgSpan = document.getElementById("password-error");
        const password = document.getElementById('user-password').value;
        if(!register){
            //profile change password
            const newpassword = document.getElementById('user-new-password').value;
            const passwordIsValid = editedProfile.isPasswordValid(newpassword);
            if(newpassword.length>0) {
                if (passwordIsValid === true) {
                    passwordErrorMSgSpan.innerText = "";
                } else {
                    passwordErrorMSgSpan.innerText = passwordIsValid;
                }
            }
        }else {
            //register form password
            const passwordIsValid = editedProfile.isPasswordValid(password);
            if (passwordIsValid===true) {
                passwordErrorMSgSpan.innerText = "";
            } else {
                passwordErrorMSgSpan.innerText = passwordIsValid;
            }
        }
        return null;
    }
    let clicked = [], clickedOn = [];
    function viewPassword(elem_id){
        let i = clickedOn.indexOf(elem_id);
        if(i<-1){
            //new
            clickedOn.push(elem_id);
            clicked.push(true);
            i = clickedOn.indexOf(elem_id);
        }else{
            clicked[i] =!clicked[i];
        }
        if(clicked[i])
            document.querySelector('#'+elem_id).setAttribute('type', 'text');
        else
            document.querySelector('#'+elem_id).setAttribute('type', 'password');
    }
    function getProfile(){
        let editedProfile = new Profile();
        let errorMsgSpan = document.getElementById("error-show");
        let passwordErrorMSgSpan = document.getElementById("password-error");
        errorMsgSpan.innerText= "";
        editedProfile.fullname = document.getElementById("user-fullname").value;
        editedProfile.nic=document.getElementById("user-nic").value;
        editedProfile.email=document.getElementById("user-email").value;
        editedProfile.contact=document.getElementById("user-contact").value;
        if(register) {
            editedProfile.role = document.getElementById("user-role").value;
        }else{
            editedProfile.role = role;
        }
        editedProfile.address=document.getElementById("user-address").value;
        const password = document.getElementById('user-password').value;

        //console.log("password: "+password);
        if(editedProfile.fullname.length<1){
            errorMsgSpan.innerText = "Name cannot be empty!";
            return null;
        }
        //   790029871V - 10
        //197900209871  - 12
        if(editedProfile.nic.length!==10 && editedProfile.nic.length!==12){
            errorMsgSpan.innerText = "Invalid National Identity Card Number!";
            return null;
        }
        //can have extensions, 0119876824-34
        if(editedProfile.contact.length<10 || /[a-zA-Z]/.test(editedProfile.contact)){
            //less than 10 or contains letters
            errorMsgSpan.innerText = "Invalid Contact Number!";
            return null;
        }
        if(!register){
            //profile change password
            const newpassword = document.getElementById('user-new-password').value;
            const passwordIsValid = editedProfile.isPasswordValid(newpassword);
            if(newpassword.length>0) {
                if (passwordIsValid === true) {
                    passwordErrorMSgSpan.innerText = "";
                    editedProfile.setNewPassword(newpassword);
                } else {
                    passwordErrorMSgSpan.innerText = passwordIsValid;
                    return null;
                }
            }
            if(password.length<1){
                errorMsgSpan.innerText = "Enter your current password to save the changes!";
                return null;
            }else{
                errorMsgSpan.innerText = "";
            }
            editedProfile.setPassword(password);
        }else {
            //register form password
            const passwordIsValid = editedProfile.isPasswordValid(password);
            if (passwordIsValid===true) {
                passwordErrorMSgSpan.innerText = "";
                editedProfile.setPassword(password);
            } else {
                passwordErrorMSgSpan.innerText = passwordIsValid;
                return null;
            }
        }
        if(editedProfile.email.length<4){
            errorMsgSpan.innerText = "Invalid Email Address!";
            return null;
        }
        if(register) {
            if (roles.indexOf(editedProfile.role) < 0 || editedProfile.role.length < 3) {
                errorMsgSpan.innerText = "Invalid Role!";
                return null;
            }
            if(!document.getElementById("user-checkbox").checked){
                errorMsgSpan.innerText = "Checkbox at the end of the form needs to be ticked to continue!";
                return null;
            }
        }
        return editedProfile.getProfileData();
    }
    return <React.Fragment>
        <div style={{position:"relative", left:"100px", top:"30px"}} className={"w-50"}>
            {popup}
            <h3 style={{color:"inherit", textAlign:"center"}}>{register?"Registration Form":"Profile"}</h3>
            <span style={{color:"#ECF0F1", backgroundColor:"#DE3163"}} id={"error-show"}></span>
            <div className="form-group mb-2">
                <label>{prefix}Name with Initials</label>
                <input type="text" className="form-control" aria-describedby="emailHelp"
                       placeholder="A. Peter Josh" defaultValue={profile.fullname} id={"user-fullname"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix}National Identity Card Number</label>
                <input type="text" className="form-control" aria-describedby="emailHelp"
                       placeholder="1xxxxxxxxxx"  defaultValue={profile.nic} id={"user-nic"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix}Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp"
                       placeholder="Enter email" defaultValue={profile.email} id={"user-email"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix}Contact Number</label>
                <input type="text" className="form-control" aria-describedby="emailHelp"
                       placeholder="94119837372" defaultValue={profile.contact} id={"user-contact"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix}Address</label>
                <textarea className="form-control" aria-describedby="emailHelp"
                       placeholder="no 8/1, Green bay avenue, park 3, Edinberg" defaultValue={profile.address} id={"user-address"}/>
            </div>
            <p/>
            {!register?<div className="form-group mb-2">
                <label>Change Password</label>
                <span style={{color:"#ECF0F1", backgroundColor:"#DE3163"}} id={"password-error"}></span>
                <span><br/>Password must have more than 6 characters, at least 1 number and 1 symbol</span>
                <input type="password" className="form-control" placeholder="New Password" id={"user-new-password"} onChange={()=>checkPassword()}/>
                <img src={eyeIcon} style={{position:"relative", left:"490px", top:"-34px"}} onClick={()=>viewPassword('user-new-password')} alt={"view password"}/>
            </div>:""}

            <div className="form-group mb-2">
                <label>{prefix==="Enter "?prefix:"Enter Current "}Password</label>
                {register?<span><br/>Password must have more than 6 characters, at least 1 number and 1 symbol</span>:""}
                <br/>
                <span style={{color:"#ECF0F1", backgroundColor:"#DE3163"}} id={"password-error"}></span>
                <input type="password" className="form-control" placeholder={register?"Enter password again":"Enter current password"} id={"user-password"} onChange={()=>checkPassword()}/>
                <img src={eyeIcon} style={{position:"relative", left:"490px", top:"-34px"}} onClick={()=>viewPassword('user-password')} alt={"view password"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix==="Enter "?"Select ":""}Role&nbsp;</label>
                {setRole_s()}
            </div>
            {register?<div className="form-check">
                <input type="checkbox" className="form-check-input" id={"user-checkbox"}/>
                <label className="form-check-label">I consent here that I have provided my true details, if found to be untrue I will take full responsibility</label>
            </div>: ""}
            <p/>
            <div style={{float:"right"}}>
                {register?<button className={"btn btn-primary mx-0"} onClick={()=>{window.location.href="/login"}}>Already have an account</button>:""}
                <button className={"btn btn-orange mx-2"} onClick={()=>{register?clearFormFunction():""}}>{register?"Clear form":"Cancel"}</button>
                <button className={"btn btn-green"} onClick={()=>{saveFunction(getProfile());}}>Save</button>
            </div>
        </div>
    </React.Fragment>
}