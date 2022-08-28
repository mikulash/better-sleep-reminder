import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {getData, storeData} from '../utils/database';
import {getNiceTime} from '../utils/functions';

const TimePicker = (props: {title: string; storageKey: string}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showTime, setShowTime] = useState('');
  useEffect(() => {
    getData(props.storageKey).then(data => (data ? setShowTime(data) : ''));
  });
  return (
    <View>
      <Text> ___________ </Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setOpen(true)}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </Pressable>
      <DatePicker
        mode={'time'}
        open={open}
        date={date}
        modal
        onConfirm={time => {
          setOpen(false);
          setDate(time);
          console.log('time type', getNiceTime(time));
          storeData(props.storageKey, getNiceTime(time)).then(() =>
            console.log('successfully stored'),
          );
          getData(props.storageKey).then(data =>
            data ? setShowTime(data) : '',
          );
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {showTime && (
        <Text>Your time of usual falling asleep is : {showTime}</Text>
      )}
    </View>
  );
};
export default TimePicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
