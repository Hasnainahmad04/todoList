import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Todo from './src/Screen/Todo';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Todo />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
