import styled from 'styled-components/native';
import { STATUS_BAR_HEIGHT } from '../Constants';

export const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.colors.background.medium};
padding: ${STATUS_BAR_HEIGHT}px 0px 0px 0px;
`;