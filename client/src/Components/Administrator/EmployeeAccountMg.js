import React, {useEffect, useState} from "react";
import Profile from "../../models/Profile";
//forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function EmployeeAccountMg(){
    let [profiles, setProfiles] = useState([]);
    let [profileList, setList] = useState([]);
    let [newPassword, setNewPassword] = useState(null);
    let [errorMsg, setErrorMsg] = useState(null);
    //component did mount
    useEffect(async ()=>{
        //get records from server database
        await fetchUserProfilesFromServer();
    },[]);
    const onClickSetUserBanStatus = async (index, status) =>{
        //tell server to accept
        const profile = profiles[index];
        await fetch("http://localhost:3001/management/user-ban-status/"+profile._id,{
            method:"put",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({status:status})
        }).then(r=>r.text()).then(d=>console.log(d)).catch(e=>console.log(e));
        await fetchUserProfilesFromServer();
    }
    const fetchUserProfilesFromServer = async () =>{
        await fetch("http://localhost:3001/management/profiles",{
            method:"get"
        }).then(r=>r.json()).then(d=>{
            setProfiles(d);
            setList(d);
            console.log(JSON.stringify(d));
        });
    }
    const onClickResetUserPassword = async (index) =>{
        //tell server to remove
        const profile = profiles[index];
        await fetch("http://localhost:3001/login/reset/",{
            method:"post",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({nic:profile.nic, email:profile.email})
        }).then(r=>r.text()).then(d => {
            if(d.length>8){
                const server_response = d.split(":");
                if(server_response[0]==="success"){
                    setNewPassword("For "+profile.nic +" is " +server_response[1]);
                    setErrorMsg(null);
                }else if(server_response[0]==="error"){
                    setErrorMsg(server_response[1]);
                    setNewPassword(null);
                }
                console.log("newPassword: "+server_response[1]);
            }
        }).catch(e=>console.log(e));
    }
    const searchRecruitments = () =>{
        const nameLike = document.getElementById("user-fullname").value;
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
                buttons.push(<button className={"btn btn-primary"} onClick={()=>onClickSetUserBanStatus(index,'unban')}>UnBan</button>);
            }else{
                buttons.push(<button className={"btn btn-danger"} onClick={()=>onClickSetUserBanStatus(index,'ban')}>Ban</button>);
            }
        }else{
            buttons.push(<button className={"btn btn-danger"} onClick={()=>onClickSetUserBanStatus(index,'ban')}>Ban</button>);
        }
        buttons.push(<button className={"btn btn-warning mx-1"} onClick={()=>onClickResetUserPassword(index)}>Password Reset</button>);
        return <tr>
            <td>{index+1}</td>
            <td>{profile.fullname}</td>
            <td>{profile.nic}</td>
            <td>{profile.contact}</td>
            <td>{profile.email}</td>
            <td>{profile.address}</td>
            <td>{profile.role}</td>
            {index>=0?<td>
                {buttons}
            </td>:<td>q</td>}

        </tr>;
    }
    return <div style={{position:"relative"}}>
        <div style={{display:"table-cell", padding:"6px", border:"1px solid green"}}>
            <label>Name</label>
            <input type={"text"} className={"mx-1"} id={"user-fullname"}/>
            <label>Reference</label>
            <input type={"text"} className={"mx-1"} id={"user-reference"}/>
            <label className={"mx-1"}>Role</label>
            <select id={"user-role"}>
                <option>any</option>
                {Profile.getUserRoles().map(role => {return <option>{role}</option>})}
            </select>
            <button className={"btn btn-success mx-1"} onClick={()=>searchRecruitments()}>Search</button>
        </div>
        <p/>
        <span style={{color:"green"}}>{newPassword!==null?"New Password "+newPassword:""}</span>
        <span style={{color:"red"}}>{errorMsg!==null?errorMsg:""}</span>
        <p/>
        <table style={{position:"relative"}} className={"table"}>
            <thead><tr>
                <th style={{width:"50px"}}>ID</th>
                <th style={{width:"150px"}}>Name</th>
                <th style={{width:"100px"}}>Nic</th>
                <th style={{width:"200px"}}>Contact Number</th>
                <th style={{width:"200px"}}>Email</th>
                <th style={{width:"200px"}}>Address</th>
                <th style={{width:"150px"}}>Role</th>
                <th style={{width:"200px"}}>Operations</th>
            </tr></thead>
            <tbody>
            {profileList.length<1?<tr key={0}><td colSpan={7} style={{textAlign:"center", fontSize:"20px"}}>No profiles, This is impossible, please contact administrator</td></tr>:""}
            {profiles.map((profile, index)=>{return formatRecordToRow(profile,index)})}
            </tbody>
        </table>
    </div>;
}