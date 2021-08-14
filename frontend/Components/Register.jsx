import React, {useState} from "react";
import RegisterLayout from "./RegisterLayout";
export default function Register() {
    const roles=['Bar Manager','Reception','Reservation Manager'];
    return (
        <RegisterLayout register={true} roles={roles}/>
    );
}