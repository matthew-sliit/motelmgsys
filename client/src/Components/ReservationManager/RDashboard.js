import React, {useEffect, useRef, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
import {PDFExport,savePDF} from "@progress/kendo-react-pdf";
export default function RDashboard(){

    let [reservation, setreservation] = useState([]);
    let [reservationList, setList] = useState([]);
    let pdfExportComponent = useRef(null);



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


    async function removeReservation(index_of_reservation) {
        const reservationToRemove = reservation[index_of_reservation];
        //remove from db
        await fetch(getProxy("/reservation/"+reservationToRemove._id.toString()),{
            method:"delete"
        }).then(r=>r.text()).then(d=> {
            alert("Successfully Deleted Reservation.");

        }).catch(e=>console.log(e));
        //remove from housekeeping list
        const reservationAfterRemoved = reservation.splice(index_of_reservation,1);
        setreservation(reservationAfterRemoved);
        location.reload();
        //redo search
        searchReservations();
    }

    async function generateReport(){
        const referredComponent = pdfExportComponent.current;
        console.log(referredComponent['div']);
        savePDF(pdfExportComponent.current, { paperSize:  "A4",fileName: 'Reservation Report', margin:20, scale:0.8, title:"Reservation Report"});
    }

    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Welcome to Reservations</h3>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <button type="button" className="btn btn-info" onClick={() => {
                                if (pdfExportComponent.current) {
                                    pdfExportComponent.current.save();
                                }
                            }}> <i className="far fa-file-alt"></i>Generate Report</button>
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
                        <div ref={pdfExportComponent}>
                            <h4>Reservation report</h4>
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col" style={{width:"50px"}}>Room No.</th>
                                <th scope="col" style={{width:"100px"}}>Name</th>
                                <th scope="col" style={{width:"100px"}}>Email</th>
                                <th scope="col" style={{width:"100px"}}>Checkin Date</th>
                                <th scope="col" style={{width:"100px"}}>Checkout Date</th>
                                <th scope="col" style={{width:"100px"}}>Room Count</th>
                                <th scope="col" style={{width:"100px"}}>Payment</th>
                                <th scope="col" style={{width:"100px"}}>Type</th>
                                <th scope="col" style={{width:"100px"}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {reservation.map((reserve,index)=>{
                                return <tr>
                                    <td >{reserve.roomNo}</td>
                                    <td >{reserve.name}</td>
                                    <td >{reserve.email}</td>
                                    <td >{reserve.checkInDate}</td>
                                    <td >{reserve.checkOutDate}</td>
                                    <td >{reserve.roomCount}</td>
                                    <td >{reserve.payment}</td>
                                    <td >{reserve.type}</td>
                                    <td colSpan="2">
                                        <button name="edit" className="btn btn-info " onClick={()=>{window.location.href="/reserve/edit/"+reservation[index]._id.toString()}}>
                                            <center><i className="fa fa-edit"></i></center>
                                        </button>
                                        <button name="" className="btn btn-danger " onClick={()=>removeReservation(index)}>
                                            <center><i className="fa fa-trash"></i></center>
                                        </button>
                                    </td>
                                </tr>
                            })}


                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            left: "-1000px",
                            top: 0,
                        }}
                    >
                        <PDFExport paperSize="A4" margin="0.3cm" scale={0.8} fileName="HousekeepingTasksReport" ref={pdfExportComponent}>
                            <div>
                                <center>
                                    <h5>Reservation Report</h5>
                                </center>
                                Date: {new Date().toDateString()}

                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" style={{width:"50px"}}>Room <br/>No.</th>
                                        <th scope="col" style={{width:"90px"}}>Name</th>
                                        <th scope="col" style={{width:"200px"}}>Email</th>
                                        <th scope="col" style={{width:"80px"}}>Checkin<br/> Date</th>
                                        <th scope="col" style={{width:"80px"}}>Checkout<br/> Date</th>
                                        <th scope="col" style={{width:"60px"}}>Room<br/> Count</th>
                                        <th scope="col" style={{width:"75px"}}>Payment</th>
                                        <th scope="col" style={{width:"50px"}}>Type</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {reservation.map((reserve,index)=>{
                                        return <tr>
                                            <td >{reserve.roomNo}</td>
                                            <td >{reserve.name}</td>
                                            <td >{reserve.email}</td>
                                            <td >{reserve.checkInDate}</td>
                                            <td >{reserve.checkOutDate}</td>
                                            <td >{reserve.roomCount}</td>
                                            <td >{reserve.payment}</td>
                                            <td >{reserve.type}</td>

                                        </tr>
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </PDFExport>
                    </div>
                </div>

            </section>
        </div>
    </div>
}