import React, {useEffect, useState} from "react";
import SemiCircleChart from "../../assets/js/semi-circle-chart";
import getAngle from "../../assets/js/GetAngle";
import getProxy from "../../proxyConfig";
export default function Dashboard(){
    let [r, setR] = useState([]);
    //component did mount
    useEffect(   async ()=>{
        let reservationCount = 0;
        await fetch(getProxy("/reservation"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{reservationCount = d.length; setR(d)}).catch(e=>console.log(e));

        let chart = new SemiCircleChart();
        chart.setFillColor("green");
        chart.setFillerMillis(30);
        chart.setBorderColor("#D6EAF8");
        chart.setExternalBackgroundColor("#f4f7fa");
        chart.setTriColor("#5DADE2","#F5B041","#EC7063");
        //angles in between 0 to 180 for given value and max value
        let chart1angle = getAngle(10,50);
        let chart2angle = getAngle(reservationCount,30);
        let chart3angle = getAngle(5,100);
        //draw chart
        chart.draw(chart1angle,"Active Employees","10","ws-chart");
        chart.draw(chart2angle,"Rooms Reserved",""+reservationCount,"rooms-reserved");
        chart.draw(chart2angle,"Housekeeping todo","10","housekeeping-task-remain");
        chart.draw(chart2angle,"Maintenance todo","10","maintenance-task-remain");



    },[]);
    return <div>
        <h3 style={{color:"inherit", position:"relative",top:"-20px"}}>Dashboard</h3>
        <div style={{display: "table-cell"}}>
            <div id="ws-chart"></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="rooms-reserved" style={{position: "relative", left: "20px"}}></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="rooms-reserved" style={{position: "relative", left: "20px"}}></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="housekeeping-task-remain" style={{position: "relative", left: "40px"}}></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="maintenance-task-remain" style={{position: "relative", left: "60px"}}></div>
        </div>
        <table className={"table w-50"}>
            <thead><tr><th style={{textAlign:"center"}} colSpan={2}>Overview</th></tr></thead>
            <tbody>
            <tr><td>Total number of employees</td><td> 300</td></tr>
            <tr><td>Total number of Rooms</td><td>30</td></tr>
            <tr><td>{r.length>0?r[0].name:""}</td><td>{r.length>0?r[0].email:""}</td></tr>
            </tbody>
        </table>
    </div>;
}