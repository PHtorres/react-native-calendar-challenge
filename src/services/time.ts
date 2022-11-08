import { formatTimeNumberToString } from "../utils";

const getHourMinutes = () => {
    let counter = 0;
    const minutesList = [];
    while (counter <= 59) {
        minutesList.push(formatTimeNumberToString(counter));
        counter++;
    }

    return minutesList;
}

const getHours = () => {
    let counter = 1;
    const hoursList = [];
    while (counter <= 24) {
        hoursList.push(formatTimeNumberToString(counter));
        counter++;
    }

    return hoursList;
}



export const HOURS_IN_DAY = getHours();
export const MINUTES_IN_HOUR = getHourMinutes();