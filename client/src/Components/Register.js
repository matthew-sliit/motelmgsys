import React, {useCallback, useEffect, useState} from "react";
import RegisterLayout from "./RegisterLayout";
import getProxy from "../proxyConfig";
import Cookie from "js-cookie";
import GenericPopup from "./GenericPopup";
export default function Register() {
    let [roles,setRole]=useState([]);
    let [reference, setReference]=useState("0");
    let [popup, togglePopup] = useState(false);
    //on component mount
    useEffect(async ()=>{
        //warn on page reload
        window.addEventListener('beforeunload', formResubmitWarning);
        //get all roles
        await fetch(getProxy("/register/roles"), {
            method: "get"
        }).then(r => r.json()).then(d => setRole(d));
    },[]);
    const formResubmitWarning = (e) =>{
        if(popup===false) {
            // Cancel reload
            e.preventDefault();
            // browser requires returnValue to be set
            e.returnValue = '';
        }
    }
    const saveFunction = async function (profileData){
        //console.log("profile: "+JSON.stringify(profileData));
        window.addEventListener("beforeunload", function (e) { return true; });
        if(profileData!==null) {
            await fetch(getProxy("/register/"), {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"profile": profileData})
            }).then(r => r.text()).then(d => setReference(d));
            if (reference !== "0") {
                togglePopup(<GenericPopup heading={"Employee Registration"}
                                          body={<span>{reference}<br/>You may leave the site now</span>}
                                          closeBtn={false} hidePopupFunction={redirectToLogin} proceedBtn={true}
                                          proceedFunction={redirectToLogin}/>);
            }
        }
    }
    function redirectToLogin(){
        window.location.href = "/login"
    }
    return (<RegisterLayout register={true} roles={roles} saveFunction={saveFunction} registerReference={reference} popup={popup}/>);
}