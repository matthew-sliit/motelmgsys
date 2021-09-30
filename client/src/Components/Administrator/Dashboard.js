import React, {useEffect, useState} from "react";
import SemiCircleChart from "../../assets/js/semi-circle-chart";
import getAngle from "../../assets/js/GetAngle";
import getProxy from "../../proxyConfig";
import rooms_reserved_worker from "../../assets/js/workers/rooms-reserved-worker";
import housekeeping_status_worker from "../../assets/js/workers/housekeeping-status-worker";
import maintenance_status_worker from "../../assets/js/workers/maintenance-status-worker";
import functionToWorker from "../../assets/js/Function2Worker";
export default function Dashboard(){
    let [reservationList,setReservationList] = useState([]);
    let [housekeepingList,setHousekeepingList] = useState([]);
    let [maintenanceList,setMaintenanceList] = useState([]);
    let [componentDidMount, setComponentMounted] = useState(false);
    let [chartDidUpdate, setChartUpdated] = useState(false);
    let [profileStats, setProfileStats] = useState({"total":0,"active":0})
    //workers
    const roomsReservedWorker = functionToWorker(rooms_reserved_worker);
    const housekeepingStatusWorker = functionToWorker(housekeeping_status_worker);
    const maintenanceStatusWorker = functionToWorker(maintenance_status_worker);
    //chart variables
    let reservationCount = 0, housekeepingDirty = 0, housekeepingAllTaskCount = 0, maintenanceTotal = 0, maintenanceOpened = 0;
    //on component mount
    useEffect(async ()=>{
        await fetch(getProxy("/reservation"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setReservationList(d)}).catch(e=>console.log(e));
        await fetch(getProxy("/housekeeping"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setHousekeepingList(d)}).catch(e=>console.log(e));
        await fetch(getProxy("/maintenance"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setMaintenanceList(d)}).catch(e=>console.log(e));
        await fetch(getProxy("/login/active"),{
            method:'get'
        }).then(t=>t.json()).then(d=>{setProfileStats(d)}).catch(e=>console.log(e));
        housekeepingAllTaskCount = housekeepingList.length;
        maintenanceTotal = maintenanceList.length;
        setComponentMounted(true);
    },[]);
    //after component mount
    useEffect(async ()=>{
        reservationCount = await getReservedRoomCount(reservationList);
        housekeepingDirty = await getHousekeepingToDo(housekeepingList);
        maintenanceOpened = await getMaintenanceToDo(maintenanceList);
        console.log("out reservationCount:"+reservationCount);
        console.log("out reservationCount:"+housekeepingDirty);
        console.log("out reservationCount:"+maintenanceOpened);
        console.log(JSON.stringify(reservationList));
        //chart
        let chart = new SemiCircleChart();
        chart.setFillColor("#52BE80");
        chart.setFillerMillis(30);
        chart.setBorderColor("#D6EAF8");
        chart.setExternalBackgroundColor("#f4f7fa");
        chart.setTriColor("#5DADE2", "#F5B041", "#EC7063");

        let chartEmployee = new SemiCircleChart();
        chartEmployee.setFillColor("#52BE80");
        chartEmployee.setFillerMillis(30);
        chartEmployee.setBorderColor("#D6EAF8");
        chartEmployee.setExternalBackgroundColor("#f4f7fa");
        chartEmployee.setTriColor("#52BE80", "#52BE80", "#52BE80");
        //angles in between 0 to 180 for given value and max value
        let chart1angle = getAngle(profileStats.active, profileStats.total);
        let chart2angle = getAngle((reservationCount>30?30:reservationCount), 30);//max rooms?
        let chart3angle = getAngle(housekeepingDirty, (housekeepingAllTaskCount<10?10:housekeepingAllTaskCount));
        let chart4angle = getAngle(maintenanceOpened, (maintenanceTotal<10?10:maintenanceTotal));
        //draw chart
        if(componentDidMount) {
            chartEmployee.draw(chart1angle, "Active Employees", ""+profileStats.active, "ws-chart");
            chart.draw(chart2angle, "Rooms Reserved", "" + reservationCount, "rooms-reserved");
            chart.draw(chart3angle, "Housekeeping todo", ""+housekeepingDirty, "housekeeping-task-remain");
            chart.draw(chart4angle, "Maintenance todo", ""+maintenanceOpened, "maintenance-task-remain");
            setChartUpdated(true);
            //ssh-keygen -t rsa -b 4096 -C "it19126098@my.sliit.lk"
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
    async function getMaintenanceToDo() {
        return new Promise(function (resolve) {
            maintenanceStatusWorker.postMessage({"maintenanceList":maintenanceList});
            maintenanceStatusWorker.onmessage = (m) =>{
                maintenanceOpened = m.data.open;
                resolve(maintenanceOpened);
            }
            maintenanceStatusWorker.onerror = (e) =>{
                console.log(e);
            }
        })
    }
    if(!componentDidMount){
        return null;
    }else {
        console.log(profileStats);
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
            <table className={"table w-50"} style={{border:"1px solid #7FB3D5", borderTop:"3px solid #7FB3D5"}}>
                <thead>
                <tr>
                    <th style={{textAlign: "center"}} colSpan={2}>Overview</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total number of employees</td>
                    <td> {profileStats.total}</td>
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