import React from 'react';
import { SafeAreaView, 
         StyleSheet, 
         Dimensions, } from 'react-native';

function Splash() {
    return (
        <SafeAreaView style={styles.background}>

        </SafeAreaView>
    )
}


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    background: {
      backgroundColor: '#ffe6d3',
      width: width,
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
})


export default Splash
