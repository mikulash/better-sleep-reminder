import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {getData, splitRelevantData} from '../utils/database';
import {timeStringToHoursAndMinutes} from '../utils/functions';

export const ListOfRuleTypes = () => {
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
    console.log('rules', rules.shouldNotDo);
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>What he shouldnt do</Text>
          <FlatList renderItem={renderShouldNotItem} data={rules.shouldNotDo} />
          <Text>What he should do</Text>
          <FlatList renderItem={renderShouldItem} data={rules.shouldDo} />
          <Text>What he can do</Text>
          <FlatList renderItem={renderCanItem} data={rules.canDo} />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <Text>Go to settings and select time of waking up and going to sleep</Text>
  );
};

const renderShouldNotItem = ({item}: any) => <ShouldNotItem item={item} />;
const renderShouldItem = ({item}: any) => <ShouldItem item={item} />;
const renderCanItem = ({item}: any) => <CanItem item={item} />;
// todo add style
const ShouldNotItem = (props: any) => {
  return (
    <View>
      <Text>{props.item.name}</Text>
      {!!props.item.message && <Text>{props.item.message}</Text>}
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
