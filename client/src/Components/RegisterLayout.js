import React from "react";
import Profile from "../models/Profile";
export default function RegisterLayout(props){
    const {register, role, profileData, saveFunction, registerReference} = props;
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
                <input type={"text"} list={"user-roles"} className={"mx-2"} defaultValue={profile.role} id={"user-role"}/>
                <datalist className={"mx-2"} id={"user-roles"}>{Profile.getUserRoles().map(role=>{return <option>{role}</option>})}</datalist>
            </React.Fragment>;
        }else{
            return <input type={"text"} value={role} disabled={"disabled"}/>
        }
    }
    function getProfile(){
        let editedProfile = new Profile();
        let errorMsgSpan = document.getElementById("error-show");
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
        if(!register){
            const newpassword = document.getElementById('user-new-password').value;
            if(newpassword.length>6){
                editedProfile.setNewPassword(newpassword);
            }
        }
        editedProfile.setPassword(password);
        //console.log("password: "+password);
        if(editedProfile.fullname.length<1){
            errorMsgSpan.innerText = "Name cannot be empty!";
            return null;
        }
        if(editedProfile.nic.length<10){
            errorMsgSpan.innerText = "Invalid National Identity Card Number!";
            return null;
        }
        if(editedProfile.contact.length<10){
            errorMsgSpan.innerText = "Invalid Contact Number!";
            return null;
        }
        if(editedProfile.email.length<5){
            errorMsgSpan.innerText = "Invalid Email Address!";
            return null;
        }
        if(editedProfile.role.length<1){
            errorMsgSpan.innerText = "Invalid Role!";
            return null;
        }
        if(document.getElementById('user-password').value.length<6){
            errorMsgSpan.innerText = "Password length is invalid!";
            return null;
        }
        return editedProfile.getProfileData();
    }
    return <React.Fragment>
        <div style={{position:"relative", left:"100px", top:"30px"}} className={"w-50"}>
            <h3 style={{color:"inherit", textAlign:"center"}}>{register?"Registration Form":"Profile"}</h3>
            <span style={{color:"green"}}>{registerReference!=="0"?registerReference:""}</span>
            <span style={{color:"#CD6155"}} id={"error-show"}></span>
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
            {!register?<div className="form-group mb-2">
                <label>Change Password</label>
                <input type="password" className="form-control" placeholder="New Password" id={"user-new-password"}/>
            </div>:""}
            <div className="form-group mb-2">
                <label>{prefix==="Enter "?prefix:"Confirm "}Password</label>
                <span><br/>Password must have more than 6 characters, at least 1 number and 1 symbol</span>
                <span id={"password-error"}><br/></span>
                <input type="password" className="form-control" placeholder="Password" id={"user-password"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix==="Enter "?"Select ":""}Role&nbsp;</label>
                {setRole_s()}
            </div>
            {register?<div className="form-check">
                <input type="checkbox" className="form-check-input"/>
                <label className="form-check-label">I consent here that I have provided my true details, if found to be untrue I will take full responsibility</label>
            </div>: ""}
            <p/>
            <div style={{float:"right"}}>
                {register?<button className={"btn btn-primary mx-0"} onClick={()=>{window.location.href="/login"}}>Already have an account</button>:""}
                <button className={"btn btn-orange mx-2"}>{register?"Clear form":"Cancel"}</button>
                <button className={"btn btn-green"} onClick={()=>saveFunction(getProfile())}>Save</button>
            </div>
        </div>
    </React.Fragment>
}