import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadItems } from "../store/slices/apiSlice";

export default function ApiData() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Items from API ({items.length})</h2>
      {items.map((item) => (
        <div key={item.id} style={{ 
          padding: 12, 
          margin: 8, 
          border: "1px solid #d9d9d9",
          borderRadius: 8 
        }}>
          <strong>{item.name}</strong> — ${item.price} — {item.category}
        </div>
      ))}
    </div>
  );
}