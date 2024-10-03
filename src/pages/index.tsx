import { Inter } from 'next/font/google';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiCalendarLine from '~icons/ri/calendar-line';
import RiArchiveLine from '~icons/ri/archive-line';
import RiArchiveFill from '~icons/ri/archive-fill';
import RiFileEditFill from '~icons/ri/file-edit-fill';
import RiFileEditLine from '~icons/ri/file-edit-fill';
import { useCallback, useEffect, useRef, useState } from 'react';
import TaskItem from '@/components/tasks/TaskItem';
import Task from '@/utils/models/Task';
import CreateTask from '@/components/tasks/CreateTask';
import { HotkeyProvider, useHotkey } from '@/providers/HotkeyProvider';
import TimerController from '@/components/timer/TimerController';

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskElapsedTime, setSelectedTaskElapsedTime] =
    useState<number>(0);
  const { pressedKey } = useHotkey();
  const prevPressedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const handleTaskSelection = (direction: 'up' | 'down') => {
      if (selectedTask === null || tasks.length === 1) {
        setSelectedTask(tasks[0]);
        return;
      }

      const currentIndex = tasks.findIndex(task => task.id === selectedTask.id);

      if (direction === 'up' && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        if (tasks[newIndex].id !== selectedTask.id) {
          setSelectedTask(tasks[newIndex]);
        }
      } else if (direction === 'down' && currentIndex < tasks.length - 1) {
        const newIndex = currentIndex + 1;
        if (tasks[newIndex].id !== selectedTask.id) {
          setSelectedTask(tasks[newIndex]);
        }
      }
    };

    if (pressedKey !== prevPressedKeyRef.current) {
      if (pressedKey === 'ArrowUp') {
        handleTaskSelection('up');
      } else if (pressedKey === 'ArrowDown') {
        handleTaskSelection('down');
      } else if (pressedKey === 'ArrowRight' && selectedTask) {
        console.log(selectedTask.id);
        handleTaskSelected(selectedTask.id);
      }

      prevPressedKeyRef.current = pressedKey;
    }
  }, [pressedKey, selectedTask, tasks]);

  const handleTaskUpdate = useCallback(
    (selectedTask: Task, _isCompleted: boolean) => {
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === selectedTask.id ? { ...t, isCompleted: _isCompleted } : t
        )
      );
    },
    [setTasks]
  );

  // const handleTaskUpdateElapsedTime = useCallback(
  //   (selectedTask: Task, _elapsedTime: number) => {
  //     setTasks(prevTasks =>
  //       prevTasks.map(t =>
  //         t.id === selectedTask.id ? { ...t, elapsedTime: _elapsedTime } : t
  //       )
  //     );
  //   },
  //   [setTasks]
  // );

  const handleTaskAdd = useCallback(
    (newTask: Task) => {
      setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const handleTaskRemove = useCallback(
    (removedTaskId: string) => {
      setTasks((prevTasks: Task[]) => {
        const newTasks = prevTasks.filter(task => task.id !== removedTaskId);
        const removedTaskIndex = prevTasks.findIndex(
          task => task.id === removedTaskId
        );
        let newSelectedTask = null;
        if (newTasks.length > 0) {
          if (removedTaskIndex === newTasks.length) {
            newSelectedTask =
              newTasks[removedTaskIndex - 1] || newTasks[newTasks.length - 1];
          } else {
            newSelectedTask =
              newTasks[removedTaskIndex] || newTasks[removedTaskIndex - 1];
          }
        }
        setSelectedTask(newSelectedTask);
        return newTasks;
      });
    },
    [setTasks]
  );

  const handleTaskSelected = useCallback(
    (selectedTaskId: string | null) => {
      if (!selectedTaskId) {
        setSelectedTask(null);
        return;
      }
      const selectedTask = tasks.find(task => task.id === selectedTaskId);
      if (selectedTask) {
        setSelectedTask(selectedTask);
      }
    },
    [tasks, setSelectedTask]
  );

  return (
    <div className="m-10 mx-auto max-w-3xl font-medium" style={inter.style}>
      <div className="grid grid-cols-1 gap-3">
        {/* <p className="w-fit rounded-xl border border-accent/10 bg-foreground px-3 py-1">
          {selectedTask.title}
        </p> */}

        {/* Pomodoro */}
        <TimerController
        // trackedTaskID={selectedTask?.id}
        // onElapsedTime={(elapsedTime: number) =>
        //   selectedTask &&
        //   handleTaskUpdateElapsedTime(selectedTask, elapsedTime)
        // }
        // elapsedTime={setCurrentElapsedValue}
        // onTimerStarted={() => {}}
        // onTimerStopped={() => {}}
        />

        {/* Tasks */}
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
              {new Date(Date.now()).toLocaleString('en-EN', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
          {tasks.length > 0 && (
            <div className="flex flex-col gap-1">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isSelected={
                    selectedTask ? selectedTask.id === task.id : false
                  }
                  onDelete={_removedTaskId => handleTaskRemove(_removedTaskId)}
                  onSelected={_selectedId => handleTaskSelected(_selectedId)}
                  onProgressChange={_isCompleted =>
                    handleTaskUpdate(task, _isCompleted)
                  }
                />
              ))}
            </div>
          )}
          <CreateTask
            onTaskCreated={(newTask: Task) => handleTaskAdd(newTask)}
          />
        </div>
      </div>
    </div>
  );
}
