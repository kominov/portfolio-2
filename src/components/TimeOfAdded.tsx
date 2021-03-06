import React, { useCallback, useEffect, useState } from 'react'

interface TimeOfAddedProps {
    timeOfAdded: Date;
}


export const TimeOfAdded: React.FC<TimeOfAddedProps> = ({ timeOfAdded }) => {





    function declOfNum(titles: string[]) {
        let cases = [2, 0, 1, 1, 1, 2];
        return function (number: number) {
            number = Math.abs(number);
            return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
        }

    }
    const timeCounter = useCallback((timeOfAdded: Date) => {
        const arrayOfMinutes = ["минуту", "минуты", "минут"];
        const arrayOfHours = ["час", "часа", "часов"];
        let timeWasPassed = Date.now() - timeOfAdded.getTime();
        let minutesWasPass = Math.floor(timeWasPassed / (1000 * 60));
        let hoursWasPass = Math.floor(timeWasPassed / (1000 * 60 * 60));

        if (minutesWasPass < 1) {
            return `Добавлено:\r\n сейчас`
        }
        if (minutesWasPass >= 1 && minutesWasPass <= 59) {
            let minutes = declOfNum(arrayOfMinutes);
            return (`Добавлено:\r\n ${minutesWasPass} ${minutes(minutesWasPass)} назад`)
        }
        if (hoursWasPass >= 1 && hoursWasPass < 24) {
            let hours = declOfNum(arrayOfHours);
            return (`Добавлено:\r\n ${hoursWasPass} ${hours(hoursWasPass)} назад`)
        }
        if (hoursWasPass >= 24) return (`Добавлено:\r\n ${new Date(timeOfAdded).toLocaleString()}`);
    }, []);
    const [addedTime, setAddedTime] = useState<string | undefined>(timeCounter(timeOfAdded));

    useEffect(() => {
        setAddedTime(timeCounter(timeOfAdded));
        let timer = setInterval(() => {
            setAddedTime(timeCounter(timeOfAdded))
        }, 10000);
        return () => clearInterval(timer);
    }, [timeCounter, timeOfAdded])
    return (<>
        {addedTime}
    </>)
}