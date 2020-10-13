import React from 'react';
import { 
  Text, 
  View,
  TouchableOpacity,
  FlatList,
  Image, StyleSheet
} from 'react-native';
import {f, auth, database, storage } from '../config/config';
import PhotoList from '../components/photoList';


class Profile extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     loggedIn: false,
     userId: ''
   }
 }

 componentDidMount = () => {
   var that = this;
  f.auth().onAuthStateChanged(function(user) {
    if(user){
      //logged in
      that.setState({
        loggedIn: true,
        userId: user.uid
      });
     // console.log(user.uid)
    }else{
      //not logged in
      that.setState({
        loggedIn: false
      });
    }
  }); 

 }

 signUserOut = () => {
  auth.signOut() //signout - logout
  .then(() => {
    console.log('logged out...');
  }).catch((error) => {
    console.log('error', error);
  });
}

something = () => {
  console.log('hello');
  console.log(this.state.userId);
}


  render() {
    return (
     <View style = {{flex: 1}}>
       {this.state.loggedIn == true ? (
          <View style={{flex: 1}}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Profile</Text>
            </View>
            <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
              <Image source= {{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png'}}
              style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50}}
              />
              <View style={{marginRight: 10}}>
                <Text>Name</Text>
                <Text>@username</Text>
              </View>
            </View> 

            <View style={{paddingBottom: 20, borderBottomWidth: 1}}>
              <TouchableOpacity style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                <Text style={{textAlign: 'center', color: 'grey'}}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                <Text style={{textAlign: 'center', color: 'grey'}}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress = {() => this.props.navigation.navigate('addPost')}
              style={{backgroundColor: 'grey', marginTop: 10, marginHorizontal: 40, paddingVertical: 35, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                <Text style={{textAlign: 'center', color: 'white'}}>Upload New +</Text>
                
              </TouchableOpacity>
            </View>

           <PhotoList 
            isUser={true}
            userId={this.state.userId}
            navigation={this.props.navigation}
           />

          </View>
    ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>you are not logged in</Text>
          <Text>login to view profile</Text>
        </View>
    )}
      
     </View>
    )
  }
}

export default Profile;

