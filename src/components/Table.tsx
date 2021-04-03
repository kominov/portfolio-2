import React, { useMemo, useState } from 'react'
import { useLargeTable, RowsQuery } from '../hooks/useLargeTable'
import { RowOfTable } from './RowOfTable';


const PageSize = 20;

export const Table: React.FC = () => {

    const { getRows, increment, addRow, removeRow } = useLargeTable();
    const [query, setQuery] = useState<RowsQuery>({ limit: PageSize, offset: 0 });

    const rowsResult = useMemo(() => getRows(query), [getRows, query]);
    const { query: { limit, offset }, total, rows } = rowsResult;

    return (<>
        <table>
            <thead>
                <tr>
                    <th scope="col">Время добавления</th>
                    <th scope="col">Название</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Макс. <br />количество</th>
                    <th scope="col">Добавить кол-во</th>
                    <th scope="col">Удалить</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => {
                    return (<RowOfTable key={row.id} row={row} increment={increment} removeRow={removeRow} />)
                })}
            </tbody>
        </table>
        <Paging result={rowsResult} onChange={setQuery}/>
        pages count: {Math.ceil(total / limit)}<br></br>
        current page: {offset / limit + 1}<br></br>
        <button className="add__btn" onClick={e => addRow()}>Добавить строку</button>
    </>)
}