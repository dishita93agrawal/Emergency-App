import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Header, Icon } from 'react-native-elements';
import * as SMS from 'expo-sms';
import firebase from 'firebase';

import DropDownPicker from 'react-native-dropdown-picker';
export default class MajorAccident extends Component {
  constructor() {
    super();
    this.state = {
      majorItem: '',
      phoneno: '',
      address: '',
      username: '',
      open: false,
      value: null,
      items: [
        { label: 'Two Wheeler', value: 'Two Wheeler' },
        { label: 'Three Wheeler', value: 'Three Wheeler' },
        { label: 'Four Wheeler', value: 'Four Wheeler' },
        { label: 'In person', value: 'In person' },
      ],
    };
  }

  submitComplaint = async () => {
    db.collection('MajorComplaint').add({
      majorItem: this.state.majorItem,
      phoneno: this.state.phoneno,
      address: this.state.address,
    });
  };
  sendSMS = async () => {
    console.log('Send SMS Exicuted');
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
            '. I wanted to report an emergency of accident ' +
            this.state.majorItem +
            ' at Address ' +
            this.state.address
        );
        // do your SMS stuff here
      } else {
        Alert.alert('SMS Not Available');
      }
    } catch (error) {
      console.log();
    }
  };
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            username: data.username,
            phoneno: data.phonenumber,
          });
        });
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
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
            text: 'Major Accident Screen',
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
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              MajorAccident
            </Text>
            <DropDownPicker
              items={this.state.items}
              open={this.state.open}
              value={this.state.majorItem}
              setOpen={() => {
                this.setState({ open: !this.state.open });
              }}
              onSelectItem={(val) => {
                this.setState({ majorItem: val.label });
              }}
              style={{
                width: '75%',
                height: 40,
                alignSelf: 'center',
                backgroundColor: 'white',
                marginTop: 20,
              }}
              textStyle={{ color: 'black' }}
              labelStyle={{
                fontWeight: 'bold',
                color: 'black',
              }}
            />
          </View>

          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              marginLeft: 20,
              marginTop: 20,
              width: '85%',
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              PhoneNO
            </Text>

            <TextInput
              style={{
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: '75%',
                alignSelf: 'center',
                color: '#fff',
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
              width: '85%',
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              Address
            </Text>

            <TextInput
              style={{
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: '75%',
                alignSelf: 'center',
                color: '#fff',
              }}
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              width: '65%',
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
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 0.9,
    justifyContent: 'center',
  },
});
