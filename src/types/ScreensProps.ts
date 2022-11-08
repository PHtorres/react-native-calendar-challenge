import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Reminder } from '../state/reminder/reminderTypes';
import { AppStackParamList } from './Navigation';

export interface EditReminderScreenProps {
    reminder:Reminder;
}

export type EditReminderScreenNavigationProps = NativeStackScreenProps<AppStackParamList, 'EditReminderScreen'>;