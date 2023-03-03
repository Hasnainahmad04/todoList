import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import todoServices from '../api/todoServices';
import colors from '../Assets/colors';
import AddBtn from '../components/AddBtn';
import AppModal from '../components/AppModal';
import Header from '../components/Header';
import TodoDeleteAction from '../components/TodoDeleteAction';
import TodoItem from '../components/TodoItem';

function Todo(props) {
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState({completed: false});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async page => {
    try {
      const {newData, totalLength} = await todoServices.fetchData(page);
      setTotalData(Math.ceil(totalLength / 10));
      setData(prevData => [...prevData, ...newData]);
    } catch (error) {
      ToastAndroid.show(
        'Invalid Error Occured',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => setModal(true);
  const handleModalClose = () => {
    setModal(false);
    setNewTask({completed: false});
  };

  const handleAdd = async task => {
    try {
      if (task.id) {
        const updatedTask = await todoServices.addTodo(task);
        const state = [...data];
        const index = state.findIndex(item => item.id === task.id);
        state[index] = updatedTask;
        setData(state);
      } else {
        const newaddedTask = await todoServices.addTodo(task);
        const state = [...data];
        setData([newaddedTask, ...state]);
      }
    } catch (error) {
      alert('An invalid Error Occured');
    }
  };

  const handleUpdate = async id => {
    const clone = [...data];
    const index = clone.findIndex(item => item.id === id);
    clone[index] = {...clone[index], completed: !clone[index].completed};
    setData(clone);
    const completed = clone[index].completed;
    try {
      const data = await todoServices.updateTodo(id, completed);
    } catch (error) {
      console.log(error);
      setData(data);
    }
  };

  const onEdit = task => {
    setNewTask(task);
    setModal(true);
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
      setData(original);
    }
  };

  const onEndReached = async () => {
    if (totalData > page) {
      setPage(prevPage => prevPage + 1);
    } else null;
  };
  return (
    <>
      <Header />
      <View style={styles['container']}>
        <Text style={styles['headerText']}>Today's Tasks</Text>
        {loading && <ActivityIndicator size={30} />}
        <View style={styles['listContainer']}>
          <FlatList
            data={data}
            keyExtractor={data => data.id + data.title}
            renderItem={({item}) => (
              <TodoItem
                item={item}
                handleUpdate={() => handleUpdate(item.id)}
                handleEdit={() => onEdit(item)}
                swipeAction={() => (
                  <TodoDeleteAction onPress={() => handlDelete(item.id)} />
                )}
              />
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
          />
        </View>

        <View>
          <AddBtn onPress={handleModal} />
        </View>
      </View>

      <AppModal
        modalVisible={modal}
        handleClose={handleModalClose}
        handleAdd={handleAdd}
        task={newTask}
        setTask={setNewTask}
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
