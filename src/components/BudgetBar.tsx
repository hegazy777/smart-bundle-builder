import { Card, Progress, Typography } from "antd";
import { useAppSelector } from "../store/hooks";
// import { items } from "../data/components";

const { Text } = Typography;

const BUDGET = 1000;

export default function BudgetBar() {
  const selections = useAppSelector((state) => state.build.selections);


  const items = useAppSelector((state) => state.items.items);

  // Total Cost
  const totalCost = Object.values(selections).reduce((sum, selectedId) => {
    const item = items.find((i) => i.id === selectedId);
    return sum + (item?.price ?? 0);
  }, 0);

  const remaining = BUDGET - totalCost;
  const percentage = Math.round((totalCost / BUDGET) * 100);

  // progress bar 
  const color =
    percentage >= 90 ? "#ff4d4f" :
    percentage >= 70 ? "#faad14" :
    "#1677ff";

  return (
    <Card style={{
      border: "1px solid #d9d9d9",
      borderRadius: 8,
      padding: "16px 20px",
      marginBottom: 24,
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <div>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Budget Utilization
          </Text>
          <div>
            <Text strong style={{ fontSize: 36 }}>
              ${totalCost}
            </Text>
            <Text type="secondary"> / $1000</Text>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Remaining
          </Text>
          <div>
            <Text
              strong
              style={{
                fontSize: 20,
                color: remaining < 90 ? "#ff4d4f" : "var(--ant-color-text)",
              }}
            >
              ${remaining}
            </Text>
          </div>
        </div>
      </div>

      {/* الـ Progress Bar */}
      <Progress
        percent={percentage}
        showInfo={false}
        strokeColor={color}
      />

      {percentage >= 100 && (
        <Text type="danger" style={{ fontSize: 16 }}>
          Approaching budget limit!
        </Text>
      )}
    </Card>
  );
}