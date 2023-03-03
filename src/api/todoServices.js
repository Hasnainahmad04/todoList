import axios from 'axios';

const BaseURL = 'https://todo-app.loca.lt/todos';

const fetchData = async page => {
  const {data, headers} = await axios.get(`${BaseURL}?_limit=10&_page=${page}`);

  return {newData: data, totalLength: headers['x-total-count']};
};

const deleteTodo = async id => {
  const {data} = await axios.delete(`${BaseURL}/${id}`);
  return data;
};

const addTodo = async task => {
  if (task.id) {
    const {data} = await axios.put(`${BaseURL}/${task.id}`, task);
    return data;
  } else {
    const {data} = await axios.post(BaseURL, task);
    return data;
  }
};

const updateTodo = async (id, completed) => {
  const {data} = await axios.patch(`${BaseURL}/${id}`, {
    completed,
  });
  return data;
};
export default {fetchData, deleteTodo, addTodo, updateTodo};
