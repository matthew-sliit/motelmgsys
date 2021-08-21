import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function EditReservations(){
    //state
    let [reservation, setreservation] = useState([]);
    //post
    const saveDrinkToDb = async ()=>{
        const name = document.getElementById("name").value;
        const percentage = document.getElementById("percentage").value;
        const description = document.getElementById("description").value;
        const imageFile = document.getElementById("image").files[0];
        const imageBase64 = await File2base64.getFile2Base64(imageFile);
        console.log(JSON.stringify(imageBase64));
        await fetch(getProxy("/bar"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"drink":{"name":name,"percentage":percentage,"description":description,"image":imageBase64}})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        //re render this page
        await getReservationsFromDb();
    }
    //get
    const getReservationsFromDb = async () =>{
        await fetch(getProxy("/bar"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setreservation(d)).catch(e=>console.log(e));
    }
    //run once
    useEffect(async ()=>{
        await getReservationsFromDb();
    },[])
    //render
    return <div style={{position:"relative"}}>
        <h3 style={{color:"inherit"}}>Edit Reservations</h3>
        <div className="form-group mb-2">
            <label>Enter Name</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="Tequila" id={"name"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Email</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="30%" id={"percentage"}/>
        </div>
        <div className="form-group mb-2">
            <label>CheckInDate</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="Drink Description" id={"description"}/>
        </div>
        <div className="form-group mb-2">
            <label>CheckOutDate</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="Drink Description" id={"description"}/>
        </div>
        <button className={"btn btn-green"} onClick={()=>saveDrinkToDb()}>Update</button>
        <p/>
        <h5 style={{color:"inherit"}}>All Drinks</h5>
        <table className={"table w-75"} style={{position:"relative"}}>
            <thead><tr>
                <th style={{width:"100px"}}>Image</th>
                <th style={{width:"100px"}}>name</th>
                <th style={{width:"100px"}}>Percentage</th>
                <th style={{width:"100px"}}>Description</th>
            </tr></thead>
            <tbody>
            {reservation.map(reservation => {
                return <tr>
                    <td><img src={reservation.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                    <td>{reservation.name}</td>
                    <td>{reservation.percentage}</td>
                    <td>
                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{reservation.description}</div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}