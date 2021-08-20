import React, {useEffect, useState} from "react";
import "../assets/css/login-style.css"
import Profile from "../models/Profile";
import Cookie from "js-cookie";
import getProxy from "../proxyConfig";
export default function Login(){
    let [resetPassword, setState]= useState(false);
    let [errorMsg, setErrorMsg] = useState("");
    let [newPassword, setNewPassword] = useState("");
    function redirectToSignUpForm(){
        window.location.href="/register";
    }
    useEffect(()=>{
        setErrorMsg("");
        setNewPassword("");
    },[resetPassword])
    async function logIn(){
        const nic = document.getElementById("user-nic").value;
        const password = document.getElementById("user-password").value;
        let profile = new Profile();
        profile.setPassword(password);//hash256
        await fetch(getProxy("/login"),{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nic:nic,password:profile.getPassword()})
        }).then(r=>r.text()).then(d=>{
            console.log(d);
            if(d.length>8){
                const server_response = d.split(":");
                if(server_response[0]==="success"){
                    Cookie.set('role',server_response[1]);
                    Cookie.set('id',server_response[2]);
                    setErrorMsg("");
                    //console.log("login success: role:"+server_response[1]);
                }else if(server_response[0]==="error"){
                    setErrorMsg(server_response[1]);
                    setNewPassword("");
                }
            }
        }).catch(e=>console.log(e));
    }
    async function requestResetPassword(){
        const nic = document.getElementById("user-nic").value;
        const email = document.getElementById("user-email").value;
        await fetch(getProxy("/login/reset"),{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nic:nic,email:email})
        }).then(r=>r.text()).then(d=>{
            if(d.length>8){
                const server_response = d.split(":");
                if(server_response[0]==="success"){
                    setNewPassword(server_response[1]);
                    setErrorMsg("");
                }else if(server_response[0]==="error"){
                    setErrorMsg(server_response[1]);
                    setNewPassword("");
                }
            }
        }).catch(e=>console.log(e));
    }
    return (
        <div style={{position:"relative", left:"100px", top:"200px", width:"30%", color:"inherit"}}>
            <h3 style={{color:"inherit"}}>{resetPassword?"Reset Password":"Login"}</h3>
            <span style={{color:"red"}}>{errorMsg}</span>
            <span style={{color:"#00802b", fontSize:"18px"}}>{newPassword!==""?"New Password is: ":""}</span>
            <span style={{color:"#00802b", fontSize:"18px"}}><b>{newPassword}</b></span>
            <div className="form-group mb-2">
                <label>Enter National Identity Card Number</label>
                <input type={"text"} className="form-control" placeholder={"122313821V/X"} id={"user-nic"}/>
            </div>
            {!resetPassword?<div className="form-group mb-2">
                <label>Enter Password</label>
                <input type={"password"} className="form-control" placeholder={"Enter your password"} id={"user-password"}/>
            </div>:""}
            {resetPassword?<div className="form-group mb-2">
                <label>Enter Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp"
                       placeholder="Enter email" id={"user-email"} id={"user-email"}/>
            </div>:""}
            <div style={{float:"right", position:"relative"}}>
                {!resetPassword?<button className={"btn btn-link mx-1"} onClick={()=>setState(!resetPassword)}>Click to reset password</button>
                    :<button className={"btn btn-outline-success"} onClick={()=>setState(!resetPassword)}>Login</button>}
                <button className={"btn btn-outline-primary mx-2"} onClick={()=>redirectToSignUpForm()}>Register</button>
                {!resetPassword?<button className={"btn btn-green"} onClick={()=>logIn()}>Login</button>:
                    <button className={"btn btn-warning"} onClick={()=>requestResetPassword()}>Reset Password</button>}
            </div>
        </div>
    );
}