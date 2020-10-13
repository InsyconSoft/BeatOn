import React from 'react';
import { 
  Text, 
  View, TouchableOpacity,
  TextInput, ActivityIndicator,
  Image
} from 'react-native';
import {f, auth, database, storage } from '../config/config'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class AddPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      imageId: this.uniqueId(),
      imageSelected: false,
      uploading: false,
      caption: '',
      progress: 0
    }
  }

  cameraRollPermission = async () => {
    const result  = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
};

  cameraPermission = async() => {
    const result2  = await Permissions.askAsync(Permissions.CAMERA);
    if (result2.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  }
  s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }

  uniqueId = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  findNewImage = async() => {
    //
    this.cameraRollPermission();
    this.cameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    console.log(result);

    if(!result.cancelled){
      console.log('upload image');
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        uri: result.uri
      })
      //this.uploadImage(result.uri);
    }else{
      console.log('cancel');
      this.setState({
        imageSelected: false 
      })
    }
  }

  uploadPublish = () => {
    if(this.state.uploading == false){
    if(this.state.caption != ''){
      //
      this.uploadImage(this.state.uri);
    }else{
      alert('Please enter caption...');
      }
    }else{
      console.log('ignore button tap as already uploading')
    }
  }

  uploadImage = async(uri) => {
    var that=this;
    var userid = f.auth().currentUser.uid;
    var imageId = this.state.imageId;

    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(uri[1]);
    this.setState({
      currentFileType: ext,
      uploading: true
    });

    const response = await fetch(uri);
    const blob = await response.blob();
    var FilePath = imageId+'.'+that.state.currentFileType;

    var uploadTask = storage.ref('user/'+userid+'/img').child(FilePath).put(blob);

    uploadTask.on('state_changed', function(snapshot) {
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
      console.log('upload is' +progress+'%complete');
      that.setState({
        progress: progress,
      });
    }, function(error) {
      console.log('error with upload -'+error)
    }, function(){
      that.setState({progress: 100});
      uploadTask.snapshot.ref.getDownloadURL().then(function(getDownloadURL){
        //alert(getDownloadURL);
        console.log(getDownloadURL);
        that.processUpload(getDownloadURL);
      })
    });
  }

  processUpload = (imageUrl) => {
    //Process here...

    //set needed info
    var imageId = this.state.imageId;
    var userId = f.auth().currentUser.uid;
    var caption= this.state.caption;
    var dateTime = Date.now();
    var timestamp = Math.floor(dateTime / 1000);
    //build photo object 

    var photoObj = {
      author: userId,
      caption: caption,
      posted: timestamp,
      url: imageUrl
    };

    //Add to main feed

    database.ref('/photos/'+imageId).set(photoObj);

    database.ref('/users/'+userId+'/photos/'+imageId).set(photoObj);

    alert('image uploaded');

    this.setState({
      uploading: false,
      imageSelected: false,
      caption: '',
      uri: ''
    })
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
      <View style = {{flex: 1}}>
        {this.state.loggedIn == true ? (
          <View style={{flex: 1}}>
            {this.state.imageSelected == true ? (
              <View style={{flex:1}}>
                <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}> 
                  <Text> Upload</Text> 
                </View>
                <View style={{padding:5}}>
                  <Text style={{marginTop: 5}}> Caption </Text>
                  <TextInput 
                    editable={true}
                    placeholder={'enter your caption...'}
                    maxLength={150}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({caption: text})}
                    style={{marginVertical: 10, height: 100, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3, backgroundColor: 'white', color: 'black'}} 
                  />

                  <TouchableOpacity onPress = {() => this.uploadPublish()}
                  style={{alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}} >
                      <Text style={{textAlign: 'center', color: 'white'}}>Upload & Publish</Text>
                  </TouchableOpacity>

                  {this.state.uploading == true ? (
                    <View style={{marginTop: 10}}>
                      <Text>{this.state.progress}%</Text>
                      {this.state.progress != 100 ? (
                          <ActivityIndicator 
                          size="small"
                           color="blue"
                           />
                      ): (
                        <Text>Processing</Text>
                
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <Image 
                    source={{uri: this.state.uri}}
                    style={{marginTop: 10, resizeMode: 'cover', width: '100%', height: 275}}
                  />


                </View>
              </View>
            ) : (
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
            <TouchableOpacity
            style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: 'blue'}}
            onPress={() => this.findNewImage()}
            >
            <Text style={{color: 'white'}}>Select Photo</Text>
            </TouchableOpacity>
            </View>
              
              )}
          </View>
     ) : (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text>you are not logged in</Text>
           <Text>please login to add post</Text>
         </View>
     )}
       
      </View>
     )
  }
}

export default AddPost;

