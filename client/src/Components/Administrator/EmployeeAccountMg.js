import React, {useEffect, useRef, useState} from "react";
import Profile from "../../models/Profile";
import AccountPasswordResetPopup from "./AccountPasswordResetPopup";
import getProxy from "../../proxyConfig";
import {savePDF} from "@progress/kendo-react-pdf";
import ReportGenerationV1 from "../../assets/js/report-generation-v1";

export default function EmployeeAccountMg(){
    let [profiles, setProfiles] = useState([]);
    let [profileList, setList] = useState([]);
    let [roles, setRoles] = useState([]);
    let [newPassword, setNewPassword] = useState(null);
    let [errorMsg, setErrorMsg] = useState(null);
    let [popup, togglePopup] = useState(false);
    let pdfExportComponent = useRef(null);
    //component did mount
    useEffect(async ()=>{
        //get records from server database
        await fetchUserProfilesFromServer();
        await fetchUserRoles();
    },[]);
    const onClickSetUserBanStatus = async (index, status) =>{
        //tell server to accept
        const profile = profiles[index];
        await fetch(getProxy( "/management/user-ban-status/")+profile._id,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({status:status})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        await fetchUserProfilesFromServer();
    }
    const fetchUserProfilesFromServer = async () =>{
        await fetch(getProxy("/management/profiles"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            setProfiles(d);
            setList(d);
            console.log(JSON.stringify(d));
        });
    }
    const fetchUserRoles = async () =>{
        await fetch(getProxy("/register/roles"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            setRoles(d);
            console.log(JSON.stringify(d));
        });
    }
    const onClickResetUserPassword = async (index) =>{
        //tell server to reset profile password
        const profile = profiles[index];
        await fetch(getProxy("/login/reset/"),{
            method:"post",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({nic:profile.nic, email:profile.email})
        }).then(r=>r.text()).then(d => {
            if(d.length>8){
                const server_response = d.split(":");
                if(server_response[0]==="success"){
                    //setNewPassword("For "+profile.nic +" is " +server_response[1]);
                    togglePopup(<AccountPasswordResetPopup profileData={profile} newPassword={server_response[1]} hidePopupFunction={hidePopup}/>);
                    setErrorMsg(null);
                }else if(server_response[0]==="error"){
                    togglePopup(false);
                    setErrorMsg(server_response[1]);
                    //setNewPassword(null);
                }
                console.log("newPassword: "+server_response[1]);
            }
        }).catch(e=>console.log(e));
    }
    function hidePopup(){
        togglePopup(false);
    }
    const searchProfiles = () =>{
        const nameLike = document.getElementById("user-fullname").value.toLowerCase();
        const reference = document.getElementById("user-reference").value;
        const role = document.getElementById("user-role").value;
        const recruitmentsListOriginal = [...profileList];
        let pushed, suggestRecruitments = [];
        let name= false, referenceno= false, roleSelected=false;
        //console.log("n: "+nameLike+" r:"+reference+" r:"+role);
        recruitmentsListOriginal.map(recruitment=>{
            //profile = new Profile();
            pushed = false;
            //Object.assign(profile,recruitment);
            if(nameLike.length>0 && recruitment.fullname.toLowerCase().includes(nameLike)){
                name=true;
                pushed = true;
                suggestRecruitments.push(recruitment);
            }
            if(reference.length>0 && recruitment.nic.includes(reference)){
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
            }else if(role==="any"){

            }else{
                roleSelected = true;
            }
        });
        if(!name&&!referenceno&&!roleSelected&&suggestRecruitments.length<=0){
            setProfiles(recruitmentsListOriginal);
        }else{
            //console.log("setting suggest!");
            setProfiles(suggestRecruitments);
        }
    }
    function formatRecordToRow(profileRecord, index){
        //index starts from 0
        const profile = new Profile();
        let buttons = [];
        if(index>-1){
            Object.assign(profile,profileRecord);
        }
        if(profileRecord.status!==undefined){
            if(profileRecord.status==="ban"){
                buttons.push(<button className={"btn btn-blue"} style={{width:"68px", textAlign:"center", padding:"10px"}} onClick={()=>onClickSetUserBanStatus(index,'unban')}>UnBan</button>);
            }else{
                buttons.push(<button className={"btn btn-danger"} onClick={()=>onClickSetUserBanStatus(index,'ban')}>Ban</button>);
            }
        }else{
            buttons.push(<button className={"btn btn-danger"} onClick={()=>onClickSetUserBanStatus(index,'ban')}>Ban</button>);
        }
        buttons.push(<button className={"btn btn-warning mx-1"} onClick={()=>onClickResetUserPassword(index)}>Password Reset</button>);
        return <tr>
            <td><div style={{width:"10px"}}>{index+1}</div></td>
            <td><div style={{width:"180px", whiteSpace:"pre-wrap"}}>{profile.fullname}</div></td>
            <td><div style={{width:"100px", whiteSpace:"pre-wrap"}}>{profile.nic}</div></td>
            <td><div style={{width:"150px", whiteSpace:"pre-wrap", textAlign:"center"}}>{profile.contact}</div></td>
            <td><div style={{width:"180px", whiteSpace:"pre-wrap"}}>{profile.email}</div></td>
            <td><div style={{width:"200px", whiteSpace:"pre-wrap"}}>{profile.address}</div></td>
            <td><div style={{width:"130px", whiteSpace:"pre-wrap", textAlign:"center"}}>{profile.role}</div></td>
            {index>=0?<td>
                <div style={{width:"210px"}}>{buttons}</div>
            </td>:<td>q</td>}

        </tr>;
    }
    async function generateReport(){
        //savePDF(pdfExportComponent.current, { paperSize:  "A4",fileName: 'Employee Report', scale:0.6, title:"Employee Report"});
        let tableHeaders = [['ID','Name','Nic','Contact No','Email','Address','Role']]
        let tableBody = [];
        let tableRow = [];
        profiles.map((profile, index)=>{
            tableRow = [];
            tableRow.push(index+1);
            tableRow.push(profile.fullname);
            tableRow.push(profile.nic);
            tableRow.push(profile.contact);
            tableRow.push(profile.email);
            tableRow.push(profile.address);
            tableRow.push(profile.role);
            tableBody.push(tableRow);
        })
        ReportGenerationV1({header:"Employee Profiles Report",tableHeaders:tableHeaders,tableBody:tableBody,fileName:"employee profiles report"})
    }
    return <div style={{position:"relative"}}>
        {popup!==false?popup:""}
        <h4 style={{fontfamily:"fontawesome", color:"#566573", position:"relative", top:"-50px"}}>User Account Control</h4>
        <p/>
        <div style={{display:"table-cell", padding:"6px", border:"1px solid #7DCEA0"}}>
            <label>Name</label>
            <input type={"text"} className={"mx-1"} id={"user-fullname"} placeholder={"John"} onChange={()=>searchProfiles()}/>
            <label>Nic</label>
            <input type={"text"} className={"mx-1"} id={"user-reference"} placeholder={"200025310120"} onChange={()=>searchProfiles()}/>
            <label className={"mx-1"}>Role</label>
            <select id={"user-role"} onChange={()=>searchProfiles()}>
                <option>any</option>
                {roles.map(role => {return <option>{role}</option>})}
            </select>
            <button className={"btn btn-green mx-1"} onClick={()=>searchProfiles()} style={{display:"none"}}>Search</button>
        </div>
        <div style={{display:"table-cell", paddingLeft:"10px"}}>
            <button className={"btn btn-blue"} onClick={()=>generateReport()}>Generate Report</button>
        </div>
        <p/>
        <span style={{color:"green"}}>{newPassword!==null?"New Password "+newPassword:""}</span>
        <span style={{color:"red"}}>{errorMsg!==null?errorMsg:""}</span>
        <p/>
        <div ref={pdfExportComponent}>
            <table style={{position:"relative", maxWidth:"100px"}} className={"table"}>
            <thead><tr style={{textAlign:"center"}}>
                <th scope="col" style={{width:"50px"}}>ID</th>
                <th scope="col" style={{width:"120px"}}>Name</th>
                <th scope="col" style={{width:"100px"}}>Nic</th>
                <th scope="col" style={{width:"180px"}}>Contact Number</th>
                <th scope="col" style={{width:"200px"}}>Email</th>
                <th scope="col" style={{width:"200px"}}>Address</th>
                <th scope="col" style={{width:"150px", marginLeft:"100px"}}>Role</th>
                <th scope="col" style={{width:"200px", left:"100px"}}>Operations</th>
            </tr></thead>
            <tbody>
            {profileList.length<1?<tr key={0}><td colSpan={7} style={{textAlign:"center", fontSize:"20px"}}>No profiles, This is impossible, please contact network administrator</td></tr>:""}
            {profiles.map((profile, index)=>{return formatRecordToRow(profile,index)})}
            </tbody>
        </table>
        </div>
    </div>;
}