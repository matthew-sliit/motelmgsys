import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function MDashboard() {
    let [maintenance, setMaintenance] = useState([]);

    useEffect(async () => {
        await fetch(getProxy("/maintenance"), {
            method: "get"
        }).then(r => r.json()).then(d => {
            setMaintenance(d);
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
                            <input type="text" className="form-control" id={"roomNo"} placeholder="Room No"/>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" id={"assignedTo"} placeholder="Assigned to"/>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" id={"status"}>
                                <option>Open</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button type="button" name="search" className="btn btn-primary">Search</button>
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
                        <td>{clean.status}</td>
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
