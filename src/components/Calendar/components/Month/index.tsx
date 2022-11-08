import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useTheme } from 'styled-components';
import { useApp } from '../../../../context/hooks/useApp';
import {
  formatedDaysListWithFakeDays,
  getMonthDataByMonthAndYear,
  WEEK_DAYS
} from '../../../../services/calendar';
import { Month as MonthType } from '../../../../types/Month';
import { MonthView } from '../../../../types/MonthView';
import { datesAreEqual } from '../../../../utils';
import { MONTH_DAY_BOX_HEIGHT } from '../../../Constants';
import { TextBoldXXS, TextRegularXXS } from '../../../Text';

import {
  Container,
  WeekRow,
  WeekDayBox,
  DayBox,
  DayBoxNumberSlot,
  FakeDayBox
} from './styles';

interface MonthProps {
  month: MonthType;
  onDateChange(date: Date): void;
  calendarWidth: number;
}

const Month = ({ month, onDateChange, calendarWidth }: MonthProps) => {

  const [monthView, setMonthView] = useState<MonthView>({} as MonthView);
  const [selectedDay, setSelectedDay] = useState(0);
  const { getRemindersByDate } = useApp();
  const theme = useTheme();


  const getMonthView = () => {
    if (month) {
      const { monthIndex, year } = month;
      const monthView = getMonthDataByMonthAndYear(monthIndex, year);
      setMonthView(monthView);
    }
  }

  useEffect(getMonthView, [month]);

  const daysList = useMemo(() => {
    return formatedDaysListWithFakeDays(monthView.days, monthView.firstDayWeekIndex);
  }, [monthView])

  const boxDimensionsProps = {
    boxWidth: calendarWidth / 7,
    boxHeight: MONTH_DAY_BOX_HEIGHT,
    calendarWidth
  }

  const renderDaysListItem = useCallback(({ item }: ListRenderItemInfo<number>) => {
    if (item > 31) return <FakeDayBox {...boxDimensionsProps} />;
    const { monthIndex, year } = monthView;
    const currentDayDate = new Date(year, monthIndex, item);
    const today = new Date();
    const hasReminder = getRemindersByDate(currentDayDate)?.length > 0;
    const isSelected = selectedDay === item;
    const isToday = datesAreEqual(currentDayDate, today);
    return (
      <DayBox
        onPress={() => {
          setSelectedDay(item);
          onDateChange(currentDayDate);
        }}
        {...boxDimensionsProps}
      >
        <DayBoxNumberSlot
          isToday={isToday}
          isSelected={isSelected}
          {...boxDimensionsProps}
        >
          <TextRegularXXS color={isToday ? 'dark' : 'light'}>
            {item}
          </TextRegularXXS>
        </DayBoxNumberSlot>
        {hasReminder && !isToday && !isSelected &&
          <EntypoIcon
            name="circle"
            size={5}
            color={theme.colors.primary.light} />}
      </DayBox>
    )
  }, [monthView, getRemindersByDate, selectedDay])

  return (
    <Container {...boxDimensionsProps}>
      <WeekRow {...boxDimensionsProps}>
        {WEEK_DAYS.map(weekDay => (
          <WeekDayBox key={weekDay} {...boxDimensionsProps}>
            <TextBoldXXS>{weekDay}</TextBoldXXS>
          </WeekDayBox>
        ))}
      </WeekRow>
      <FlatList
        data={daysList}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDaysListItem}
        getItemLayout={(day, index) => (
          {
            length: boxDimensionsProps.boxWidth,
            offset: boxDimensionsProps.boxWidth * index,
            index
          }
        )}
      />
    </Container>
  )
};

export default memo(Month)