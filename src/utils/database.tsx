import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getNiceTime, timeStringToHoursAndMinutes} from './functions';

enum importance {
  can,
  should,
}

interface Activity {
  name: string;
  doInTheMorning: boolean; // should be doing in the first half of the day
  countFromMorning: boolean; // day divider count from morning or night
  numOfHours: number; // how many hours from morning/night
  importance: importance; // can or should the user do it
}

export interface MyTime {
  hours: number;
  minutes: number;
}

const properData: Activity[] = [
  {
    name: 'caffeine',
    doInTheMorning: true,
    countFromMorning: false,
    numOfHours: 10,
    importance: importance.can,
  },
  {
    name: 'watchSun',
    doInTheMorning: true,
    countFromMorning: true,
    numOfHours: 1,
    importance: importance.should,
  },
  {
    name: 'workout',
    doInTheMorning: true,
    countFromMorning: false,
    numOfHours: 2,
    importance: importance.can,
  },
];

export const splitRelevantData = (morningTime: MyTime, eveningTime: MyTime) => {
  const timeNow = timeStringToHoursAndMinutes(getNiceTime(new Date()));
  let canDoActivities: Activity[] = [],
    shouldDoActivities: Activity[] = [],
    shouldNotDoActivities: Activity[] = [];
  console.log(canDoActivities, 'splitRelevantData');
  properData.forEach(activity => {
    if (activity.importance === importance.can) {
      if (activity.countFromMorning) {
        // jsem ve spodni nebo horni pulce dne
        if (timeNow.hours < morningTime.hours + activity.numOfHours) {
          // jsem ve spodni pulce
          if (activity.doInTheMorning) {
            canDoActivities.push(activity);
          } else shouldNotDoActivities.push(activity);
        }
        if (activity.doInTheMorning) {
          shouldNotDoActivities.push(activity);
        } else canDoActivities.push(activity);
      } else {
        // pocitam zhora
        if (timeNow.hours < eveningTime.hours - activity.numOfHours) {
          // jsem v ve spodni pulce pulce
          if (activity.doInTheMorning) {
            canDoActivities.push(activity);
          } else shouldNotDoActivities.push(activity);
        }
        if (activity.doInTheMorning) {
          shouldNotDoActivities.push(activity);
        } else canDoActivities.push(activity);
      }
    } else {
      // tohle bych mel delat, pokud spatny cas tak ignore
      if (activity.countFromMorning) {
        if (timeNow.hours < morningTime.hours + activity.numOfHours) {
          // jsem v dolni pulce
          if (activity.doInTheMorning) shouldDoActivities.push(activity);
        } else {
          //  jsem v horni pulce
          if (!activity.doInTheMorning) shouldDoActivities.push(activity);
        }
      } else {
        //  pocitej zhora
        if (timeNow.hours < eveningTime.hours - activity.numOfHours) {
          if (activity.doInTheMorning) {
            shouldDoActivities.push(activity);
          } else {
            //  jsem v horni pulce
            if (!activity.doInTheMorning) shouldDoActivities.push(activity);
          }
        }
      }
    }
  });
  return {
    canDo: canDoActivities,
    shouldDo: shouldDoActivities,
    shouldNotDo: shouldNotDoActivities,
  };
};

export const data = {
  // todo change to proper data
  should: [
    // {name: 'view sunlight', from: '00:00', to: '24:00', afterWakeUp: 1},
    {name: 'hot shower', from: '00:00', to: '04:00'},
  ],
  can: [
    // {name: 'caffeine', from: '00:00', to: '24:00', beforeSleep: 10},
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
