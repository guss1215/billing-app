// store.ts

import { configureStore } from '@reduxjs/toolkit';
import paymentHistoryReducer from './paymentHistorySlice';

const store = configureStore({
    reducer: {
        paymentHistory: paymentHistoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
