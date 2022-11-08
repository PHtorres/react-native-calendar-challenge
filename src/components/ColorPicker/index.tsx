import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_OPTIONS } from '../../services/reminder';
import { ReminderColor } from '../../state/reminder/reminderTypes';
import { COLOR_PICKER_LIST_ROW_HEIGHT } from '../Constants';
import { TextBoldMD, TextRegularLG } from '../Text';

import {
    Container,
    FinishButton,
    Header,
    ListsSlot,
    ColorBox
} from './styles';

interface ColorPickerProps {
    visible: boolean;
    onFinish(selectedColor: ReminderColor): void;
}

export const ColorPicker = ({ visible, onFinish }: ColorPickerProps) => {

    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);


    const handleColorSelected = (color: ReminderColor) => {
        setSelectedColor(color);
    }

    const handleFinishButton = () => {
        onFinish(selectedColor);
    }

    return (
        <Modal isVisible={visible}>
            <Container>
                <Header>
                    <TextBoldMD>Choose a color</TextBoldMD>
                </Header>
                <ListsSlot>
                    <FlatList
                        contentContainerStyle={{ height: COLOR_PICKER_LIST_ROW_HEIGHT }}
                        horizontal
                        indicatorStyle='white'
                        data={COLOR_OPTIONS}
                        renderItem={({ item }) => (
                            <ColorBox
                                isSelected={selectedColor.hex === item.hex}
                                hex={item.hex}
                                onPress={() => handleColorSelected(item)}
                            />
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