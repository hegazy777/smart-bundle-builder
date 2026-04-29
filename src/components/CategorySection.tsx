import { Typography, Divider, Card, Row, Col } from "antd";
import ItemCard from "./ItemCard";
import type { Item } from "../types";

const { Title } = Typography;

interface CategorySectionProps {
  category: string;
  items: Item[];
}

export default function CategorySection({
  category,
  items,
}: CategorySectionProps) {
  return (
    <Card style={{ marginBottom: 32 }}>
      <Title level={4} style={{ marginBottom: 12 }}>
        {category}
      </Title>
      <Divider style={{ margin: "0 0 16px 0" }} />

      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={12} lg={8}>
            <ItemCard item={item} />
          </Col>
        ))}
      </Row>
    </Card>
  );
}
