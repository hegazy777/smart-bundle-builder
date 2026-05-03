import { Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import { useAppSelector } from "../store/hooks";

const BUDGET = 1000;

export default function PdfExport() {
  const selections = useAppSelector((state) => state.build.selections);
  const items = useAppSelector((state) => state.items.items);

  const selectedItems = Object.values(selections)
    .map((selectedId) => items.find((i) => i.id === selectedId))
    .filter(Boolean);

  const totalCost = selectedItems.reduce((sum, item) => sum + (item?.price ?? 0), 0);
  const remaining = BUDGET - totalCost;

  const handleExportPDF = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 40;

    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(22, 119, 255);
    pdf.text("Smart Bundle Builder", pageWidth / 2, y, { align: "center" });
    y += 10;
    pdf.setDrawColor(22, 119, 255);
    pdf.setLineWidth(1);
    pdf.line(40, y + 10, pageWidth - 40, y + 10);
    y += 30;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 40, y);
    y += 30;
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Selected Components", 40, y);
    y += 20;
    pdf.setFillColor(22, 119, 255);
    pdf.rect(40, y, pageWidth - 80, 24, "F");
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.text("Component", 50, y + 16);
    pdf.text("Category", pageWidth / 2 - 40, y + 16);
    pdf.text("Price", pageWidth - 90, y + 16);
    y += 30;
    selectedItems.forEach((item, index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(245, 245, 245);
        pdf.rect(40, y - 12, pageWidth - 80, 24, "F");
      }
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text(item!.name, 50, y);
      pdf.text(item!.category, pageWidth / 2 - 40, y);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(22, 119, 255);
      pdf.text(`$${item!.price}`, pageWidth - 90, y);
      y += 28;
    });
    y += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(40, y, pageWidth - 40, y);
    y += 20;
    pdf.setFillColor(240, 247, 255);
    pdf.rect(40, y - 14, pageWidth - 80, 32, "F");
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Total Cost", 50, y + 4);
    pdf.setTextColor(22, 119, 255);
    pdf.text(`$${totalCost}`, pageWidth - 90, y + 4);
    y += 36;
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(150, 150, 150);
    pdf.text("Remaining Budget", 50, y);
    pdf.setTextColor(remaining < 100 ? 255 : 82, remaining < 100 ? 77 : 196, remaining < 100 ? 79 : 26);
    pdf.text(`$${remaining}`, pageWidth - 90, y);
    pdf.save("smart-bundle-build.pdf");
  };

  return (
    <Button
      block
      type="primary"
      icon={<FilePdfOutlined />}
      onClick={handleExportPDF}
      disabled={selectedItems.length === 0}
    >
      Export as PDF
    </Button>
  );
}