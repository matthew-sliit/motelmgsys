import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
export default function ReportGenerationV1({header,tableHeaders,tableBody,fileName}){
    const doc = new jsPDF();
    doc.setTextColor(50)
    doc.setFontSize(18)
    autoTable(doc,{
        head: tableHeaders,
        body: tableBody,
        showFoot: "everyPage",
        showHead: "firstPage",
        tableLineColor: [128, 139, 150],
        tableLineWidth: 0.1,
        didDrawPage: function (data) {
            // Header
            doc.setFontSize(20)
            doc.text(header, data.settings.margin.left + 15, 22)
            // Footer
            doc.setFontSize(10)
            let pageSize = doc.internal.pageSize
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
            doc.text("EagleEye™", data.settings.margin.left, pageHeight - 10)
        },
        margin: { top: 30 },
    });
    doc.save(fileName+".pdf");
}