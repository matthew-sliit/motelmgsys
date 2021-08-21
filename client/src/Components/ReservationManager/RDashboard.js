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


    const searchReservations = () =>{
        const nameLike = document.getElementById("email").value;
        const recruitmentsListOriginal = [...reservation];
        let pushed, suggestRecruitments = [];
        let name= false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            pushed = false;
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && recruitment.name.includes(nameLike)){
                name=true;
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
        });
        if(!name.length<=0){
            setreservation(recruitmentsListOriginal);
        }else{
            //console.log("setting suggest!");
            setreservation(suggestRecruitments);
        }
    }

    useEffect(async ()=>{
        await fetch(getProxy("/reservation"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setreservation(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);

    useEffect(async ()=>{
        //get records from server database
        await fetch(getProxy("/reservation"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            setList(d);
        });
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
                                        <input type={"text"} className={"mx-1"} id={"email"}/>
                                    </div>

                                    <div className="col-md-2">
                                        <button type="button" name="search" className="btn btn-primary"  onClick={()=>searchReservations()}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Checkin Date</th>
                                <th scope="col">Checkout Date</th>
                                <th scope="col">Room Count</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Type</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {reservation.map(reserve=>{
                                return <tr>
                                    <td>{reserve.name}</td>
                                    <td>{reserve.email}</td>
                                    <td>{reserve.checkInDate}</td>
                                    <td>{reserve.checkOutDate}</td>
                                    <td>{reserve.roomCount}</td>
                                    <td>{reserve.payment}</td>
                                    <td>{reserve.type}</td>
                                    <td colSpan="2">
                                        <button name="edit" className="btn btn-info px-3">
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