import React from 'react';
import { WEEK_DAYS } from '../../services/calendar';
import { Reminder } from '../../state/reminder/reminderTypes';
import { onlyTime } from '../../utils';
import { TextBoldXXS, TextRegularXXXS, TextRegularXXS, TextBoldLG } from '../Text';

import {
    Container,
    DaySlot,
    ContentSlot,
    DateAndTimeSlot,
    TitleSlot
} from './styles';

interface ReminderCardProps {
    showDayLeftSlot?: boolean;
    dayNumber: number;
    reminder: Reminder
};

export const ReminderCard = React.memo(({ reminder, showDayLeftSlot, dayNumber }: ReminderCardProps) => {

    const weekDayName = WEEK_DAYS[new Date(reminder.date).getDay()];

    return (
        <Container>
            <DaySlot>
                {showDayLeftSlot && (
                    <>
                        <TextRegularXXXS color='medium'>{weekDayName}</TextRegularXXXS>
                        <TextBoldLG>{dayNumber}</TextBoldLG>
                    </>
                )}
            </DaySlot>
            <ContentSlot backgroudColor={reminder.color.hex}>
                <TitleSlot>
                    <TextBoldXXS color={reminder.color.betterContractor}>
                        {reminder.title}
                    </TextBoldXXS>
                </TitleSlot>
                <DateAndTimeSlot>
                    <TextRegularXXS color={reminder.color.betterContractor}>
                        {onlyTime(reminder.date)}
                    </TextRegularXXS>
                </DateAndTimeSlot>
            </ContentSlot>
        </Container>
    )
})