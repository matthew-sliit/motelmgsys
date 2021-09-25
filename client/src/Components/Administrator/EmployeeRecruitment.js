import React, {createElement, useEffect, useRef, useState} from "react";
import Profile from "../../models/Profile";
import getProxy from "../../proxyConfig";
import ReportGenerationV1 from "../../assets/js/report-generation-v1";
export default function EmployeeRecruitment(){
    let [recruitments, setRecruitments] = useState([]);
    let [recruitmentList, setList] = useState([]);
    let pdfExportComponent = useRef(null);
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    //component did mount
    useEffect(async ()=>{
        //get records from server database
        await fetch(getProxy("/register/recruitments"),{
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
        await fetch(getProxy("/register/accept/")+recruitment._id,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({nic:recruitment.nic})
        })
        removeRecruitmentFromList(index);
    }
    const onClickRejectRecruitment = async (index) =>{
        //tell server to remove
        const recruitment = recruitments[index];
        await fetch(getProxy("/register/reject/")+recruitment._id,{
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
    function formatRecordToRow(profileRecord, index, withBtn){
        //index starts from 0
        const profile = new Profile();
        if(index>-1){
            Object.assign(profile,profileRecord);
        }
        return <tr>
            <td><div style={{width:"10px"}}>{index+1}</div></td>
            <td><div style={{width:"100px", whiteSpace:"pre-wrap"}}>{profile.fullname}</div></td>
            <td><div style={{width:"90px", whiteSpace:"pre-wrap"}}>{profile.nic}</div></td>
            <td><div style={{width:"180px", whiteSpace:"pre-wrap"}}>{profile._id}</div></td>
            <td><div style={{width:"150px", whiteSpace:"pre-wrap"}}>{profile.contact}</div></td>
            <td><div style={{width:"120px", whiteSpace:"pre-wrap"}}>{profile.email}</div></td>
            <td><div style={{width:"200px", whiteSpace:"pre-wrap"}}>{profile.address}</div></td>
            <td><div style={{width:"100px", whiteSpace:"pre-wrap"}}>{profile.role}</div></td>
            {index>=0&&withBtn?<td>
                <div style={{width:"170px"}}>
                <button className={"btn btn-green"} onClick={()=>onClickAcceptRecruitment(index)}>Accept</button>
                <button className={"btn btn-danger mx-1"} onClick={()=>onClickRejectRecruitment(index)}>Reject</button>
                </div>
            </td>:<td>{""}</td>}

        </tr>;
    }

    async function generateReport(){
        //savePDF(pdfExportComponent.current, { paperSize:  "A4",fileName: 'Employee Recruitment Report', scale:0.5, title:"Employee Recruitment Report", margin: 6});
        let tableHeaders = [['ID','Name','Nic','Contact No','Email','Address','Role']]
        let tableBody = [];
        let tableRow = [];
        recruitments.map((recruitment, index)=>{
            tableRow = [];
            tableRow.push(index+1);
            tableRow.push(recruitment.fullname);
            tableRow.push(recruitment.nic);
            tableRow.push(recruitment.contact);
            tableRow.push(recruitment.email);
            tableRow.push(recruitment.address);
            tableRow.push(recruitment.role);
            tableBody.push(tableRow);
        })
        ReportGenerationV1({header:"Employee Recruitment Report",tableHeaders:tableHeaders,tableBody:tableBody,fileName:"employee recruitments report"})
    }
    return <div style={{position:"relative"}}>
        <h4 style={{fontfamily:"fontawesome", color:"#566573", position:"relative", top:"-50px"}}>Approval of Recruitments</h4>
        <p/>
        <div style={{display:"table-cell", padding:"6px", border:"1px solid #7DCEA0"}}>
            <label>Name</label>
            <input type={"text"} className={"mx-1"} id={"user-fullname"} placeholder={"John A.K."} onChange={()=>searchRecruitments()}/>
            <label>Reference</label>
            <input type={"text"} className={"mx-1"} id={"user-reference"} placeholder={"192830210293"} onChange={()=>searchRecruitments()}/>
            <label className={"mx-1"}>Role</label>
            <select id={"user-role"} onChange={()=>searchRecruitments()}>
                <option>any</option>
                {Profile.getUserRoles().map(role => {return <option>{role}</option>})}
            </select>
            <button className={"btn btn-green mx-1"} onClick={()=>searchRecruitments()} style={{display:"none"}}>Search</button>
        </div>
        <div style={{display:"table-cell", paddingLeft:"10px"}}>
            <button className={"btn btn-blue"} onClick={()=>generateReport()}>Generate Report</button>
        </div>
        <p/>
        <p/>
        <div ref={pdfExportComponent} id={"abc"}>
            <h4 style={{fontfamily:"fontawesome", color:"#566573", textAlign:"center", width:"inherit", position:"relative"}}>Employee Recruitments</h4>
            <table style={{position:"relative"}} className={"table"}>
            <thead><tr>
                <th style={{width:"50px"}}>ID</th>
                <th style={{width:"120px"}}>Name</th>
                <th style={{width:"100px"}}>Nic</th>
                <th style={{width:"200px", marginRight:"10px"}}>Reference</th>
                <th style={{width:"200px"}}>Contact Number</th>
                <th style={{width:"200px"}}>Email</th>
                <th style={{width:"180px"}}>Address</th>
                <th style={{width:"150px"}}>Role</th>
                <th style={{width:"200px"}}>Operations</th>
            </tr></thead>
            <tbody>
            {recruitmentList.length<1?<tr key={0}><td colSpan={7} style={{textAlign:"center", fontSize:"20px"}}>No new recruitments</td></tr>:""}
            {recruitments.map((recruitment, index)=>{return formatRecordToRow(recruitment,index,true)})}
            </tbody>
        </table>
        </div>
    </div>;
}