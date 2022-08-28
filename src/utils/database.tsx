import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const data = {
  // todo change to proper data
  should: [
    {name: 'view sunlight', from: '00:00', to: '24:00', afterWakeUp: 1},
    {name: 'hot shower', from: '00:00', to: '04:00'},
  ],
  can: [
    {name: 'caffeine', from: '00:00', to: '24:00', beforeSleep: 10},
    {name: 'workout', from: '00:00', to: '22:00'},
    {name: 'cold shower', from: '00:00', to: '12:00'},
    {name: 'drink water', from: '00:00', to: '12:00'},
  ],
};

export const getWhatHeCan = (time: string) => {
  return data.can.filter(item => item.from < time && item.to > time);
};
export const getWhatHeShould = (time: string) => {
  return data.should.filter(item => item.from < time && item.to > time);
};
export const getWhatHeShouldNot = (time: string) => {
  const result = data.should.filter(item => item.from > time || item.to < time);
  result.push(...data.can.filter(item => item.from > time || item.to < time));
  return result;
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    Alert.alert('error. data could not be stored');
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('fail');
    console.log(e);
    Alert.alert('error. could not get data');
    return null;
  }
};
