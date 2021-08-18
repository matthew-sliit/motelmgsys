import React from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import Cookie from "js-cookie";
export default function UserNavigationFormat(props){
    let profileNic = Cookie.get('id');
    const {navigations, content, type} = props;
    //if(profileNic==="undefined")
    function navigationItemHolder(sectionName, values){
        let subSections = [];
        for(let i=0;i<values.displayName.length;i++){
            subSections.push(
                <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                    className="nav-item">
                    <a href={values.link[i]} className="nav-link "><span className="pcoded-micon">
                    <i className={"feather " + values.icon[i]}/></span><span className="pcoded-mtext">{values.displayName[i]}</span></a>
                </li>
            );
        }
        return <React.Fragment>
            <li className="nav-item pcoded-menu-caption">
                <label>{sectionName}</label>
            </li>
            {subSections}
        </React.Fragment>
    }
    let navigationContent = [];
    for(const [key, value] of Object.entries(navigations.sections)){
        //console.log("k: "+key+" v:"+JSON.stringify(value));
        navigationContent.push(navigationItemHolder(key,value));
    }
    function logout(){
        Cookie.remove('role');
        Cookie.remove('id');
        window.location.href = "/";
    }
    return <React.Fragment>
        <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="index.html" className="b-brand">
                        <div className="b-bg">
                            <i className="feather icon-trending-up"></i>
                        </div>
                        <span className="b-title">{type}</span>
                    </a>
                    <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        {navigationContent}
                        <li className="nav-item pcoded-menu-caption">
                            <label>Account</label>
                        </li>
                        <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                            className="nav-item">
                            <a href={"/profile"} className="nav-link "><span className="pcoded-micon">
                    <i className={"feather icon-sidebar"}/></span><span className="pcoded-mtext">Profile</span></a>
                        </li>
                        <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                            className="nav-item">
                            <a href={"#"} onClick={()=>logout()} className="nav-link "><span className="pcoded-micon">
                    <i className={"feather icon-power"}/></span><span className="pcoded-mtext">Logout</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <script src={"https://cdn.jsdelivr.net/gh/codedthemes/datta-able-bootstrap-dashboard@master/template/assets/js/pcoded.min.js"}></script>
        <script src={"https://cdn.jsdelivr.net/gh/codedthemes/datta-able-bootstrap-dashboard@master/template/assets/js/vendor-all.min.js"}></script>
        <div style={{position:"relative", top:"30px",float:"right", right:"20px", cursor:"pointer"}}>
            <label>{profileNic}&nbsp;</label>
            <img src={"https://cdn.jsdelivr.net/gh/matthew-sliit/conferencemgtool@master/client/user/assets/img/profile.png"} height={"50px"} width={"50px"} alt={"profile"} onClick={()=>window.location.href="/profile"}/>
        </div>
        <div style={{position:"relative", top:"130px",left:"300px", width:"73%"}}>
            {content}
        </div>
    </React.Fragment>
}