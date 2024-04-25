/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import {
    setPopularMovies,
} from './src/libraries/redux/slices';

import mapDispatch from './src/libraries/redux/config/decorators/mapDispatch';

import {getPopularMoviesService} from "./src/services/requests/getPopularMoviesService";

import AsyncStorage from '@react-native-community/async-storage';
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
    getPopularMoviesService,
})


export default class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }
    state = {
        showModal: false,
        isConnected: true,
        wasDisconnected: false,
    };

    async componentDidMount(): Promise<void> {
        this.init().catch(e => {
            console.error('App.init FAILED', e);
            // @ts-ignore
            console.log(e);
            console.warn('init failed initially', e);
        });
    }

    init = async (): Promise<any> => {
        await NetInfo.addEventListener(
            state => {
                if(!state.isConnected) {
                    this.setState({showModal: true})
                    this.setState({isConnected: false})
                    this.setState({wasDisconnected: true})
                } else if (state?.isConnected && this.state.wasDisconnected) {
                    this.setState({showModal: true})
                    this.setState({isConnected: true})
                }
            }
        )
    }

    modalError = () => {
        return (
            <Modal
                isVisible={this.state.showModal}
                onBackButtonPress={() => this.setState({showModal: false})}
                onBackdropPress={() => this.setState({showModal: false})}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                animationOutTiming={500}
                backdropOpacity={0.7}
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
                        {this.state.isConnected ? 'Back online' : 'No internet connection'}
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
