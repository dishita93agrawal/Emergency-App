import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import call from 'react-native-phone-call';
export default class HomeScreen extends Component {
    makeCall = () => {
    const args = {
      number: "112",
      prompt: true,
    };
    call(args).catch(console.error);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#E9272F', '#F8695D', '#D56C63']}
          style={styles.background}>
          <Header
            centerComponent={{
              text: 'Emergency App',
              style: { color: '#fff' },
            }}
            containerStyle={{ backgroundColor: 'black', flex: 0.1 }}
          />

          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                position: 'relative',
                borderRadius: 50,
                marginTop: 30,
              }}
              onPress={() => {
                this.makeCall();
              }}>
              <ImageBackground
                source={require('../assets/SOS3.png')}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: 150,
                  height: 160,
                  marginTop: -30,
                  marginLeft: -25,
                }}></ImageBackground>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'red',
                borderWidth: 2,
                borderColor: 'red',
                marginTop: 30,
              }}
              onPress={() => {
                this.props.navigation.navigate('Abuse');
              }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/blame.png')}
                resizeMode="contain"
              />
              <Text style={{ color: 'white' }}> Abuse Type </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'red',
                borderWidth: 2,
                borderColor: 'red',
                marginTop: 30,
              }}
              onPress={() => {
                this.props.navigation.navigate('MajorAccident');
              }}>
               <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/accident.png')}
                resizeMode="contain"
              />
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Major Accident
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'red',
                borderWidth: 2,
                borderColor: 'red',
                marginTop: 30,
              }}
              onPress={() => {
                this.props.navigation.navigate('TheftScreen');
              }}>
               <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/robbery-news.png')}
                resizeMode="contain"
              />
              <Text style={{ color: 'white' }}> Theft Of </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'red',
                borderWidth: 2,
                borderColor: 'red',
                marginTop: 30,
              }}
              onPress={() => {
                this.props.navigation.navigate('FireScreen');
              }}>
               <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/fire.png')}
                resizeMode="contain"
              />
              <Text style={{ color: 'white' }}> Fire </Text>
            </TouchableOpacity>
          </View>
           <View style={{
              flex: 0.05}}></View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
              justifyContent:"center",
              backgroundColor:"#535353",
              marginLeft:10,
              marginRight:10,
              borderRadius:10, 
            }}>
            <Text style ={{color:"#fff", fontFamily:"Cochin", fontWeight:"bold"}}>Note 
             </Text>
                <Text style ={{color:"#fff",fontFamily:"Cochin"}}>
            Reporting false or incorrect Emergency is an considered an offense and the person will be subject to applicable punishment</Text>
            </View>
            <View style={{
              flex: 0.05}}></View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
