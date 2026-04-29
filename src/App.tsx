import { useEffect, useRef } from "react";
import { ConfigProvider, theme, Row, Col } from "antd"; 
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { undo, redo } from "./store/slices/buildSlice";
import { loadItems } from "./store/slices/apiSlice";
import CategorySection from "./components/CategorySection";
import BudgetBar from "./components/BudgetBar";
import BuildSummary from "./components/BuildSummary";
import Header from "./components/Header";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function App() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.build.isDarkMode);
  const summaryRef = useRef<HTMLDivElement>(null);
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch(undo());
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        dispatch(redo());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const categories = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof items>,
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: isDarkMode ? "#141414" : "#f5f5f5",
        }}
      >
        <Header />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <BudgetBar />
              {Object.entries(categories).map(([category, categoryItems]) => (
                <CategorySection
                  key={category}
                  category={category}
                  items={categoryItems}
                />
              ))}
            </Col>

            <Col xs={24} lg={8}>
              <div
                ref={summaryRef}
                style={{
                  position: "sticky",
                  top: 80,
                  height: "fit-content",
                }}
              >
                <BuildSummary  />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </ConfigProvider>
  );
}
