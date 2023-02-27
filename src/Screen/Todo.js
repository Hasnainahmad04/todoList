import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import TodoItem from '../components/TodoItem';

function Todo(props) {
  return (
    <View style={styles['container']}>
      {/* <FlatList /> */}
      <TodoItem />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity>
          <Text style={{backgroundColor: 'black'}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Todo;
