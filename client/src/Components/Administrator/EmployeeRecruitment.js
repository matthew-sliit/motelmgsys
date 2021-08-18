import React, {useEffect, useState} from "react";
import Profile from "../../models/Profile";
export default function EmployeeRecruitment(){
    let [recruitments, setRecruitments] = useState([]);
    let [recruitmentList, setList] = useState([]);
    //component did mount
    useEffect(async ()=>{
        //get records from server database
        await fetch("http://localhost:3001/register/recruitments",{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            setRecruitments(d);
            setList(d);
        });
        //recruitmentList = recruitments;
        //console.log("getting records from db");
    },[]);
    const onClickAcceptRecruitment = async (index) =>{
        //tell server to accept
        const recruitment = recruitments[index];
        await fetch("http://localhost:3001/register/accept/"+recruitment._id,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({nic:recruitment.nic})
        })
        removeRecruitmentFromList(index);
    }
    const onClickRejectRecruitment = async (index) =>{
        //tell server to remove
        const recruitment = recruitments[index];
        await fetch("http://localhost:3001/register/reject/"+recruitment._id,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({nic:recruitment.nic})
        })
        removeRecruitmentFromList(index);
    }
    const removeRecruitmentFromList = (index) =>{
        let temp = [...recruitments];
        temp.splice(index,1);
        setRecruitments(temp);
    }
    const searchRecruitments = () =>{
        const nameLike = document.getElementById("user-fullname").value;
        const reference = document.getElementById("user-reference").value;
        const role = document.getElementById("user-role").value;
        const recruitmentsListOriginal = [...recruitmentList];
        let pushed, suggestRecruitments = [];
        let name= false, referenceno= false, roleSelected=false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            pushed = false;
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && recruitment.fullname.includes(nameLike)){
                name=true;
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
            if(reference.length>0 && recruitment._id===reference){
                referenceno=true;
                if(!pushed){
                    suggestRecruitments.push(recruitment);
                }
                pushed = true;
            }
            if(role!=="any" && recruitment.role===role){
                roleSelected=true;
                //console.log("role selected!");
                if(!pushed){
                    suggestRecruitments.push(recruitment);
                }
                pushed = true;
            }
        });
        if(!name&&!referenceno&&!roleSelected&&suggestRecruitments.length<=0){
            setRecruitments(recruitmentsListOriginal);
        }else{
            //console.log("setting suggest!");
            setRecruitments(suggestRecruitments);
        }
    }
    function formatRecordToRow(profileRecord, index){
        //index starts from 0
        const profile = new Profile();
        if(index>-1){
            Object.assign(profile,profileRecord);
        }
        return <tr>
            <td>{index+1}</td>
            <td>{profile.fullname}</td>
            <td>{profile.nic}</td>
            <td>{profile._id}</td>
            <td>{profile.contact}</td>
            <td>{profile.email}</td>
            <td>{profile.address}</td>
            <td>{profile.role}</td>
            {index>=0?<td>
                <button className={"btn btn-success"} onClick={()=>onClickAcceptRecruitment(index)}>Accept</button>
                <button className={"btn btn-danger mx-1"} onClick={()=>onClickRejectRecruitment(index)}>Reject</button>
            </td>:<td>q</td>}

        </tr>;
    }
    return <div style={{position:"relative"}}>
        <h4 style={{fontfamily:"fontawesome", color:"#566573"}}>Employee Recruitments</h4>
        <p/>
        <div style={{display:"table-cell", padding:"6px", border:"1px solid #7DCEA0"}}>
            <label>Name</label>
            <input type={"text"} className={"mx-1"} id={"user-fullname"}/>
            <label>Reference</label>
            <input type={"text"} className={"mx-1"} id={"user-reference"}/>
            <label className={"mx-1"}>Role</label>
            <select id={"user-role"}>
                <option>any</option>
                {Profile.getUserRoles().map(role => {return <option>{role}</option>})}
            </select>
            <button className={"btn btn-green mx-1"} onClick={()=>searchRecruitments()}>Search</button>
        </div>
        <p/>
        <p/>
        <table style={{position:"relative"}} className={"table"}>
            <thead><tr>
                <th style={{width:"50px"}}>ID</th>
                <th style={{width:"200px"}}>Name</th>
                <th style={{width:"100px"}}>Nic</th>
                <th style={{width:"100px"}}>Reference</th>
                <th style={{width:"200px"}}>Contact Number</th>
                <th style={{width:"200px"}}>Email</th>
                <th style={{width:"250px"}}>Address</th>
                <th style={{width:"150px"}}>Role</th>
                <th style={{width:"200px"}}>Operations</th>
            </tr></thead>
            <tbody>
            {recruitmentList.length<1?<tr key={0}><td colSpan={7} style={{textAlign:"center", fontSize:"20px"}}>No new recruitments</td></tr>:""}
            {recruitments.map((recruitment, index)=>{return formatRecordToRow(recruitment,index)})}
            </tbody>
        </table>
    </div>;
}