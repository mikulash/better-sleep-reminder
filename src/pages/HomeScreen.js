import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const HomeScreen = () => {
  const [time, setTime] = useState(new Date());
  const timeString = time.getHours() + ':' + time.getMinutes();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <SafeAreaView>
      <Text>{timeString}</Text>
      <ShouldNotItem />
      <ShouldNotItem />
      <ShouldNotItem />
      <ShouldNotItem />
    </SafeAreaView>
  );
};
export default HomeScreen;

const ShouldNotItem = () => {
  return (
    <View>
      <Text>Drinking coffee</Text>
    </View>
  );
};
