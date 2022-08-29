import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
  getData,
  getWhatHeCan,
  getWhatHeShould,
  getWhatHeShouldNot,
  splitRelevantData,
} from '../utils/database';
import {getNiceTime, timeStringToHoursAndMinutes} from '../utils/functions';

export const ListOfRuleTypes = () => {
  const normalized = getNiceTime(new Date());
  const whatHeCan = getWhatHeCan(normalized);
  const whatHeShouldNot = getWhatHeShouldNot(normalized);
  const whatHeShould = getWhatHeShould(normalized);
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [goToSleepTime, setGoToSleepTime] = useState('');
  useEffect(() => {
    getData('wakeUpTime').then(data => (data ? setWakeUpTime(data) : ''));
    getData('goToSleepTime').then(data => (data ? setGoToSleepTime(data) : ''));
  });
  if (wakeUpTime && goToSleepTime) {
    console.log('times they are a changing', wakeUpTime, goToSleepTime);
    const myWakeUpTime = timeStringToHoursAndMinutes(wakeUpTime);
    const myGoToSleepTime = timeStringToHoursAndMinutes(goToSleepTime);
    const rules = splitRelevantData(myWakeUpTime, myGoToSleepTime);
    console.log('rules', rules);
  }
  return (
    <>
      {whatHeShouldNot.length > 0 && (
        <>
          <Text>What he shouldnt do</Text>
          <FlatList renderItem={renderShouldNotItem} data={whatHeShouldNot} />
        </>
      )}
      {whatHeShould.length > 0 && (
        <>
          <Text>What he should do</Text>
          <FlatList renderItem={renderShouldItem} data={whatHeShould} />
        </>
      )}
      {whatHeCan.length > 0 && (
        <>
          <Text>What he can do</Text>
          <FlatList renderItem={renderCanItem} data={whatHeCan} />
        </>
      )}
    </>
  );
};

const renderShouldNotItem = ({item}: any) => <ShouldNotItem item={item} />;
const renderShouldItem = ({item}: any) => <ShouldItem item={item} />;
const renderCanItem = ({item}: any) => <CanItem item={item} />;

const ShouldNotItem = (props: {item: Item}) => {
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const ShouldItem = (props: {item: Item}) => {
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const CanItem = (props: {item: Item}) => {
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};

interface Item {
  name: string;
  from: string;
  to: string;
}
