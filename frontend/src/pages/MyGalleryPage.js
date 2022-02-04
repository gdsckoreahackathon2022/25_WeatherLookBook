import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {LOCAL} from '../../ipConfig';

function MyGalleryPage({route, navigation}) {
  let {name, email} = route.params;

  const [contents, setContents] = useState([]);

  const getContents = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${LOCAL}/accountapp/myboard/`, {
        headers: {Authorization: 'Token ' + token},
      })
      .then(res => {
        console.log(res.data);
        setContents(res.data.reverse());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getOnePost = async id => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${LOCAL}/boardapp/board/${id}`, {
        headers: {Authorization: 'Token ' + token},
      })
      .then(res => {
        console.log('one data: ', res.data);
        navigation.navigate('DetailedSocialPage', {
          postData: res.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderCards = contents.map((data, index) => {
    return (
      <TouchableOpacity onPress={() => getOnePost(data.bid)} key={index}>
        <Image
          style={styles.cardImage}
          source={{uri: `${LOCAL}/media/` + data.image}}
        />
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getContents();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <IonIcon name="person" size={45} color="#262444" />
          </View>
          <View style={styles.nameContainer}>
            {/* <Text style={styles.nameText}>{name}</Text> */}
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.nameText}>{email}</Text>
          </View>
        </View>
        <View style={styles.photoContainer}>
          {renderCards}
          {renderCards}
          {renderCards}
          {renderCards}
          {renderCards}
          {renderCards}
          {renderCards}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#262444',
  },
  profileContainer: {
    width: '100%',
    height: width * 0.3,
    display: 'flex',
    flexDirection: 'row',
    padding: '5%',
  },
  profile: {
    width: width * 0.2,
    height: width * 0.2,
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb687',
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5%',
  },
  nameText: {
    color: '#ffe6d3',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.04,
  },
  photoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginBottom: '16%',
  },
  cardImage: {
    width: width * 0.313,
    height: width * 0.313,
    marginBottom: width * 0.015,
  },
});

export default MyGalleryPage;
