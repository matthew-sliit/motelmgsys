import React, {useEffect,useState} from "react";
import SemiCircleChart from "../../assets/js/semi-circle-chart";
import getAngle from "../../assets/js/GetAngle";
import getProxy from "../../proxyConfig";

export default function MMDashboard(){
    let [reservation, setreservation] = useState([]);
    let [housekeeping, setHousekeeping] = useState([]);
    let [maintenance, setMaintenance] = useState([]);
    let [afterComponentMounted, setComponentMounted] = useState(false);
    //on component mount
    useEffect(async ()=>{
        await getReservations();
        setComponentMounted(true);
    },[])
    //after component mount
    useEffect(   ()=>{
        if(afterComponentMounted) {
            console.log(JSON.stringify(housekeeping));
            let dirty = 0, cleaning = 0, clean = 0;
            housekeeping.map(h => {
                console.log(JSON.stringify(h));
                (h.status === "Dirty" ? dirty++ : h.status === "Cleaning" ? cleaning++ : h.status === "Clean" ? clean++ : "")
            })
            const housekeepingCountMax = housekeeping.length;
            let chart = new SemiCircleChart();
            chart.setFillColor("green");
            chart.setFillerMillis(30);
            chart.setBorderColor("#D6EAF8");
            chart.setExternalBackgroundColor("#f4f7fa");
            chart.setTriColor("#5DADE2", "#F5B041", "#EC7063");
            //angles in between 0 to 180 for given value and max value
            let chart1angle = getAngle(dirty, housekeepingCountMax);
            let chart2angle = getAngle(cleaning, housekeepingCountMax);
            let chart3angle = getAngle(clean, housekeepingCountMax);
            //draw chart
            chart.draw(chart1angle, "Dirty", "" + dirty, "ws-chart");
            chart.draw(chart2angle, "Cleaning", "" + cleaning, "rooms-reserved");
            chart.draw(chart3angle, "Cleaned", "" + clean, "housekeeping-task-remain");
            chart.draw(chart2angle, "Maintenance todo", "10", "maintenance-task-remain");
        }
    },[afterComponentMounted]);
    async function getReservations(){
        await fetch(getProxy("/reservation"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setreservation(d);}).catch(e=>console.log(e));
        await fetch(getProxy("/housekeeping"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setHousekeeping(d);}).catch(e=>console.log(e));
        await fetch(getProxy("/maintenance"),{
            method:"get"
        }).then(r=>r.json()).then(d=>{setMaintenance(d);}).catch(e=>console.log(e));
    }
    if(!afterComponentMounted){return <div></div>}
    return <div>
        <h3 style={{color: "#0c5460"}}>Maintenance Dashboard</h3>
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
        <h4 style={{color: "#0c5460"}}>Housekeeping Tasks</h4>
        <table className={"table w-75"}>
            <thead className="thead-dark">
            <tr>
                <th scope="col">Room No</th>
                <th scope="col">Check-in Date</th>
                <th scope="col">Check-out Date</th>
                <th scope="col">Add Cleaning Task</th>
            </tr>
            </thead>
            <tbody>
            {reservation.map(reserve=>{
                return <tr>
                    <td>{reserve.roomNo}</td>
                    <td>{reserve.checkInDate}</td>
                    <td>{reserve.checkOutDate}</td>
                <td>
                    <button type="button" onClick={()=>{window.location.href="/maintainer/housekeeping/add"}} className="btn btn-success"><i className="fas fa-plus-circle"></i>Add Task
                    </button>
                </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>;
}
