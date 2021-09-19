import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import PopupSuccess from "../PopupSuccess";
export default function EditDrink(){
    let [drinkId, setDrinkId] = useState(null);
    //on mount
    useEffect(()=>{
        let path = window.location.pathname.split("/");
        if(path.length>3){
            //has drink id
            setDrinkId(path[3]);
            setDrinkForEdit(path[3]);
        }
        console.log(path);
    },[])
    //get drink using id
    async function setDrinkForEdit(index){
        await fetch(getProxy("/bar/"+index),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            const drink = d;
            document.getElementById('name').value = drink.name;
            document.getElementById('percentage').value = drink.percentage;
            document.getElementById('description').value = drink.description;
            //document.getElementById('image').value = "";
        }).catch(e=>console.log(e));
    }
    //save drink
    const saveDrinkToDb = async ()=>{
        const name = document.getElementById("name").value;
        const percentage = document.getElementById("percentage").value;
        const description = document.getElementById("description").value;
        const imageFile = document.getElementById("image").files[0];
        let imageBase64 = "ignore";//default, otherwise image will be updated with nothing
        if(typeof imageFile !== "undefined"){
            imageBase64 = await File2base64.getFile2Base64(imageFile);
        }
        //will return success
        await fetch(getProxy("/bar/"+drinkId), {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"drink":{"name":name,"percentage":percentage,"description":description,"image":imageBase64}})
        }).then(r=>r.text()).then(d=> {location.reload();}).catch(e=>console.log(e));
        //re render this page?
    }
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
            <label>Enter New Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} onClick={()=>saveDrinkToDb()}>Save</button>
        <p/>
    </div>
}