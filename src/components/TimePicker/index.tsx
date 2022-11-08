import React, { useMemo, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { HOURS_IN_DAY, MINUTES_IN_HOUR } from '../../services/time';
import { TIME_PICKER_LIST_ROW_HEIGHT, TIME_PICKER_NUMBER_BOX_HEIGHT } from '../Constants';
import { TextBoldMD, TextBoldXXS, TextRegularLG, TextRegularXS } from '../Text';

import {
    Container,
    FinishButton,
    Header,
    ListsSlot,
    NumberBox,
} from './styles';

interface TimePickerProps {
    visible: boolean;
    onFinish(selectedHour: string, selectedMinute: string): void;
    initialHour: string;
    inititalMinute: string;
}

export const TimePicker = ({ visible, onFinish, initialHour, inititalMinute }: TimePickerProps) => {

    const [selectedHour, setSelectedHour] = useState(initialHour);
    const [selectedMinute, setSelectedMinute] = useState(inititalMinute);

    const selectionResultLabel = useMemo(() => {
        return `${selectedHour}:${selectedMinute}`
    }, [selectedHour, selectedMinute])


    const handleFinishButton = () => {
        if (selectedHour.length === 0 || selectedMinute.length === 0) {
            Alert.alert('You must select a hour and a minute');
            return;
        }

        onFinish(selectedHour, selectedMinute);
    }

    const handleHourSelected = (hour: string) => {
        setSelectedHour(hour);
    }

    const handleMinuteSelected = (minute: string) => {
        setSelectedMinute(minute);
    }

    return (
        <Modal isVisible={visible}>
            <Container>
                <Header>
                    <TextBoldMD>{selectionResultLabel}</TextBoldMD>
                </Header>
                <TextRegularXS>Hour</TextRegularXS>
                <ListsSlot>
                    <FlatList
                        contentContainerStyle={{ height: TIME_PICKER_LIST_ROW_HEIGHT }}
                        horizontal
                        indicatorStyle='white'
                        getItemLayout={(item, index) => (
                            {
                                length: TIME_PICKER_NUMBER_BOX_HEIGHT,
                                offset: TIME_PICKER_NUMBER_BOX_HEIGHT * index,
                                index
                            }
                        )}
                        initialScrollIndex={Number(initialHour) - 1}
                        data={HOURS_IN_DAY}
                        renderItem={({ item }) => (
                            <NumberBox
                                isSelected={selectedHour === item}
                                onPress={() => handleHourSelected(item)}
                            >
                                <TextBoldXXS>{item}</TextBoldXXS>
                            </NumberBox>
                        )}
                    />
                </ListsSlot>
                <TextRegularXS>Minute</TextRegularXS>
                <ListsSlot>
                    <FlatList
                        contentContainerStyle={{ height: TIME_PICKER_LIST_ROW_HEIGHT }}
                        horizontal
                        indicatorStyle='white'
                        getItemLayout={(item, index) => (
                            {
                                length: TIME_PICKER_NUMBER_BOX_HEIGHT,
                                offset: TIME_PICKER_NUMBER_BOX_HEIGHT * index,
                                index
                            }
                        )}
                        initialScrollIndex={Number(inititalMinute) - 1}
                        data={MINUTES_IN_HOUR}
                        renderItem={({ item }) => (
                            <NumberBox
                                isSelected={selectedMinute === item}
                                onPress={() => handleMinuteSelected(item)}
                            >
                                <TextBoldXXS>{item}</TextBoldXXS>
                            </NumberBox>
                        )}
                    />
                </ListsSlot>
                <FinishButton onPress={handleFinishButton}>
                    <TextRegularLG color='primary'>OK</TextRegularLG>
                </FinishButton>
            </Container>
        </Modal>
    )
}