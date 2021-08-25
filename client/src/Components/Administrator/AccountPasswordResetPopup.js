import React from "react";
import Profile from "../../models/Profile";
export default function AccountPasswordResetPopup(props){
    const {profileData, newPassword, hidePopupFunction} = props;
    const profile = new Profile();
    Object.assign(profile,profileData);
    return <React.Fragment>
        <div className="modal fade show" tabIndex="-1" style={{display:"block", backgroundColor:"rgba(49, 49, 47, 0.5)"}} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile Password Reset Information </h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={()=>hidePopupFunction()}> </button>
                    </div>
                    <div className="modal-body">
                        <div style={{border:"1px solid rgba(11, 138, 93, 0.5)", padding:"8px"}}>
                        <table className={"table"}>
                            <thead><tr><th colSpan={2} style={{textAlign:"center"}}>User Profile</th></tr></thead>
                            <tbody>
                            <tr><th scope="row">Reference</th><td style={{textAlign:"start"}}>{profile._id}</td></tr>
                            <tr><th scope="row">NIC</th><td style={{textAlign:"start"}}>{profile.nic}</td></tr>
                            <tr><th scope="row">Name</th><td style={{textAlign:"start"}}>{profile.fullname}</td></tr>
                            <tr><th scope="row">Email</th><td style={{textAlign:"start"}}>{profile.email}</td></tr>
                            <tr><th scope="row">Contact</th><td style={{textAlign:"start"}}>{profile.contact}</td></tr>
                            <tr><th scope="row">New Password</th><td style={{textAlign:"start"}}>{newPassword}</td></tr>
                            </tbody>
                        </table>
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>hidePopupFunction()}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}