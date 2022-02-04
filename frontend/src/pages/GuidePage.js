import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import W from '../images/woman1.png';
import M from '../images/man1.png';
import {LOCAL} from '../../ipConfig';
import IonIcon from 'react-native-vector-icons/Ionicons';

function GuidePage() {
  const [temperature, setTemperature] = useState({avg: 0, min: 0, max: 0});
  const [date, setDate] = useState({date: '', month: '', day: ''});
  const [checkedDate, setCheckedDate] = useState(0);
  const [popup, setPopup] = useState(false);

  const getTime = () => {
    let getDay = new Date();
    let day;
    switch (getDay.getDay()) {
      case 0:
        day = 'Sun';
        break;
      case 1:
        day = 'Mon';
        break;
      case 2:
        day = 'Tue';
        break;
      case 3:
        day = 'Wed';
        break;
      case 4:
        day = 'Thur';
        break;
      case 5:
        day = 'Fri';
        break;
      case 6:
        day = 'Sat';
        break;
    }
    let newDate = {
      date: getDay.getDate(),
      month: getDay.getMonth() + 1,
      day: day,
    };
    setDate(newDate);
  };

  const selectWomanImage = () => {
    return W;
  };

  const selectManImage = () => {
    return M;
  };

  const showDate = () => {
    let contents = [];
    for (let i = 0; i < 7; i++) {
      contents.push(
        <TouchableOpacity key={i} onPress={() => setCheckedDate(i)}>
          <View style={checkedDate === i && styles.checkedDateCard}>
            <Text
              style={
                checkedDate === i ? styles.dateText : styles.unCheckedDateText
              }>
              {date.date + i}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }
    return contents;
  };

  const getTemperature = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        `${LOCAL}/crawlingapp/`,
        {},
        {
          headers: {Authorization: 'Token ' + token},
        },
      )
      .then(res => {
        console.log(res.data);
        setTemperature(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTemperature();
    getTime();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Header color={true} />
      <View style={styles.titleBox}>
        <Text style={styles.date}>
          {date.month}. {date.date}. {date.day}
        </Text>
        <Text style={styles.titleText}>
          Recommended outfits{`\n`}By temperature
        </Text>
      </View>
      <View style={styles.bottomCard}>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View style={styles.calendar}>{showDate()}</View>
          <View style={styles.tempContainer}>
            <View style={styles.tempBox}>
              <Text style={styles.tempText}>{temperature.min}°</Text>
              <View style={styles.bar} />
              <Text style={styles.tempHighText}>LOWEST</Text>
            </View>
            <View style={styles.tempBox}>
              <Text style={styles.tempText}>{temperature.avg}°</Text>
              <View style={styles.bar} />
              <Text style={styles.tempHighText}>NOW</Text>
            </View>
            <View style={styles.tempBox}>
              <Text style={styles.tempText}>{temperature.max}°</Text>
              <View style={styles.bar} />
              <Text style={styles.tempHighText}>HIGHST</Text>
            </View>
          </View>
          {popup ? (
            <View style={styles.popupContainer}>
              <TouchableOpacity onPress={() => setPopup(false)}>
                <IonIcon
                  name={'close-circle-outline'}
                  size={25}
                  color={'#900D09'}
                  style={{marginLeft: '70%'}}
                />
              </TouchableOpacity>
              <IonIcon
                name={'notifications-outline'}
                size={35}
                color={'#262444'}
              />
              <View style={styles.line} />
              <View style={styles.textBox}>
                <Text style={styles.popupText}>
                  손이 꽁꽁꽁 발이 꽁꽁꽁{'\n'}겨울코트, 롱패딩 발열내의와{'\n'}
                  같은 두툼 따뜻한 옷을 입어요
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setPopup(true)}>
              <View style={styles.charaterContainer}>
                <Image style={styles.chImage} source={selectWomanImage()} />
                <Image style={styles.chImage} source={selectManImage()} />
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  line: {
    width: width * 0.75,
    height: width * 0.005,
    backgroundColor: '#262444',
    marginTop: width * 0.02,
    marginBottom: width * 0.02,
  },
  textBox: {
    width: width * 0.7,
  },
  popupText: {
    color: '#262444',
    textAlign: 'center',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
  },
  background: {
    backgroundColor: '#ffe6d3',
    width: width,
    // height: height
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    width: width,
    height: width * 0.4,
    paddingLeft: width * 0.03,
  },
  date: {
    fontSize: width * 0.06,
    color: '#262444',
    fontWeight: '600',
  },
  titleText: {
    color: '#262444',
    fontFamily: 'sans-serif-medium',
    fontSize: width * 0.08,
    fontWeight: '800',
  },
  bottomCard: {
    width: width,
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopRightRadius: width * 0.15,
    borderTopLeftRadius: width * 0.15,
    elevation: 10,
    paddingTop: width * 0.01,
  },
  calendar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.9,
    marginTop: width * 0.1,
  },
  checkedDateCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.12,
    height: width * 0.12,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    backgroundColor: '#262444',
    position: 'relative',
    bottom: -1,
  },
  dateText: {
    color: '#ffb687',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.06,
  },
  unCheckedDateText: {
    color: '#C0C0C0',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.06,
  },
  tempContainer: {
    width: width * 0.9,
    height: width * 0.4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#262444',
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
    borderBottomLeftRadius: width * 0.02,
  },
  tempBox: {
    width: width * 0.2,
    display: 'flex',
    alignItems: 'center',
  },
  tempText: {
    color: '#ffb687',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.08,
  },
  bar: {
    width: '100%',
    height: width * 0.005,
    backgroundColor: '#ffb687',
    marginTop: width * 0.03,
    marginBottom: width * 0.03,
  },
  tempHighText: {
    color: '#ffb687',
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: width * 0.03,
  },
  charaterContainer: {
    width: width * 0.9,
    marginTop: width * 0.1,
    marginBottom: width * 0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  popupContainer: {
    width: width * 0.9,
    marginTop: width * 0.1,
    marginBottom: width * 0.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chImage: {
    width: width * 0.35,
    height: width * 0.51,
  },
});

export default GuidePage;
