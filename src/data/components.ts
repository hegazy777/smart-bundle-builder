import type  { Item } from "../types";

export const items: Item[] = [

  {
    id: "cpu-1",
    name: "Intel Core i5",
    price: 250,
    category: "CPU",
    incompatibleWith: ["mobo-2"],
  },
  {
    id: "cpu-2",
    name: "AMD Ryzen 5",
    price: 220,
    category: "CPU",
    incompatibleWith: ["mobo-1"],
  },

  
  {
    id: "mobo-1",
    name: "Intel Motherboard",
    price: 150,
    category: "Motherboard",
    incompatibleWith: ["cpu-2"],
  },
  {
    id: "mobo-2",
    name: "AMD Motherboard",
    price: 140,
    category: "Motherboard",
    incompatibleWith: ["cpu-1"],
  },

  
  {
    id: "ram-1",
    name: "16GB DDR4",
    price: 200,
    category: "RAM",
    incompatibleWith: [],
  },
  {
    id: "ram-2",
    name: "32GB DDR5",
    price: 550,
    category: "RAM",
    incompatibleWith: [],
  },

  
  
 
];