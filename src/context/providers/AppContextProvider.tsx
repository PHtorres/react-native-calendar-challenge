import React, { useCallback } from 'react';
import { Reminder, ReminderState } from '../../state/reminder/reminderTypes';
import { AppContext } from '../AppContext';
import { Dispatch } from 'redux';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
    addReminder as _addReminder,
    removeReminder as _removeReminder,
    updateReminder as _updateReminder,
    filterDayGroupReminders as _filterDayGroupReminders
} from '../../state/reminder/reminderActionCreators';
import { Month } from '../../types/Month';
import { mapRemindersListToDayGroupOfMonth } from '../../services/reminder';
import { DayGroupReminder } from '../../types/GroupReminder';
import { monthsAreEqual } from '../../utils';

export const AppContextProvider: React.FC = ({ children }) => {

    const dispatch: Dispatch<any> = useDispatch();

    const reminders: Reminder[] = useSelector(
        (state: ReminderState) => state.reminderList,
        shallowEqual
    )

    const dayGroupReminders: DayGroupReminder[] = useSelector(
        (state: ReminderState) => state.dayGroupReminders,
        shallowEqual
    )

    const addReminder = useCallback((reminder: Reminder) => {
        dispatch(_addReminder(reminder))
    }, [dispatch]);

    const removeReminder = useCallback((reminder: Reminder) => {
        dispatch(_removeReminder(reminder))
    }, [dispatch]);

    const updateReminder = useCallback((reminder: Reminder) => {
        dispatch(_updateReminder(reminder))
    }, [dispatch]);

    const getReminder = useCallback((id: string): Reminder => {
        return reminders.filter(item => item.id === id)[0];
    }, [reminders]);

    const getRemindersByMonthAndYear = useCallback((month: number, year: number): Reminder[] => {
        if (reminders) {
            return reminders.filter(
                ({ date }) =>
                    new Date(date).getMonth() === month &&
                    new Date(date).getFullYear() === year
            );
        }

        return [];
    }, [reminders]);

    const getRemindersByDate = useCallback((date: Date): Reminder[] => {
        return reminders.filter(
            item =>
                new Date(item.date).getDate() === date.getDate() &&
                new Date(item.date).getMonth() === date.getMonth() &&
                new Date(item.date).getFullYear() === date.getFullYear()
        );
    }, [reminders]);

    const searchReminders = useCallback((term: string): Reminder[] => {
        return reminders.filter(item => item.title.includes(term) || term.includes(item.title));
    }, [reminders]);

    const updateDayGroupReminders = useCallback((month: Month) => {
        const filteredByMonthAndYear = reminders
            .filter(item => {
                const forcedDate = new Date(item.date);
                return monthsAreEqual(forcedDate, month)
            });

        const dayGroupResult = mapRemindersListToDayGroupOfMonth(filteredByMonthAndYear);
        dispatch(_filterDayGroupReminders(dayGroupResult))

    }, [reminders, dispatch])

    return (
        <AppContext.Provider value={{
            addReminder,
            removeReminder,
            updateReminder,
            getRemindersByMonthAndYear,
            getRemindersByDate,
            getReminder,
            searchReminders,
            reminders,
            updateDayGroupReminders,
            dayGroupReminders
        }}>
            {children}
        </AppContext.Provider>
    )
}
