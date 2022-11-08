import { initialDayGroupRemindersData, inititalRemindersData } from "../../services/reminder"
import { ReminderActionTypes } from "./reminderActionTypes"
import { ReminderState, ReminderAction } from "./reminderTypes"

const initialState: ReminderState = {
    reminderList: inititalRemindersData(),
    dayGroupReminders: initialDayGroupRemindersData()
}


export const reminderReducer = (
    state: ReminderState = initialState,
    action: ReminderAction
): ReminderState => {

    switch (action.type) {

        case ReminderActionTypes.ADD_REMINDER:

            return {
                ...state,
                reminderList: state.reminderList.concat(action.reminder),
            }


        case ReminderActionTypes.REMOVE_REMINDER:
            const updatedReminderList = state.reminderList.filter(
                reminder => reminder.id !== action.reminder.id
            )

            return {
                ...state,
                reminderList: updatedReminderList,
            }

        case ReminderActionTypes.UPDATE_REMINDER:
            const listWithoutReminderToUpdate = state.reminderList.filter(
                reminder => reminder.id !== action.reminder.id
            )

            const newList = listWithoutReminderToUpdate.concat(action.reminder);

            return {
                ...state,
                reminderList: newList,
            }

        case ReminderActionTypes.FILTER_DAY_GROUP_REMINDERS:

            return {
                ...state,
                dayGroupReminders: action.dayGroupReminders,
            }
    }

    return state
}