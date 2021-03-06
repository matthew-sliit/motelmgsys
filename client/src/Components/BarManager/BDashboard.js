import React, {useEffect, useRef, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
import logo3 from '../../assets/images/logo.png';
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
export default function BDashboard(){

    let [drinks, setSuggestedDrinks] = useState([]);
    let [drinkList, setList] = useState([]);
    let pdfExportComponent = useRef(null);

    const searchDrinks = () =>{
        const nameLike = document.getElementById("name").value;
        const drinkListOriginal = [...drinkList];
        let pushed, suggestDrinks = [];
        pushed = false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        drinkListOriginal.map(drinks=>{
            if(nameLike.length>0 && nameLike!=="all" && drinks.name.includes(nameLike)){
                pushed = true;
                suggestDrinks.push(drinks);
            }
        });
        console.log(nameLike);
        if(pushed){
            setSuggestedDrinks(suggestDrinks);
        }else{
            //console.log("setting suggest!");
            setSuggestedDrinks(drinkListOriginal);

        }
    }
    //on mount
    useEffect(async ()=>{
        await fetch(getProxy("/bar"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setSuggestedDrinks(d);setList(d);}).catch(e=>console.log(e));
    },[]);

    async function removeDrink(index_of_drink) {
        const drinkToRemove = drinks[index_of_drink];
        //remove from db
        await fetch(getProxy("/bar/"+drinkToRemove._id.toString()),{
            method:"delete"
        }).then(r=>r.text()).then(d=> {
            alert("Successfully Deleted the Drink Details.");

        }).catch(e=>console.log(e));
        //remove from drinks list
        const drinksAfterRemoved = drinkList.splice(index_of_drink,1);
        setList(drinksAfterRemoved);
        //redo search
        searchDrinks();
    }
    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">
                    <h3 style={{color: "#0c5460"}}>Modify the Drinks</h3>
                    <div className="row mt-3 mb-3">

                        <div className="col-md-2">
                            <button type="button" className="btn btn-info" onClick={() => {
                                if (pdfExportComponent.current) {
                                    pdfExportComponent.current.save();
                                }
                            }} ><i className="far fa-file-alt"></i>Generate Report</button>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card w-75">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-3">
                                        <input type="text" className="form-control" style={{width:"200px"}} type={"text"}  placeholder={"all"} onChange={()=>searchDrinks()}  id={"name"}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <div className="col-md-2">
                                        <button type="button" name="search" className="btn btn-primary" onClick={()=>searchDrinks()}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                            <tr>

                                <th scope="col">Drink Name</th>
                                <th scope="col">Alcohol Percentage</th>
                                <th scope="col">Image</th>

                                <th scope="col">Ingredients</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {drinks.map((drink,index)=>{
                                return <tr>

                                    <td>{drink.name}</td>
                                    <td>{drink.percentage}</td>
                                    <td><img src={drink.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                                    <td>
                                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{drink.description}</div>
                                    </td>

                                    <td colSpan="2">
                                        <button name="edit" className="btn btn-info px-3" onClick={()=>{window.location.href="/bar/edit/"+drinks[index]._id.toString()}}>
                                            <center><i className="fa fa-edit"></i></center>
                                        </button>
                                        <button name="" className="btn btn-danger px-3" onClick={()=>removeDrink(index)}>
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
        <div
            style={{
                position: "absolute",
                left: "-1000px",
                top: 0,
            }}
        >
            <PDFExport paperSize="A3" margin="0.8cm" fileName="Drinks_Menu" ref={pdfExportComponent}>
                <div>
                    <div className={"text-right"}>
                        <img src={logo3} style={{width:"120px"}}/>
                    </div>
                    <center>
                        <h5>Drinks Menu</h5>
                    </center>
                    <br/><br/>
                    <p style={{fontSize:"12px",color:"black"}}>Date: {new Date().toLocaleDateString(['ban', 'id'])}<br/><br/>

                    </p>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>

                            <th scope="col"  style={{fontSize:"12px",color:"white",width:"150px"}}>Drink Name</th>
                            <th scope="col" style={{fontSize:"12px",color:"white", width:"150px"}}>Alcohol <br/> Percentage</th>
                            <th scope="col" style={{width:"120px"}}>Image</th>

                            <th scope="col" style={{fontSize:"12px",color:"white"}}>Ingredients</th>

                        </tr>
                        </thead>
                        <tbody>

                        {drinks.map((drink,index)=>{
                            return <tr>

                                <td style={{fontSize:"10px",color:"black"}}>{drink.name}</td>
                                <td style={{fontSize:"10px",color:"black"}}>{drink.percentage}</td>
                                <td><img src={drink.image} height={"60px"} width={"60px"} alt={"image"}/></td>
                                <td>
                                    <div style={{width:"300px",fontSize:"10px", whiteSpace:"pre-wrap"}}>{drink.description}</div>
                                </td>


                            </tr>
                        })}


                        </tbody>
                    </table>
                </div>
            </PDFExport>
        </div>

</div>

}