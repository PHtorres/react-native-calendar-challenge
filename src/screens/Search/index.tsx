import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, ListRenderItemInfo } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
import { REMINDER_CARD_HEIGHT, scaledSize } from '../../components/Constants';
import { Input } from '../../components/Input';
import { NoResult } from '../../components/NoResult';
import { ReminderCardInSearch } from '../../components/ReminderCardInSearch';
import { TouchableBox } from '../../components/TouchableBox';
import { useApp } from '../../context/hooks/useApp';
import { Reminder } from '../../state/reminder/reminderTypes';

import { Container, InputSlot, ResultSlot } from './styles';

interface SearchData {
    term: string;
}

export const SearchScreen = () => {

    const { control, handleSubmit, reset, formState } = useForm();
    const [searchResult, setSearchResult] = useState<Reminder[]>([])
    const theme = useTheme();
    const { searchReminders } = useApp();

    const { goBack, navigate } = useNavigation();

    const search = ({ term }: SearchData) => {
        if (term?.length > 0) setSearchResult(searchReminders(term));
    }

    const clearResult = () => {
        reset();
        setSearchResult([]);
    }

    const renderReminderCard = useCallback(({ item }: ListRenderItemInfo<Reminder>) => {
        return (
            <TouchableBox onPress={() => navigate('EditReminderScreen', {
                reminder: item
            })}>
                <ReminderCardInSearch reminder={item} />
            </TouchableBox>
        )
    }, [])

    return (
        <Container>
            <InputSlot>
                <TouchableBox onPress={goBack}>
                    <AntDesignIcons
                        name="arrowleft"
                        size={theme.fontSizes.lg}
                        color={theme.colors.text.light}
                    />
                </TouchableBox>
                <Input
                    control={control}
                    onEndEditing={handleSubmit((data) => search(data as SearchData))}
                    name='term'
                    placeholder='Search here...'
                    returnKeyLabel='Search'
                    onKeyPress={handleSubmit((data) => search(data as SearchData))}
                    style={{ marginTop: scaledSize(0), marginLeft: 10 }}
                />
                <TouchableBox onPress={clearResult}>
                    <AntDesignIcons
                        name={formState.isValid && formState.isSubmitted ? 'close' : 'search1'}
                        size={theme.fontSizes.lg}
                        color={theme.colors.text.light}
                    />
                </TouchableBox>
            </InputSlot>
            <ResultSlot>
                <FlatList
                    data={searchResult}
                    keyExtractor={item => item.id}
                    renderItem={renderReminderCard}
                    ListEmptyComponent={() => formState.isValid && formState.isSubmitted ? (
                        <NoResult
                            message='Results not found...'
                            actionTitle='Try again'
                            action={clearResult}
                        />
                    ) :
                        <NoResult
                            message='Results will be showing here'
                            actionTitle='OK'
                            action={clearResult}
                        />
                    }
                    //settings trying a better performance
                    getItemLayout={(reminder, index) => {
                        return {
                            length: REMINDER_CARD_HEIGHT,
                            offset: REMINDER_CARD_HEIGHT * index,
                            index
                        }
                    }}
                />
            </ResultSlot>
        </Container>
    )
}