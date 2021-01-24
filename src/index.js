import React from 'react';
import ReactDom from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate, persistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from './store'
import App from './App.js';

const store = configureStore();
const persistor = persistStore(store);
ReactDom.render(
    <Provider store={store}>
        <PersistGate
            Loading={<div>Loading...</div>}
            persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);