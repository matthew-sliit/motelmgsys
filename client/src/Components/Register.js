import React, {useEffect, useState} from "react";
import RegisterLayout from "./RegisterLayout";
import getProxy from "../proxyConfig";

export default function Register() {
    let [roles,setRole]=useState([]);
    let [reference, setReference]=useState("0");
    //on component mount
    useEffect(async ()=>{
        await fetch(getProxy("/register/roles"), {
            method: "get"
        }).then(r => r.json()).then(d => setRole(d));
    },[]);
    const saveFunction = async function (profileData){
        console.log("profile: "+JSON.stringify(profileData));
        await fetch(getProxy("/register/"),{
            method:"post",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({"profile":profileData})
        }).then(r=>r.text()).then(d=>setReference(d));
    }
    return (<RegisterLayout register={true} roles={roles} saveFunction={saveFunction} registerReference={reference}/>);
}