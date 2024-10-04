import Task from '@/utils/models/Task';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TasksState {
  tasks: Task[];
  archivedTasks: Task[];
  selectedTask: Task | null;
}

const initialState: TasksState = {
  tasks: [] as Task[],
  archivedTasks: [] as Task[],
  selectedTask: null,
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

        // Change selected task to nearest next or previous existing task
        if (state.tasks.length > 0) {
          state.selectedTask =
            state.tasks[removedTaskIndex] ||
            state.tasks[removedTaskIndex - 1] ||
            state.tasks[state.tasks.length - 1];
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
    selectTask: (state, action: PayloadAction<{ taskID: string }>) => {
      state.selectedTask =
        state.tasks.find(task => task.id === action.payload.taskID) ?? null;
    },
    resetSelectedTask: state => {
      state.selectedTask = null;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTaskStatus,
  selectTask,
  resetSelectedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
