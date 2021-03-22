import React from 'react'
import { useLargeTable } from '../hooks/useLargeTable'
import { RowOfTable } from './RowOfTable';




export const Table: React.FC = () => {

    const { rows, increment, addRow, removeRow } = useLargeTable();


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
        <button className="add__btn" onClick={e => addRow()}>Добавить строку</button>
    </>)
}