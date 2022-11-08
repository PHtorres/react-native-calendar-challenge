import { Month } from "./Month";

export interface MonthView extends Month {
    name: string;
    days: number[]
    firstDayWeekIndex: number;
}