import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
export default function AddMaintenance(){
    //state
    let [maintenance, setMaintenance] = useState([]);
    //post
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

        await fetch(getProxy("/maintenance"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"maintenance":{"roomNo":roomNo,"description":description,"image":imageBase64,"date":date,"status":status,"assignedTo":assignedTo,"cost":cost}})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        //re render this page
        await getMaintenanceFromDb();
    }
    //get
    const getMaintenanceFromDb = async () =>{
        await fetch(getProxy("/maintenance"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setMaintenance(d)).catch(e=>console.log(e));
    }
    //run once
    useEffect(async ()=>{
        await getMaintenanceFromDb();
    },[])
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
                            <h3 style={{color: "#1de1c2"}}><b>Add Maintenance Task</b></h3>
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
                                        <option>R120</option>
                                        <option>R121</option>
                                        <option>R122</option>
                                        <option>R123</option>
                                        <option>R124</option>
                                    </select>
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
                                <button type="submit" name="save" onClick={()=>saveMaintenanceToDb()} className="btn btn-success btn-block">Save</button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit" name="clear" className="btn btn-outline-danger btn-block">Clear
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
