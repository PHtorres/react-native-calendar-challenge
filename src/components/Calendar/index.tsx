import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, ViewToken } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
import { fetchInitialCalendarData, getMonthNameByIndex } from '../../services/calendar';
import { Month as MonthType } from '../../types/Month';
import { TextBoldMD } from '../Text';
import { TouchableBox } from '../TouchableBox';
import Month from './components/Month';
import { Container, Header, HeaderSlot, TouchableHeaderSlot, MonthsSlot } from './styles';
import { useNavigation } from '@react-navigation/native';
import { CALENDAR_MONTH_CONTAINER_HEIGHT } from '../Constants';

interface ViewableEvent {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>
}

interface CalendarProps {
    onDateChange(dateChanged: Date): void;
    onMonthChanged(monthChanged: MonthType): void;
    showCalendarHeader?: boolean;
    width: number;
    startOpen: boolean;
}

export const Calendar = ({
    onDateChange,
    onMonthChanged,
    showCalendarHeader,
    width,
    startOpen
}: CalendarProps) => {

    const monthListRef = useRef<FlatList>(null);

    const [months, setMonths] = useState<MonthType[]>([]);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

    const theme = useTheme();

    const { navigate } = useNavigation();

    const selectedMonthName = useMemo(() => {
        const selectedMonth = months[selectedMonthIndex];
        if (selectedMonth) return getMonthNameByIndex(selectedMonth.monthIndex);
        return '';
    }, [selectedMonthIndex]);


    const getMonths = () => {
        const { currentMonthIndex: fetchedCurrentMonthIndex, months: fetchedMonths } = fetchInitialCalendarData();
        setCurrentMonthIndex(fetchedCurrentMonthIndex);
        setSelectedMonthIndex(fetchedCurrentMonthIndex);
        setMonths(fetchedMonths);
    }

    useEffect(getMonths, [fetchInitialCalendarData]);

    useEffect(() => {
        if (months) {
            const selectedMonth = months[selectedMonthIndex];
            onMonthChanged(selectedMonth);
        }
    }, [selectedMonthIndex, months])

    const handleScrolloCurrentMonth = () => {
        monthListRef.current?.scrollToIndex({
            animated: true,
            index: currentMonthIndex
        })
        setSelectedMonthIndex(currentMonthIndex);
    }


    const onViewableItemsChanged = ({ viewableItems, changed }: ViewableEvent) => {
        const selectedIndex = changed[0]?.index || 0;
        setSelectedMonthIndex(selectedIndex);
    };

    const viewabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    }

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    const monthNameIconAnimation = useAnimationState({
        from: {
            rotate: '0deg',
            marginLeft: 5,
        },
        up: {
            rotate: '0deg',
            marginLeft: 5,
        },
        down: {
            rotate: '180deg',
            marginLeft: 5,
        },
    });

    const monthSlotAnimation = useAnimationState({
        show: {
            height: CALENDAR_MONTH_CONTAINER_HEIGHT
        },
        hide: {
            height: 0
        }
    })

    const handleToggleMonthsSlot = () => {
        if (monthNameIconAnimation.current === 'down') {
            monthNameIconAnimation.transitionTo('up');
        } else {
            monthNameIconAnimation.transitionTo('down');
        }

        if (monthSlotAnimation.current === 'hide') {
            monthSlotAnimation.transitionTo('show');
        } else {
            monthSlotAnimation.transitionTo('hide');
        }
    }

    const closeMonthSlot = () => {
        monthNameIconAnimation.transitionTo('down');
        monthSlotAnimation.transitionTo('hide');
    }

    useEffect(() => {
        if (!startOpen) {
            closeMonthSlot();
        }
    }, [startOpen])

    const renderMonth = useCallback(({ item }: ListRenderItemInfo<MonthType>) => {
        return (
            <Month
                calendarWidth={width}
                month={item}
                onDateChange={onDateChange}
            />
        )
    }, []);

    return (
        <Container>
            {showCalendarHeader &&
                <Header>
                    <TouchableHeaderSlot onPress={handleToggleMonthsSlot}>
                        <TextBoldMD>{selectedMonthName}</TextBoldMD>
                        {!!selectedMonthName &&
                            <MotiView state={monthNameIconAnimation}>
                                <AntDesignIcons
                                    name='caretup'
                                    color={theme.colors.text.light}
                                    size={theme.fontSizes.xxs}
                                />
                            </MotiView>
                        }
                    </TouchableHeaderSlot>
                    <HeaderSlot>
                        <TouchableBox
                            onPress={() => navigate('SearchScreen')}
                            style={{ marginRight: 10 }}
                        >
                            <AntDesignIcons
                                name="search1"
                                size={theme.fontSizes.lg}
                                color={theme.colors.text.light}
                            />
                        </TouchableBox>
                        <TouchableBox onPress={handleScrolloCurrentMonth}>
                            <MaterialCommunityIcons
                                name='calendar-today'
                                size={theme.fontSizes.lg}
                                color={theme.colors.text.light}
                            />
                        </TouchableBox>
                    </HeaderSlot>
                </Header>
            }
            <MonthsSlot state={monthSlotAnimation} transition={{
                type: 'timing',
                duration: 500
            }}>
                <FlatList
                    ref={monthListRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    initialScrollIndex={currentMonthIndex}
                    onEndReached={() => { }} //here we can get more months by the last one redered
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    pagingEnabled={true}
                    data={months}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMonth}

                    //settings trying a better performance
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={1}
                    initialNumToRender={3}
                    windowSize={5}
                    getItemLayout={(month, index) => (
                        {
                            length: width,
                            offset: width * index,
                            index
                        }
                    )}
                />
            </MonthsSlot>
        </Container>
    )
}