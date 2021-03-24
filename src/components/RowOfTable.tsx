import React from 'react'
import { LargeTableData } from '../hooks/useLargeTable'
import { TimeOfAdded } from './TimeOfAdded'
interface RowOfTableProps {
    row: LargeTableData
    increment: (id: string) => void
    removeRow: (id: string) => void
}


export const RowOfTable: React.FC<RowOfTableProps> = React.memo(({ row, increment, removeRow }) => {
    return (<>
        <tr>
            <td><TimeOfAdded timeOfAdded={row.updateDate} /> </td>
            <td>{row.name}</td>
            <td>{row.counter}</td>
            <td>{row.maxCount}</td>
            <td className="pointer" onClick={e => increment(row.id)}>{row.counter < row.maxCount ? (<span>+</span>) : ""}</td>
            <td >{row.canRemove ? <button className="btn__delete" onClick={e => removeRow(row.id)}>Удалить</button> : ""}</td>
        </tr>
    </>)
})