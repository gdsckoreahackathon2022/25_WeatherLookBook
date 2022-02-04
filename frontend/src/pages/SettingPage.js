import React, { useState } from 'react'
import { View, Text, Button, Image, Alert, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import customAxios from '../auth/customAxios'
import Header from './Header'
import axios from 'axios'
import { LOCAL } from '../../ipConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingPage() {

    const [imageSource, setImageSource] = useState('')
    const [response, setImage] = useState({})

    const showMyPost = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${LOCAL}/accountapp/myboard/`,
            {
                headers: {'Authorization': 'Token ' + token},
            
        }).then(res => {
            console.log("show image", res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const writePost = async () => {
        console.log('hllll')
        const formData = new FormData();
        let content = 'hello'
        const token = await AsyncStorage.getItem('token');
        console.log('toekn:: ', token)
        formData.append('image', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            data: response.assets[0].base64
        })
        formData.append('content', content)
        console.log('formData', formData)
        axios.post(`${LOCAL}/boardapp/board/`, formData, {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then(res => {
            console.log(res)
            Alert.alert('등록 성공')
        }).catch(e => {
            console.log(e)
            Alert.alert('등록 실패')
        })
    }
    

    const selectImage = () => {
        launchImageLibrary({includeBase64: true}, (response) => {
            // console.log('image', response.assets[0].base64)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                setImage(response)
                setImageSource(response.assets[0].uri);
            }
        })
    }

    return (
        <SafeAreaView style={styles.background}>
            <Header color={false} />
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>My Page</Text>
            </View>
            <View style={styles.bottom}>
            {
                imageSource !== ''
                ? <View>
                <Image
                source={{ uri: imageSource }}
                style={{ width: 250, height: 250 }}
                resizeMode='cover'
                />
                <TouchableOpacity  onPress={()=>{writePost()}}>
                <View style={styles.postButton} title='button'>
                    <Text style={styles.buttonText}>post</Text>
                </View>
                </TouchableOpacity>
                </View>
                : 
                <TouchableOpacity  onPress={selectImage}>
                <View style={styles.button} title='button'>
                    <Text style={styles.buttonText}>choose a picture</Text>
                </View>
                </TouchableOpacity>
            }
            </View>
            
            <Button title='button1' onPress={()=>{writePost()}} />
            <Button title='button2' onPress={()=>{showMyPost()}} />
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#262444',
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
        color: '#ffb687',
        fontFamily: 'sans-serif-medium',
        fontSize: width * 0.06,
        fontWeight: '800',
    },
    pictureContainer: {
        width: width * 0.8,
        height: width * 0.8,
        borderWidth: 3,
        borderColor: '#ffe6d3'
    },
    bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: width,
        borderColor: 'white',
        borderWidth: 3,
        
    },
    buttonText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#262444',
        fontSize: width * 0.04,
        marginTop: width * 0.03
    },
    button: {
        width: width * 0.4,
        height: width * 0.2,
        backgroundColor: '#ffe6d3',
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    postButton: {
        width: width * 0.3,
        height: width * 0.15,
        marginTop:  width * 0.037,
        marginLeft: width * 0.16,
        backgroundColor: '#ffe6d3',
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SettingPage
