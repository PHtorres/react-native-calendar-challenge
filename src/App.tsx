import React from 'react';
import 'react-native-reanimated'
import { ThemeProvider } from 'styled-components';
import { AppContainer } from './components/AppContainer';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store, persistor } from './state';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContextProvider } from './context/providers/AppContextProvider';
import { Routes } from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContextProvider>
            <AppContainer>
              <Routes />
            </AppContainer>
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App;