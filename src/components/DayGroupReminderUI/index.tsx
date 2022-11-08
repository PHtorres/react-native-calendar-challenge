import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Reminder } from '../../state/reminder/reminderTypes';
import { DayGroupReminder } from '../../types/GroupReminder';
import { REMINDER_CARD_HEIGHT } from '../Constants';
import { ReminderCard } from '../ReminderCard';
import { TouchableBox } from '../TouchableBox';

interface DayGroupReminderUIProps {
  dayGroup: DayGroupReminder
}

export const DayGroupReminderUI = React.memo(({ dayGroup }: DayGroupReminderUIProps) => {

  const { navigate } = useNavigation();

  const renderReminderCard = useCallback(({ item, index }: ListRenderItemInfo<Reminder>) => {
    return (
      <TouchableBox onPress={() => navigate('EditReminderScreen', { reminder: item })}>
        <ReminderCard
          reminder={item}
          showDayLeftSlot={index === 0}
          dayNumber={dayGroup.day}
        />
      </TouchableBox>
    )
  }, [])


  return (
    <FlatList
      data={dayGroup.reminders}
      keyExtractor={(item) => item.id}
      renderItem={renderReminderCard}
      //settings trying a better performance
      getItemLayout={(reminder, index) => {
        return {
          length: REMINDER_CARD_HEIGHT,
          offset: REMINDER_CARD_HEIGHT * index,
          index
        }
      }}
    />
  )
})