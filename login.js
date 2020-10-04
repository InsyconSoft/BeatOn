import React from 'react';
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

    registerUser = () => {
      //code fore registration of user.
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

  
  loginWithGoogle = () => {
    //code for loggin in with google 
  }

  render() {
    return (
  
    <View style={styles.container}>
      <Text style={styles.heading}>Beat On</Text>
      <Image style={styles.image}
    source={require('../assets/BeatOn.jpeg')}
    />
    
    <View style={styles.fields}> 
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/doodle/48/000000/email--v1.png"}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent' //configure correctly. some sort of clerical error here. IN TEXT INPUT
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: "https://img.icons8.com/doodle/48/000000/password.png"}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}/>
        </View>
     </View>

     <TouchableOpacity 
          style={styles.loginButton}
          onPress={this.registerUser(this.state.email, this.state.password)}
          >
      <View style={styles.socialButtonContent}>
           <Text style={styles.loginTextFacebook}>Login</Text>
      </View>
     
     </TouchableOpacity>

      <View style={styles.division2}>
        <Text style = {styles.division}>OR</Text>
      </View>

     <TouchableOpacity 
          style={styles.facebookButton}
          onPress={this.loginWithFacebook}
          >
      <View style={styles.socialButtonContent}>
      <Icon  name="facebook" 
      color='white' 
      size={25}
      />
           <Text style={styles.loginTextFacebook}>Login with facebook</Text>
      </View>
     
     </TouchableOpacity>

     <TouchableOpacity 
          style={styles.googleButton}
          //onPress={this.loginUser(this.state.email, this.state.password)}
          >
      <View style={styles.socialButtonContent}>
      <Icon2 name="google" 
      color='white' 
      size={25}
      />
           <Text style={styles.loginTextGoogle}>Login with Google</Text>
      </View>
     
     </TouchableOpacity>
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
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  fields: {
    marginTop: '20%'
  },
  impText: {
    marginTop: '5%',
    marginLeft: '12%',
    marginRight: '5%'
   
  },
  division: {
    fontSize: 30,
    fontFamily: 'text2',

  },
  division2: {
    //marginTop: '10%',
    marginBottom: '10%'
  },
  terms: {
    color: 'grey',
    fontFamily: 'text',
  },
  underline1: {
    textDecorationLine: 'underline',
  },  
  heading: {
    borderRadius: 8,
    marginLeft: '3%',
    fontSize: 30,
    fontFamily: 'text1', 
    color: 'purple',
    //marginTop: '30%' 
  },
  
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    //marginTop: '35%',
    marginLeft: '7%',
    //marginBottom: '15%'
},
facebookButton: {
  height:45,
  width: 300,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:30,
  backgroundColor: "#4267B2",
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
    borderRadius:30,
    backgroundColor: "pink",
    marginTop: '5%',
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
  borderRadius:30,
  backgroundColor: "#F4B400",
  
},
socialButtonContent:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center', 
  marginTop: '2%'
},
loginTextFacebook: {
  color: 'white',
  marginLeft: '5%',
  fontSize: 17,
  fontFamily: 'text'
  
},
loginTextGoogle: {
  color: 'white',
  marginLeft: '12%',
  fontSize: 17,
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



