import File2base64 from "../../assets/js/file2base64";
import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";

export default function EditHousekeeping(){
    let [housekeepingId, setHousekeepingId] = useState(null);
    //on mount
    useEffect(()=>{
        let path = window.location.pathname.split("/");
        if(path.length>4){
            //has housekeeping id
            setHousekeepingId(path[4]);
            setHousekeepingForEdit(path[4]);
        }
        console.log(path);
    },[])
    //get housekeeping using id
    async function setHousekeepingForEdit(index){
        await fetch(getProxy("/housekeeping/"+index),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            const clean = d;
            document.getElementById('roomNo').value = clean.roomNo;
            document.getElementById('date').value = clean.date;
            document.getElementById('status').value = clean.status;
            document.getElementById('assignedTo').value = clean.assignedTo;
            document.getElementById('priority').value = clean.priority;
        }).catch(e=>console.log(e));
    }
    //save housekeeping
    const saveHousekeepingToDb = async ()=>{
        const roomNo = document.getElementById("roomNo").value;
        const date = document.getElementById("date").value;
        const status = document.getElementById("status").value;
        const assignedTo = document.getElementById("assignedTo").value;
        const priority = document.getElementById("priority").value;

        if(date.length<1) {
            document.getElementById("name-error").innerHTML = "Task date cannot be empty";
            return null;
        }else
            document.getElementById("name-error").innerHTML="";

        //will return success
        await fetch(getProxy("/housekeeping/"+housekeepingId), {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"housekeeping":{"roomNo":roomNo,"date":date,"status":status,"assignedTo":assignedTo,"priority":priority}})
        }) .then(r=>r.text()).then(d=> {
            alert("Successfully Updated Cleaning Task.");

        }).catch(e=>console.log(e));
        //re render this page
        return window.location.href="/maintainer/housekeeping";
    }
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
                                <h3 style={{color: "cornflowerblue"}}><b>Edit Cleaning Task</b></h3>
                            </div>
                        </center>
                        <form>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="RoomNo">Room No</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="text" className="form-control" id={"roomNo"} placeholder="Room No" readOnly/>
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
                                        <input type="date" className="form-control" id={"date"} placeholder="dd/mm/yyyy" />
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
                                    <button type="submit" name="save" onClick={()=>saveHousekeepingToDb()} className="btn btn-primary btn-block">Update</button>
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" name="clear" onClick={()=>{window.location.href="/maintainer/housekeeping"}} className="btn btn-outline-danger btn-block">Cancel
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
