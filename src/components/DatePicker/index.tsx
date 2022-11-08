import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { getMonthNameByIndex } from '../../services/calendar';
import { Month } from '../../types/Month';
import { Calendar } from '../Calendar';
import { TextBoldXXS, TextRegularLG } from '../Text';

import {
    Container, TitleSlot,
} from './styles';

interface DatePickerProps {
    visible: boolean;
    onFinish(selectedDate: Date): void;
    initialDate: Date
}

export const DatePicker = ({ visible, onFinish, initialDate }: DatePickerProps) => {

    const [datePickerWidth, setDatePickerWidth] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState<Month>({
        monthIndex: initialDate.getMonth(),
        year: initialDate.getFullYear()
    })

    return (
        <Modal
            onLayout={event => setDatePickerWidth(event.nativeEvent.layout.width)}
            isVisible={visible}
        >
            <Container>
                <TitleSlot>
                    <TextRegularLG>{getMonthNameByIndex(selectedMonth?.monthIndex)}</TextRegularLG>
                    <TextBoldXXS>{selectedMonth?.year}</TextBoldXXS>
                </TitleSlot>
                {datePickerWidth > 0 &&
                    <Calendar
                        width={datePickerWidth}
                        onMonthChanged={month => setSelectedMonth(month)}
                        onDateChange={date => onFinish(date)}
                        startOpen={true}
                    />
                }
            </Container>
        </Modal>
    )
}