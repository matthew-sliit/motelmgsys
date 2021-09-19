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
    useEffect(   ()=> {
        if (afterComponentMounted) {
            let dirty = 0, cleaning = 0, clean = 0;
            housekeeping.map(h=>{
                //console.log(JSON.stringify(h));
                (h.status=="Dirty"?dirty++:h.status=="Cleaning"?cleaning++:h.status=="Clean"?clean++:"")
            })
            let open = 0, completed = 0;
            maintenance.map(h=>{
                //console.log(JSON.stringify(h));
                (h.status=="Open"?open++:h.status=="Completed"?completed++:"")
            });
            const housekeepingCountMax = housekeeping.length;
            const maintenanceCountMax = maintenance.length;
            console.log(housekeepingCountMax);
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
            let chart4angle = getAngle(open, maintenanceCountMax);
            let chart5angle = getAngle(completed, maintenanceCountMax);
            //draw chart
            chart.draw(chart1angle, "Dirty", "" + dirty, "dirty-chart");
            chart.draw(chart2angle, "Cleaning", "" + cleaning, "cleaning-chart");
            chart.draw(chart3angle, "Clean", "" + clean, "clean-chart");
            chart.draw(chart4angle, "Open", "" + open, "open-chart");
            chart.draw(chart5angle, "Completed", "" + completed, "completed-chart");
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
        <h3 className={"mb-3"} style={{color: "#0c5460"}}><b>Maintenance Management Dashboard</b></h3>
        <h4 style={{color:"darkblue"}} >Status of Housekeeping Tasks</h4>
        <div style={{display: "table-cell"}}>
            <div id="dirty-chart"></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="cleaning-chart" style={{position: "relative"}}></div>
        </div>
        <div style={{display: "table-cell"}}>
            <div id="clean-chart" style={{position: "relative"}}></div>
        </div>
        <div style={{marginTop:"-80px"}}>
            <h4 className={"mb-3"} style={{color: "darkblue"}}>Status of Maintenance Tasks</h4>
            <div style={{display: "table-cell"}}>
                <div id="open-chart"></div>
            </div>
            <div style={{display: "table-cell"}}>
                <div id="completed-chart" style={{position: "relative", left: "40px"}}></div>
            </div>
        </div>
        <div style={{marginTop:"-80px"}}>
        <div className="row mt-3 mb-3">
            <div className="col-md-3">
                <button type="button" onClick={()=>{window.location.href="/maintainer/housekeeping"}} className="btn btn-success"><i className="fas fa-shower"></i>
                    Housekeeping Tasks
                </button>
            </div>
            <div className="col-md-3">
                <button type="button" className="btn btn-warning" onClick={()=>{window.location.href="/maintainer/maintenance"}}><i className="fas fa-wrench"></i>
                    Maintenance Tasks
                </button>
            </div>
        </div>
        <h4 className={"mb-3"} style={{color: "darkblue"}}>Room Reservation Details</h4>
        <table className={"table w-75"}>
            <thead className="thead-dark">
            <tr>
                <th scope="col">Room No</th>
                <th scope="col">Check-in Date</th>
                <th scope="col">Check-out Date</th>
                <th scope="col">Add Cleaning Task</th>
                <th scope="col">Add Maintenance Task</th>
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
                    <td>
                        <button type="button" onClick={()=>{window.location.href="/maintainer/maintenance/add"}} className="btn btn-warning"><i className="fas fa-plus-circle"></i>Add Task
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        </div>
    </div>;
}
