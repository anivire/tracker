import CreateTask from '@/components/tasks/CreateTask';
import TaskItem from '@/components/tasks/TaskItem';
import TimerController from '@/components/timer/TimerController';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useHotkey } from '@/providers/HotkeyProvider';
import { AppDispatch, RootState } from '@/redux/store';
import {
  addTask,
  removeTask,
  selectTask,
  updateTaskStatus,
} from '@/redux/tasksReducer';
import { taskRemove, taskSelection } from '@/utils/lib/taskUtils';
import Task from '@/utils/models/Task';
import { Inter } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import RiArchiveLine from '~icons/ri/archive-line';
import RiCalendarLine from '~icons/ri/calendar-line';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiFileEditFill from '~icons/ri/file-edit-fill';

export default function Pomodoro() {
  const dispatch = useAppDispatch<AppDispatch>();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const selectedTask = useAppSelector(
    (state: RootState) => state.tasks.selectedTask
  );
  const prevPressedKeyRef = useRef<string | null>(null);
  const { pressedKey } = useHotkey();

  useEffect(() => {
    if (pressedKey !== prevPressedKeyRef.current) {
      if (pressedKey === 'ArrowUp') {
        dispatch(
          selectTask({
            taskID: taskSelection(tasks, selectedTask, 'up')?.id || '',
          })
        );
      } else if (pressedKey === 'ArrowDown') {
        dispatch(
          selectTask({
            taskID: taskSelection(tasks, selectedTask, 'down')?.id || '',
          })
        );
      } else if (pressedKey === 'ArrowRight' && selectedTask) {
        console.log(selectedTask.id);
      }
      prevPressedKeyRef.current = pressedKey;
    }
  }, [pressedKey, tasks, selectedTask, dispatch]);

  const handleTaskUpdate = useCallback(
    (task: Task, isCompleted: boolean) => {
      dispatch(
        updateTaskStatus({ taskID: task.id, taskIsCompleted: isCompleted })
      );
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
        {/* Pomodoro Timer */}
        <TimerController />

        {/* Tasks List */}
        <div className="flex h-full w-full flex-col gap-5 rounded-xl border border-accent/10 bg-foreground p-5">
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

          {/* Task Items */}
          {tasks.length > 0 && (
            <div className="flex flex-col gap-1">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isSelected={selectedTask?.id === task.id}
                  onDelete={handleTaskRemove}
                  onSelected={handleTaskSelected}
                  onProgressChange={isCompleted =>
                    handleTaskUpdate(task, isCompleted)
                  }
                />
              ))}
            </div>
          )}

          {/* Create Task Component */}
          <CreateTask onTaskCreated={handleTaskAdd} />
        </div>
      </div>
    </div>
  );
}
