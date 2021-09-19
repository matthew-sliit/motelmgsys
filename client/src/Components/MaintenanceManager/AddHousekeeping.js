import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import PopupSuccess from "../PopupSuccess";

import 'bootstrap'
export default function AddHousekeeping(){
    //state
    let [housekeeping, setHousekeeping] = useState([]);
    let [popup, togglePopup] = useState(null);
    //post
    const saveHousekeepingToDb = async ()=>{
        const roomNo = document.getElementById("roomNo").value;
        const date = document.getElementById("date").value;
        const status = document.getElementById("status").value;
        const assignedTo = document.getElementById("assignedTo").value;
        const priority = document.getElementById("priority").value;

        if(date.length<1){
            document.getElementById("name-error").innerHTML="Task date cannot be empty";
            return null;
        }else
            document.getElementById("name-error").innerHTML="";

        await fetch(getProxy("/housekeeping"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"housekeeping":{"roomNo":roomNo,"date":date,"status":status,"assignedTo":assignedTo,"priority":priority}})

        })//.then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
            .then(r=>r.text()).then(d=> {
                alert("Successfully Added Cleaning Task.");

            }).catch(e=>console.log(e));
        //re render this page
        return window.location.href="/maintainer/housekeeping";
    }
    //get
    const getHousekeepingFromDb = async () =>{
        await fetch(getProxy("/housekeeping"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setHousekeeping(d)).catch(e=>console.log(e));
    }

    const resetInputField = () => {
        setHousekeeping("");
    };

    //run once
    useEffect(async ()=>{
        await getHousekeepingFromDb();
    },[])
    //render
    return <div style={{position:"relative"}}>
        <button type="button" onClick={()=>{window.location.href="/maintainer/housekeeping"}} className="btn btn-primary">
            <i className="fas fa-arrow-circle-left"></i>Housekeeping Tasks
        </button>
        <center>
        <div className="container mx-auto">
            <div className="card w-50">
                <div className="card-body">
                    <center>
                        <div className="mb-4">
                            <h3 style={{color: "#1de1c2"}}><b>Add Cleaning Task</b></h3>
                        </div>
                    </center>
                    <form>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="RoomNo">Room No</label>
                                </div>
                                <div className="col-md-7">
                                    <select className="form-control" id={"roomNo"}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">
                                <span id="name-error" style={{color:"red"}}></span>
                                <div className="col-md-3">
                                    <label htmlFor="TaskDate">Task Date</label>
                                </div>
                                <div className="col-md-7">
                                    <input type="date" className={"form-control"} id={"date"} placeholder="dd/mm/yyyy" required/>
                                </div>

                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="RoomNo">Status</label>
                                </div>
                                <div className="col-md-7">
                                    <select className="form-control" id={"status"}>
                                        <option>Dirty</option>
                                        <option>Cleaning</option>
                                        <option>Clean</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="Housekeeper">Assigned To</label>
                                </div>
                                <div className="col-md-7">
                                    <input type="text" className="form-control" id={"assignedTo"}
                                           placeholder="Housekeeper" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="Priority">Priority</label>
                                </div>
                                <div className="col-md-7">
                                    <select className="form-control" id={"priority"}>
                                        <option>High</option>
                                        <option>Normal</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="container row mx-auto">
                            <div className="col-md-6">
                                <button type="submit" name="save" onClick={()=>saveHousekeepingToDb()} className="btn btn-success btn-block">Save</button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit" name="clear" onClick={()=>resetInputField()} className="btn btn-outline-danger btn-block">Clear
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </center>
    </div>
        }
