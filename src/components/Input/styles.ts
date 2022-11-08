import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
flex:1
justify-content:center;
`;


export const InputContent = styled(TextInput)`
font-size: ${({ theme }) => theme.fontSizes.md}px;
font-family:${({ theme }) => theme.fonts.regular};
color:${({ theme }) => theme.colors.text.light};
`;