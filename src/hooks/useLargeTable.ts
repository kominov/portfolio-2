import { useCallback, useState } from "react";

export interface LargeTableData {
  id: string;
  name: string;
  timeOfAdded: number
  // createDate: string;
  counter: number;
  maxCount: number;
  canRemove: boolean;
}

interface LargeTableState {
  rows: LargeTableData[];
  addRow: () => void;
  removeRow: (id: string) => void;
  increment: (id: string) => void;
}

export function useLargeTable(): LargeTableState {
  const [rows, setRows] = useState<LargeTableData[]>(() =>
    Array(10).fill(0).map<LargeTableData>((v, i) => ({
      id: getId(i),
      name: getName(),
      canRemove: false,
      counter: 0,
      maxCount: (i % 17) + 3,
      timeOfAdded: Date.now(),
      // createDate: new Date(Date.now() - 144000000 + i * 60000).toISOString(),
    }))
  );

  const addRow = useCallback(() => {
    setRows(rows => [
      ...rows,
      {
        id: getId(random(0, 10000)),
        name: getName(),
        timeOfAdded: Date.now(),
        // createDate: new Date().toISOString(),
        maxCount: random(0, 20),
        counter: 0,
        canRemove: true,
      },
    ]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setRows(rows => rows.filter(row => row.id !== id));
  }, []);

  const increment = useCallback((id: string) => {
    rows.map(row => {
      if (row.id === id) {
        const objIndex = rows.findIndex(obj => obj.id === row.id);
        const updatedObj = { ...rows[objIndex], counter: row.counter === row.maxCount ? row.counter : ++row.counter };
        const updatedProjects = [
          ...rows.slice(0, objIndex),
          updatedObj,
          ...rows.slice(objIndex + 1),
        ];
        setRows(updatedProjects);
      }

    })
  }, []);

  return { rows, addRow, removeRow, increment };
}

function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getId(i: number) {
  return `${Date.now()}${i.toString().padStart(6, "0")}`;
}

function getName() {
  const names = [
    "Instead",
    "When",
    "a",
    "around",
    "be",
    "can",
    "can't",
    "comes",
    "decisions",
    "delivering",
    "expected",
    "have",
    "health",
    "help",
    "illness",
    "is",
    "it",
    "judge",
    "like",
    "message",
    "most",
    "not",
    "or",
    "people",
    "person",
    "personal",
    "prevent",
    "safe",
    "said",
    "serious",
    "she",
    "shown",
    "statement",
    "studies",
    "the",
    "they",
    "to",
    "true",
    "trust",
    "vaccine",
    "whether",
    "will",
  ];
  return Array(random(2, 14)).fill(0)
    .map(() => names[random(0, names.length - 1)])
    .join(" ");
}






