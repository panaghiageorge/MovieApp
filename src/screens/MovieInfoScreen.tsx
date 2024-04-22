import React from 'react';
import {ScrollView, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';

import {useNavigation} from "@react-navigation/native";

let dimensions = Dimensions.get('window');
let width = dimensions.width;

const MovieInfoScreen: React.FC = ({route}) => {
    const { item } = route.params;
    const navigation = useNavigation();

    const renderHeader = () => {
        return (
            <View>
                <Image
                    source={{uri: 'https://image.tmdb.org/t/p/w500'+item.backdrop_path}}
                    resizeMode={'cover'}
                    style={styles.imgAvatar}
                />
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                   <Image
                       source={require('../assets/img/back-arrow.png')}
                       resizeMode={'cover'}
                       style={{width: 25, height: 25, tintColor: '#fff'}}
                   />
                </TouchableOpacity>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <ScrollView style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.overview}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.movieInfoLabel}>Release:</Text>
                    <Text style={styles.movieInfo}>{item.release_date}</Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default MovieInfoScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C3848',
        flex: 1,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    imgAvatar: {
        width: width,
        height: 280,
    },
    backBtn: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
    title: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 20,
    },
    desc: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        opacity: 0.7,
        fontStyle: 'italic',
        lineHeight: 24,
        marginBottom: 15,
    },
    movieInfoLabel: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'bold',
        marginRight: 15
    },
    movieInfo: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    }
})
