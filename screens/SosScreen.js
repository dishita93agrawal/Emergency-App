import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default class SosScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        

        <Text
          style={{
            padding: 5,
            color: 'white',
            fontFamily: 'French Script Mt', 
            fontSize: 25,
          }}>
          YOUR LOCATION
        </Text>

        <Text
          style={{
            padding: 5,
            color: 'white',
            fontFamily: 'cursive',
            fontSize: 25,
          }}>
          HAS BEEN SENT
        </Text>

        <Text
          style={{
            padding: 5,
            color: 'white',
            fontFamily: 'cursive',
            fontSize: 25,
          }}>
          TO YOUR NEAREST
        </Text>

        <Text
          style={{
            padding: 5,
            color: 'white',
            fontFamily: 'cursive',
            fontSize: 25,
          }}>
          POLICE CONTROL ROOM
        </Text>
      </View>
    );
  }
} 