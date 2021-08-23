import React from "react";
import $ from "jquery";
export default function BackendHomeFormat(props){
    const {content} = props;
    const backgroundColor = "#34495E";
    const textColor = "#E5E7E9";
    return <React.Fragment>
        <div style={{position:"relative", top:"0px", left:"0px",minHeight:$(window).height(),minWidth:$(window).width() ,backgroundColor:backgroundColor, color:textColor}}>
            <div style={{position:"relative", top:"20px", left:"15%"}}>
                {content}
            </div>
        </div>
    </React.Fragment>
}