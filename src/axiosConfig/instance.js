import axios from "axios";
import store from "../store/store";
import { changeLoader } from "../store/slices/loader";

// instance of axios
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '9ea3a0a5eda788de1a8738152ff4d406',
  },
});
export default instance;

// interceptors
// request
instance.interceptors.request.use((config) => {
  // store.getState
  store.dispatch(changeLoader(true));
  return config
}, (err) => {
  console.log(err);
});

// response
instance.interceptors.response.use((res) => {
  store.dispatch(changeLoader(false))
  return res;
}, (err) => {
  console.log(err);
})