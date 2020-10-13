import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import {f, auth, database, storage} from '../config/config';
import { NavigationActions, StackActions } from 'react-navigation';



export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      photo_feed: [],
      refresh: false,
      loading: true
    });
  }

  componentDidMount = () => {
    //load feed
    this.loadFeed();
  }

  pluralCheck = (s) => {
    if(s==1){
      return 'ago';
    }else {
      return 's ago';
    }
  }

  timeConverter = (timestamp) => {
    var a = new Date(timestamp *1000);
    var seconds = Math.floor((new Date() - a)/1000);

    var interval = Math.floor(seconds / 31536000);
    if(interval > 1){
      return interval + 'year' +this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if(interval > 1){
      return interval + 'month' +this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if(interval > 1){
      return interval + 'day' +this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if(interval > 1){
      return interval + 'hour' +this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if(interval > 1){
      return interval + 'minute' +this.pluralCheck(interval);
    }
    return Math.floor(seconds) + 'second' +this.pluralCheck(seconds);
  }

  addToFlatList = (photo_feed, data, photo) => {
    var that=this;
    var photoObj = data[photo];
    database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        photo_feed.push({
          id: photo,
          url: photoObj.url,
          caption: photoObj.caption,
          posted: that.timeConverter(photoObj.posted),
          author: data,
          authorId: photoObj.author
        });
        console.log(photo_feed)
        

        that.setState({
          refresh: false,
          loading: false
        });

    }).catch(error => console.log(error));
  }
  
  loadFeed = () => {
    this.setState({
      refresh: true,
      photo_feed: []
    });

    var that = this;
    var data;
    
    database.ref('photos').orderByChild('posted').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
        var photo_feed = that.state.photo_feed;

        for(var photo in data){
          that.addToFlatList(photo_feed, data, photo)
        }
    }).catch(error => console.log(error));
  }

  loadNew = () => {
    this.loadFeed();
  }


  renderItem = ({item}) => {
    return (
      
      <View style={{flex: 1}}>


     {/*  <Flatlist 
        refreshing={this.state.refresh}
        onRefresh = {this.loadNew}
        data={this.state.photo_feed} 
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1, backgroundColor: '#eee'}}
        renderItem={({item, index}) => (
          
        )}
      /> */}
       <View style={{width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
        <View style={{padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{item.posted}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('User', {userId: item.authorId})}>
            <Text>{item.author}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Image 
            source = {{uri: item.url}}
            style={{resizeMode: 'cover', width: '100%', height: 275 }}
             />
        </View>
      </View>

      <View style={{padding:5}}>
        <Text>{item.caption}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {userId: item.id})}>
        <Text style={{marginTop: 10, textAlign: 'center', color: 'blue'}}>[ View Comments ] </Text>
        </TouchableOpacity>
      </View>
     
    </View>
    );
  }
  
  render() {
    return(

      <View style={{ flex: 1,}} >
        <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}> 
      <Text> Feed</Text> 
      </View>
        <FlatList 
        refreshing={this.state.refresh}
        onRefresh={this.loadNew}
        data={this.state.photo_feed}
        keyExtractor={(item, index) => index.toString()} 
        /* keyExtractor = {(item) => {
          return item.name;
        }} */
        style={{flex: 1, backgroundColor: '#eee'}}
        //renderItem={({item, index}) => {this.renderItem}}
          renderItem={this.renderItem}
          />
      </View>
    );
  } 
}
