import React from 'react';


import { 
  Text, 
  View
} from 'react-native';
import {f, auth, database, storage } from '../config/config'; 

class Comments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
    }
  }
 
  componentDidMount = () => {
    var that = this;
   f.auth().onAuthStateChanged(function(user) {
     if(user){
       //logged in
       that.setState({
         loggedIn: true
       });
     }else{
       //not logged in
       that.setState({
         loggedIn: false
       });
     }
   }); 
  }

  
  render() {
    return (
      <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        {this.state.loggedIn == true ? (
           <Text>Comment</Text>
     ) : (
         <View>
           <Text>you are not logged in</Text>
           <Text>please login to post comment</Text>
         </View>
     )}
       
      </View>
     )
  }
}

export default Comments;

