import { scaledSize } from "../components/Constants";

export type ColorVariant = 'light' | 'medium' | 'dark';

export type TextColorVariant = ColorVariant | 'error' | 'primary' | 'danger';


export const theme = {
    colors: {
        primary: {
            light: '#7ebaf2',
            medium: '#3a84c9',
            dark: '#0e4980'
        },
        secondary: '#4c6e48',
        disabled: '#ADB3C8',
        success: '#32D794',
        error: {
            light: '#FFE3EB',
            medium: '#FF417C',
            dark: '#DA1C5C',
        },
        background: {
            light: '#FFFFFF',
            medium: '#323138',
            dark: '#201f24'
        },
        text: {
            light: '#e8e8e8',
            medium: '#757482',
            dark: '#383838',
            error: '#FF417C',
            primary: '#3a84c9',
            danger:'#913954',
        }
    },
    fonts: {
        regular: 'Poppins-Regular',
        bold: 'Poppins-Bold'
    },
    fontSizes: {
        pico: scaledSize(8),
        xxxs: scaledSize(10),
        xxs: scaledSize(12),
        xs: scaledSize(14),
        md: scaledSize(16),
        lg: scaledSize(18),
        bg: scaledSize(24),
    }
}