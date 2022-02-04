import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';

function ShoppingPage({route}) {
  const [image, setImage] = useState(null);

  const selectImage = () => {
    launchImageLibrary({includeBase64: true}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setImage(response);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>
            Get recommendations for clothes that you might be interested in
          </Text>
        </View>
        <View>
          {image !== null ? (
            <Image
              source={{uri: image.assets[0].uri}}
              style={styles.choosedImage}
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              onPress={selectImage}
              style={styles.imageContainer}>
              <IonIcon name="image" size={120} color="#ffb687" />
              <Text style={styles.chooseMent}>Choose a picture</Text>
            </TouchableOpacity>
          )}
        </View>
        {image !== null ? (
          <View style={styles.buttonContainer}>
            <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.productContainer}>
                <Image
                  source={{
                    uri: 'https://shopping-phinf.pstatic.net/main_2963896/29638962543.20211203030734.jpg?type=f640',
                  }}
                  style={styles.photo}
                />
                <Text style={styles.priceText}>29,900 ₩</Text>
                <Text style={styles.nameText}>
                  옷자락 여자 따뜻한 울체크남방 루즈핏 캐주얼 겨울 셔츠
                </Text>
              </View>
              <View style={styles.productContainer}>
                <Image
                  source={{
                    uri: 'https://shopping-phinf.pstatic.net/main_2391313/23913138173.20200826192553.jpg?type=f640',
                  }}
                  style={styles.photo}
                />
                <Text style={styles.priceText}>17,790 ₩</Text>
                <Text style={styles.nameText}>
                  체크 패턴 여성 여자 긴팔 셔츠 남방 GN0W31
                </Text>
              </View>
              <View style={styles.productContainer}>
                <Image
                  source={{
                    uri: 'https://shopping-phinf.pstatic.net/main_2950943/29509434050.20211103005228.jpg?type=f640',
                  }}
                  style={styles.photo}
                />
                <Text style={styles.priceText}>17,230 ₩</Text>
                <Text style={styles.nameText}>
                  케미위크 체크 셔츠남방 W048 블라우스 여성블라우스
                </Text>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.productContainer}>
                <View style={styles.photoSkeleton}>
                  <IonIcon name="shirt" size={80} color="#ffb687" />
                </View>
                <View style={styles.line} />
                <View style={styles.line2} />
              </View>
              <View style={styles.productContainer}>
                <View style={styles.photoSkeleton}>
                  <IonIcon name="shirt" size={80} color="#ffb687" />
                </View>
                <View style={styles.line} />
                <View style={styles.line2} />
              </View>
              <View style={styles.productContainer}>
                <View style={styles.photoSkeleton}>
                  <IonIcon name="shirt" size={80} color="#ffb687" />
                </View>
                <View style={styles.line} />
                <View style={styles.line2} />
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  imageContainer: {
    marginTop: width * 0.05,
    width: width * 0.45,
    height: width * 0.45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6d3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: width * 0.07,
  },
  choosedImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: width * 0.07,
  },
  chooseMent: {
    color: '#ffb687',
    fontSize: width * 0.05,
    fontFamily: 'TmoneyRoundWindRegular',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#262444',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    width: width,
    height: width * 0.3,
    paddingLeft: width * 0.03,
  },
  titleText: {
    color: '#ffb687',
    fontFamily: 'sans-serif-medium',
    fontSize: width * 0.06,
    fontWeight: '800',
  },
  buttonContainer: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: width * 0.1,
    marginTop: width * 0.1,
  },
  button: {
    width: width * 0.2,
    height: width * 0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#ffb687',
    borderWidth: 2,
    backgroundColor: '#ffe6d3',
    marginRight: width * 0.08,
  },
  line: {
    width: width * 0.15,
    height: width * 0.015,
    backgroundColor: '#ffb687',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: width * 0.035,
  },
  line2: {
    width: width * 0.25,
    height: width * 0.015,
    backgroundColor: '#ffb687',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: width * 0.035,
  },
  buttonText: {
    fontFamily: 'KoPubWorld Dotum Bold',
    fontSize: width * 0.04,
    color: '#ffb687',
  },
  productContainer: {
    width: width * 0.35,
    marginRight: width * 0.06,
  },
  photo: {
    width: width * 0.35,
    height: width * 0.38,
  },
  photoSkeleton: {
    width: width * 0.35,
    height: width * 0.38,
    backgroundColor: '#ffe6d3',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'TmoneyRoundWindExtraBold',
    marginTop: width * 0.03,
    marginBottom: width * 0.03,
    fontSize: width * 0.04,
    color: '#ffb687',
  },
  nameText: {
    fontFamily: 'KoPubWorld Dotum Medium',
    fontSize: width * 0.025,
    color: '#ffb687',
  },
  searchSection: {
    width: width * 0.7,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6d3',
    borderWidth: 2,
    borderColor: '#ffb687',
  },
  search: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    height: width * 0.1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
  },
});

export default ShoppingPage;
