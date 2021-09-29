import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import 'bootstrap'
import PopupSuccess from "../PopupSuccess";

export default function AddBurger(){
//state
    let [burgers, setBurgers] = useState([]);
    let [popup, togglePopup] = useState(null);

    //post
    const saveBurgerToDb = async ()=>{
        const type = document.getElementById("type").value;
        const price = document.getElementById("price").value;
        const ingredients = document.getElementById("ingredients").value;
        const imageFile = document.getElementById("image").files[0];
        const imageBase64 = await File2base64.getFile2Base64(imageFile);
        console.log(JSON.stringify(imageBase64));

        if(type.length<1){
            document.getElementById("name-error").innerHTML="Type cannot be Empty";
            return null;
        }else
            document.getElementById("name-error").innerHTML="";



        await fetch(getProxy("/joint"), {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"burger":{"type":type,"price":price,"ingredients":ingredients,"image":imageBase64}})


    }).then(r=>r.text()).then(d=> {
            togglePopup(<PopupSuccess body={<span>Successfully Added the Burger!</span>} heading={"Add Burger"} hidePopupFunction={togglePopup}/>)
        }).catch(e=>console.log(e));

        //re render this page
        await getBurgersFromDb();
    }
    //get
    const getBurgersFromDb = async () =>{
        await fetch(getProxy("/joint"),{
            method:'get'
        }).then(r=>r.json()).then(d=>setBurgers(d)).catch(e=>console.log(e));
    }


    //run once
    useEffect(async ()=>{
        await getBurgersFromDb();
    },[])


    //render
    return <div style={{position:"relative"}}>
        {popup}
        <h3 style={{color:"inherit"}}>Add new Burger</h3>
        <div className="form-group mb-2">

            <label>Enter the type of the Burger</label> &nbsp;&nbsp;&nbsp;&nbsp;
            <span id="name-error" style={{color:"red"}}></span>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="CheeseBurger" id={"type"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter the Price</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="price" id={"price"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Ingredients</label>
            <textarea  className="form-control" aria-describedby="emailHelp"
                       placeholder="Ingredients" id={"ingredients"}/>
        </div>
        <div className="form-group mb-2">
            <label>Enter Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} onClick={()=>saveBurgerToDb()} >Save</button>



        <p/>
        <h5 style={{color:"inherit"}}>All Burgers</h5>
        <table className="table table-striped" >
            <thead className="thead-dark"><tr>
                <th style={{width:"100px"}}>Image</th>
                <th style={{width:"100px"}}>Burger Type</th>
                <th style={{width:"100px"}}>Price</th>
                <th style={{width:"100px"}}>Ingredients</th>
            </tr></thead>
            <tbody>
            {burgers.map(burger => {
                return <tr>
                    <td><img src={burger.image} height={"100px"} width={"100px"} alt={"image"}/></td>
                    <td>{burger.type}</td>
                    <td>{burger.price}</td>
                    <td>
                        <div style={{width:"300px", whiteSpace:"pre-wrap"}}>{burger.ingredients}</div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>


    </div>
}
