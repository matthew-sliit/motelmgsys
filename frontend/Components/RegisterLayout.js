import React from "react";
export default function RegisterLayout(props){
    const {register, roles, role} = props;
    let prefix = "";
    if(register){prefix="Enter ";}
    //setUserProfile Role or all Roles in registration
    function setRole_s(){
        if(register){
            return <select>{roles.map(role=>{return <option>{role}</option>})}</select>;
        }else{
            return <input type={"text"} value={role} disabled={"disabled"}/>
        }
    }
    return <table>
        <thead><tr><th></th><th></th></tr></thead>
        <tbody>
        <tr><td><label>{prefix}Enter Name with Initials</label></td>
            <td><input type={"text"} placeholder={"A. Peter Josh"}/></td></tr>
        <tr><td><label>{prefix}National Identity Card Number</label></td>
            <td><input type={"text"} placeholder={"1xxxxxxxxxx"}/></td></tr>
        <tr><td><label>{prefix}Contact Number</label></td>
            <td><input type={"text"} placeholder={"94119837372"}/></td></tr>
        <tr><td><label>{prefix}Address</label></td>
            <td><input type={"text"} placeholder={"Enter Address"}/></td></tr>
        <tr><td><label>{prefix}Email</label></td>
            <td><input type={"text"} placeholder={"Enter Address"}/></td></tr>
        <tr><td><label>{prefix}Role</label></td>
            <td>
                {setRole_s()}
            </td></tr>
        </tbody>
    </table>
}