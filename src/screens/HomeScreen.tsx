import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {getPopularMoviesService} from "../services/requests/getPopularMoviesService";

let dimensions = Dimensions.get('window');
let width = dimensions.width;

const HomeScreen: React.FC = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState([]);
    const [searchState, setSearchState] = useState(false);

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

    const search = (value) => {
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
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MovieInfoScreen', {item: item})} style={styles.item}>
                {item.poster_path?.length ?
                    <Image
                        source={{uri: 'https://image.tmdb.org/t/p/w500'+item.poster_path}}
                        resizeMode={'contain'}
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
                        horizontal={true}
                        data={searchState ? query : popularMovies}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{paddingLeft: 20}}
                        ListEmptyComponent={renderEmpty}
                    />
                }
            </View>
        )
    }

    const renderSearch = () => {
        return (
            <View style={styles.searchContainer}>
                <Text style={styles.searchLabel}>Hello, what do you want to watch ?</Text>
                <TextInput
                    style={{
                        height: 50,
                        borderColor: '#fff',
                        backgroundColor: '#ffffff30',
                        borderWidth: 1,
                        margin: 10,
                        paddingLeft: 15,
                        borderRadius:25,
                        color: '#fff',
                    }}
                    placeholderTextColor={'#ffffff90'}
                    onChangeText={value => search(value)}
                    placeholder="Search..."
                />
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
        backgroundColor: '#5CA0D3',
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#2C3848',
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 30,
    },
    imgAvatar: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 10
    },
    item: {
        marginRight: 20,
        width: width*0.35,
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
        fontFamily: 'Montserrat-Medium',
        fontStyle: 'italic',
    },
    searchContainer: {
        backgroundColor: '#5CA0D3',
        paddingVertical: 40,
        paddingHorizontal: 30,
    }
})
