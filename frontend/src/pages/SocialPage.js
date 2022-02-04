import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Image } from 'react-native'
import Header from './Header';
import { useSelector } from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL } from '../../ipConfig';

function SocialPage({ navigation }) {

    const uid = useSelector(state => state.user.uid)
    const [contents, setContents] = useState([]);
    const [hearts, setHearts] = useState([]);

    const getContents = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${LOCAL}/boardapp/board/`,
            {
                headers: {'Authorization': 'Token ' + token},
        }).then(res => {

            setContents(res.data.reverse());
            let hearts = res.data.map(data => {
                if (data.like.includes(uid)) return true;
                else return false;
            });
            
            setHearts(hearts);
        }).catch(e => {
            console.log(e)
        })
    }

    const handleHeart = async (id) => {
        const token = await AsyncStorage.getItem('token');
        axios.post(`${LOCAL}/likeapp/like/${id}/`, {},
            {
                headers: {'Authorization': 'Token ' + token},
        }).then(res => {   
            getContents();

            console.log('heart success')
        }).catch(e => {
            console.log('heart error')
        })
    }

    // const getTemperature = async () => {
    //     const token = await AsyncStorage.getItem('token');
    //     console.log(token)
    //     axios.get(`${LOCAL}/boardapp/board/7/`,
    //         {
    //             headers: {'Authorization': 'Token ' + token},
            
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(e => {
    //         console.log(e)
    //     })
    // }

    const renderCards = contents.map((data, index) => {
        return (
            <View key={index} style={styles.cardContainer}>
                <Image style={styles.cardImage} source={{uri: data.image}} alt="image" />
                <View style={styles.textIconWrapper}>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity 
                            onPress={() => {navigation.navigate('CommentPage', {
                                writer: data.user,
                                content: data.content,
                                bid: data.bid
                            })}}
                        >
                            <IonIcon name="md-chatbubble-outline" style={{marginRight: '3%'}} size={30} color="#ffb687" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleHeart(data.bid)}>
                            <IonIcon name={hearts[index] ? "heart" : "heart-outline"} size={30} color="#ffb687" />
                        </TouchableOpacity>
                        {/* <Text style={styles.likeText}>{data.like_count}</Text> */}
                        <Text style={styles.likeText}>32</Text>
                        <Text style={styles.likeText}>LIKES</Text>
                        <Text style={styles.dateText}>{data.date}</Text>
                    </View>
                    <Text style={styles.cardText}>{data.content}</Text>
                </View>
            </View>
        )
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // getTemperature()
            getContents()
        })

        return unsubscribe;
        
    }, [navigation])

    return (
        <SafeAreaView style={styles.background}>
            <Header color={true} />
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>What are people{`\n`}wearing today?</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.feedContainer}>
                    {renderCards}
                </View>
            </ScrollView>
            <TouchableOpacity 
                onPress={() => {navigation.navigate('WritePostPage')}} 
                style={styles.completeButton}
            >
                <IonIcon 
                    name="duplicate"
                    size={25} 
                    color="#ffe6d3"
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ffe6d3',
        width: width,
        height: height
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'center',
        width: width, 
        height: width * 0.3,
        paddingLeft: width * 0.03
    },
    titleText: {
        color: '#262444',
        fontFamily: 'sans-serif-medium',
        fontSize: width * 0.08,
        fontWeight: '800',
    },
    feedContainer: {
        width: width,
        display: 'flex',
        alignItems: 'center',
        marginBottom: width * 0.2
    },
    cardContainer: {
        width: width * 0.9,
        minHeight: width,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',    
        alignItems: 'center',
        backgroundColor: '#262444',
        marginBottom: width * 0.05,
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03
    },
    cardImage: {
        marginTop: width * 0.07,
        width: width * 0.76,
        height: width * 0.65,
    },
    textIconWrapper: {
        width: width * 0.76,
        display: 'flex',
        marginTop: width * 0.03,
        flexDirection: 'column',
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff',
        fontSize: width * 0.04,
        marginTop: width * 0.03
    },
    likeText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffb687',
        fontSize: width * 0.038,
        marginTop: width * 0.02,
        marginLeft: width * 0.02
    },
    dateText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffb687',
        fontSize: width * 0.03,
        marginTop: width * 0.028,
        marginLeft: width * 0.2
    },
    completeButton: {
        width: width * 0.15,
        height: width * 0.15,
        borderTopLeftRadius: width * 0.07,
        borderTopRightRadius: width * 0.07,
        borderBottomLeftRadius: width * 0.07,
        borderBottomRightRadius: width * 0.07,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb687',
        position: 'absolute',
        right: '6%',
        bottom: '12%'
    }
})

export default SocialPage
