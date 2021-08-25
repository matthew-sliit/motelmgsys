import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function BJDashboard(){

    let [burgers, setBurger] = useState([]);
    let [burgerList, setList] = useState([]);


    const searchall = () => {
        const nameLike = document.getElementById("type").value;
        if(nameLike.length < 1){
            setBurger(burgerList);
        }
    }
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

    useEffect(async ()=>{
        await fetch(getProxy("/joint"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setBurger(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);

    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Modify the Burgers</h3>
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
                                        <input type="text" className="form-control" style={{width:"200px"}} type={"text"}  placeholder={"all"} onChange={()=>searchall()}  id={"type"}/>
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

                            {burgers.map(burger=>{
                                return <tr>

                                    <td>{burger.type}</td>
                                    <td>{burger.price}</td>
                                    <td><img src={burger.image} height={"100px"} width={"100px"} alt={"image"}/></td>

                                    <td>
                                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{burger.ingredients}</div>
                                    </td>

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