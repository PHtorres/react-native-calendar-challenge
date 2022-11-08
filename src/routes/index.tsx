import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/Navigation';
import { MainScreen } from '../screens/Main';
import { AddReminderScreen } from '../screens/AddReminder';
import { useTheme } from 'styled-components';
import { EditReminderScreen } from '../screens/EditReminder';
import { SearchScreen } from '../screens/Search';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export const Routes = () => {
    const theme = useTheme();
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                contentStyle: { backgroundColor: theme.colors.background.dark },
                headerShown: false,
                animation: 'slide_from_left'
            }}>
                <Screen name='MainScreen' component={MainScreen} />
                <Screen name='AddReminderScreen' component={AddReminderScreen} />
                <Screen name='EditReminderScreen' component={EditReminderScreen} />
                <Screen name='SearchScreen' component={SearchScreen} />
            </Navigator>
        </NavigationContainer>
    );
}