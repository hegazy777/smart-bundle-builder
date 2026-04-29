import { Card, Typography, Button, Divider, Empty } from "antd";
import { ShoppingCartOutlined, DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetBuild } from "../store/slices/buildSlice";
// import { items } from "../data/components";

const { Title, Text } = Typography;
const BUDGET = 1000;



export default function BuildSummary() {
  const dispatch = useAppDispatch();
  const selections = useAppSelector((state) => state.build.selections);
const items = useAppSelector((state) => state.items.items);
  const selectedItems = Object.values(selections)
    .map((selectedId) => items.find((i) => i.id === selectedId))
    .filter(Boolean);

  const totalCost = selectedItems.reduce((sum, item) => sum + (item?.price ?? 0), 0);
  const remaining = BUDGET - totalCost;

  // Handel PDF Export Dsign
  const handleExportPDF = () => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 40;

  //Address 
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(22, 119, 255);
  pdf.text("Smart Bundle Builder", pageWidth / 2, y, { align: "center" });

  y += 10;

  // head title
  pdf.setDrawColor(22, 119, 255);
  pdf.setLineWidth(1);
  pdf.line(40, y + 10, pageWidth - 40, y + 10);

  y += 30;

  // date
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(150, 150, 150); 
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 40, y);

  y += 30;

  // department adress
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.text("Selected Components", 40, y);

  y += 20;

  // tables
  pdf.setFillColor(22, 119, 255); 
  pdf.rect(40, y, pageWidth - 80, 24, "F");

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255); 
  pdf.text("Component", 50, y + 16);
  pdf.text("Category", pageWidth / 2 - 40, y + 16);
  pdf.text("Price", pageWidth - 90, y + 16);

  y += 30;

  //Products
  selectedItems.forEach((item, index) => {
    // add backgrond
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

  // separeted Line
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(40, y, pageWidth - 40, y);

  y += 20;

  // Total 
  pdf.setFillColor(240, 247, 255); // أزرق فاتح جداً
  pdf.rect(40, y - 14, pageWidth - 80, 32, "F");

  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.text("Total Cost", 50, y + 4);

  pdf.setTextColor(22, 119, 255);
  pdf.text(`$${totalCost}`, pageWidth - 90, y + 4);

  y += 36;

  //  Remaining =====
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(150, 150, 150);
  pdf.text("Remaining Budget", 50, y);

  pdf.setTextColor(remaining < 100 ? 255 : 82, remaining < 100 ? 77 : 196, remaining < 100 ? 79 : 26);
  pdf.text(`$${remaining}`, pageWidth - 90, y);

  // PDF 
  pdf.save("smart-bundle-build.pdf");
};

  return (
    <Card
      style={{
       
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <ShoppingCartOutlined style={{ fontSize: 24, color: "#1677ff" }} />
        <Title level={5} style={{ margin: 0 }}>Build Summary</Title>
      </div>

      <Divider style={{ margin: "0 0 16px 0" }} />

     
      {selectedItems.length === 0 ? (
        <Empty
          description="Your build is empty. Select components to start building."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div style={{ marginBottom: 16 }}>
          {selectedItems.map((item) => (
            <div
              key={item!.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div>
                <Text strong style={{ fontSize: 18 }}>{item!.name}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 16 }}>{item!.category}</Text>
              </div>
              <Text strong style={{ color: "#1677ff" }}>${item!.price}</Text>
            </div>
          ))}
        </div>
      )}

      <Divider style={{ margin: "8px 0" }} />

      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <Text strong>Total Cost</Text>
        <Text strong style={{ fontSize: 16 }}>${totalCost}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>Remaining</Text>
        <Text style={{ fontSize: 12, color: remaining < 100 ? "#ff4d4f" : "#52c41a" }}>
          ${remaining}
        </Text>
      </div>

      
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button
          block
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={handleExportPDF}
          disabled={selectedItems.length === 0}
        >
          Export as PDF
        </Button>

        <Button
          block
          danger
          icon={<DeleteOutlined />}
          onClick={() => dispatch(resetBuild())}
          disabled={selectedItems.length === 0}
        >
          Reset Build
        </Button>
      </div>
    </Card>
  );
}