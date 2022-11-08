import styled, { css } from 'styled-components/native';
import { TIME_PICKER_NUMBER_BOX_HEIGHT } from '../Constants';
import { TouchableBox } from '../TouchableBox';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.medium};
  border-radius: 10px;
  padding: 10px;
`;

export const Header = styled.View`
margin-bottom: 10px;
justify-content: center;
align-items: center;
`;

export const ListsSlot = styled.View`
margin-bottom: 15px;
margin-top: 5px;
`;

interface NumberBoxProps {
  isSelected: boolean;
}

export const NumberBox = styled(TouchableBox) <NumberBoxProps>`
height: ${TIME_PICKER_NUMBER_BOX_HEIGHT}px;
width: ${TIME_PICKER_NUMBER_BOX_HEIGHT}px;
justify-content: center;
align-items: center;

${({ isSelected, theme }) => isSelected && css`
border-width: 0.5px;
border-color: ${theme.colors.primary.medium};
`}

`;

export const FinishButton = styled(TouchableBox)`
justify-content: center;
align-items: center;
`;


