import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { BottomTabBar } from '@react-navigation/bottom-tabs'

function TabBar(props) {
    return (
        <View style={styles.tabBar}>
        <BottomTabBar {...props} />
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tabBar: {
    width: width,
    // height: width * 0.1,
    // backgroundColor: '#ffb687',
    backgroundColor: 'black',
  },

})

export default TabBar
