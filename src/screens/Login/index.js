import React from 'react';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { 
  Text, 
  View,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import Temp from './temp';
import { withNavigation } from 'react-navigation';





// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfMBiCWyMnPGuejJxbxxrhbfH9ovzfhIM",
  authDomain: "beaton-68687.firebaseapp.com",
  databaseURL: "https://beaton-68687.firebaseio.com",
  projectId: "beaton-68687",
  storageBucket: "beaton-68687.appspot.com",
  messagingSenderId: "213969279565",
  appId: "1:213969279565:web:fe7185a194669e8a2a5a04",
  measurementId: "G-PE44ZX7E2V"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

class index extends React.Component {
  

  loginWithFacebook = async () => {
    const { navigation:navigate } = this.props;
    try {
      await Facebook.initializeAsync({
        appId: '242299693802539',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        this.props.navigation.navigate("Home")
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[ '#F98B88', '#FD9F9B', '#FFB2AE', '#FFC6C2', '#FFD9D6', '#FFECEA', '#FFF',  '#FFECEA', '#FFD9D6', '#FFC6C2', '#FFB2AE', '#FD9F9B', '#F98B88' ]}
        style={{flex: 1}}
      >
    <View styles={styles.container}>
   <Text style={styles.heading}>Beat On</Text>
   <Image source = {{uri:'https://cdn.pixabay.com/photo/2018/02/01/01/28/dogs-3122349__340.jpg'}}
   style = {styles.image}
   />

      <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={this.loginWithFacebook}
          >
      <View style={styles.socialButtonContent}>
      <Icon  name="facebook" 
      color='black' 
      size={30}
      />
           <Text style={styles.loginText}>Login with facebook</Text>
      </View>
     
     </TouchableOpacity>
     <View style = {styles.impText}>
        <Text style={styles.terms}>By signing in, you agree with our <Text style={styles.underline1}>Terms and Conditions</Text> and <Text style={styles.underline1}>Privacy Policy</Text>
        </Text>
      </View>
     </View>
     </LinearGradient>
     
 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black',
  },
  buttonContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:20,
    //width:250,
    borderRadius:30,
    backgroundColor: "#FFFAFA",
    marginTop: '80%',
    marginLeft: '10%', 
    marginRight: '10%',
    
  },
  underline1: {
    textDecorationLine: 'underline',
  },  
  impText: {
    marginTop: '5%',
    marginLeft: '12%',
    marginRight: '5%'
   
  },
  terms: {
    color: 'white',
    fontFamily: 'text',
  },
  loginText: {
    color: 'black',
    marginLeft: '5%',
    fontSize: 20,
    fontFamily: 'text'
    
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: '2%'
  },
  image: {
    width: 230,
    height: 150,
    borderRadius: 8,
    //marginTop: '35%',
    marginLeft: '23%',
    marginBottom: '-15%'
    
},
heading: {
  borderRadius: 8,
  marginLeft: '3%',
  fontSize: 70,
  fontFamily: 'font1',
  color: 'purple',
  marginTop: '30%'
  
},

});


export default index;



