import paymentReducer from '@/redux/paymentReducer';
import tasksReducer from '@/redux/tasksReducer';
import timerReducer from '@/redux/timerReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = () =>
  configureStore({
    reducer: {
      tasks: tasksReducer,
      payment: paymentReducer,
      timer: timerReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
