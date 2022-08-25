import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {
  getWhatHeCan,
  getWhatHeShould,
  getWhatHeShouldNot,
} from '../../database';

const HomeScreen = () => {
  const [time, setTime] = useState(new Date());
  const normalized = time
    .toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
    .slice(0, -3); //remove seconds to be able to compare strings

  const whatHeCan = getWhatHeCan(normalized);
  const whatHeShouldNot = getWhatHeShouldNot(normalized);
  const whatHeShould = getWhatHeShould(normalized);
  const DATA = [whatHeCan, whatHeShould, whatHeShouldNot];
  console.log(DATA);
  console.log(whatHeCan);
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <SafeAreaView>
      <Text>{normalized}</Text>
      <Text>What he shouldn't do</Text>
      <FlatList renderItem={renderShouldNotItem} data={whatHeShouldNot} />
      <Text>What he should do</Text>
      <FlatList renderItem={renderShouldItem} data={whatHeShould} />
      <Text>What he can do</Text>
      <FlatList renderItem={renderCanItem} data={whatHeCan} />
    </SafeAreaView>
  );
};
export default HomeScreen;

const renderShouldNotItem = ({item}) => <ShouldNotItem item={item} />;
const renderShouldItem = ({item}) => <ShouldItem item={item} />;
const renderCanItem = ({item}) => <CanItem item={item} />;

const ShouldNotItem = props => {
  console.log('props', props);
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const ShouldItem = props => {
  console.log('props', props);
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const CanItem = props => {
  console.log('props', props);
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
