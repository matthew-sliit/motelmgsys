import React, {useEffect, useState} from "react";
import "../assets/css/login-style.css"
export default function Login(){
    let [resetPassword]= useState(false);
    function redirectToSignUpForm(){
        window.location.href="/register";
    }
    function requestResetPassword(){
        resetPassword = !resetPassword;
        console.log("resetPassword!");
    }
    return (
        <div style={{position:"relative", left:"100px", top:"200px", width:"30%"}}>
            <div className="form-group mb-2">
                <label>Enter National Identity Card Number</label>
                <input type={"text"} className="form-control" placeholder={"122313821V/X"}/>
            </div>
            <div className="form-group mb-2">
                <label>Enter Password</label>
                <input type={"password"} className="form-control" placeholder={"Enter your password"}/>
            </div>

            <div style={{float:"right", position:"relative"}}>
                <button className={"btn btn-link mx-1"} onClick={()=>requestResetPassword()}>Click to reset password</button>
                <button className={"btn btn-outline-primary mx-2"} onClick={()=>redirectToSignUpForm()}>Register</button>
                <button className={"btn btn-success"}>Login</button>
            </div>
        </div>
    );
}