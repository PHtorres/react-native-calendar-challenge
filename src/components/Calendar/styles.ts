import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { TouchableBox } from '../TouchableBox';

export const Container = styled.View`

`;

export const Header = styled.View`
background-color: ${({ theme }) => theme.colors.background.medium};
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px;
`;

export const HeaderSlot = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const TouchableHeaderSlot = styled(TouchableBox)`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const MonthsSlot = styled(MotiView)`
background-color: ${({ theme }) => theme.colors.background.medium};
`;