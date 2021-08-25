import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function EditDrink(){

    return <div style={{position:"relative"}}>
        <h3 style={{color:"inherit"}}>Update Drinks</h3>
        <div className="form-group mb-2">
            <label>Enter Name</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="Tequila" id={"name"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Percentage</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="30%" id={"percentage"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Description</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="Drink Description" id={"description"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} >Save</button>
        <p/>


    </div>
}