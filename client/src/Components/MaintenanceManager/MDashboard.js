import React, {useEffect, useRef, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import logo from '../../assets/images/logo.png';
import getProxy from "../../proxyConfig";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";

export default function MDashboard() {
    let [maintenance, setMaintenance] = useState([]);
    let [maintenanceList, setMaintenanceList] = useState([]);
    let pdfExportComponent = useRef(null);

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

    async function removeMaintenanceTask(index_of_maintenance) {
        const maintenanceToRemove = maintenance[index_of_maintenance];
        //remove from db
        await fetch(getProxy("/maintenance/"+maintenanceToRemove._id.toString()),{
            method:"delete"
        }).then(r=>r.text()).then(d=> {
            alert("Successfully Deleted Maintenance Task.");

        }).catch(e=>console.log(e));
        //remove from housekeeping list
        const maintenanceAfterRemoved = maintenanceList.splice(index_of_maintenance,1);
        setMaintenanceList(maintenanceAfterRemoved);
        //redo search
        searchMaintenance();
    }

    return <div>
        <h3 style={{color: "#0c5460"}}>Maintenance Tasks</h3>
        <div className="row mt-3 mb-3">
            <div className="col-md-3">
                <button type="button" onClick={()=>{window.location.href="/maintainer/maintenance/add"}} className="btn btn-success"><i className="fas fa-plus-circle"></i>Add Maintenance
                    Task
                </button>
            </div>
            <div className="col-md-3">
                <button type="button" className="btn btn-info" onClick={() => {
                    if (pdfExportComponent.current) {
                        pdfExportComponent.current.save();
                    }
                }}><i className="far fa-file-alt"></i>Generate Report
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

                {maintenance.map((clean,index) => {
                    return <tr>
                        <td>{clean.roomNo}</td>
                        <td>{clean.description}</td>
                        <td><img src={clean.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                        <td>{clean.date}</td>
                        <td><h5><span className={clean.status==="Completed"?"badge badge-pill bg-success":(clean.status==="Open"?"badge badge-pill bg-danger":"")}>{clean.status}</span></h5></td>
                        <td>{clean.assignedTo}</td>
                        <td>{clean.cost}</td>
                        <td>
                            <button name="edit" onClick={()=>{window.location.href="/maintainer/maintenance/edit/"+maintenance[index]._id.toString()}} className="btn btn-info px-3">
                                <center><i className="fa fa-edit"></i></center>
                            </button>
                            <button name="" className="btn btn-danger px-3" onClick={()=>removeMaintenanceTask(index)}>
                                <center><i className="fa fa-trash"></i></center>
                            </button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        </div>
        <div
            style={{
                position: "absolute",
                left: "-1000px",
                top: 0,
            }}
        >
            <PDFExport paperSize="A4" margin="0.8cm" fileName="MaintenanceTasksReport" ref={pdfExportComponent}>
                <div>
                    <div className={"text-right"}>
                        <img src={logo} style={{width:"120px"}}/>
                    </div>
                    <center>
                        <h5>Maintenance Tasks Report</h5>
                    </center>
                    <br/><br/>
                    <p style={{fontSize:"12px",color:"black"}}>Date: {new Date().toLocaleDateString(['ban', 'id'])}<br/><br/>
                        Signature of supervisor: _____________________
                    </p>
                    <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr style={{fontSize:"12px"}}>
                        <th style={{width:"50px"}}  scope="col">Room <br/>No</th>
                        <th style={{width:"130px"}}  scope="col">Description</th>
                        <th style={{width:"70px"}}  scope="col">Task Date</th>
                        <th style={{width:"70px"}}  scope="col">Status</th>
                        <th style={{width:"100px"}}  scope="col">AssignedTo</th>
                        <th style={{width:"50px"}}  scope="col">Cost</th>
                    </tr>
                    </thead>
                    <tbody>

                    {maintenance.map((clean,index) => {
                        return <tr style={{fontSize:"11px"}}>
                            <td>{clean.roomNo}</td>
                            <td>{clean.description}</td>
                            <td>{clean.date}</td>
                            <td>{clean.status}</td>
                            <td>{clean.assignedTo}</td>
                            <td>{clean.cost}</td>
                        </tr>
                    })}

                    </tbody>
                </table>
                </div>
            </PDFExport>
        </div>
    </div>
}
