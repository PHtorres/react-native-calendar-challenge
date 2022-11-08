import styled from 'styled-components/native';
import { TouchableBox } from '../../components/TouchableBox';

export const Container = styled.View`
flex:1;
padding: 0 20px 40px 20px;
`;

export const Header = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
margin: 20px 0;
`;

export const Content = styled.View`
flex:1;
`;

export const Footer = styled.View`
justify-content: center;
align-items: center;
`;


export const BlockRow = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding:10px 0;
`;

export const BlockRowWithDivider = styled(BlockRow)`
border-bottom-width:0.3px;
border-bottom-color: ${({ theme }) => theme.colors.background.light};
margin-bottom: 15px;
`;

export const Block = styled.View`
justify-content: space-between;
align-items: center;
margin-right: 5px;
`;

export const SaveButton = styled(TouchableBox)`
background-color: ${({theme}) => theme.colors.primary.light};
border-radius: 10px;
padding: 5px;
justify-content: center;
align-items: center;
`