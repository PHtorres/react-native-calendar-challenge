import { DayGroupReminder } from "../../types/GroupReminder"
import { ReminderActionTypes } from "./reminderActionTypes"
import { DispatchReminderType, Reminder, ReminderAction } from "./reminderTypes"


export function addReminder(reminder: Reminder) {
    const action: ReminderAction = {
        type: ReminderActionTypes.ADD_REMINDER,
        reminder,
        dayGroupReminders: []
    }

    return (dispatch: DispatchReminderType) => {
        dispatch(action)
    }
}

export function updateReminder(reminder: Reminder) {
    const action: ReminderAction = {
        type: ReminderActionTypes.UPDATE_REMINDER,
        reminder,
        dayGroupReminders: []
    }

    return (dispatch: DispatchReminderType) => {
        dispatch(action)
    }
}

export function removeReminder(reminder: Reminder) {
    const action: ReminderAction = {
        type: ReminderActionTypes.REMOVE_REMINDER,
        reminder,
        dayGroupReminders: []
    }

    return (dispatch: DispatchReminderType) => {
        dispatch(action)
    }
}

export function filterDayGroupReminders(dayGroupReminders:DayGroupReminder[]) {
    const action: ReminderAction = {
        type: ReminderActionTypes.FILTER_DAY_GROUP_REMINDERS,
        reminder:{} as Reminder,
        dayGroupReminders
    }

    return (dispatch: DispatchReminderType) => {
        dispatch(action)
    }
}