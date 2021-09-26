import React, {useEffect, useRef, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import logo3 from '../../assets/images/logo.png';
import getProxy from "../../proxyConfig";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import logo from "../../assets/images/logo.png";
export default function BJDashboard(){

    let [burgers, setBurger] = useState([]);
    let [burgerList, setList] = useState([]);
    let pdfExportComponent = useRef(null);



    const searchBurgers = () =>{
        const nameLike = document.getElementById("type").value;
        const burgerListOriginal = [...burgerList];
        let pushed, suggestBurgers = [];
        pushed = false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        burgerListOriginal.map(burgers=>{
            //profile = new Profile();
            console.log(burgers.type);
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && nameLike!=="all" && burgers.type.includes(nameLike)){
                pushed = true;
                suggestBurgers.push(burgers);
            }
        });
        console.log(nameLike);
        if(pushed){
            setBurger(suggestBurgers);

        }else{
            //console.log("setting suggest!");
            setBurger(burgerListOriginal);

        }
    }
    useEffect(async ()=>{
        await fetch(getProxy("/joint"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setBurger(d);setList(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);

    async function removeBurger(index_of_burger) {
        const burgerToRemove = burgers[index_of_burger];
        //remove from db
        await fetch(getProxy("/joint/"+burgerToRemove._id.toString()),{
            method:"delete"
        }).then(r=>r.json()).then(d=>{setList(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
        //remove from burgers list
        const burgersAfterRemoved = burgerList.splice(index_of_burger,1);
        setList(burgersAfterRemoved);
        //redo search
        searchBurgers();
    }
    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Modify the Burgers</h3>
                    <div className="row mt-3 mb-3">

                        <div className="col-md-2">
                            <button type="button" className="btn btn-info" onClick={() => {
                                if (pdfExportComponent.current) {
                                    pdfExportComponent.current.save();
                                }
                            }}><i className="far fa-file-alt" ></i>Generate Report</button>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card w-75">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-3">
                                        <input type="text" className="form-control" style={{width:"200px"}} type={"text"}  placeholder={"all"} onChange={()=>searchBurgers()}  id={"type"}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <div className="col-md-6">
                                        <button type="button" name="search" className="btn btn-primary" onClick={()=>searchBurgers()} >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>

                                <th scope="col">Burger Type</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Ingredients</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>

                            <tbody>

                            {burgers.map((burger,index)=>{
                                return <tr>

                                    <td>{burger.type}</td>
                                    <td>{burger.price}</td>
                                    <td><img src={burger.image} height={"100px"} width={"100px"} alt={"image"}/></td>

                                    <td>
                                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{burger.ingredients}</div>
                                    </td>

                                    <td colSpan="2">
                                        <button name="edit" className="btn btn-info px-3" onClick={()=>{window.location.href="/joint/edit/"+burgers[index]._id.toString()}}>
                                            <center><i className="fa fa-edit"></i></center>
                                        </button>
                                        <button name="" className="btn btn-danger px-3" onClick={()=>removeBurger(index)}>
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
                        <PDFExport paperSize="A4" margin="0.8cm" fileName="Burgers_Menu" ref={pdfExportComponent}>
                            <div>
                                <div className={"text-right"}>
                                    <img src={logo3} style={{width:"120px"}}/>
                                </div>
                                <center>
                                    <h5>Burgers Menu</h5>
                                </center>
                                <br/><br/>
                                <p style={{fontSize:"12px",color:"black"}}>Date: {new Date().toLocaleDateString(['ban', 'id'])}<br/><br/>

                                </p>
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                    <tr>

                                        <th scope="col" style={{fontSize:"12px",color:"white",width:"100px"}}>Burger Type</th>
                                        <th scope="col"style={{fontSize:"12px",color:"white",width:"60px"}}>Price</th>
                                        <th scope="col"style={{width:"60px"}}>Image</th>
                                        <th scope="col"style={{fontSize:"12px",color:"white",width:"150px"}}>Ingredients</th>

                                    </tr>
                                    </thead>

                                    <tbody>

                                    {burgers.map((burger,index)=>{
                                        return <tr>

                                            <td style={{fontSize:"10px",color:"black"}}>{burger.type}</td>
                                            <td style={{fontSize:"10px",color:"black"}}>{burger.price}</td>
                                            <td><img src={burger.image} height={"60px"} width={"60px"} alt={"image"}/></td>

                                            <td>
                                                <div style={{width:"300px",fontSize:"10px", whiteSpace:"pre-wrap"}}>{burger.ingredients}</div>
                                            </td>



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