import React from 'react';

import Routes from './src/routes'
import Login from './src/screens/Login';

function App() {
  return (
    <Login />
    //<Routes />
  )
}

export default App;

loginWithFacebook = async () => {
    await Facebook.initializeAsync('242299693802539');
  
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      { permissions: ['public_profile', 'email'] }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      this.props.navigation.navigate({routeName: 'Routes'})
    
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
    } 
  }