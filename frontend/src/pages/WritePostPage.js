import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, Dimensions, View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { LOCAL } from '../../ipConfig';

function WritePostPage() {

    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

    const selectImage = () => {
        launchImageLibrary({includeBase64: true}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                setImage(response);
            }
        })
    }

    const writePost = async () => {
        const formData = new FormData();
        const token = await AsyncStorage.getItem('token');
        formData.append('image', {
            uri: image.assets[0].uri,
            type: image.assets[0].type,
            name: image.assets[0].fileName,
            data: image.assets[0].base64
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            <View style={styles.contentsContainer}>
                {
                    image !== null
                    ? <Image 
                        source={{ uri: image.assets[0].uri }}
                        style={styles.choosedImage}
                        resizeMode='cover'
                    />
                    : <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
                        <IonIcon 
                            name="image"
                            size={180} 
                            color="#ffb687"                            
                        />
                        <Text style={styles.chooseMent}>Choose a picture</Text>
                    </TouchableOpacity>
                }
                <TextInput 
                    value={content}
                    onChangeText={setContent}
                    style={styles.textInputCard}
                    placeholder="Write your post..."
                    placeholderTextColor="#ffb687"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    textAlignVertical='top'
                />
                <TouchableOpacity onPress={()=>{writePost()}} style={styles.completeButton}>
                    <Text style={styles.completeText}>Complete</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#262444'
    },
    contentsContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '85%',
        marginTop: width * 0.15,
        marginBottom: width * 0.15
    },
    imageContainer: {
        width: width * 0.6,
        height: width * 0.6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe6d3',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    choosedImage: {
        width: width * 0.6,
        height: width * 0.6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    chooseMent: {
        color: '#ffb687',
        fontSize: width * 0.05,
        fontFamily: 'TmoneyRoundWindRegular'
    },
    textInputCard: {
        width: width * 0.8,
        height: width * 0.2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: width * 0.08,
        backgroundColor: '#ffe6d3',
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
    },
    completeButton: {
        width: width * 0.25,
        height: width * 0.15,
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb687',
        marginTop: width * 0.2,
        marginLeft: width * 0.55
    },
    completeText: {
        color: '#ffe6d3',
        fontSize: width * 0.04,
        fontFamily: 'TmoneyRoundWindExtraBold'
    }
})

export default WritePostPage
