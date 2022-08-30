import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getNiceTime, timeStringToHoursAndMinutes} from './functions';

enum importance {
  can,
  should,
}
interface facts {
  name: string;
  message?: string; // maybe link to source why it is important and here at this time
}

interface Activity {
  doInTheMorning: boolean; // should be doing in the first half of the day
  countFromMorning: boolean; // day divider count from morning or night
  numOfHours: number; // how many hours from morning/night
  importance: importance; // can or should the user do it
  facts: facts; // what is the user supposed to know about it
}

export interface MyTime {
  hours: number;
  minutes: number;
}

const properData: Activity[] = [
  {
    doInTheMorning: true,
    countFromMorning: false,
    numOfHours: 10,
    importance: importance.can,
    facts: {
      name: 'caffeine',
      message:
        'Caffeine affects your sleep so you should not consume it for at least 10 hours before bedtime.',
    },
  },
  {
    doInTheMorning: true,
    countFromMorning: true,
    numOfHours: 1,
    importance: importance.should,
    facts: {
      name: 'watchSun',
    },
  },
  {
    doInTheMorning: true,
    countFromMorning: false,
    numOfHours: 2,
    importance: importance.can,
    facts: {
      name: 'workout',
    },
  },
];

export const splitRelevantData = (morningTime: MyTime, eveningTime: MyTime) => {
  const timeNow = timeStringToHoursAndMinutes(getNiceTime(new Date()));
  let canDoActivities: facts[] = [],
    shouldDoActivities: facts[] = [],
    shouldNotDoActivities: facts[] = [];
  // todo zjednodusit tenhle clusterfuck
  properData.forEach(activity => {
    if (activity.importance === importance.can) {
      if (activity.countFromMorning) {
        // jsem ve spodni nebo horni pulce dne
        if (timeNow.hours < morningTime.hours + activity.numOfHours) {
          // jsem ve spodni pulce
          if (activity.doInTheMorning) {
            canDoActivities.push(activity.facts);
          } else shouldNotDoActivities.push(activity.facts);
        }
        if (activity.doInTheMorning) {
          shouldNotDoActivities.push(activity.facts);
        } else canDoActivities.push(activity.facts);
      } else {
        // pocitam zhora
        if (timeNow.hours < eveningTime.hours - activity.numOfHours) {
          // jsem v ve spodni pulce pulce
          if (activity.doInTheMorning) {
            canDoActivities.push(activity.facts);
          } else shouldNotDoActivities.push(activity.facts);
        }
        if (activity.doInTheMorning) {
          shouldNotDoActivities.push(activity.facts);
        } else canDoActivities.push(activity.facts);
      }
    } else {
      // tohle bych mel delat, pokud spatny cas tak ignore
      if (activity.countFromMorning) {
        if (timeNow.hours < morningTime.hours + activity.numOfHours) {
          // jsem v dolni pulce
          if (activity.doInTheMorning) shouldDoActivities.push(activity.facts);
        } else {
          //  jsem v horni pulce
          if (!activity.doInTheMorning) shouldDoActivities.push(activity.facts);
        }
      } else {
        //  pocitej zhora
        if (timeNow.hours < eveningTime.hours - activity.numOfHours) {
          if (activity.doInTheMorning) {
            shouldDoActivities.push(activity.facts);
          } else {
            //  jsem v horni pulce
            if (!activity.doInTheMorning)
              shouldDoActivities.push(activity.facts);
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
    console.log('fail', e);
    Alert.alert('error. could not get data');
    return null;
  }
};
