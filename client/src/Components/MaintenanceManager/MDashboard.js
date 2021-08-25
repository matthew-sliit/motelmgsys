import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function MDashboard() {
    let [maintenance, setMaintenance] = useState([]);
    let [maintenanceList, setMaintenanceList] = useState([]);

    const searchall = () => {
        const roomNo = document.getElementById("roomNo").value;
        const assignedLike = document.getElementById("assignedTo").value.toLowerCase();
        const status = document.getElementById("status").value;
        if(roomNo.length < 1 && assignedLike.length < 1 && status=="any"){
            setMaintenance(maintenanceList);
        }
        else if(assignedLike.length < 1){
            setMaintenance(maintenanceList);
        }
        else if(status=="any"){
            setMaintenance(maintenanceList);
        }

    }

    const searchMaintenance = () =>{
        const roomNo = document.getElementById("roomNo").value;
        const assignedLike = document.getElementById("assignedTo").value.toLowerCase();
        const status = document.getElementById("status").value;
        const recruitmentsListOriginal = [...maintenanceList];
        let pushed, suggestRecruitments = [];
        pushed = false;
        //console.log("n: "+roomNo+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            console.log(recruitment.roomNo);
            //Object.assign(profile,recruitment);
            if(roomNo.length>0 && roomNo!=="any" && recruitment.roomNo.includes(roomNo)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
            else if(assignedLike.length>0 && assignedLike!=="any" && recruitment.assignedTo.toLowerCase().includes(assignedLike)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
            else if(status.length>0 && status!=="any" && recruitment.status.includes(status)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }

        });
        console.log(roomNo);
        if(pushed){
            setMaintenance(suggestRecruitments);

        }else{
            //console.log("setting suggest!");
            setMaintenance(recruitmentsListOriginal);

        }
    }

    useEffect(async () => {
        await fetch(getProxy("/maintenance"), {
            method: "get"
        }).then(r => r.json()).then(d => {
            setMaintenance(d);
            setMaintenanceList(d);
            console.log(JSON.stringify(d));
        }).catch(e => console.log(e));
    }, []);

    return <div>
        <h3 style={{color: "#0c5460"}}>Maintenance Tasks</h3>
        <div className="row mt-3 mb-3">
            <div className="col-md-3">
                <button type="button" onClick={()=>{window.location.href="/maintainer/maintenance/add"}} className="btn btn-success"><i className="fas fa-plus-circle"></i>Add Maintenance
                    Task
                </button>
            </div>
            <div className="col-md-3">
                <button type="button" className="btn btn-info"><i className="far fa-file-alt"></i>Generate Report
                </button>
            </div>
        </div>
        <div className="col-md-10">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <label>Room No</label>
                            <input type="text" className="form-control" onChange={()=>searchall()} id={"roomNo"} placeholder="Room No"/>
                        </div>
                        <div className="col-md-4">
                            <label>Assigned To</label>
                            <input type="text" className="form-control" onChange={()=>searchall()} id={"assignedTo"} placeholder="Worker"/>
                        </div>
                        <div className="col-md-2">
                            <label>Status</label>
                            <select className="form-control" onChange={()=>searchall()} id={"status"}>
                                <option>any</option>
                                <option>Open</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button type="button" name="search" onClick={()=> searchMaintenance()} className="mt-4 btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-10">
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Room No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Task Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {maintenance.map(clean => {
                    return <tr>
                        <td>{clean.roomNo}</td>
                        <td>{clean.description}</td>
                        <td><img src={clean.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                        <td>{clean.date}</td>
                        <td><h5><span className={clean.status==="Completed"?"badge badge-pill bg-success":(clean.status==="Open"?"badge badge-pill bg-danger":"")}>{clean.status}</span></h5></td>
                        <td>{clean.assignedTo}</td>
                        <td>{clean.cost}</td>
                        <td>
                            <button name="edit" onClick={()=>{window.location.href="/maintainer/maintenance/edit"}} className="btn btn-info px-3">
                                <center><i className="fa fa-edit"></i></center>
                            </button>
                            <button name="" className="btn btn-danger px-3">
                                <center><i className="fa fa-trash"></i></center>
                            </button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        </div>
    </div>
}
