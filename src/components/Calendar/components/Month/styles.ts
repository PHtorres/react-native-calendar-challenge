import styled, { css } from 'styled-components/native';
import { CALENDAR_MONTH_CONTAINER_HEIGHT } from '../../../Constants';

interface CalendarDimensionsProps {
    boxWidth: number,
    boxHeight: number,
    calendarWidth: number;
}

export const Container = styled.View<CalendarDimensionsProps>`
background-color: ${({ theme }) => theme.colors.background.medium};
justify-content:center;
align-items:center;
width: ${({ calendarWidth }) => calendarWidth}px;
height:${CALENDAR_MONTH_CONTAINER_HEIGHT}px;
`;

export const MonthSlot = styled.View`
`;

export const WeekRow = styled.View<CalendarDimensionsProps>`
width: ${({ calendarWidth }) => calendarWidth}px;
flex-direction: row;
justify-content: space-between;
`;

export const WeekDayBox = styled.View<CalendarDimensionsProps>`
width: ${({ boxWidth }) => boxWidth}px;
height: ${({ boxHeight }) => boxHeight}px;
justify-content: flex-start;
align-items: center;
`;

export const DayBox = styled.TouchableOpacity<CalendarDimensionsProps>`
width: ${({ boxWidth }) => boxWidth}px;
height: ${({ boxHeight }) => boxHeight}px;
justify-content: flex-start;
align-items: center;
`;

interface DayBoxNumberSlotProp extends CalendarDimensionsProps{
    isToday: boolean;
    isSelected: boolean;
}

export const DayBoxNumberSlot = styled.View<DayBoxNumberSlotProp>`
justify-content: flex-start;
align-items: center;
width: ${({ boxWidth }) => boxWidth/2}px;
border-radius: ${({ boxWidth }) => boxWidth/6}px;

${({ isToday, theme }) => isToday && css`
background-color: ${theme.colors.background.light};
`}

${({ isSelected, theme }) => isSelected && css`
background-color: ${theme.colors.primary.dark};
`}
`;

export const FakeDayBox = styled.View<CalendarDimensionsProps>`
width: ${({ boxWidth }) => boxWidth}px;
height: ${({ boxHeight }) => boxHeight}px;
`;