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
import IonIcon from 'react-native-vector-icons/Ionicons';
import photo from '../images/1.jpg';

function EditProfilePage({route}) {
  let {email, name} = route.params;
  // const [editName, setEditName] = useState(name);
  const [editName, setEditName] = useState(name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.contentsContainer}>
          {/* <Image source={photo} style={styles.profile} /> */}
          <TouchableOpacity style={styles.profile}>
            <IonIcon name="person" size={45} color="#262444" />
          </TouchableOpacity>
          <Text style={styles.emailText}>{email}</Text>
          <TextInput
            value={editName}
            onChangeText={setEditName}
            style={styles.textInputCard}
            placeholder="Please input your new id"
            placeholderTextColor="#ffb687"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.emailText}>Edit</Text>
            <IonIcon
              name="pencil"
              size={20}
              color="#ffe6d3"
              style={{marginLeft: '-10%'}}
            />
          </TouchableOpacity>
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
  contentsContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: width * 0.2,
  },
  profile: {
    width: width * 0.3,
    height: width * 0.3,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    borderBottomLeftRadius: width * 0.15,
    borderBottomRightRadius: width * 0.15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb687',
  },
  emailText: {
    color: '#ffe6d3',
    fontFamily: 'TmoneyRoundWindRegular',
    fontSize: width * 0.04,
    margin: width * 0.05,
  },
  textInputCard: {
    width: '90%',
    height: width * 0.15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#ffe6d3',
    padding: width * 0.05,
    color: '#262444',
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
    backgroundColor: '#ffb687',
    marginTop: width * 0.2,
    marginLeft: width * 0.5,
  },
});

export default EditProfilePage;
