import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppModal = ({modalVisible, handleClose, handleAdd}) => {
  const [task, setTask] = useState({completed: false, title: ''});

  const [errors, setErrors] = useState({});
  const handleInput = (name, text) => {
    const clone = {...task};
    clone[name] = text;
    setTask(clone);
  };

  const onSubmit = task => {
    const error = validate();
    setErrors(error || {});
    if (error) return;
    else {
      handleAdd(task);
      setTask({completed: false, title: ''});
      handleClose();
    }
  };
  const validate = () => {
    const {title} = task;
    const error = {};
    if (title.length === 0) {
      error.title = 'Please Enter Something  !';
    }
    return Object.keys(error).length !== 0 ? error : null;
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles['header']}>
          <Text style={styles['headreText']}>Add Task</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>
              <Icon name="close" size={30} />
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, marginVertical: 10, color: '#fff'}}>
          What Are You Doing Today ?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles['inputBox']}
            placeholder="Add Task ...."
            onChangeText={text => handleInput('title', text)}
          />
          <TouchableOpacity
            style={styles['addButton']}
            onPress={() => onSubmit(task)}>
            <Text style={{fontSize: 20, color: '#1F8A70'}}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 18, color: '#fff', padding: 10}}>
          {errors['title']}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1F8A70',
    height: '30%',
    marginTop: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
  },
  headreText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  closeButton: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-end',
  },
  addButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
  },
  inputBox: {
    width: '80%',
    backgroundColor: '#eee',
    fontSize: 18,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
});

export default AppModal;
