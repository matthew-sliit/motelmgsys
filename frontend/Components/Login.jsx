import React, {useState} from "react";
export default function Login(){
    return (
        <div>
            <div>
                <label>Enter National IDN</label>
            </div>
            <div>
                <input type={"text"} placeholder={"122313821V/X"}/>
            </div>
            <div>
                <label>Enter Password</label>
            </div>
            <div>
                <input type={"password"} placeholder={"Enter your password"}/>
            </div>
        </div>
    );
}