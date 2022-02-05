import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL} from '../../ipConfig';

function DetailedSocialPage({navigation, route}) {
  const [comments, setComments] = useState([]);
  let {bid, content, date, image, like_count, user} = route.params.postData;

  const getComments = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${LOCAL}/commentapp/comment/${bid}/`, {
        headers: {Authorization: 'Token ' + token},
      })
      .then(res => {
        console.log(res.data);
        setComments(res.data.comment);
        console.log('comment success');
      })
      .catch(e => {
        console.log('comment error');
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.cardContainer}>
          <View style={styles.profileBox}>
            <View style={styles.profile}>
              <IonIcon name="person" size={25} color="#262444" />
            </View>
            <Text style={styles.writer}>{user}</Text>
            <Text style={styles.date}>{date.replace(/-/gi, '.')}</Text>
          </View>
          <Image style={styles.cardImage} source={{uri: image}} alt="image" />
          <View style={styles.textIconWrapper}>
            <Text style={styles.cardText}>{content}</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.likeText}>{like_count} LIKED!</Text>
        </View>
        <View style={styles.commentContainer}>
          {comments !== undefined &&
            comments.map((data, index) => {
              return (
                <View key={index} style={styles.comment}>
                  <Text style={styles.writer}>{data.writer}</Text>
                  <Text>{data.text}</Text>
                  <Text style={styles.commentDate}>
                    {data.date.replace(/-/gi, '.')}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CommentPage', {
            writer: user,
            content: content,
            bid: bid,
          });
        }}
        style={styles.completeButton}>
        <IonIcon name="chatbubble-ellipses" size={25} color="#ffe6d3" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffe6d3',
    width: width,
    // height: height,
    display: 'flex',
    alignItems: 'center',
  },
  profileBox: {
    width: width * 0.8,
    height: width * 0.2,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: width * 0.1,
    height: width * 0.1,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
    marginRight: '3%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb687',
  },
  cardContainer: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.01,
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
    borderBottomLeftRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
  },
  cardImage: {
    width: width * 0.76,
    height: width * 0.65,
  },
  textIconWrapper: {
    width: width * 0.76,
    display: 'flex',
    marginTop: width * 0.02,
    flexDirection: 'column',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardText: {
    fontFamily: 'TmoneyRoundWindExtraBold',
    color: '#262444',
    fontSize: width * 0.04,
    paddingBottom: width * 0.01,
  },
  likeText: {
    fontFamily: 'TmoneyRoundWindRegular',
    color: '#262444',
    fontSize: width * 0.04,
    paddingTop: width * 0.02,
    paddingBottom: width * 0.02,
    paddingLeft: '2.5%',
  },
  commentContainer: {
    width: width * 0.8,
    borderColor: 'gray',
    borderTopWidth: 0.5,
  },
  comment: {
    width: '100%',
    paddingTop: '1.5%',
    paddingBottom: '3%',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
  },
  writer: {
    color: '#262444',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.04,
  },
  date: {
    color: '#262444',
    marginTop: width * 0.02,
    marginLeft: width * 0.33,
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.035,
  },
  commentDate: {
    color: '#262444',
    marginTop: -width * 0.08,
    marginLeft: width * 0.58,
    fontFamily: 'TmoneyRoundWindRegular',
    fontSize: width * 0.03,
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
    bottom: '12%',
  },
});

export default DetailedSocialPage;
