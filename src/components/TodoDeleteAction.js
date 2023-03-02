import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TodoDeleteAction({onPress}) {
  return (
    <View style={styles['container']}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="delete" color={'#1F8A70'} size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default TodoDeleteAction;
