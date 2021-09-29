export default function MaintenanceStatusWorker(e){
    const maintenanceList = e.data.maintenanceList;
    let open = 0, closed = 0;
    maintenanceList.map(h=>{
        (h.status === "Open" ? open++ : h.status === "Completed" ? closed++ : "")
    })
    self.postMessage({"open":open,"completed":closed});
}