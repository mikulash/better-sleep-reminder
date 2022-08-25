import React from 'react';
import HomeScreen from './src/pages/HomeScreen';
import {View} from 'react-native';
import SetupScreen from './src/pages/Setup';

export default function App() {
  return (
    <View>
      <HomeScreen />
      <SetupScreen />
    </View>
  );
}
