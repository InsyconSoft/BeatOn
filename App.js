
import React, { useState } from 'react';
import Login from './src/screens/Login/login';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'font1': require('./assets/Fonts/Pacifico-Regular.ttf'),
    'text': require('./assets/Fonts/MavenPro-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
      
    );
  }
  
  return <Login />;
  
}

