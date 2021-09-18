import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import PopupSuccess from "../PopupSuccess";
import 'bootstrap'
export default function AddDrink(){
    //state
    let [drinks, setDrinks] = useState([]);
    let [popup, togglePopup] = useState(null);
    //post
    const saveDrinkToDb = async ()=>{
        const name = document.getElementById("name").value;
        const percentage = document.getElementById("percentage").value;
        const description = document.getElementById("description").value;
        const imageFile = document.getElementById("image").files[0];
        const imageBase64 = await File2base64.getFile2Base64(imageFile);
        console.log(JSON.stringify(imageBase64));


        if(name.length<1){
            document.getElementById("name-error").innerHTML="Drink Name cannot be Empty";
            return null;
        }else
            document.getElementById("name-error").innerHTML="";

        //will return success
        await fetch(getProxy("/bar"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"drink":{"name":name,"percentage":percentage,"description":description,"image":imageBase64}})
        })//.then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
            .then(r=>r.text()).then(d=> {
                togglePopup(<PopupSuccess body={<span>Successfully Added the Drink!</span>} heading={"Add Drink"} hidePopupFunction={togglePopup}/>)
            }).catch(e=>console.log(e));
        //re render this page
        await getDrinksFromDb();
    }
    //get
    const getDrinksFromDb = async () =>{
        await fetch(getProxy("/bar"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setDrinks(d)).catch(e=>console.log(e));
    }

    const resetInputField = () => {
        setDrinks("");
    };
    //run once
    useEffect(async ()=>{
        await getDrinksFromDb();
    },[])
    //render
    return <div style={{position:"relative"}}>
        {popup}
        <h3 style={{color:"inherit"}}>Add new Drink</h3>
        <div className="form-group mb-2">
            <label>Enter Name</label>  &nbsp;&nbsp;&nbsp;&nbsp;
            <span id="name-error" style={{color:"red"}}></span>
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
            <textarea  className="form-control" aria-describedby="emailHelp"
                   placeholder="Drink Description" id={"description"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} onClick={()=>saveDrinkToDb()}>Save</button>

        <button className={"btn btn-danger"} onClick={()=>resetInputField()} >Clear</button>

        <p/>
        <h5 style={{color:"inherit"}}>All Drinks</h5>
        <table className={"table w-75"} style={{position:"relative"}}>
            <thead className="thead-dark"><tr>
                <th style={{width:"100px"}}>Image</th>
                <th style={{width:"100px"}}>Name</th>
                <th style={{width:"100px"}}>Percentage</th>
                <th style={{width:"100px"}}>Description</th>
            </tr></thead>
            <tbody>
            {drinks.map(drink => {
                return <tr>
                    <td><img src={drink.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                    <td>{drink.name}</td>
                    <td>{drink.percentage}</td>
                    <td>
                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{drink.description}</div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}