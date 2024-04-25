import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import { getPopularMoviesService} from "../services/requests/getPopularMoviesService";
import RealmService from "../libraries/realm/RealmService";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";

let dimensions = Dimensions.get('window');
let width = dimensions.width;

const HomeScreen: React.FC = ({route}) => {

    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState([]);
    const [value, setValue] = useState('');
    const [searchState, setSearchState] = useState(false);

    const [infoOffline, setInfoOffline] = useState([]);

    const [isConnected, setIsConnected] = useState(true);

    const {
        popularMovies,
    } = useSelector((state: any) => state.request);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await getPopularMovies();
        })();
    }, []);


    useEffect(() => {
        const fetchData = () => {
            const allProducts = RealmService.getAllMovies();
            // @ts-ignore
            setInfoOffline(allProducts);

        };
        fetchData();
    }, []);


    useEffect(() => {
        RealmService.addMovie(popularMovies)
    }, []);


    useEffect(() => {
        (async () => {
            await NetInfo.addEventListener(
                state => {
                    setIsConnected(state.isConnected);
                })
        })();

    }, []);

    const search = (value: string) => {
        setValue(value);
        let text = value.toLowerCase();
        const filtered = popularMovies.filter(item =>
            item.title.toLowerCase().includes(text)
        )

        setQuery(filtered);
        setSearchState(true);
    }

    const getPopularMovies = async () => {
        await dispatch(getPopularMoviesService());

        setLoading(false);
    };

    const renderEmpty = () => {
        return (
            <Text style={styles.noMovies}>
                We didn't find any movies
            </Text>
        );
    };

    const renderItem = ({item}) => {
        // @ts-ignore
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MovieInfoScreen', {item: item})} style={styles.item}>
                {item.poster_path?.length ?
                    <Image
                        source={{uri: 'https://image.tmdb.org/t/p/w500'+item.backdrop_path}}
                        resizeMode={'cover'}
                        style={styles.imgAvatar}
                    /> : null
                }
                <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = () => {
        return (
            <View style={styles.contentContainer}>
                <Text style={ styles.listHeadline }>TOP RATED</Text>
                {loading ?
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size={'large'} color={'#fff'}/>
                    </View>
                    :
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        numColumns={2}
                        data={searchState ? query : (!isConnected && infoOffline.length > 0) ? infoOffline : popularMovies}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 10}}
                        ListEmptyComponent={renderEmpty}
                    />
                }
            </View>
        )
    }
    const renderSearchClose = () => {
        if(searchState) {
            return (
                setValue(''),
                setQuery([]),
                setSearchState(false)
            )
        }
    }


    const renderSearch = () => {
        return (
            <View style={styles.searchContainer}>
                <Text style={styles.searchLabel}>Hello, what do you want to watch ?</Text>
                <View style={styles.searchBar}>
                <TextInput
                    style={{
                        height: 50,
                        color: '#fff',
                        marginRight: 10
                    }}
                    placeholderTextColor={'#ffffff90'}
                    onChangeText={value => search(value)}
                    value={value}
                    placeholder="Search..."
                />

                <TouchableOpacity onPress={() => renderSearchClose()}>
                    <Image
                        source={require('../assets/img/close.png')}
                        resizeMode={'cover'}
                        style={{width: 25, height: 25, tintColor: '#fff'}}
                    />
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}>
            {renderSearch()}
            {renderItems()}
        </KeyboardAwareScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C3848',
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#2C3848',
        flex: 1,
        flexGrow: 1,
        paddingTop: 30,
    },
    imgAvatar: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 10
    },
    item: {
        marginHorizontal: 10,
        width: width*0.4,
        marginBottom: 20,
    },
    itemTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },
    searchLabel: {
        color: '#fff',
        fontSize: 21,
        marginBottom: 25,
        fontFamily: 'Montserrat-Medium',
    },
    listHeadline: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Montserrat-Medium',
        paddingHorizontal: 20,
    },
    noMovies: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        marginLeft: 10,
        fontFamily: 'Montserrat-Medium',
        fontStyle: 'italic',
    },
    searchContainer: {
        backgroundColor: '#5CA0D3',
        paddingVertical: 40,
        paddingHorizontal: 30,
    },
    searchBar: {
        height: 50,
        borderColor: '#fff',
        backgroundColor: '#ffffff30',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 15,
        borderRadius:25,
        color: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
