import styled from "styled-components/native";
import { REMINDER_CARD_HEIGHT, scaledSize } from "../Constants";


export const Container = styled.View`
flex-direction: row;
height: ${REMINDER_CARD_HEIGHT}px;
justify-content: space-between;
`;

interface ContentSlotProps{
    backgroudColor:string;
}

export const ContentSlot = styled.View<ContentSlotProps>`
background-color: ${({backgroudColor}) => backgroudColor};
flex:1;
border-radius: 10px;
padding: 0 10px;
height: ${REMINDER_CARD_HEIGHT - scaledSize(10)}px;
justify-content: center;
align-items: flex-start;
`;

export const DateAndTimeSlot = styled.View`

`;

export const TitleSlot = styled.View`

`;