import React, { useMemo, useState } from 'react'
import { PageSize } from '../constans';
import { useLargeTable, RowsQuery } from '../hooks/useLargeTable'
import { Paginator } from './Paginator/Paginator';
import { RowOfTable } from './RowOfTable';




export const Table: React.FC = () => {

    const { getRows, increment, addRow, removeRow } = useLargeTable();
    const [query, setQuery] = useState<RowsQuery>({ limit: PageSize, offset: 0 });

    const rowsResult = useMemo(() => getRows(query), [getRows, query]);
    const { limit, offset, totalRows, rows } = rowsResult;
    console.log(rows)
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
        <Paginator result={rowsResult} onChange={setQuery} />
        {Math.ceil(totalRows / limit) === Math.floor(offset / limit + 1) &&
            (<button className="add__btn" onClick={e => addRow()}>Добавить строку</button>)
            
        }

    </>)
}