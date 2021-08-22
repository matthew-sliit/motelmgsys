import React, {useEffect, useState} from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import getProxy from "../../proxyConfig";
export default function BDashboard(){

    let [drinks, setDrink] = useState([]);
    let [drinkList, setList] = useState([]);


    const searchall = () => {
        const nameLike = document.getElementById("name").value;
        if(nameLike.length < 1){
            setDrink(drinkList);
        }
    }
    const searchDrinks = () =>{
        const nameLike = document.getElementById("name").value;
        const drinkListOriginal = [...drinkList];
        let pushed, suggestDrinks = [];
        pushed = false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        drinkListOriginal.map(drinks=>{
            //profile = new Profile();
            console.log(drinks.name);
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && nameLike!=="all" && drinks.name.includes(nameLike)){
                pushed = true;
                suggestDrinks.push(drinks);
            }
        });
        console.log(nameLike);
        if(pushed){
            setDrink(suggestDrinks);

        }else{
            //console.log("setting suggest!");
            setDrink(drinkListOriginal);

        }
    }
    useEffect(async ()=>{
        await fetch(getProxy("/bar"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setDrink(d);setList(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);

    useEffect(async ()=>{
        await fetch(getProxy("/bar"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setDrink(d);console.log(JSON.stringify(d));}).catch(e=>console.log(e));
    },[]);

    return <div>
        <div id="colorlib-main">
            <section className="ftco-section pt-4 mb-5 ftco-intro">
                <div className="container-fluid px-3 px-md-0">



                    <h3 style={{color: "#0c5460"}}>Modify the Drinks</h3>
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
                                        <input type="text" className="form-control" type={"text"}  placeholder={"all"} onChange={()=>searchall()}  id={"name"}/>
                                    </div>

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
                                <th scope="col">Drink ID</th>
                                <th scope="col">Drink Name</th>
                                <th scope="col">Alcohol Percentage</th>

                                <th scope="col">Ingredients</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {drinks.map(drink=>{
                                return <tr>
                                    <th scope="row">1</th>
                                    <td>{drink.name}</td>
                                    <td>{drink.percentage}</td>
                                    <td >{drink.description}</td>

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