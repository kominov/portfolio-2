import React from 'react'
import { useLargeTable } from '../hooks/useLargeTable'



export const MyDate: React.FC = () => {
    // const ref = useRef<HTMLInputElement>(null);
    // const [time, setTime] = useState<ITime[]>([]);
    const { rows, increment, addRow, removeRow } = useLargeTable();

    function declOfNum(titles: string[]) {
        let cases = [2, 0, 1, 1, 1, 2];
        return function (number: number) {
            number = Math.abs(number);
            return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
        }

    }
    const timeCounter = (timeOfAdded: number) => {
        const arrayOfMinutes = ["минуту", "минуты", "минут"];
        const arrayOfHours = ["час", "часа", "часов"];
        let timeWasPassed = Date.now() - timeOfAdded;
        let minutesWasPass = Math.floor(timeWasPassed / (1000 * 60));
        let hoursWasPass = Math.floor(timeWasPassed / (1000 * 60 * 60));

        if (minutesWasPass < 5) {
            return "добавлено сейчас"
        }
        if (minutesWasPass >= 5 && minutesWasPass <= 59) {
            let minutes = declOfNum(arrayOfMinutes);
            return (`Добавлено:${minutesWasPass} ${minutes(minutesWasPass)} назад`)
        }
        if (hoursWasPass >= 1 && hoursWasPass < 24) {
            let hours = declOfNum(arrayOfHours);
            return (`Добавлено:${hoursWasPass} ${hours(hoursWasPass)} назад`)
        }
        if (hoursWasPass > 24) return (`Добавлено:${new Date(timeOfAdded).toLocaleString()}`);
    }

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
                    return (<tr key={row.id}>
                        <td>{timeCounter(row.timeOfAdded)}</td>
                        <td>{row.name}</td>
                        <td>{row.counter}</td>
                        <td>{row.maxCount}</td>
                        <td className="pointer" onClick={e => increment(row.id)}>{row.counter < row.maxCount ? (<span>+</span>) : ""}</td>
                        <td >{row.canRemove ? <button className="btn__delete" onClick={e => removeRow(row.id)}>Удалить</button> : ""}</td>
                    </tr>)
                })}
            </tbody>
        </table>
        <button className="add__btn"onClick={e => addRow()}>Добавить строку</button>
    </>)
}