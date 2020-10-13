import React from 'react';


import { 
  Text, 
  View
} from 'react-native';

class Search extends React.Component {
  state = {}

  componentWillMount() {}

  render() {
    return (
     <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Search</Text>
     </View>
    )
  }
}

export default Search;

