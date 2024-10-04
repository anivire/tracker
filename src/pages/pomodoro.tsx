import CurrencyController from '@/components/currency/CurrencyController';
import CreateTask from '@/components/tasks/CreateTask';
import TaskController from '@/components/tasks/TaskController';
import TimerController from '@/components/timer/TimerController';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useHotkey } from '@/providers/HotkeyProvider';
import { AppDispatch, RootState } from '@/redux/store';
import {
  Task,
  addTask,
  removeTask,
  selectTask,
  updateSelectedTaskStatus,
  updateTaskStatus,
} from '@/redux/tasksReducer';
import { useCallback } from 'react';
import RiArchiveLine from '~icons/ri/archive-line';
import RiCalendarLine from '~icons/ri/calendar-line';
import RiFileEditFill from '~icons/ri/file-edit-fill';

export default function Pomodoro() {
  const dispatch = useAppDispatch<AppDispatch>();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const selectedTask = useAppSelector(
    (state: RootState) => state.tasks.selectedTask
  );

  const handleTaskUpdate = useCallback(
    (task: Task, isCompleted: boolean) => {
      dispatch(
        updateTaskStatus({ taskID: task.id, taskIsCompleted: isCompleted })
      );
      dispatch(updateSelectedTaskStatus({ taskIsCompleted: isCompleted }));
    },
    [dispatch]
  );

  const handleTaskRemove = useCallback(
    (removedTaskId: string) => {
      dispatch(removeTask({ taskID: removedTaskId }));
    },
    [dispatch]
  );

  const handleTaskAdd = useCallback(
    (newTask: Task) => {
      dispatch(addTask({ newTask }));
    },
    [dispatch]
  );

  const handleTaskSelected = useCallback(
    (selectedTaskId: string | null) => {
      dispatch(selectTask({ taskID: selectedTaskId ?? '' }));
    },
    [dispatch]
  );

  return (
    <div className="m-10 mx-auto max-w-3xl font-medium">
      <div className="grid grid-cols-1 gap-3">
        <TimerController />

        {/* <section className="flex h-full w-full flex-col gap-5 rounded-xl border border-accent/10 bg-foreground p-3">
          <CurrencyController />
        </section> */}

        <section className="flex h-full w-full flex-col gap-5 rounded-xl border border-accent/10 bg-foreground p-5">
          <div className="flex flex-row items-center justify-between text-sm">
            <div className="flex flex-row overflow-hidden rounded-md bg-surface">
              <button className="inline-flex items-center gap-1 bg-accent px-3 py-2 text-tracker-white">
                <RiFileEditFill /> Tasks
              </button>
              <button className="inline-flex items-center gap-1 px-3 py-2">
                <RiArchiveLine /> Archived
              </button>
            </div>
            <p className="inline-flex items-center gap-1 rounded-md bg-surface px-3 py-2">
              <RiCalendarLine />
              {new Date().toLocaleString('en-EN', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <TaskController
            tasks={tasks}
            selectedTask={selectedTask}
            onTaskRemove={handleTaskRemove}
            onTaskUpdate={handleTaskUpdate}
            onTaskSelect={handleTaskSelected}
            onTaskAdd={handleTaskAdd}
          />

          <CurrencyController />
        </section>
      </div>
    </div>
  );
}
