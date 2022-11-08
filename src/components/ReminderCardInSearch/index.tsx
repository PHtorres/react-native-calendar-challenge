import React from 'react';
import { Reminder } from '../../state/reminder/reminderTypes';
import { formatDateAndTime } from '../../utils';
import { TextBoldXXS, TextRegularXXS } from '../Text';

import {
    Container,
    ContentSlot,
    DateAndTimeSlot,
    TitleSlot
} from './styles';

interface ReminderCardInSearchProps {
    reminder: Reminder
};

export const ReminderCardInSearch = React.memo(({ reminder }: ReminderCardInSearchProps) => {

    return (
        <Container>
            <ContentSlot backgroudColor={reminder.color.hex}>
                <TitleSlot>
                    <TextBoldXXS color={reminder.color.betterContractor}>
                        {reminder.title}
                    </TextBoldXXS>
                </TitleSlot>
                <DateAndTimeSlot>
                    <TextRegularXXS color={reminder.color.betterContractor}>
                        {formatDateAndTime(reminder.date)}
                    </TextRegularXXS>
                </DateAndTimeSlot>
            </ContentSlot>
        </Container>
    )
})