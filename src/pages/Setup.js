import React from 'react';
import {View} from 'react-native';
import TimePicker from '../elements/TimePicker';

const SetupScreen = () => {
  const wakeUpButtonTitle = 'Pick a time you want to wake up';
  const goToSleepButtonTitle = 'Pick a time you want to go to sleep';
  return (
    <View>
      <TimePicker title={wakeUpButtonTitle} />
      <TimePicker title={goToSleepButtonTitle} />
    </View>
  );
};
export default SetupScreen;
