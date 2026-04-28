
export  interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  incompatibleWith: string[];
}

export interface BuildState {
  selections: Record<string, string>;
  history: Record<string, string>[];
  historyIndex: number;
  isDarkMode: boolean;
}