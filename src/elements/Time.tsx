import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {getNiceTime} from '../utils/functions';

const Time = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Text> {getNiceTime(time)} </Text>;
};
export default Time;
