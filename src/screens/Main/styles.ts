import styled from 'styled-components/native';
import { TouchableBox } from '../../components/TouchableBox';

export const Container = styled.View`
flex:1;
`;

export const RemindersListArea = styled.View`
flex:1;
margin: 10px;
`;

export const AddReminderButton = styled(TouchableBox)`
position: absolute;
right: 20px;
bottom: 30px;
padding: 20px;
border-radius: 20px;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.colors.primary.dark};
`;