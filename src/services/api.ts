import type { Item } from "../types";

const BASE_URL = "http://localhost:3001";

// get data from api
export const fetchdata = async (): Promise<Item[]> => {
  const response = await fetch(`${BASE_URL}/items`);
  const data = await response.json();
  return data;
};


// for old data saved
export const fetchDraft = async (): Promise<Record<string, string>> => {
  const response = await fetch(`${BASE_URL}/userSelected`);
  const data = await response.json();
  return data.selections;
};

// save new data
export const saveData = async (selections: Record<string, string>): Promise<void> => {
  await fetch(`${BASE_URL}/userSelected`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 1, selections }),
  });
};