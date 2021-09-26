import React, {useEffect, useRef, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import logo1 from '../../assets/images/logo.png';
import "bootstrap"
import getProxy from "../../proxyConfig";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import logo from "../../assets/images/logo.png";

export default function HDashboard() {
    let [housekeeping, setHousekeeping] = useState([]);
    let [housekeepingList, setHousekeepingList] = useState([]);
    let pdfExportComponent = useRef(null);

    const searchall = () => {
        const roomNo = document.getElementById("roomNo").value;
        const assignedLike = document.getElementById("assignedTo").value.toLowerCase();
        const status = document.getElementById("status").value;
        const priority = document.getElementById("priority").value;
        if(roomNo.length < 1 && assignedLike.length < 1 && status=="any" && priority=="any"){
            setHousekeeping(housekeepingList);
        }
        else if(assignedLike.length < 1){
            setHousekeeping(housekeepingList);
        }
        else if(status=="any"){
            setHousekeeping(housekeepingList);
        }
        else if(priority=="any"){
            setHousekeeping(housekeepingList);
        }
    }

    const searchHousekeeping = () =>{
        const roomNo = document.getElementById("roomNo").value;
        const assignedLike = document.getElementById("assignedTo").value.toLowerCase();
        const status = document.getElementById("status").value;
        const priority = document.getElementById("priority").value;
        const recruitmentsListOriginal = [...housekeepingList];
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
            else if(priority.length>0 && priority!=="any" && recruitment.priority.includes(priority)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
        });
        console.log(roomNo);
        if(pushed){
            setHousekeeping(suggestRecruitments);

        }else{
            //console.log("setting suggest!");
            setHousekeeping(recruitmentsListOriginal);

        }
    }

    useEffect(async () => {
        await fetch(getProxy("/housekeeping"), {
            method: "get"
        }).then(r => r.json()).then(d => {
            setHousekeeping(d);
            setHousekeepingList(d);
            console.log(JSON.stringify(d));
        }).catch(e => console.log(e));
    }, []);

    async function removeHousekeepingTask(index_of_housekeeping) {
        const housekeepingToRemove = housekeeping[index_of_housekeeping];
        //remove from db
        await fetch(getProxy("/housekeeping/"+housekeepingToRemove._id.toString()),{
            method:"delete"
        }).then(r=>r.text()).then(d=> {
            alert("Successfully Deleted Cleaning Task.");

        }).catch(e=>console.log(e));
        //remove from housekeeping list
        const housekeepingAfterRemoved = housekeepingList.splice(index_of_housekeeping,1);
        setHousekeepingList(housekeepingAfterRemoved);
        //redo search
        searchHousekeeping();
    }

    return (<div>
        <h3 style={{color: "#0c5460"}}>Housekeeping Tasks</h3>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0"><div className="row mt-3 mb-3">
                    <div className="col-md-3">
                        <button type="button" onClick={()=>{window.location.href="/maintainer/housekeeping/add"}} className="btn btn-success"><i className="fas fa-plus-circle"></i>Add Cleaning
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
                                        <label>Housekeeper</label>
                                        <input type="text" className="form-control" onChange={()=>searchall()} id={"assignedTo"} placeholder="Housekeeper"/>
                                    </div>
                                    <div className="col-md-2" >
                                        <label>Status</label>
                                        <select className="form-control" onChange={()=>searchall()} id={"status"}>
                                            <option>any</option>
                                            <option>Dirty</option>
                                            <option>Cleaning</option>
                                            <option>Clean</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label>Priority</label>
                                        <select className="form-control" onChange={()=>searchall()} id={"priority"}>
                                            <option>any</option>
                                            <option>High</option>
                                            <option>Normal</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <div className={"mb-4"}></div>
                                        <button type="button" onClick={()=> searchHousekeeping()} name="search" className="btn btn-primary">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col" style={{width:"80px"}}>Room No</th>
                                <th scope="col">Status</th>
                                <th scope="col">Task Date</th>
                                <th scope="col">Assigned to</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {housekeeping.map((clean,index) => {
                                return <tr>
                                    <td>{clean.roomNo}</td>
                                    <td><h5><span className={clean.status==="Clean"?"badge badge-pill bg-success":(clean.status==="Cleaning"?"badge badge-pill bg-primary":"badge badge-pill bg-danger")}>{clean.status}</span></h5></td>
                                    <td>{clean.date}</td>
                                    <td>{clean.assignedTo}</td>
                                    <td>{clean.priority}</td>
                                    <td>
                                        <button name="edit" onClick={()=>{window.location.href="/maintainer/housekeeping/edit/"+housekeeping[index]._id.toString()}} className="btn btn-info px-3">
                                            <center><i className="fa fa-edit"></i></center>
                                        </button>
                                        <button name="" className="btn btn-danger px-3" onClick={()=>removeHousekeepingTask(index)}>
                                            <center><i className="fa fa-trash"></i></center>
                                        </button>
                                    </td>
                                </tr>
                            },)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        <div
            style={{
                position: "absolute",
                left: "-1000px",
                top: 0,
            }}
        >
            <PDFExport paperSize="A4" margin="1cm" fileName="HousekeepingTasksReport" ref={pdfExportComponent}>
                <div>
                    <div className={"text-right"}>
                        <img src={logo1} style={{width:"120px"}}/>
                    </div>
                    <center>
                        <h5>Housekeeping Tasks Report</h5>
                    </center>
                    <br/><br/>
                    <p style={{fontSize:"12px",color:"black"}}>Date: {new Date().toLocaleDateString(['ban', 'id'])}<br/><br/>
                    Signature of supervisor: _____________________
                    </p>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr style={{fontSize:"12px"}}>
                            <th scope="col">Room No</th>
                            <th scope="col">Status</th>
                            <th scope="col">Task Date</th>
                            <th scope="col">Assigned to</th>
                            <th scope="col">Priority</th>
                        </tr>
                        </thead>
                        <tbody>

                        {housekeeping.map((clean,index) => {
                            return <tr style={{fontSize:"11px"}}>
                                <td>{clean.roomNo}</td>
                                <td>{clean.status}</td>
                                <td>{clean.date}</td>
                                <td>{clean.assignedTo}</td>
                                <td>{clean.priority}</td>
                            </tr>
                        },)}

                        </tbody>
                    </table>
                </div>
            </PDFExport>
        </div>
    </div>)
}
