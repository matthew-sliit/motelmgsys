import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function EditMaintenance(){
    let [maintenanceId, setMaintenanceId] = useState(null);
    //on mount
    useEffect(()=>{
        let path = window.location.pathname.split("/");
        if(path.length>4){
            //has maintenance id
            setMaintenanceId(path[4]);
            setMaintenanceForEdit(path[4]);
        }
        console.log(path);
    },[])
    //get maintenance using id
    async function setMaintenanceForEdit(index){
        await fetch(getProxy("/maintenance/"+index),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            const clean = d;
            document.getElementById('roomNo').value = clean.roomNo;
            document.getElementById('description').value = clean.description;
            document.getElementById('date').value = clean.date;
           // document.getElementById("image").files[0] = clean.image;
            document.getElementById('status').value = clean.status;
            document.getElementById('assignedTo').value = clean.assignedTo;
            document.getElementById('cost').value = clean.cost;
        }).catch(e=>console.log(e));
    }
    //save maintenance
    const saveMaintenanceToDb = async ()=>{
        const roomNo = document.getElementById("roomNo").value;
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;
        const imageFile = document.getElementById("image").files[0];
        const imageBase64 = await File2base64.getFile2Base64(imageFile);
        console.log(JSON.stringify(imageBase64));
        const status = document.getElementById("status").value;
        const assignedTo = document.getElementById("assignedTo").value;
        const cost = document.getElementById("cost").value;

        if(date.length<1) {
            document.getElementById("name-error").innerHTML = "Task date cannot be empty";
            return null;
        }else
            document.getElementById("name-error").innerHTML="";

        //will return success
        await fetch(getProxy("/maintenance/"+maintenanceId), {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"maintenance":{"roomNo":roomNo,"description":description,"image":imageBase64,"date":date,"status":status,"assignedTo":assignedTo,"cost":cost}})
        }) .then(r=>r.text()).then(d=> {
            alert("Successfully Updated Maintenance Task.");

        }).catch(e=>console.log(e));
        //re render this page
        return window.location.href="/maintainer/maintenance";
    }
    //render
    return <div style={{position:"relative"}}>
        <button type="button" onClick={()=>{window.location.href="/maintainer/maintenance"}} className="btn btn-primary">
            <i className="fas fa-arrow-circle-left"></i>Maintenance Tasks
        </button>
        <center>
            <div className="container mx-auto mt-3">
                <div className="card w-50">
                    <div className="card-body">
                        <center>
                            <div className="mb-4">
                                <h3 style={{color: "cornflowerblue"}}><b>Edit Maintenance Task</b></h3>
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
                                    <div className="col-md-3">
                                        <label htmlFor="Description">Description</label>
                                    </div>
                                    <div className="col-md-7">
                                        <textarea className="form-control" id={"description"} placeholder="Description" rows="3"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="Image">Image</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="file" className="form-control" id={"image"} aria-label="Upload"/>
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
                                        <input type="date" className="form-control" id={"date"} placeholder="dd/mm/yyyy"/>
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
                                            <option>Open</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="Worker">Assigned To</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="text" className="form-control" id={"assignedTo"} placeholder="Worker"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="Priority">Cost</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="number" className="form-control" id={"cost"} />
                                    </div>
                                </div>
                            </div>

                            <div className="container row mx-auto">
                                <div className="col-md-6">
                                    <button type="submit" name="save" onClick={()=>saveMaintenanceToDb()} className="btn btn-primary btn-block">Update</button>
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" name="clear" onClick={()=>{window.location.href="/maintainer/maintenance"}} className="btn btn-outline-danger btn-block">Cancel
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
