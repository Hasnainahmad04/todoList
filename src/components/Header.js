import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Header(props) {
  let date = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <View style={styles['container']}>
      <Text style={styles['headerText']}>Todo </Text>
      <Text style={{fontSize: 15, color: '#1F8A70'}}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#1F8A70',
    flex: 1,
    fontSize: 20,
  },
});

export default Header;
