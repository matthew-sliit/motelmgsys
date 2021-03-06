import React, {useEffect, useState} from "react";
import RegisterLayout from "./RegisterLayout";
import Cookie from "js-cookie";
import getProxy from "../proxyConfig";
export default function Profile(){
    //states
    let [profile, setProfile] = useState(null);
    const [userid] = useState(Cookie.get('id'));
    const [role] = useState(Cookie.get('role'));
    //needed?
    //const [usernic] = useState(Cookie.get('nic'));
    //component did mount
    useEffect(async ()=>{
        await getProfileFromServer();
    },[]);
    //update function
    const updateProfile = async (profile) =>{
        if(profile===null){return null;}
        await fetch(getProxy("/profile/")+userid,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({"profile":profile})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        await getProfileFromServer();
    }
    const getProfileFromServer = async () =>{
        await fetch(getProxy("/profile/")+userid,{
            method:"get"
        }).then(r=>r.json()).then(d=>setProfile(d)).catch(e=>console.log(e));
    }
    //render
    return (
        <div>
            <RegisterLayout register={false} role={role} saveFunction={updateProfile} profileData={profile}/>
        </div>);
}