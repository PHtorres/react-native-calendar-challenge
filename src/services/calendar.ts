import { InitialCalendarData } from "../types/InitialCalendarData";
import { Month } from "../types/Month";
import { MonthView } from "../types/MonthView";

export const MONTHS = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];

export const WEEK_DAYS = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

/**
 * Returns a list of the dyas of the month.
 * Example: passing month length as 30, you will have a number list from 1 to 30.
*/
export const getDaysListByMonthLength = (monthLength: number): number[] => {
    return Array.apply(null, Array(monthLength)).map(function (x, i) { return i + 1; })
}

export const getMonthNameByIndex = (monthIndex: number): string => {
    return MONTHS[monthIndex];
}

/**
 * Returns the number of days in a month.
 * Example: passing month index as 1 and year as 2022, you will have 28 days.
 * Year parameter is needed because Feb month may have diferents days lengths depending of the year.
*/
export const getMonthLengthByIndexAndYear = (monthIndex: number, year: number): number => {
    return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Returns the week day index of the first day of the month.
 * Example: passing month index as 3 (April) and year as 2022, you will the week day index 5 (friday).
*/
export const getTheFirstMonthDayWeekIndexByMonthAndYear = (monthIndex: number, year: number): number => {
    const monthFirstDay = new Date(year, monthIndex, 1);
    return monthFirstDay.getDay();
}

export const getMonthDataByMonthAndYear = (monthIndex: number, year: number): MonthView => {

    return {
        monthIndex,
        year,
        name: getMonthNameByIndex(monthIndex),
        days: getDaysListByMonthLength(getMonthLengthByIndexAndYear(monthIndex, year)),
        firstDayWeekIndex: getTheFirstMonthDayWeekIndexByMonthAndYear(monthIndex, year)
    }
}


export const formatedDaysListWithFakeDays = (daysList: number[], firstDayWeekIndex: number) => {
    //the beggining of the days array in view must respect its week day
    let counter = 0;
    while (counter < firstDayWeekIndex) {
        daysList.unshift(counter + 40); //add fake itens different of a possible month day, starting in 32
        counter++;
    }

    return daysList;
}

export const fetchInitialCalendarData = (): InitialCalendarData => {

    const currentDate = new Date();
    const months: Month[] = [
        {
            monthIndex: 0,
            year: 2021
        },
        {
            monthIndex: 1,
            year: 2021
        },
        {
            monthIndex: 2,
            year: 2021
        },
        {
            monthIndex: 3,
            year: 2021
        },
        {
            monthIndex: 4,
            year: 2021
        },
        {
            monthIndex: 5,
            year: 2021
        },
        {
            monthIndex: 6,
            year: 2021
        },
        {
            monthIndex: 7,
            year: 2021
        },
        {
            monthIndex: 8,
            year: 2021
        },
        {
            monthIndex: 9,
            year: 2021
        },
        {
            monthIndex: 10,
            year: 2021
        },
        {
            monthIndex: 11,
            year: 2021
        },
        {
            monthIndex: 0,
            year: 2022
        },
        {
            monthIndex: 1,
            year: 2022
        },
        {
            monthIndex: 2,
            year: 2022
        },
        {
            monthIndex: 3,
            year: 2022
        },
        {
            monthIndex: 4,
            year: 2022
        },
        {
            monthIndex: 5,
            year: 2022
        },
        {
            monthIndex: 6,
            year: 2022
        },
        {
            monthIndex: 7,
            year: 2022
        },
        {
            monthIndex: 8,
            year: 2022
        },
        {
            monthIndex: 9,
            year: 2022
        },
        {
            monthIndex: 10,
            year: 2022
        },
        {
            monthIndex: 11,
            year: 2022
        },
    ];

    return {
        currentMonthIndex: months.findIndex(item => item.monthIndex === currentDate.getMonth() && item.year === currentDate.getFullYear()),
        months
    }
}