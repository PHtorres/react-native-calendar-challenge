import { TextColorVariant } from "../../theme";
import { DayGroupReminder } from "../../types/GroupReminder";
import { ReminderActionTypes } from "./reminderActionTypes";

export type ReminderColor = {
    hex: string;
    betterContractor: TextColorVariant
}

export type Reminder = {
    id: string;
    date: Date;
    title: string;
    color: ReminderColor;
}

export type ReminderState = {
    reminderList: Reminder[]
    dayGroupReminders:DayGroupReminder[]
}

export interface ReminderAction {
    type: ReminderActionTypes;
    reminder: Reminder;
    dayGroupReminders: DayGroupReminder[]
}

export type DispatchReminderType = (args: ReminderAction) => ReminderAction