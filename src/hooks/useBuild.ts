import { useAppSelector } from "../store/hooks";

const BUDGET = 1000;

export function useBuild() {
  const selections = useAppSelector((state) => state.build.selections);
  const items = useAppSelector((state) => state.items.items);

  const totalCost = Object.values(selections).reduce((sum, selectedId) => {
    const selectedItem = items.find((i) => i.id === selectedId);
    return sum + (selectedItem?.price ?? 0);
  }, 0);

  const remaining = BUDGET - totalCost;
  const percentage = Math.round((totalCost / BUDGET) * 100);

  return { selections, items, totalCost, remaining, percentage };
}