import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TimePicker from '../elements/TimePicker';

const SetupScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log('date', date.getMinutes());
  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setOpen(true)}>
        <Text style={styles.textStyle}>Nastavit cas vstavani</Text>
      </Pressable>
      <DatePicker
        mode={'time'}
        open={open}
        date={date}
        modal
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TimePicker />
    </View>
  );
};
export default SetupScreen;

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
