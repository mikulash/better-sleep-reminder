import React, {useEffect} from 'react';
import HomeScreen from './src/pages/HomeScreen';
import {View} from 'react-native';
import {getData, storeData} from './src/utils/database';

export default function App() {
  useEffect(() => {
    storeData('wakeUpTime', '07:00').then(() => console.log('done'));
    getData('wakeUpTime').then(r => console.log(r));
  });

  return (
    <View>
      <HomeScreen />
    </View>
  );
}
