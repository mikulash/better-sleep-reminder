import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const TimePicker = (props: {title: string}) => {
  const [date, setDate] = useState(new Date());
  console.log('date', date.getMinutes());
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Text> Headline</Text>
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
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
