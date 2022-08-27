import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {
  getWhatHeCan,
  getWhatHeShould,
  getWhatHeShouldNot,
} from '../utils/database';
import {getNiceTime} from '../utils/functions';

export const ListOfGroupedItems = () => {
  const normalized = getNiceTime(new Date());
  const whatHeCan = getWhatHeCan(normalized);
  const whatHeShouldNot = getWhatHeShouldNot(normalized);
  const whatHeShould = getWhatHeShould(normalized);
  return (
    <>
      <Text>What he shouldnt do</Text>
      <FlatList renderItem={renderShouldNotItem} data={whatHeShouldNot} />
      <Text>What he should do</Text>
      <FlatList renderItem={renderShouldItem} data={whatHeShould} />
      <Text>What he can do</Text>
      <FlatList renderItem={renderCanItem} data={whatHeCan} />
    </>
  );
};

const renderShouldNotItem = ({item}: any) => <ShouldNotItem item={item} />;
const renderShouldItem = ({item}: any) => <ShouldItem item={item} />;
const renderCanItem = ({item}: any) => <CanItem item={item} />;

const ShouldNotItem = (props: {item: Item}) => {
  console.log('props', props);
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const ShouldItem = (props: {item: Item}) => {
  console.log('props', props);
  return (
    <View>
      <Text>{props.item.name}</Text>
    </View>
  );
};
const CanItem = (props: {item: Item}) => {
  console.log('props', props);
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
