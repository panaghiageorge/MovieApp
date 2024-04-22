/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';

import './babel.config.js';

interface WrapperProps {}

import store from "./src/libraries/redux/config/root/store";

class AppWrapper extends React.PureComponent<WrapperProps> {

    render() {

        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => AppWrapper);
