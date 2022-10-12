import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from 'react-native';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Header, Icon } from 'react-native-elements';
import * as SMS from 'expo-sms';
import firebase from 'firebase';
export default class FireScreen extends Component {
  constructor() {
    super();
    this.state = {
      phoneno: '',
      address: '',
      description:'',
      username:"", 
      
    };
  }

  submitComplaint = async () => {
    db.collection('OtherComplaint').add({
      phoneno: this.state.phoneno,
      address: this.state.address,
      description:this.state.description,
    });
  };
  sendSMS = async () => {
    console.log('Send SMS Executed');
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        console.log('SMS Available');
        const { result } = await SMS.sendSMSAsync(
          ['6354391848'],
          'Hello, I am ' +
            this.state.username +
            ' and my mobile number is ' +
            this.state.phoneno +
            '. I wanted to report an emergency: There is a fire at ' +
            this.state.address +
            ' and this is a description ' +
            this.state.description
        );
        // do your SMS stuff here
      } else {
        Alert.alert('SMS Not Available');
      }
    } catch (error) {
      console.log();
    }
  };
  getUserDetails=()=>{
    var email = firebase.auth().currentUser.email;
    db.collection('users').where('email','==',email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          username   : data.username,
          phoneno : data.phonenumber, 
        })
      });
    })
  }
  componentDidMount(){
   this.getUserDetails()
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

      <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex:1}}>

        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#fff"
              onPress={() => this.props.navigation.navigate('HomeScreen')}
            />
          }
          centerComponent={{
            text: 'Fire screen',
            style: { color: '#fff' },
          }}
          containerStyle={{ flex: 0.1, backgroundColor: '#000' }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['#E9272F', '#F8695D', '#D56C63']}
          style={styles.background}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
            
              marginLeft: 20,
              marginTop: 20,
            }}>
            
            
          </View>

          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              marginLeft: 20,
              marginTop: -200,
                alignItems:"center",
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              PhoneNumber
            </Text>

            <TextInput
              style={{
                color: '#fff',
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: 250,
              }}
              onChangeText={(text) => {
                this.setState({ phoneno: text });
              }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              marginLeft: 20,
              marginTop: 20,
                alignItems:"center",
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              Address
            </Text>

            <TextInput
              style={{
                color: '#fff',
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: 250,
              }}
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
            />
          </View>

          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              marginLeft: 20,
              marginTop: 20,
                alignItems:"center",
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              Description
            </Text>

            <TextInput
              style={{
                color: '#fff',
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: 250,
              }}
              onChangeText={(text) => {
                this.setState({ description: text });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: 'white',
            }}
            onPress={() => {
              this.submitComplaint();
              this.sendSMS();
            }}>
            <Text style={{ color: 'red', fontSize: 15 }}> Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 0.9,
    justifyContent: 'center',
  },
});
