import React, { useState } from 'react';
import { 
  Text, 
  View,
  Image,
  TouchableOpacity, StyleSheet, Alert, TextInput
} from 'react-native';
import * as Facebook from 'expo-facebook';
import {f, database, auth, storage} from '../config/config';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';


const [visibleStatusBar, setVisibleStatusBar] = useState(false);

class Login extends React.Component {

  
  constructor(props)
  {
    super(props)
      this.state = {
        loggedIn: false,
        email:'',
        password: '',
        }
        //state decalared
        var that = this;
        f.auth().onAuthStateChanged(function(user) { //checking if user is logged in or not.
          if(user) {
            that.setState({
              loggedIn: true
            });
            console.log('logged in', user);


          }else {
            that.setState({
              loggedIn: false
            })
            console.log('logged out');
          }
        });

    }

    registerUser = (email, password) => {
      //code for registration of user.
       /*  console.log(email,password);
        auth.createUserWithEmailAndPassword(email,password)
        .then((userObj) => console.log(email, password, userObj))
        .catch((error) => console.log('error loggin in', error)); */
      
    } 

    userLogin = () => {
      //code for logging in of registered user.
    }

    signUserOut = () => {
      auth.signOut() //signout - logout
      .then(() => {
        console.log('logged out...');
      }).catch((error) => {
        console.log('error', error);
      });
    }


  loginWithFacebook = async () => { //login with facebook. already done. dont touch!
    await Facebook.initializeAsync('242299693802539');
  
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      { permissions: ['public_profile', 'email']}
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      const credential = f.auth.FacebookAuthProvider.credential(token);
      this.props.navigation.navigate({routeName: 'Tabs'})
    
  
      // Sign in with credential from the Facebook user.
      auth.signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
    } 
  }

  changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar);
  };

  
  loginWithGoogle = () => {
    //code for loggin in with google 
  }

  render() {
    return (
  
    <View style={styles.container}>
      <View style={{marginBottom: '10%'}}>
        <Image style={styles.image}
          source={{uri: "https://img.icons8.com/ios-glyphs/30/000000/user-male.png"}}
        />
          <Text style={styles.topHeading}>Create Account On</Text>
      </View>
      <View style={{marginTop: '15%', marginBottom: '15%'}}>
        <Text style={styles.heading}>BeatOn</Text>
        <Text style={styles.byLine}>Desh Ka Naya Masti Platform</Text>
      </View>
      
      <View>
        <TouchableOpacity 
                  style={styles.facebookButton}
                  onPress={this.loginWithFacebook}
                  >
              <View style={styles.socialButtonContent}>
                <Icon  name="facebook" 
                  color='white' 
                  size={18}
                  />
                  <Text style={styles.loginTextFacebook}>Continue with facebook</Text>
              </View>
          
          </TouchableOpacity>

          <TouchableOpacity 
                style={styles.googleButton}
                //onPress={this.loginUser(this.state.email, this.state.password)}
                >
            <View style={styles.socialButtonContent2}>
              <Icon2 style={{marginRight: '2%'}} name="google" 
                color='white' 
                size={18} 
                />
              <Text style={styles.loginTextGoogle}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity 
              style={styles.loginButton}
              onPress={this.registerUser(this.state.email, this.state.password)}
              >
          <View style={styles.socialButtonContent2}>
          <Icon3 style={{marginRight: '2%'}} name="smartphone" 
                color='white' 
                size={18} 
                />
              <Text style={styles.loginTextFacebook}>Continue with Phone</Text>
          </View>
        
        </TouchableOpacity>

     </View>
     <View style = {styles.impText}>
        <Text style={styles.terms}>By signing in, you agree with our <Text style={styles.underline1}>Terms and Conditions</Text> and <Text style={styles.underline1}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
     
     
 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flexDirection: 'column',
    //marginBottom: '5%'
  },
  topHeading: {
    color: 'grey',
    fontSize: 30,
    //marginBottom: '15%',
    marginTop: '-5%'
  },
  impText: {
    marginTop: '17%',
    marginLeft: '12%',
    marginRight: '5%',
    marginBottom: '-60%'
   
  },
  byLine: {
    color: 'grey',
    marginLeft: '3%'
  },
  division: {
    fontSize: 30,
    fontFamily: 'text2',

  },
  terms: {
    color: 'grey',
    fontFamily: 'text',
  },
  underline1: {
    textDecorationLine: 'underline',
    color: '#FDD451'
  },  
  heading: {
    borderRadius: 8,
    marginLeft: '3%',
    fontSize: 53,
    fontFamily: 'text2', 
    color: 'white',
    marginTop: '-10%'
    //marginTop: '30%' 
  },
  
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    //marginTop: '35%',
    backgroundColor: 'grey',
    marginBottom: '10%',
    marginLeft: '28%',
    marginTop: '-30%'
},
facebookButton: {
  height:45,
  width: 300,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:15,
  backgroundColor: "#0D4F8B",
  //marginTop: '80%',
  marginLeft: '10%', 
  marginRight: '10%',
  marginBottom: '5%'
  
},
loginButton: {
  height:45,
  width: 300,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:15,
  backgroundColor: "#32CD32",
  //marginTop: '80%',
  marginLeft: '10%', 
  marginRight: '10%',
  marginBottom: '5%'
  
},

googleButton: {
  height:45,
  width: 300,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:15,
  backgroundColor: "#4981CE",
  //marginTop: '80%',
  marginLeft: '10%', 
  marginRight: '10%',
  marginBottom: '5%'
  
},
socialButtonContent:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center', 
  marginTop: '2%',
  marginLeft: '-4%'
},
socialButtonContent2: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center', 
  marginTop: '2%',
  marginLeft: '-8%'
},
loginTextFacebook: {
  color: 'white',
  marginLeft: '10%',
  fontSize: 15,
  fontFamily: 'text'
  
},
loginTextGoogle: {
  color: 'white',
  marginLeft: '8%',
  fontSize: 15,
  fontFamily: 'text'
  
  
},
inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:30,
  borderBottomWidth: 1,
  width:300,
  height:45,
  marginBottom:20,
  flexDirection: 'row',
  alignItems:'center',
  elevation: 10,
},
inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},
inputIcon:{
width:30,
height:30,
marginLeft:15,
justifyContent: 'center'
},
  
  
});


export default Login;



