import { Avatar, Card, Tag, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectItem } from "../../store/slices/buildSlice";
// import { items } from "../../data/components";
// import styles from "./index.module.css";
import type { Item } from "../../types";
import { CodepenOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
const { Text, Title } = Typography;

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();
  const selections = useAppSelector((state) => state.build.selections);

  const items = useAppSelector((state) => state.items.items);

  // disabled ids of Items Incompatible
  const disabledIds = new Set<string>();
  Object.values(selections).forEach((selectedId) => {
    const selectedItem = items.find((i) => i.id === selectedId);
    selectedItem?.incompatibleWith.forEach((id) => disabledIds.add(id));
  });

  // total cost
  const totalCost = Object.values(selections).reduce((sum, selectedId) => {
    const selectedItem = items.find((i) => i.id === selectedId);
    return sum + (selectedItem?.price ?? 0);
  }, 0);

  const isSelected = selections[item.category] === item.id;
  const isIncompatible = disabledIds.has(item.id);
  const isOverBudget = !isSelected && totalCost + item.price > 1000;
  const isDisabled = isIncompatible || isOverBudget;

  const handleClick = () => {
    if (isDisabled) return;
    dispatch(selectItem({ category: item.category, itemId: item.id }));
  };

  return (
    <Card
      onClick={handleClick}
      hoverable={!isDisabled}
      className={`${styles.card}
        ${isSelected ? styles.selected : ""}
        ${isDisabled ? styles.disabled : ""}`}
        onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Avatar
          shape="square"
          size={40}
          icon={<CodepenOutlined />}
          style={{
            backgroundColor: "#f0f5ff",
            color: "#1677ff",
            borderRadius: "8px",
          }}
        />
        <Text strong style={{ fontSize: "20px" }}>
          ${item.price}
        </Text>
      </div>
      <div style={{ marginBottom: 4 }}>
        <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
          {item.name}
        </Title>
      </div>
      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}
      >
        {isIncompatible && <Tag color="error">Incompatible</Tag>}
        {isOverBudget && <Tag color="warning">Over Budget</Tag>}
        {isSelected && <Tag color="blue">Selected ✓</Tag>}
      </div>
    </Card>
  );
}
