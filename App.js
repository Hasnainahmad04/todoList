import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Todo from './src/Screen/Todo';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Todo />
    </GestureHandlerRootView>
  );
}

export default App;
