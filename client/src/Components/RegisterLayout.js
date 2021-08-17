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
    //setUserProfile Role or all Roles in registration
    function setRole_s(){
        if(register){
            return <datalist className={"mx-2"} id={"user-roles"}>{Profile.getUserRoles().map(role=>{return <option>{role}</option>})}</datalist>;
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
        editedProfile.role=document.getElementById("user-role").value;
        editedProfile.address=document.getElementById("user-address").value;
        const password = document.getElementById('user-password').value;
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
        <div style={{position:"relative", left:"100px", top:"200px"}} className={"w-50"}>
            <span style={{color:"green"}}>{registerReference!=="0"?registerReference:""}</span>
            <span style={{color:"red"}} id={"error-show"}></span>
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
            <div className="form-group mb-2">
                <label>{prefix==="Enter "?prefix:"Confirm "}Password</label>
                <input type="password" className="form-control" placeholder="Password" id={"user-password"}/>
            </div>
            <div className="form-group mb-2">
                <label>{prefix==="Enter "?"Select ":""}Role</label>
                <input type={"text"} list={"user-roles"} className={"mx-2"} defaultValue={profile.role} id={"user-role"}/>
                {setRole_s()}
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input"/>
                <label className="form-check-label">I have provided the true details</label>
            </div>
            <div style={{float:"right"}}>
                <button className={"btn btn-warning mx-2"}>Clear form</button>
                <button className={"btn btn-success"} onClick={()=>saveFunction(getProfile())}>Save</button>
            </div>
        </div>
    </React.Fragment>
}