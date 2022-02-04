import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import MyPageCard from './MyPageCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyPage({navigation}) {
  const [info, setInfo] = useState({
    name: '',
    email: '',
  });

  const getInfo = async () => {
    let name = await AsyncStorage.getItem('name');
    let email = await AsyncStorage.getItem('email');
    setInfo({
      ...info,
      name: name,
      email: email,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header color={false} />
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>My Page</Text>
        <Text style={styles.infoText}>{info.email}</Text>
        {/* <Text style={styles.infoText}>{info.name}</Text> */}
        <Text style={styles.infoText}>{info.name}</Text>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('EditProfilePage', {
              name: info.name,
              email: info.email,
            });
          }}>
          <MyPageCard name="EDIT PROFILE" icon="cog-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('ShoppingPage');
          }}>
          <MyPageCard name="SHOPPING" icon="cart-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('MyGalleryPage', {
              name: info.name,
              email: info.email,
            });
          }}>
          <MyPageCard name="MY POSTS" icon="file-tray-stacked-outline" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('LikedGalleryPage', {
              name: info.name,
              email: info.email,
            });
          }}>
          <MyPageCard name="LIKED POSTS" icon="thumbs-up-outline" />
        </TouchableOpacity>
      </View>
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
  cardContainer: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    width: width,
    height: width * 0.4,
    paddingLeft: width * 0.03,
  },
  titleText: {
    color: '#ffb687',
    fontFamily: 'sans-serif-medium',
    fontSize: width * 0.06,
    fontWeight: '800',
    marginBottom: width * 0.05,
  },
  infoText: {
    color: '#ffe6d3',
    fontFamily: 'KoPubWorld Dotum Medium',
    fontSize: width * 0.04,
  },
});

export default MyPage;
