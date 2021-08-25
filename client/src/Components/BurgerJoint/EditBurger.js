import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function EditBurger(){

    return <div style={{position:"relative"}}>
        <h3 style={{color:"inherit"}}>Update Burgers</h3>
        <div className="form-group mb-2">
            <label>Enter the type of the Burger</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="CheeseBurger" id={"name"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter the Price</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="price" id={"price"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Ingredients</label>
            <textarea  className="form-control" aria-describedby="emailHelp"
                       placeholder="Ingredients" id={"ingredients"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} >Save</button>

        <button className={"btn btn-danger"} >Clear</button>

        <p/>


    </div>
}