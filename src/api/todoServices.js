import axios from 'axios';

const BaseURL = 'https://my-todo-app.loca.lt/todos';

const fetchData = async page => {
  const {data} = await axios.get(`${BaseURL}?_limit=10&_page=${page}`);
  return data;
};

const deleteTodo = async id => {
  const {data} = await axios.delete(`${BaseURL}/${id}`);
  return data;
};

const addTodo = async task => {
  const {data} = await axios.post(BaseURL, task);
  return data;
};

const updateTodo = async id => {
  const {data} = await axios.patch(`${BaseURL}/${id}`, {completed: true});
  return data;
};
export default {fetchData, deleteTodo, addTodo, updateTodo};
