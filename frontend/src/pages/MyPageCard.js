import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const MainPageCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer}>
                <IonIcon 
                    name={props.icon}
                    size={70} 
                    color="#262444"
                    style={{marginBottom: '6%'}}
                />
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </View>
    );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        width: width * 0.4,
        height: width * 0.4,
        backgroundColor: '#ffe6d3',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: width * 0.05,
        marginTop: width * 0.01
    },
    smallContainer: {
        width: width * 0.4,
        height: width * 0.38,
        backgroundColor: '#ffb687',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: 16,
        color: '#ffffff',
        marginBottom: '-12%'
        // marginTop: '3%'
    },
})

export default MainPageCard;
