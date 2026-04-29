# 🖥️ Smart Bundle Builder

A smart PC component configurator with budget management, incompatibility detection, and state history.

---

## 🚀 How to Run the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Run the mock backend (json-server)
```bash
npx json-server db.json --port 3001
```

### 3. Run the development server (in a new terminal)
```bash
npm run dev
```

### 4. Open in browser

> ⚠️ Make sure both the json-server and the dev server are running at the same time.

---

## 🏗️ Architectural Approach

### Tech Stack
- **Framework:** React + TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** Ant Design (antd)
- **Mock Backend:** json-server
- **PDF Export:** jsPDF

### Redux Store Structure
The store is split into two slices:

| Slice | Responsibility |
|-------|---------------|
| `buildSlice` | Selections, Undo/Redo history, Dark mode |
| `itemsSlice` | Fetching items from json-server API |

---

## ↩️ Undo / Redo State Logic

The Undo/Redo system is implemented using a **snapshot-based history stack** inside `buildSlice`.

### How it works

Every time the user selects or deselects a component, a snapshot of the current `selections` is pushed into the `history` array. A `historyIndex` pointer tracks the current position.

### Undo
Move the pointer one step back and restore that snapshot:
### Redo
Move the pointer one step forward:
### Branching History
If the user undoes and then makes a new selection, all future history is discarded:
This is handled using `.slice(0, historyIndex + 1)` before pushing the new snapshot

## ⚡ Key Features
### Keyboard Shortcuts
### Dark Mode
### PDF Export | Download a formatted build summary as PDF using jsPDF |
### Mock Backend
### Responsive 

## 📁 Project Structure
src/
├── components/
│   ├── Header.tsx          
│   ├── BudgetBar.tsx      
│   ├── CategorySection.tsx 
│   ├── ItemCard/
│   │   ├── index.tsx     
│   │   └── index.module.css
│   ├── BuildSummary.tsx    
│   └── PDFExport.tsx       
├── store/
│   ├── index.ts            
│   ├── hooks.ts            
│   └── slices/
│       ├── buildSlice.ts   
│       └── itemsSlice.ts   
├── services/
│   └── api.ts             
├── types/
│   └── index.ts            
└── data/
└── components.ts       