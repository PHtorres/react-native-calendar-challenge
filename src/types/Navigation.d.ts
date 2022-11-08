import { EditReminderScreenProps } from "./ScreensProps";

export type AppStackParamList = {
    MainScreen: undefined;
    AddReminderScreen: undefined;
    EditReminderScreen: EditReminderScreenProps;
    SearchScreen: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends
            AppStackParamList { }
    }
}