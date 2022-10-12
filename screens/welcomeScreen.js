import React, { Component } from 'react';
import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: 'test@gmail.com',
      password: 'qwertyui',
    };
  }

  userLogin = (username, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
          this.props.navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          alert('Something went wrong, please try again');
        });
    } catch (error) {
      console.log();
    }
  };
  forgotpassword = (email) => {
    if (email != '') {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          alert('Check you email to reset your password');
        })
        .catch(function (error) {
          console.log(error);
          alert('Something went wrong, please try again');
          // An error happened.
        });
    } else {
      alert('Please enter your email first!');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/LoginScreen.png')}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <TextInput
            placeholder="Email"
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
              color: '#fff',

              width: '85%',
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
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
              marginTop: 10,
              padding: 10,
              color: '#fff',
              width: '85%',
            }}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              marginTop: 10,
            }}
            onPress={() => {
              this.forgotpassword(this.state.username);
            }}>
            <Text
              style={{
                borderBottomColor: 'black',
                color: 'white',
              }}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        
            <TouchableOpacity
              style={{
                width: '65%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop:10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'white',
              }}
              onPress={() => {
                this.userLogin(this.state.username, this.state.password);
              }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                this.props.navigation.navigate('signUpScreen');
              }}>
              <Text style={{ color: 'white' }}>Not a user? Create Account</Text>
            </TouchableOpacity>
       
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },

  signUpButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
