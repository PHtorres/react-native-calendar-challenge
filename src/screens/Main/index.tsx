import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Calendar } from '../../components/Calendar';
import { useApp } from '../../context/hooks/useApp';
import { Month } from '../../types/Month';
import { Container, RemindersListArea, AddReminderButton } from './styles';
import { DayGroupReminder } from '../../types/GroupReminder';
import { DayGroupReminderUI } from '../../components/DayGroupReminderUI';
import { shadowProps } from '../../components/Shadow';
import { SCREEN_WIDTH } from '../../components/Constants';
import { NoResult } from '../../components/NoResult';


export const MainScreen = () => {

  const [selectedMonth, setSelectedMonth] = useState<Month>({
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear()
  } as Month);

  const dayGroupRemindersListRef = useRef<FlatList>(null);

  const theme = useTheme();

  const { navigate } = useNavigation();

  const { dayGroupReminders, reminders, updateDayGroupReminders } = useApp();


  useEffect(() => {
    if (selectedMonth) {
      updateDayGroupReminders(selectedMonth);
    }
  }, [selectedMonth, reminders])

  const handleDateChange = (date: Date) => {
    const indexToScroll = dayGroupReminders.findIndex(item => item.day === date.getDate());
    if (indexToScroll > 0) scrollToIndexDayInList(indexToScroll)
  }

  const handleGoToAddReminder = () => {
    navigate('AddReminderScreen')
  }

  const scrollToIndexDayInList = (index: number) => {

    dayGroupRemindersListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 1
    })
  }

  const renderGroupReminder = useCallback(({ item }: ListRenderItemInfo<DayGroupReminder>) => {
    return <DayGroupReminderUI dayGroup={item} />
  }, [])

  return (
    <Container>
      <Calendar
        width={SCREEN_WIDTH}
        onMonthChanged={(monthChanged) => setSelectedMonth(monthChanged)}
        onDateChange={handleDateChange}
        startOpen={false}
        showCalendarHeader
      />
      <RemindersListArea>
        <FlatList
          ListEmptyComponent={
            <NoResult
              message="No reminders this month..."
              action={handleGoToAddReminder}
              actionTitle="Add a new reminder"
            />}
          showsVerticalScrollIndicator={false}
          ref={dayGroupRemindersListRef}
          data={dayGroupReminders}
          keyExtractor={item => item.day.toString()}
          renderItem={renderGroupReminder}
        />
      </RemindersListArea>
      <AddReminderButton
        onPress={handleGoToAddReminder}
        {...shadowProps}
      >
        <AntDesignIcon
          name='plus'
          color={theme.colors.text.light}
          size={theme.fontSizes.lg} />
      </AddReminderButton>
    </Container>
  )
}
