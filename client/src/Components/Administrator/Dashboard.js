import React, {useEffect, useState} from "react";
import SemiCircleChart from "../../assets/js/semi-circle-chart";
import getAngle from "../../assets/js/GetAngle";
import getProxy from "../../proxyConfig";
import rooms_reserved_worker from "../../assets/js/workers/rooms-reserved-worker";
import housekeeping_status_worker from "../../assets/js/workers/housekeeping-status-worker";
import functionToWorker from "../../assets/js/Function2Worker";
export default function Dashboard(){
    let [reservationList,setReservationList] = useState([]);
    let [housekeepingList,setHousekeepingList] = useState([]);
    let [componentDidMount, setComponentMounted] = useState(false);
    let [chartDidUpdate, setChartUpdated] = useState(false);
    //workers
    const roomsReservedWorker = functionToWorker(rooms_reserved_worker);
    const housekeepingStatusWorker = functionToWorker(housekeeping_status_worker);
    //chart variables
    let reservationCount = 0, housekeepingDirty = 0, housekeepingAllTaskCount = 0;
    //on component mount
    useEffect(async ()=>{
        await fetch(getProxy("/reservation"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setReservationList(d)}).catch(e=>console.log(e));
        await fetch(getProxy("/housekeeping"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setHousekeepingList(d)}).catch(e=>console.log(e));
        housekeepingAllTaskCount = housekeepingList.length;
        setComponentMounted(true);
    },[]);
    //after component mount
    useEffect(async ()=>{
        reservationCount = await getReservedRoomCount(reservationList);
        housekeepingDirty = await getHousekeepingToDo(housekeepingList);
        console.log("out reservationCount:"+reservationCount);
        //chart
        let chart = new SemiCircleChart();
        chart.setFillColor("green");
        chart.setFillerMillis(30);
        chart.setBorderColor("#D6EAF8");
        chart.setExternalBackgroundColor("#f4f7fa");
        chart.setTriColor("#5DADE2", "#F5B041", "#EC7063");
        //angles in between 0 to 180 for given value and max value
        let chart1angle = getAngle(10, 50);
        let chart2angle = getAngle(reservationCount, 30);
        let chart3angle = getAngle(housekeepingDirty, (housekeepingAllTaskCount<10?10:housekeepingAllTaskCount));
        //draw chart
        if(componentDidMount) {
            chart.draw(chart1angle, "Active Employees", "10", "ws-chart");
            chart.draw(chart2angle, "Rooms Reserved", "" + reservationCount, "rooms-reserved");
            chart.draw(chart3angle, "Housekeeping todo", ""+housekeepingDirty, "housekeeping-task-remain");
            chart.draw(chart2angle, "Maintenance todo", "10", "maintenance-task-remain");
            setChartUpdated(true);
        }
    },[componentDidMount])
    async function getReservedRoomCount(reservationList){
        return new Promise(function (resolve) {
            roomsReservedWorker.postMessage({"reservationList":reservationList});
            roomsReservedWorker.onmessage = (m) =>{
                reservationCount = m.data.roomsReserved;
                resolve(reservationCount);
            }
            roomsReservedWorker.onerror = (e) =>{
                console.log(e);
            }
        })
    }
    async function getHousekeepingToDo() {
        return new Promise(function (resolve) {
            housekeepingStatusWorker.postMessage({"housekeepingList":housekeepingList});
            housekeepingStatusWorker.onmessage = (m) =>{
                housekeepingDirty = m.data.dirty;
                resolve(housekeepingDirty);
            }
            housekeepingStatusWorker.onerror = (e) =>{
                console.log(e);
            }
        })
    }
    if(!componentDidMount){
        return null;
    }else {
        return <div>
            <h3 style={{color: "inherit", position: "relative", top: "-20px"}}>Dashboard</h3>
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
            {chartDidUpdate?
            <table className={"table w-50"}>
                <thead>
                <tr>
                    <th style={{textAlign: "center"}} colSpan={2}>Overview</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total number of employees</td>
                    <td> 300</td>
                </tr>
                <tr>
                    <td>Total number of Rooms</td>
                    <td>30</td>
                </tr>
                </tbody>
            </table>:""}
        </div>
    }
}