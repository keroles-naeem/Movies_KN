import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from './slices/loader';
import modeReducer from './slices/mode';

const store = configureStore({
    reducer: {
        loader :loaderSlice,
        mode :modeReducer,
    }
});

export default store;