import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../Assets/colors';

function AddBtn({onPress}) {
  return (
    <View style={styles['btnContainer']}>
      <TouchableOpacity style={styles['button']} onPress={onPress}>
        <Entypo name="plus" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    alignItems: 'flex-end',
    position: 'relative',
    bottom: 30,
    right: 10,
    borderRadius: 20,
  },
});

export default AddBtn;
