import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
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
export default class Abuse extends Component {
  constructor() {
    super();
    this.state = {
      abuseItem: '',
      phoneno: '',
      address: '',
      username: '',
      open: false,
      value: null,
      items: [
        { label: 'Physical', value: 'Physical' },
        { label: 'Sexual', value: 'Sexual' },
        { label: 'Neglect', value: 'Neglect' },
        { label: 'Emotional', value: 'Emotional' },
      ],
    };
  }

  submitComplaint = async () => {
    console.log(this.state.abuseItem);
    db.collection('AbuseComplaint').add({
      abuseItem: this.state.abuseItem,
      phoneno: this.state.phoneno,
      address: this.state.address,
    });
  };
  sendSMS = async () => {
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
            '. I wanted to report an emergency of ' +
            this.state.abuseItem +
            ' abuse at Address ' +
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
            text: 'Abuse Screen',
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
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              Abuse Type
            </Text>
            <DropDownPicker
              items={this.state.items}
              open={this.state.open}
              value={this.state.abuseItem}
              setOpen={() => {
                this.setState({ open: !this.state.open });
              }}
              onSelectItem={(val) => {
                this.setState({ abuseItem: val.label });
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
              marginTop: 10,
              width: '95%',
              alignSelf: 'center',
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              PhoneNO
            </Text>

            <TextInput
              style={{
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                alignSelf: 'center',
                width: '85%',
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
              marginTop: 10,
              width: '95%',
              alignSelf: 'center',
            }}>
            <Text style={{ padding: 5, color: '#fff', fontWeight: 'bold' }}>
              Address
            </Text>

            <TextInput
              style={{
                borderWidth: 3,
                borderRadius: 4,
                padding: 5,
                width: '85%',
                color: '#fff',
                alignSelf: 'center',
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
    alignItems: 'center',
  },
});
