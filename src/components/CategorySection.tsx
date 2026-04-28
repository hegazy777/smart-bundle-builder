import { Typography, Divider, Card, Row } from "antd";
import ItemCard from "./ItemCard";
import type { Item } from "../types";
import { useAppSelector } from "../store/hooks";

const { Title } = Typography;

interface CategorySectionProps {
  category: string;
  items: Item[];
}



export default function CategorySection({ category, items }: CategorySectionProps) {

    const selections = useAppSelector((state) => state.build.selections);

// const sele = JSON.stringify(selections[category])

  return (
    <Card style={{ marginBottom: 32 }}>
      <Title level={4} style={{ marginBottom: 12 }}>
        {category} 
      </Title>
      <Divider style={{ margin: "0 0 16px 0" }} />

      <Row style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 8,
      }}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Row>
    </Card>
  );
}