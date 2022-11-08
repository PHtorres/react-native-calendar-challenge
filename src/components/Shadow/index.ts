import { ViewProps } from 'react-native';
import { theme } from '../../theme';

export const shadowProps: ViewProps = {
    style: {
        elevation: 20,
        shadowColor: theme.colors.background.dark,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowOpacity: 0.3,
    }
};