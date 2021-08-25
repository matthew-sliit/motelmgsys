import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import 'bootstrap'
export default function EditHousekeeping(){
    //state
    let [housekeeping, setHousekeeping] = useState([]);
    //post
    const saveHousekeepingToDb = async ()=>{
        const roomNo = document.getElementById("roomNo").value;
        const date = document.getElementById("date").value;
        const status = document.getElementById("status").value;
        const assignedTo = document.getElementById("assignedTo").value;
        const priority = document.getElementById("priority").value;

        await fetch(getProxy("/housekeeping"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"housekeeping":{"roomNo":roomNo,"date":date,"status":status,"assignedTo":assignedTo,"priority":priority}})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        //re render this page
        await getHousekeepingFromDb();
    }
    //get
    const getHousekeepingFromDb = async () =>{
        await fetch(getProxy("/housekeeping"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setHousekeeping(d)).catch(e=>console.log(e));
    }
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
