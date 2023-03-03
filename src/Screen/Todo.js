import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  ToastAndroid,
} from 'react-native';

import todoServices from '../api/todoServices';
import TodoDeleteAction from '../components/TodoDeleteAction';
import TodoItem from '../components/TodoItem';
import Header from '../components/Header';
import AddBtn from '../components/AddBtn';
import AppModal from '../components/AppModal';
import colors from '../Assets/colors';

function Todo(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async page => {
    try {
      const newdata = await todoServices.fetchData(page);
      setData(prevData => [...prevData, ...newdata]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => setModal(true);

  const handleAdd = async task => {
    try {
      const newaddedTask = await todoServices.addTodo(task);
      const state = [...data];
      setData([newaddedTask, ...state]);
    } catch (error) {
      alert('An invalid Error Occured');
      console.log(error);
    }
  };

  const handleUpdate = async id => {
    const clone = [...data];
    const index = clone.findIndex(item => item.id === id);
    clone[index] = {...clone[index], completed: true};
    setData(clone);
    try {
      const data = await todoServices.updateTodo(id);
      console.log(data);
    } catch (error) {
      console.log(error);
      setData(data);
    }
  };

  const handlDelete = async id => {
    const original = [...data];
    const updated = original.filter(item => id !== item.id);
    setData(updated);

    try {
      const data = await todoServices.deleteTodo(id);
      console.log(data);
    } catch (error) {
      ToastAndroid.show(
        'An Invalid Error Occured',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log(error);
      setData(original);
    }
  };

  const onEndReached = async () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <>
      <Header />
      <View style={styles['container']}>
        <Text style={styles['headerText']}>Today's Tasks</Text>

        <View style={styles['listContainer']}>
          <FlatList
            data={data}
            keyExtractor={data => data.id}
            renderItem={({item}) => (
              <TodoItem
                item={item}
                handleUpdate={() => handleUpdate(item.id)}
                swipeAction={() => (
                  <TodoDeleteAction onPress={() => handlDelete(item.id)} />
                )}
              />
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            ListFooterComponent={ActivityIndicator}
          />
        </View>

        <View>
          <AddBtn onPress={handleModal} />
        </View>
      </View>

      <AppModal
        modalVisible={modal}
        handleClose={() => setModal(false)}
        handleAdd={handleAdd}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },

  headerText: {fontSize: 20, color: colors.primary, padding: 10},

  listContainer: {flex: 1, height: 'auto'},

  loadingContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
});

export default Todo;
