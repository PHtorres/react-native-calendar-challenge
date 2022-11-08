import uuid from 'react-native-uuid';
import { Reminder, ReminderColor } from "../state/reminder/reminderTypes";
import { DayGroupReminder } from "../types/GroupReminder";
import { compareDatesToSort, compareNumbersToSort, monthsAreEqual } from '../utils';

export const COLOR_OPTIONS: ReminderColor[] = [
    {
        hex: '#3F5D7D',
        betterContractor: 'light'
    },
    {
        hex: '#279B61',
        betterContractor: 'dark'
    },
    {
        hex: '#993333',
        betterContractor: 'light'
    },
    {
        hex: '#A3E496',
        betterContractor: 'dark'
    },
    {
        hex: '#95CAE4',
        betterContractor: 'dark'
    },
    {
        hex: '#FFCC33',
        betterContractor: 'dark'
    },
    {
        hex: '#CC6699',
        betterContractor: 'dark'
    },
]

export const mapRemindersListToDayGroupOfMonth = (reminders: Reminder[]): DayGroupReminder[] => {
    const dayGroupList: DayGroupReminder[] = [];
    const diferentsDays = getDiferentsDaysInRemindersList(reminders);
    if (diferentsDays.length > 0) {
        diferentsDays.forEach(day => {
            dayGroupList.push({
                day,
                reminders: reminders
                    .filter(item => new Date(item.date).getDate() === day)
                    .sort((a, b) => compareDatesToSort(a.date, b.date))
            });
        });

        return dayGroupList.sort((a, b) => compareNumbersToSort(a.day, b.day));
    }

    return [];
}

const getDiferentsDaysInRemindersList = (reminders: Reminder[]): number[] => {
    const newList: number[] = [];
    reminders.forEach(item => {
        const itemDate = new Date(item.date).getDate();
        if (valueDoesNotExistInList(newList, itemDate)) {
            newList.push(itemDate)
        }
    });

    return newList;
}

const valueDoesNotExistInList = (list: number[], value: number): boolean => {
    if (!list.length) return true;
    const filteredResult = list.filter(item => item === value);
    return filteredResult.length === 0;
}

export const inititalRemindersData = (): Reminder[] => {
    return [
        {
            color: COLOR_OPTIONS[0],
            date: new Date(2022, 1, 10, 12, 35),
            id: String(uuid.v4()),
            title: 'Go to market'
        },
        {
            color: COLOR_OPTIONS[1],
            date: new Date(2022, 2, 11, 12, 35),
            id: String(uuid.v4()),
            title: 'Call mom'
        },
        {
            color: COLOR_OPTIONS[2],
            date: new Date(2022, 1, 12, 12, 35),
            id: String(uuid.v4()),
            title: 'Post on linkedin'
        },
        {
            color: COLOR_OPTIONS[3],
            date: new Date(2022, 1, 12, 22, 35),
            id: String(uuid.v4()),
            title: 'Wacth NBA'
        },
        {
            color: COLOR_OPTIONS[4],
            date: new Date(2022, 1, 12, 18, 35),
            id: String(uuid.v4()),
            title: 'Clean office'
        },
        {
            color: COLOR_OPTIONS[1],
            date: new Date(2022, 1, 13, 12, 35),
            id: String(uuid.v4()),
            title: 'Buy food'
        },
        {
            color: COLOR_OPTIONS[4],
            date: new Date(2022, 2, 13, 17, 35),
            id: String(uuid.v4()),
            title: 'Call brother'
        },
        {
            color: COLOR_OPTIONS[3],
            date: new Date(2022, 1, 13, 20, 35),
            id: String(uuid.v4()),
            title: 'Wash clothes'
        },
        {
            color: COLOR_OPTIONS[2],
            date: new Date(2022, 1, 16, 12, 35),
            id: String(uuid.v4()),
            title: 'Work on project'
        },
        {
            color: COLOR_OPTIONS[2],
            date: new Date(2022, 1, 16, 22, 35),
            id: String(uuid.v4()),
            title: 'Pay Netflix'
        },
        {
            color: COLOR_OPTIONS[4],
            date: new Date(2022, 2, 22, 22, 35),
            id: String(uuid.v4()),
            title: 'Walk with dogs'
        },
        {
            color: COLOR_OPTIONS[6],
            date: new Date(2022, 2, 22, 16, 35),
            id: String(uuid.v4()),
            title: 'Cook beens'
        },
    ]
}

export const initialDayGroupRemindersData = () => {
    const today = new Date();
    const filteredReminders = inititalRemindersData().filter(item => {
        const forcedDate = new Date(item.date);
        return monthsAreEqual(forcedDate, {
            monthIndex: today.getMonth(),
            year: today.getFullYear()
        })
    });

    return mapRemindersListToDayGroupOfMonth(filteredReminders);
}