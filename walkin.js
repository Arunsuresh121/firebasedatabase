import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

class WalkinVisitorsScreen extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNo: '',
    };
    this.ref = firebase.database().ref(`/users/`);
  }

 changeTextinputContent = (item, val) => {
    this.setState({
      [item]: val,
    });
  };

 onPress= ()=>{
  const {name, phoneNo,} = this.state;
  let data = {
    name: name,
    phoneNo: phoneNo,
  };
  this.setState({isLoading: true});
      this.ref
        .push(data)
        .then(() => {
          // alert('success');
          this.setState({
            isLoading: false,
            name: '',
            phoneNo: '',
          });
        })
        .catch(error => {
          // this.setState({isLoading: false});

          alert(error.message);
        });
    alert('success');
 };
  render() {
    const {name, phoneNo} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.container1}>
                <Text>Walkin Visitors</Text>
              </View>
              <View style={styles.container2}>
                  <TextInput
                      value={name}
                      style={styles.TextInputfield}
                      placeholder="Name"
                      onChangeText={text =>
                        this.changeTextinputContent('name', text)
                      }
                    />
                </View>
              <View style={styles.container3}>
                  <TextInput
                      value={phoneNo}
                      style={styles.TextInputfield}
                      keyboardType="phone-pad"
                      placeholder="Phone"
                      onChangeText={text =>
                        this.changeTextinputContent('phoneNo', text)
                      }
                    />
              </View>
    
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.Button}
                   onPress={() => this.onPress()}>
                  <Text style={styles.text}>Log</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default WalkinVisitorsScreen;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container4: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  TextInputfield: {
    paddingLeft: 30,
    height: 57,
    width: 320,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
});
