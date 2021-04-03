import { useCallback, useState } from "react";

export interface LargeTableData {
  id: string;
  name: string;
  updateDate: Date;
  counter: number;
  maxCount: number;
  canRemove: boolean;
}

interface LargeTableState {
  getRows: (query: RowsQuery) => RowsResult;
  addRow: () => void;
  removeRow: (id: string) => void;
  increment: (id: string) => void;
}

export interface RowsQuery {
  limit: number; // кол-во строк на странице
  offset: number; // пропускаем кол-во строк
  searchText?: string;
}

export interface RowsResult {
  rows: LargeTableData[];
  total: number; // всего строк
  query: RowsQuery;
}


export function useLargeTable(): LargeTableState {
  const [rows, setRows] = useState<LargeTableData[]>(() =>
    Array(10000).fill(0).map<LargeTableData>((v, i) => ({
      id: getId(i),
      name: getName(),
      canRemove: false,
      counter: 0,
      maxCount: (i % 17) + 3,
      updateDate: new Date(Date.now() - 144000000 + i * 60000),
    }))
  );

  const addRow = useCallback(() => {
    setRows(rows => [
      ...rows,
      {
        id: getId(random(0, 10000)),
        name: getName(),
        updateDate: new Date(),
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
    setRows(rows => rows.map(row => row.id === id && row.counter < row.maxCount ? ({ ...row, counter: row.counter + 1, updateDate: new Date() }) : row));
  }, []);

  const getRows = useCallback((query: RowsQuery) => {
    const { limit, offset } = query;
    return { rows: rows.slice(offset, offset + limit), limit, offset, total: rows.length };
  }, [])

  return { getRows, addRow, removeRow, increment };
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






