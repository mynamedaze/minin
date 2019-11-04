import axios from 'axios';

export default axios.create({
  baseURL: 'https://minin-quiz.firebaseio.com/'
});