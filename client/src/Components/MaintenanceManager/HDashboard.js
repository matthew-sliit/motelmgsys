import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function HDashboard() {
    let [housekeeping, setHousekeeping] = useState([]);

    const searchHousekeeping = () =>{
        const nameLike = document.getElementById("email").value;
        const recruitmentsListOriginal = [...housekeeping];
        let pushed, suggestRecruitments = [];
        pushed = false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            console.log(recruitment.email);
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && nameLike!=="all" && recruitment.email.includes(nameLike)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
        });
        console.log(nameLike);
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
                                        <input type="text" className="form-control" id={"roomNo"} placeholder="Room No"/>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" id={"assignedTo"} placeholder="Assigned to"/>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-control" id={"status"}>
                                            <option>Dirty</option>
                                            <option>Cleaning</option>
                                            <option>Clean</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <select className="form-control" id={"priority"}>
                                            <option>High</option>
                                            <option>Normal</option>
                                            <option>Low</option>
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
                                    <td>{clean.status}</td>
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
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
}
