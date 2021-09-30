import React, {useEffect, useState} from "react";
import getProxy from "../../proxyConfig";
import File2base64 from "../../assets/js/file2base64";
import PopupSuccess from "../PopupSuccess";
export default function EditBurger() {
    let [burgerId, setBurgerId] = useState(null);
    //on mount
    useEffect(() => {
        let path = window.location.pathname.split("/");
        if (path.length > 3) {
            //has burger id
            setBurgerId(path[3]);
            setBurgerForEdit(path[3]);
        }
        console.log(path);
    }, [])

    //get burger using id
    async function setBurgerForEdit(index) {
        await fetch(getProxy("/joint/" + index), {
            method: "get"
        }).then(r => r.json()).then(d => {
            const burger = d;
            document.getElementById('type').value = burger.type;
            document.getElementById('price').value = burger.price;
            document.getElementById('ingredients').value = burger.ingredients;
            //document.getElementById('image').value = "";
        }).catch(e => console.log(e));
    }

    //save burger
    const saveBurgerToDb = async () => {
        const type = document.getElementById("type").value;
        const price = document.getElementById("price").value;
        const ingredients = document.getElementById("ingredients").value;
        const imageFile = document.getElementById("image").files[0];
        let imageBase64 = "ignore";//default, otherwise image will be updated with nothing
        if (typeof imageFile !== "undefined") {
            imageBase64 = await File2base64.getFile2Base64(imageFile);
        }
        //will return success
        await fetch(getProxy("/joint/" + burgerId), {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "burger": {
                    "type": type,
                    "price": price,
                    "ingredients": ingredients,
                    "image": imageBase64
                }
            })
        }) .then(r=>r.text()).then(d=> {
            alert("Successfully Updated Burger Details.");
        }).catch(e => console.log(e));
        //re render this page?
    }

    return <div style={{position:"relative"}}>
        <h3 style={{color:"inherit"}}>Update Burgers</h3>
        <div className="form-group mb-2">
            <label>Enter the type of the Burger</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                   placeholder="CheeseBurger" id={"type"}/>
        </div>
        <div className="form-group mb-2" >
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
            <label>Enter New Image</label>
            <input type="file" className="form-control" aria-describedby="emailHelp" id={"image"}/>
        </div>
        <button className={"btn btn-green"} onClick={() => saveBurgerToDb()}>Save</button>
        <p/>
    </div>



}