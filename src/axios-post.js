import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-posts-cf3c3.firebaseio.com/',
})

export default instance;