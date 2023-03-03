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
import colors from '../Assets/colors';

const AppModal = ({
  modalVisible,
  handleClose,
  handleAdd,
  handleEdit,
  task,
  setTask,
}) => {
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
        <Text style={{fontSize: 20, marginVertical: 10, color: colors.white}}>
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
            value={task.title}
          />
          <TouchableOpacity
            style={styles['addButton']}
            onPress={() => onSubmit(task)}>
            <Text style={{fontSize: 20, color: colors.primary}}>
              {task.id ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 18, color: colors.white, padding: 10}}>
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
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontSize: 18,
    flex: 1,
  },
  closeButton: {
    fontSize: 16,
    color: colors.white,
    alignSelf: 'flex-end',
  },
  addButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 10,
  },
  inputBox: {
    width: '80%',
    backgroundColor: colors.white,
    fontSize: 18,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
});

export default AppModal;
