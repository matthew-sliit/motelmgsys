import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function RDashboard(){

    let [reservation, setreservation] = useState([]);
    let [reservationList, setList] = useState([]);


    const searchall = () => {
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        if(email.length < 1){
            setreservation(reservationList);
        }
        else if(name.length < 1){
            setreservation(reservationList);
        }
    }
    const searchReservations = () =>{
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const recruitmentsListOriginal = [...reservationList];
        let pushed, suggestRecruitments = [];
        pushed = false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            console.log(recruitment.email);
            //Object.assign(profile,recruitment);
            if(email.length>0 && email!=="all" && recruitment.email.includes(email)){
                pushed = true;
                suggestRecruitments.push(recruitment);
            }else if
               (name.length>0 && name!=="all" && recruitment.name.includes(name)){
                    pushed = true;
                    suggestRecruitments.push(recruitment);
                }


        });
        console.log(email);
        if(pushed){
            setreservation(suggestRecruitments);

        }else{
            //console.log("setting suggest!");
            setreservation(recruitmentsListOriginal);

        }
    }

    useEffect(async ()=>{
        await fetch(getProxy("/reservation"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setreservation(d);setList(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);


    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Welcome to Reservations</h3>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <button type="button" className="btn btn-info" ><i className="far fa-file-alt"></i>Generate Report</button>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card w-75">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Email</label>
                                        <input type={"text"}  placeholder={"email"} onChange={()=>searchall()} className={"form-control"} id={"email"}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label>Name</label>
                                        <input type={"text"} className="form-control" onChange={()=>searchall()} id={"name"} placeholder="name"/>
                                    </div>
                                    <div className="col-md-3">
                                        <div className={"mb-4"}></div>
                                        <button type="button" name="search"  className="btn btn-primary"  onClick={()=>searchReservations()}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Room No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</th>
                                <th scope="col">Checkin Date</th>
                                <th scope="col">Checkout Date</th>
                                <th scope="col">Room Count</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Type</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {reservation.map((reserve,index)=>{
                                return <tr>
                                    <td>{reserve.roomNo}</td>
                                    <td>{reserve.name}</td>
                                    <td>{reserve.email}</td>
                                    <td>{reserve.checkInDate}</td>
                                    <td>{reserve.checkOutDate}</td>
                                    <td>{reserve.roomCount}</td>
                                    <td>{reserve.payment}</td>
                                    <td>{reserve.type}</td>
                                    <td colSpan="2">
                                        <button name="edit" className="btn btn-info px-3" onClick={()=>{window.location.href="/reserve/edit/"+reservation[index]._id.toString()}}>
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