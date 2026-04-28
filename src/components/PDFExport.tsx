import { Card, Typography, Button, Divider, Empty } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetBuild } from "../store/slices/buildSlice";
import { items } from "../data/components";
import PDFExport from "./PDFExport";

const { Title, Text } = Typography;
const BUDGET = 1000;

export default function BuildSummary() {
  const dispatch = useAppDispatch();
  const selections = useAppSelector((state) => state.build.selections);

  const selectedItems = Object.values(selections)
    .map((selectedId) => items.find((i) => i.id === selectedId))
    .filter(Boolean);

  const totalCost = selectedItems.reduce((sum, item) => sum + (item?.price ?? 0), 0);
  const remaining = BUDGET - totalCost;

  return (
    <Card
      style={{
        position: "sticky",
        top: 24,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <ShoppingCartOutlined style={{ fontSize: 18, color: "#1677ff" }} />
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
                <Text strong style={{ fontSize: 13 }}>{item!.name}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>{item!.category}</Text>
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
        <PDFExport />
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