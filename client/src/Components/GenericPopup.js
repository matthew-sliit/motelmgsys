import React from "react";
export default function GenericPopup(props){
    const {heading, body, hidePopupFunction, closeBtn, proceedBtn, proceedFunction} = props;
    return <React.Fragment>
        <div className="modal fade show" tabIndex="-1" style={{display:"block", backgroundColor:"rgba(49, 49, 47, 0.5)"}} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{heading}</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={()=>hidePopupFunction()}> </button>
                    </div>
                    <div className="modal-body">
                        <div style={{color:"green", padding:"8px", verticalAlign:"middle"}}>
                            {body}
                        </div>
                        <div className="modal-footer">
                            {closeBtn? <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>hidePopupFunction()}>Close</button>:""}
                            {proceedBtn? <button type="button" className="btn btn-green" data-dismiss="modal" onClick={()=>proceedFunction()}>Proceed</button>:""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}