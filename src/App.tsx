import { useEffect, useRef } from "react";
import { ConfigProvider, theme } from "antd";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { undo, redo } from "./store/slices/buildSlice";
import CategorySection from "./components/CategorySection";
import BudgetBar from "./components/BudgetBar";
import BuildSummary from "./components/BuildSummary";
import Header from "./components/Header";
import { items } from "./data/components";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function App() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.build.isDarkMode);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Keyboard Shortcuts
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

  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div style={{ minHeight: "100vh", background: isDarkMode ? "#141414" : "#f5f5f5" }}>
        <Header />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <div>
            <BudgetBar />
            {Object.entries(categories).map(([category, categoryItems]) => (
              <CategorySection
                key={category}
                category={category}
                items={categoryItems}
              />
            ))}
          </div>
          <div ref={summaryRef}>
            <BuildSummary summaryRef={summaryRef} />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}