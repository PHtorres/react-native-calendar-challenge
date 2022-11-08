
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { reminderReducer } from "./reminder/reminderReducers";
import { DispatchReminderType, ReminderAction, ReminderState } from "./reminder/reminderTypes";

const persistConfig:PersistConfig<ReminderState> = {
    key:'root',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reminderReducer);

export const store: Store<ReminderState, ReminderAction> & {
    dispatch: DispatchReminderType
} = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);