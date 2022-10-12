import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';
export default class signUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      phonenumber: '',
      state: '',
      email: '',
      password: '',
      confirmpassword: '',
    };
  }
  userSignUp = (username, password, confirmpassword) => {
    if (password == confirmpassword) {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(username, password)
          .then((userCredential) => {
            alert('User added successfully');
            db.collection('users').add({
              username: this.state.username,
              phonenumber: this.state.phonenumber,
              state: this.state.state,
              email: this.state.email,
            });
            this.props.navigation.navigate('WelcomeScreen');
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('make sure passwords match each other');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/backgroun1.png')}
          style={[styles.container, { alignItems: 'center' }]}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                username: text,
              });
            }}
            value={this.state.username}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TextInput
            placeholder="PhoneNumber"
            placeholderTextColor="white"
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                phonenumber: text,
              });
            }}
            value={this.state.phonenumber}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TextInput
            placeholder="State"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                state: text,
              });
            }}
            value={this.state.state}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TextInput
            placeholder="ConfirmPassword"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                confirmpassword: text,
              });
            }}
            value={this.state.confirmpassword}
            style={{
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
marginTop:10,
              width: '85%',
            }}
          />

          <TouchableOpacity
            style={{
              width: "65%",
              alignSelf:"center",
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: 'white',
              marginTop: 10,
            }}
            onPress={() => {
              this.userSignUp(
                this.state.email,
                this.state.password,
                this.state.confirmpassword
              );
            }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
            }}>
            <Text style={{ color: 'white' }}>Back</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  signUpButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 8,
  },
});
