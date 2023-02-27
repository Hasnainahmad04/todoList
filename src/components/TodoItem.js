import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function TodoItem({item}) {
  const [completed, setCompleted] = useState(false);
  let style = completed ? styles['completed'] : styles['text'];
  return (
    <View style={styles['container']}>
      <BouncyCheckbox
        size={30}
        fillColor="green"
        unfillColor="#fff"
        innerIconStyle={{borderWidth: 2}}
        onPress={() => setCompleted(!completed)}
      />
      <Text style={style} numberOfLines={1}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fef9ff',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: '#000',
    flex: 1,
  },
  completed: {
    color: 'green',
    fontSize: 20,
    textDecorationLine: 'line-through',
    textDecorationColor: 'black',
  },
});

export default TodoItem;
