import React from "react";
import { Card, Tag, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectItem } from "../store/slices/buildSlice";
import { items } from "../data/components";
import type { Item } from "../types";
interface ItemCardProps {
  item: Item;
}
const { Text } = Typography;

export default function ProductList({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();

  const selections = useAppSelector((state) => state.build.selections);

  const disabledIds = new Set<string>();

  Object.values(selections).forEach((selectedId) => {
    const selectedItem = items.find((i) => i.id === selectedId);

    selectedItem?.incompatibleWith.forEach((id) => disabledIds.add(id));
  });

  // حساب الـ total cost
  // const totalCost = Object.values(selections).reduce((sum, selectedId) => {
  //   const selectedItem = items.find((i) => i.id === selectedId);
  //   return sum + (selectedItem?.price ?? 0);
  // }, 0);

  const totalCost = Object.values(selections).reduce((sum, selectedIds) => {
    const selectedIDS = items.find((i) => i.id === selectedIds);
    return sum + (selectedIDS?.price ?? 0);
  },0);

  const handleClick = () => {
    if (isDisabled) return;
    dispatch(selectItem({ category: item.category, itemId: item.id }));
  };

  const isSelected = selections[item.category] === item.id;

   const isIncompatible = disabledIds.has(item.id);
  //  const isOverBudget = !isSelected && totalCost + item.price > 1000;

      const  isOverBudget = !isSelected && totalCost + item.price > 1000 ;


   const isDisabled = isIncompatible || isOverBudget;

  return (
    <Card
      onClick={handleClick}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      aria-label={`
        ${item.name} - $${item.price}
        ${isIncompatible ? "isIncompatible" : ""}
        ${isOverBudget ? "isOverBudget" : ""}
      `}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      style={{
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.4 : 1,
        border: isSelected ? "2px solid #1677ff" : "1px solid #d9d9d9",
        background: isSelected ? "#e6f4ff" : "#fff",
        transition: "all 0.2s",
      }}
      styles={{
        body: { padding: 12 },
      }}
    >
      {/* السعر والاسم */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text strong style={{ color: isDisabled ? "#999" : "#000" }}>
          {item.name}
        </Text>
        <Text strong style={{ color: isSelected ? "#1677ff" : "#000" }}>
          ${item.price}
        </Text>
      </div>

      {/* Tags */}
      <div style={{ marginTop: 8 }}>
        {isIncompatible && <Tag color="error">غير متوافق</Tag>}
        {isOverBudget && <Tag color="warning">يتجاوز الميزانية</Tag>}
        {isSelected && <Tag color="processing">مختار ✓</Tag>}
      </div>
    </Card>
  );
}
