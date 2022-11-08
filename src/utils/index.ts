import { Month } from "../types/Month";

export const datesAreEqual = (date1:Date, date2:Date) => {
    return false || (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export const formatDate = (date: Date) => {
    const forcedDate = new Date(date);
    return forcedDate.toLocaleDateString('eng-US', {
        day: 'numeric',
        month: 'short',
    })
}

export const formatDateAndTime = (date: Date) => {
    const forcedDate = new Date(date);
    return forcedDate.toLocaleDateString('eng-US', {
        day: 'numeric',
        month: 'short',
        hour:'2-digit',
        minute:'2-digit'
    })
}

export const monthsAreEqual = (date: Date, month: Month) => {
    return date.getMonth() === month.monthIndex && date.getFullYear() === month.year;
}

export const compareDatesToSort = (a: Date, b: Date) => {
    const forced_a = new Date(a);
    const forced_b = new Date(b);

    if (forced_a < forced_b) {
        return -1;
    }

    if (forced_a > forced_b) {
        return 1;
    }

    return 0
}

export const compareNumbersToSort = (a: number, b: number) => {

    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0
}

export const formatTimeNumberToString = (number: number) => {
    if (number > 9) return number.toString();
    return `0${number.toString()}`;
}

export const onlyTime = (date: Date) => {
    const forcedDate = new Date(date);
    const onlyTimeDate = new Date(0, 0, 0, forcedDate.getHours(), forcedDate.getMinutes())
    const resultWithDate = onlyTimeDate.toLocaleDateString('eng-US', {
        hour: '2-digit',
        minute: '2-digit',
    })

    const onlyTimeResult = resultWithDate.split(',')[1];
    return onlyTimeResult;
}