import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    };
  }

  changeTextinputContent = (item, val) => {
    this.setState({
      [item]: val,
    });
  }

 register = () => {
    const {email,password} = this.state;

      this.setState({isLoading: true});
      firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess)
        .catch(error => {
          this.setState({isLoading: false});
          alert(error.message);
        });
  };

  onLoginSuccess = () => {
    alert('success');
    this.setState({isLoading: false, email: '', password: ''});
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    const {email, password, errors, isLoading} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.container}>
              <View style={styles.container1}>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{flex: 1, paddingLeft: 20}}
                    onChangeText={text =>
                      this.changeTextinputContent('email', text)
                    }
                    value={email}
                    placeholder="Username"
                  />
                </View>
                {errors.email ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>

              <View style={styles.container2}>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{flex: 1, paddingLeft: 20}}
                    onChangeText={text =>
                      this.changeTextinputContent('password', text)
                    }
                    value={password}
                    placeholder="Password"
                    secureTextEntry
                  />
                </View>
                {errors.password ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              <View style={styles.container3}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={this.register}>
                  <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default RegScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },

  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#464B55',
    width: 320,
    height: 52,
    backgroundColor: '#047EE3',
    borderRadius: 10,
  },

  text: {
    color: 'white',
    fontSize: 17,
  },

  TextInput: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    width: 320,
    borderColor: '#464B55',
    borderWidth: 1,
    borderRadius: 10,
  },

  image: {
    width: 30,
    height: 30,
  },
});
