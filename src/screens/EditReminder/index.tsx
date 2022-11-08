import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
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
import { ColorBox } from '../../components/ColorPicker/styles';
import { ColorPicker } from '../../components/ColorPicker';

import {
    Container,
    Header,
    Content,
    Footer,
    Block,
    BlockRow,
    BlockRowWithDivider,
    SaveButton
} from './styles';
import { Input } from '../../components/Input';
import { useApp } from '../../context/hooks/useApp';
import { formatTimeNumberToString } from '../../utils';
import { EditReminderScreenNavigationProps } from '../../types/ScreensProps';

const today = new Date();

interface InputData {
    title: string;
}

export const schema = Yup.object().shape({
    title: Yup
        .string()
        .required('Your reminder title is required')
        .max(30, 'Title max length is 30 caracters')
});

export const EditReminderScreen = ({ route }: EditReminderScreenNavigationProps) => {

    const { reminder } = route.params;

    const dataToEdit = {
        selectedHour: formatTimeNumberToString(new Date(reminder.date).getHours()),
        selectedMinute: formatTimeNumberToString(new Date(reminder.date).getMinutes()),
        selectedDate: new Date(reminder.date),
        selectedColor: reminder.color,
        title: reminder.title
    }

    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { title: dataToEdit.title }
    });

    const [selectedHour, setSelectedHour] = useState(dataToEdit.selectedHour);
    const [selectedMinute, setSelectedMinute] = useState(dataToEdit.selectedMinute);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(dataToEdit.selectedDate);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [selectedColor, setSelectedColor] = useState(dataToEdit.selectedColor);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const theme = useTheme();

    const { goBack } = useNavigation();

    const { updateReminder, removeReminder } = useApp();

    const finalDateToSave = useMemo(() => {
        return new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            Number(selectedHour),
            Number(selectedMinute));
    }, [selectedDate, selectedHour, selectedMinute])

    const handleUpdateReminder = (data: InputData) => {
        updateReminder({
            color: selectedColor,
            date: finalDateToSave,
            id: reminder.id,
            title: data.title
        });

        goBack();
    };

    const handleRemoveReminder = () => {
        removeReminder(reminder);
        goBack();
    }

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
                        onPress={handleSubmit((data) => handleUpdateReminder(data as InputData))}>
                        <TextRegularXXS color='dark'>Save</TextRegularXXS>
                    </SaveButton>
                </Header>
                <Content>
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
                </Content>
                <Footer>
                    <TouchableBox onPress={handleRemoveReminder}>
                        <TextRegularMD color='danger'>Remove</TextRegularMD>
                    </TouchableBox>
                </Footer>
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