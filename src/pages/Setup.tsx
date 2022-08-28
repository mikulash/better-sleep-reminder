import React from 'react';
import {Text, View} from 'react-native';
import TimePicker from '../elements/TimePicker';

const SetupScreen = () => {
  const wakeUpButtonTitle = 'Pick a time you want to wake up';
  const goToSleepButtonTitle = 'Pick a time you want to go to sleep';
  return (
    <View>
      <Text>Settings</Text>
      <TimePicker title={wakeUpButtonTitle} storageKey={'wakeUpTime'} />
      <TimePicker title={goToSleepButtonTitle} storageKey={'goToSleepTime'} />
    </View>
  );
};
export default SetupScreen;
