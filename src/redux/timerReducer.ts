import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

enum TimerType {
  'Stopwatch',
  'Pomodoro',
  'ShortBreak',
  'LongBreak',
}

interface Time {
  current: number;
  remaining: number;
  default: number;
}

interface TimerState {
  time: Time;
  type: TimerType;
  pomodoroCount: number;
}

const initialState: TimerState = {
  time: {
    current: 0,
    remaining: 1500,
    default: 1500,
  },
  type: TimerType.Pomodoro,
  pomodoroCount: 0,
};

const timerSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setDefaultTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time.default = action.payload.time;
    },
    addRemainigTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time.remaining += action.payload.time;
    },
    setCurrentTime: (state, action: PayloadAction<{ time: number }>) => {
      state.time.current = action.payload.time;
    },
    setTimerType: (state, action: PayloadAction<{ type: TimerType }>) => {
      state.type = action.payload.type;
    },
    updatePomodoroCount: state => {
      state.pomodoroCount += 1;
    },
    resetPomodoroCount: state => {
      state.pomodoroCount = 0;
    },
  },
});

export const {
  setCurrentTime,
  setTimerType,
  resetPomodoroCount,
  updatePomodoroCount,
} = timerSlice.actions;
export default timerSlice.reducer;
