import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/redux/tasksReducer';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
