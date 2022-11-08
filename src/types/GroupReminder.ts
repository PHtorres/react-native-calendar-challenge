import { Reminder } from "../state/reminder/reminderTypes";

export type DayGroupReminder = {
    day: number;
    reminders: Reminder[]
}