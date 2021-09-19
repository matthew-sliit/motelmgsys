import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function EditReservations(){
    //state
    let [reserveId, setReserveId] = useState(null);
//on mount
    useEffect(()=>{
        let path = window.location.pathname.split("/");
        if(path.length>3){
            //has drink id
            setReserveId(path[3]);
            setReservationForEdit(path[3]);
        }
        console.log(path);
    },[])
//get drink using id
    async function setReservationForEdit(index){
        await fetch(getProxy("/reservation/"+index),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            const reservation = d;
            document.getElementById("roomNo").value = reservation.roomNo;
            document.getElementById("name").value = reservation.name;
            document.getElementById("email").value = reservation.email;
            document.getElementById("checkindate").value = reservation.checkInDate;
            document.getElementById("checkoutdate").value = reservation.checkOutDate;
            document.getElementById("quantity").value = reservation.roomCount;
            document.getElementById("payment").value = reservation.payment;
            document.getElementById("type").value = reservation.type;


            //document.getElementById('image').value = "";
        }).catch(e=>console.log(e));
    }


//save drink
    const saveReservationToDb = async ()=>{
        const roomNo = document.getElementById("roomNo").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const checkindate = document.getElementById("checkindate").value;
        const checkoutdate = document.getElementById("checkoutdate").value;
        const quantity = document.getElementById("quantity").value;
        const payment = document.getElementById("payment").value;
        const type = document.getElementById("payment").type;

        //will return success
        await fetch(getProxy("/reservation/"+reserveId), {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"reservation":{"name":name,"roomNo":roomNo,"email":email,"checkInDate":checkindate,"checkOutDate":checkoutdate,"roomCount":quantity,"payment":payment,"type":type}})
        }).then(r=>r.text()).then(d=> {
            alert("Successfully Updated Reservation.");

        }).catch(e=>console.log(e));
        //re render this page
        return window.location.href="/reserve";
    }
    //render
    return <div style={{position:"relative"}}>
        <h3 style={{color:"inherit"}}>Edit Reservations</h3>
        <div className="form-group mb-2">
            <label>Room No</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="roomNo" id={"roomNo"}/>
        </div>
        <div className="form-group mb-2">
            <label>Name</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="name" id={"name"}/>
        </div>
        <div className="form-group mb-2">
            <label> Email</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="name" id={"email"}/>
        </div>
        <div className="form-group mb-2">
            <label>CheckInDate</label>
            <input type="date" className="form-control" name="check_in" id={"checkindate"} onInput="calcdays()" required/>

        </div>
        <div className="form-group mb-2">
            <label>CheckOutDate</label>
            <input type="date" className="form-control" name="check_out" id={"checkoutdate"} onInput="calcdays()"
                   required/>
        </div>
        <div className="form-group mb-2">
            <label> Payement Type</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="payment" id={"payment"}/>
        </div>
        {/*<div className="form-group mb-2">*/}
        {/*    <label>No of Days</label>*/}
        {/*    <input type="text" className="form-control" aria-describedby="emailHelp"*/}
        {/*           placeholder="" id={"percentage"} readOnly/>*/}
        {/*</div>*/}
        <div className="form-group mb-2">
            <label>Room type</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="type" id={"type"}/>
        </div>
        <div className="form-group mb-2">
            <label>Quantity of Rooms</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="" id={"quantity"}/>
        </div>
        <button className={"btn btn-green"} onClick={()=>saveReservationToDb()}>Update</button>
        <p/>
    </div>
}