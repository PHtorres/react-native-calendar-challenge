import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TextRegularMD, TextRegularXXS } from '../../components/Text';
import { useTheme } from 'styled-components';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableBox } from '../../components/TouchableBox';
import { TimePicker } from '../../components/TimePicker';
import { DatePicker } from '../../components/DatePicker';
import { COLOR_OPTIONS } from '../../services/reminder';
import { ColorBox } from '../../components/ColorPicker/styles';
import { ColorPicker } from '../../components/ColorPicker';

import {
    Container,
    Header,
    Block,
    BlockRow,
    BlockRowWithDivider,
    SaveButton
} from './styles';
import { Input } from '../../components/Input';
import { useApp } from '../../context/hooks/useApp';
import { formatTimeNumberToString } from '../../utils';

const today = new Date();
const nowHour = formatTimeNumberToString(today.getHours());
const nowMinute = formatTimeNumberToString(today.getMinutes());

interface InputData {
    title: string;
}

export const schema = Yup.object().shape({
    title: Yup
        .string()
        .required('Your reminder title is required')
        .max(30, 'Title max length is 30 caracters')
});

export const AddReminderScreen = () => {

    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    });

    const [selectedHour, setSelectedHour] = useState(nowHour);
    const [selectedMinute, setSelectedMinute] = useState(nowMinute);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(today);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const theme = useTheme();

    const { goBack } = useNavigation();

    const { addReminder } = useApp();

    const finalDateToSave = useMemo(() => {
        return new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            Number(selectedHour),
            Number(selectedMinute));
    }, [selectedDate, selectedHour, selectedMinute])

    const handleSaveReminder = (data: InputData) => {
        addReminder({
            color: selectedColor,
            date: finalDateToSave,
            id: String(uuid.v4()),
            title: data.title
        });
        goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <TouchableOpacity onPress={goBack}>
                        <AntDesignIcon
                            name='close'
                            color={theme.colors.text.light}
                            size={theme.fontSizes.lg}
                        />
                    </TouchableOpacity>
                    <SaveButton
                        onPress={handleSubmit((data) => handleSaveReminder(data as InputData))}>
                        <TextRegularXXS color='dark'>Save</TextRegularXXS>
                    </SaveButton>
                </Header>
                <BlockRowWithDivider>
                    <Input
                        control={control}
                        name='title'
                        placeholder='Remind me to...'
                        error={formState.errors.title && formState.errors.title.message}
                    />
                </BlockRowWithDivider>
                <BlockRowWithDivider>
                    <TouchableBox onPress={() => setDatePickerVisible(true)}>
                        <BlockRow>
                            <Block>
                                <AntDesignIcon
                                    name='calendar'
                                    color={theme.colors.text.light}
                                    size={theme.fontSizes.md}
                                />
                            </Block>
                            <Block>
                                <TextRegularMD>
                                    {selectedDate.toLocaleDateString('eng-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: '2-digit'
                                    })}
                                </TextRegularMD>
                            </Block>
                        </BlockRow>
                    </TouchableBox>
                    <TouchableBox onPress={() => setTimePickerVisible(true)}>
                        <BlockRow>
                            <Block>
                                <AntDesignIcon
                                    name='clockcircleo'
                                    color={theme.colors.text.light}
                                    size={theme.fontSizes.lg}
                                />
                            </Block>
                            <Block>
                                <TextRegularMD>
                                    {`${selectedHour}:${selectedMinute}h`}
                                </TextRegularMD>
                            </Block>
                        </BlockRow>
                    </TouchableBox>
                </BlockRowWithDivider>

                <BlockRowWithDivider>
                    <Block>
                        <TextRegularMD>Reminder color:</TextRegularMD>
                    </Block>
                    <Block>
                        <ColorBox
                            onPress={() => setColorPickerVisible(true)}
                            hex={selectedColor.hex}
                        />
                    </Block>
                </BlockRowWithDivider>

                <TimePicker
                    initialHour={selectedHour}
                    inititalMinute={selectedMinute}
                    visible={timePickerVisible}
                    onFinish={(hour, minute) => {
                        setTimePickerVisible(false)
                        setSelectedHour(hour);
                        setSelectedMinute(minute);
                    }}
                />

                <DatePicker
                    visible={datePickerVisible}
                    initialDate={today}
                    onFinish={(date) => {
                        setDatePickerVisible(false)
                        setSelectedDate(date);
                    }}
                />

                <ColorPicker
                    visible={colorPickerVisible}
                    onFinish={color => {
                        setColorPickerVisible(false);
                        setSelectedColor(color);
                    }}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
}