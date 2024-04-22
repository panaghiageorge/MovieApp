/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {AppState, Text, View, TouchableOpacity, Image} from 'react-native';
import {
    setPopularMovies,

} from './src/libraries/redux/slices';

import {onlyUpdateForKeys} from 'recompose';
import connectState from './src/libraries/redux/config/decorators/connectState';
import mapDispatch from './src/libraries/redux/config/decorators/mapDispatch';

import {getPopularMoviesService} from "./src/services/requests/getPopularMoviesService";

import Modal from 'react-native-modal';
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
import HomeScreen from "./src/screens/HomeScreen";
import MovieInfoScreen from "./src/screens/MovieInfoScreen";

export type AppProps = {
    setPopularMovies: typeof setPopularMovies;
    popularMovies: Array<any>;
    getPopularMoviesService: typeof getPopularMoviesService;
}

@mapDispatch({
    setPopularMovies,
    getPopularMoviesService
})

@onlyUpdateForKeys([
    'popularMovies'
])


export default class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }
    state = {
        showModal: false,
        noConnected: false,
        isConnected: true,
    };

    async componentDidMount(): Promise<void> { 
        await this.init();
    }

    init = async (): Promise<any> => {
        const state = await NetInfo.fetch();

        console.log('state', state)

        if (!state.isConnected) {
            this.setState({showModal: true})
            this.setState({noConnected: true})
            this.setState({isConnected: false})
        } else {
            this.setState({showModal: true})
            this.setState({noConnected: false})
            this.setState({isConnected: true})
        }
    }

    modalError = () => {
        return (
            <Modal
                isVisible={this.state.showModal}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                animationOutTiming={500}
                backdropOpacity={0.9}
                style={{position: 'absolute', top: 20, padding: 0, right: 0, left: 0}}
                contentContainerStyle={{padding: 0}}
            >
                <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 20, paddingBottom: 20, borderRadius: 25}}>
                    <TouchableOpacity onPress={() => this.setState({showModal: false})} style={{paddgingHorizontal: 20, paddingTop: 10}}>
                        <Image
                            source={require('./src/assets/img/close.png')}
                            style={{width: 20, height: 20, alignSelf: 'flex-end'}} resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: '#000', fontSize: 20, marginTop: -5}}>
                        {this.state.noConnected ? 'No internet connection' : 'Back online'}
                    </Text>
                </View>
            </Modal>
        )
    }

    render(): React.CElement<any, any> {
        const Stack = createStackNavigator();
        return (
            <View style={{flex: 1, backgroundColor: '#FAF9FF'}}>
                {this.modalError()}

                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName="Home">
                        <Stack.Screen
                            component={HomeScreen}
                            name="HomeScreen"
                        />
                        <Stack.Screen
                            component={MovieInfoScreen}
                            name="MovieInfoScreen"
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        )
      }
}
