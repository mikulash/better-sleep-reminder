import React from 'react';
import {Text, View} from 'react-native';
import TimePicker from '../elements/TimePicker';

const SetupScreen = () => {
  const wakeUpButtonTitle = 'waking up';
  const goToSleepButtonTitle = 'going to sleep';

  return (
    <View>
      <Text>Settings</Text>
      <TimePicker title={wakeUpButtonTitle} storageKey={'wakeUpTime'} />
      <TimePicker title={goToSleepButtonTitle} storageKey={'goToSleepTime'} />
    </View>
  );
};
export default SetupScreen;
