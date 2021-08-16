import React, {useState} from "react";
import RegisterLayout from "./RegisterLayout";
export default function Register() {
    const roles=['Bar Manager','Reception','Reservation Manager'];
    const saveFunction = function (profileData){
        console.log("profile: "+JSON.stringify(profileData));
    }
    return (
        <RegisterLayout register={true} roles={roles} saveFunction={saveFunction}/>
    );
}