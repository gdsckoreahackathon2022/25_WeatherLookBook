import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL} from '../../ipConfig';

function CommentPage({route}) {
  const [text, setCommentInput] = useState('');
  const [update, setUpdate] = useState(null);
  const [inputMargin, setInputMargin] = useState('8%');
  let {writer, content, bid} = route.params;
  // let comments = [
  //     {writer: 'Aimee', content: 'Lorem ipsum dolor sit amet'},
  //     {writer: 'Buck', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'},
  //     {writer: 'Chloe', content: '1914 translation by H. Rackham'},

  // ]
  const [comments, setComments] = useState([]);

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

  const writeComment = async () => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('text', text);
    axios
      .post(`${LOCAL}/commentapp/comment/${bid}/`, formData, {
        headers: {Authorization: 'Token ' + token},
      })
      .then(res => {
        setCommentInput('');
        setUpdate(res.data);
        console.log('comment success');
      })
      .catch(e => {
        console.log('comment error');
      });
  };

  const onFocus = () => {
    setInputMargin('0%');
  };

  const onBlur = () => {
    setInputMargin('8%');
  };

  useEffect(() => {
    getComments();
  }, [update]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.content}>
          <View style={styles.profile}>
            <IonIcon name="person" size={25} color="#262444" />
          </View>
          <View style={styles.writerContainer}>
            {/* <Text style={styles.writer}>{writer}</Text> */}
            <Text style={styles.writer}>{writer}</Text>
            <Text>{content}</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          {comments !== undefined &&
            comments.map((data, index) => {
              return (
                <View key={index} style={styles.comment}>
                  <Text style={styles.writer}>{data.writer}</Text>
                  <Text>{data.text}</Text>
                  <Text style={styles.date}>
                    {data.date.replace(/-/gi, '.')}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setCommentInput}
          onBlur={() => onBlur()}
          onFocus={() => onFocus()}
          style={styles.textInputCard}
          placeholder="Add a comment..."
          placeholderTextColor="#ffb687"
          underlineColorAndroid="transparent"
          multiline={true}
          textAlignVertical="top"
        />
        <TouchableOpacity
          onPress={() => writeComment()}
          style={styles.postButton}>
          <Text
            style={{
              color: '#262444',
              fontSize: 15,
              fontFamily: 'KoPub World Dotum Medium',
            }}>
            Post
          </Text>
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
    flexDirection: 'column',
    backgroundColor: '#ffe6d3',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '3%',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
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
  writerContainer: {
    width: '100%',
    marginLeft: '1%',
    marginRight: '3%',
  },
  writer: {
    color: '#262444',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.04,
  },
  date: {
    color: '#262444',
    marginLeft: width * 0.7,
    fontFamily: 'TmoneyRoundWindRegular',
    fontSize: width * 0.03,
  },
  commentContainer: {
    width: '100%',
    marginBottom: width * 0.45,
  },
  comment: {
    width: '100%',
    paddingTop: '1.5%',
    paddingBottom: '1.5%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#262444',
    position: 'absolute',
    bottom: 0,
  },
  textInputCard: {
    width: '100%',
    height: width * 0.3,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
    paddingTop: width * 0.02,
    paddingBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#ffb687',
    fontFamily: 'TmoneyRoundWindRegular',
    fontSize: width * 0.05,
    textDecorationLine: 'none',
    marginTop: '1%',
    borderWidth: 1,
    borderColor: '#ffb687',
  },
  postButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.7,
    height: width * 0.07,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#ffb687',
    margin: '2%',
  },
});

export default CommentPage;
