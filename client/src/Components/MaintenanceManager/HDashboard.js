import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import "bootstrap"
import getProxy from "../../proxyConfig";
export default function HDashboard() {
    let [housekeeping, setHousekeeping] = useState([]);
    let [housekeepingList, setHousekeepingList] = useState([]);

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

    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">
                    <h3 style={{color: "#0c5460"}}>Housekeeping Tasks</h3>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-3">
                            <button type="button" onClick={()=>{window.location.href="/maintainer/housekeeping/add"}} className="btn btn-success"><i className="fas fa-plus-circle"></i>Add Cleaning
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
                                <th scope="col">Room No</th>
                                <th scope="col">Status</th>
                                <th scope="col">Task Date</th>
                                <th scope="col">Assigned to</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {housekeeping.map(clean => {
                                return <tr>
                                    <td>{clean.roomNo}</td>
                                    <td><h5><span className={clean.status==="Clean"?"badge badge-pill bg-success":(clean.status==="Cleaning"?"badge badge-pill bg-primary":"badge badge-pill bg-danger")}>{clean.status}</span></h5></td>
                                    <td>{clean.date}</td>
                                    <td>{clean.assignedTo}</td>
                                    <td>{clean.priority}</td>
                                    <td>
                                        <button name="edit" onClick={()=>{window.location.href="/maintainer/housekeeping/edit"}} className="btn btn-info px-3">
                                            <center><i className="fa fa-edit"></i></center>
                                        </button>
                                        <button name="" className="btn btn-danger px-3">
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
    </div>
}
