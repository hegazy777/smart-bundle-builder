import type { Item } from "../types";

const BASE_URL = "http://localhost:3001";

// get data from api
export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(`${BASE_URL}/items`);
    if (!response.ok) throw new Error("Failed to fetch items");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchItems error:", error);
    return [];
  }
};

// for old data saved
// export const fetchDraft = async (): Promise<Record<string, string>> => {
//   const response = await fetch(`${BASE_URL}/userSelected`);
//   const data = await response.json();
//   return data.selections;
// };

// save new data
// export const saveData = async (
//   selections: Record<string, string>,
// ): Promise<void> => {
//   await fetch(`${BASE_URL}/userSelected`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id: 1, selections }),
//   });
// };
