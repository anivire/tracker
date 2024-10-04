import tasksReducer from '@/redux/tasksReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = () =>
  configureStore({
    reducer: {
      tasks: tasksReducer,
      // timer: timerReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
