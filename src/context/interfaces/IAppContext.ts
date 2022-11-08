import { Reminder } from "../../state/reminder/reminderTypes";
import { DayGroupReminder } from "../../types/GroupReminder";
import { Month } from "../../types/Month";

export interface IAppContext {
    addReminder(reminder: Reminder): void;
    removeReminder(reminder: Reminder): void;
    updateReminder(reminder: Reminder): void;
    getRemindersByMonthAndYear(month: number, year: number): Reminder[];
    getRemindersByDate(date: Date): Reminder[];
    getReminder(id: string): Reminder;
    searchReminders(term: string): Reminder[];
    updateDayGroupReminders(month: Month): void;
    reminders: Reminder[];
    dayGroupReminders: DayGroupReminder[];
}