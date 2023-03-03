import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Swipeable} from 'react-native-gesture-handler';
import colors from '../Assets/colors';

function TodoItem({item, swipeAction, handleUpdate}) {
  let style = item.completed ? styles['completed'] : styles['text'];
  let containerStyle = item.completed
    ? styles['taskDone']
    : styles['container'];

  return (
    <Swipeable renderRightActions={swipeAction}>
      <View style={containerStyle}>
        <BouncyCheckbox
          disabled={item.completed}
          isChecked={item.completed}
          size={30}
          fillColor={colors.primary}
          unfillColor="#fff"
          innerIconStyle={{borderWidth: 2, borderColor: '#023020'}}
          onPress={handleUpdate}
        />
        <Text style={style} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
  },
  taskDone: {
    padding: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    opacity: 0.8,
  },
  text: {
    fontSize: 20,
    color: colors.primary,
    flex: 1,
  },
  completed: {
    color: colors.white,
    fontSize: 20,
  },
});

export default TodoItem;
