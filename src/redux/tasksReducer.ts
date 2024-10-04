import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  elapsedTime: number;
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  archivedTasks: Task[];
  selectedTaskID: string | null;
}

const initialState: TasksState = {
  tasks: [],
  archivedTasks: [],
  selectedTaskID: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ newTask: Task }>) => {
      state.tasks.push(action.payload.newTask);
    },
    removeTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const removedTaskIndex = state.tasks.findIndex(
        task => task.id === action.payload.taskID
      );
      if (removedTaskIndex !== -1) {
        state.tasks.splice(removedTaskIndex, 1);

        // Update selectedTaskID to nearest next or previous existing task
        if (state.tasks.length > 0) {
          state.selectedTaskID =
            state.tasks[removedTaskIndex]?.id ||
            state.tasks[removedTaskIndex - 1]?.id ||
            state.tasks[state.tasks.length - 1].id;
        } else {
          state.selectedTaskID = null;
        }
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskID: string; taskIsCompleted: boolean }>
    ) => {
      const task = state.tasks.find(task => task.id === action.payload.taskID);
      if (task) {
        task.isCompleted = action.payload.taskIsCompleted;
      }
    },
    updateSelectedTaskStatus: (
      state,
      action: PayloadAction<{ taskIsCompleted: boolean }>
    ) => {
      const task = state.tasks.find(task => task.id === state.selectedTaskID);
      if (task) {
        task.isCompleted = action.payload.taskIsCompleted;
      }
    },
    updateSelectedTaskTime: state => {
      const task = state.tasks.find(task => task.id === state.selectedTaskID);
      if (task) {
        task.elapsedTime += 1;
      }
    },
    updateTaskTimeByID: (state, action: PayloadAction<{ taskID: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskID);
      if (task) task.elapsedTime += 1;
    },
    selectTask: (
      state,
      action: PayloadAction<{
        taskID: string;
        direction: 'up' | 'down' | 'any';
      }>
    ) => {
      const selectedTask = state.tasks.find(
        task => task.id === action.payload.taskID
      );

      if (!selectedTask && state.tasks.length === 0) {
        return;
      } else if (!selectedTask || state.tasks.length === 1) {
        state.selectedTaskID = state.tasks[0].id;
        return;
      }

      const currentTaskIndex = state.tasks.findIndex(
        task => task.id === action.payload.taskID
      );
      let newIndex = currentTaskIndex;

      if (action.payload.direction === 'up' && currentTaskIndex > 0) {
        newIndex = currentTaskIndex - 1;
      } else if (
        action.payload.direction === 'down' &&
        currentTaskIndex < state.tasks.length - 1
      ) {
        newIndex = currentTaskIndex + 1;
      }

      state.selectedTaskID = state.tasks[newIndex].id;
    },
    resetSelectedTask: state => {
      state.selectedTaskID = null;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateSelectedTaskTime,
  updateTaskTimeByID,
  updateSelectedTaskStatus,
  updateTaskStatus,
  selectTask,
  resetSelectedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
