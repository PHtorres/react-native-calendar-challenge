import styled, { css } from 'styled-components/native';
import { COLOR_PICKER_BOX_HEIGHT } from '../Constants';
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
  hex: string;
  isSelected?: boolean;
}

export const ColorBox = styled(TouchableBox) <NumberBoxProps>`
height: ${COLOR_PICKER_BOX_HEIGHT}px;
width: ${COLOR_PICKER_BOX_HEIGHT}px;
justify-content: center;
border-radius: 10px;
background-color: ${({ hex }) => hex};
margin-left: 10px;

${({ isSelected, theme }) => isSelected && css`
border-width: 4px;
border-color: ${theme.colors.text.light};
`}

`;

export const FinishButton = styled(TouchableBox)`
justify-content: center;
align-items: center;
`;


