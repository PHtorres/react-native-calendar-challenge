import styled from 'styled-components/native';
import { TextColorVariant } from '../../theme';

interface TextBaseProps{
    color?:TextColorVariant
}

const TextBase = styled.Text<TextBaseProps>`
color:${({theme, color}) => color?theme.colors.text[color]:theme.colors.text.light};
`;

export const TextRegularXS = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.xs}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const TextRegularXXS = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.xxs}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const TextRegularXXXS = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.xxxs}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const TextRegularMD = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.md}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const TextBoldMD = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.md}px;
font-family: ${({theme}) => theme.fonts.bold};
`;

export const TextBoldXXS = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.xxs}px;
font-family: ${({theme}) => theme.fonts.bold};
`;

export const TextBoldXS = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.xs}px;
font-family: ${({theme}) => theme.fonts.bold};
`;

export const TextRegularLG = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.lg}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const TextBoldLG = styled(TextBase)`
font-size: ${({theme}) => theme.fontSizes.lg}px;
font-family: ${({theme}) => theme.fonts.bold};
`;