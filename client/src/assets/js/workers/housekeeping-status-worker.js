export default function HousekeepingStatusWorker(e){
    const housekeepingList = e.data.housekeepingList;
    let dirty = 0, cleaning = 0, clean = 0;
    housekeepingList.map(h=>{
        (h.status === "Dirty" ? dirty++ : h.status === "Cleaning" ? cleaning++ : h.status === "Clean" ? clean++ : "")
    })
    postMessage({"dirty":dirty,"cleaning":cleaning,"clean":clean});
}
