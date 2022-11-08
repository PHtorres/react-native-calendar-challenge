import styled from "styled-components/native";
import { REMINDER_CARD_DAY_SLOT_WIDTH, REMINDER_CARD_HEIGHT, scaledSize } from "../Constants";


export const Container = styled.View`
flex-direction: row;
height: ${REMINDER_CARD_HEIGHT}px;
justify-content: space-between;
`;

interface ContentSlotProps{
    backgroudColor:string;
}

export const BaseSlot = styled.View`
border-radius: 5px;
padding: 0 10px;
height: ${REMINDER_CARD_HEIGHT - scaledSize(10)}px;
justify-content: center;
align-items: flex-start;
`;

export const ContentSlot = styled(BaseSlot)<ContentSlotProps>`
background-color: ${({backgroudColor}) => backgroudColor};
flex:1;
`;

export const DaySlot = styled(BaseSlot)`
background-color: 'transparent';
width: ${REMINDER_CARD_DAY_SLOT_WIDTH}px;
justify-content: flex-start;
align-items: flex-start;
`;

export const DateAndTimeSlot = styled.View`

`;

export const TitleSlot = styled.View`

`;