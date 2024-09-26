import { Inter } from 'next/font/google';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiCalendarLine from '~icons/ri/calendar-line';
import RiArchiveLine from '~icons/ri/archive-line';
import RiArchiveFill from '~icons/ri/archive-fill';
import RiStickyNote2Fill from '~icons/ri/sticky-note-2-fill';
import RiStickyNote2Line from '~icons/ri/sticky-note-2-line';
import { useCallback, useState } from 'react';
import TaskItem from '@/components/tasks/TaskItem';
import Task from '@/utils/models/Task';
import CreateTask from '@/components/tasks/CreateTask';

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: crypto.randomUUID(),
      title: 'my first task',
      isCompleted: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'my second task',
      isCompleted: false,
    },
  ]);
  const [currentTask, setCurrentTask] = useState<Task>(tasks[0]);

  const handleTaskUpdate = useCallback(
    (currentTask: Task, _isCompleted: boolean) => {
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === currentTask.id ? { ...t, isCompleted: _isCompleted } : t
        )
      );
    },
    [setTasks]
  );

  const handleTaskAdd = useCallback(
    (newTask: Task) => {
      setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const handleTaskRemove = useCallback(
    (removedTaskId: string) => {
      setTasks((prevTasks: Task[]) =>
        prevTasks.filter(task => task.id !== removedTaskId)
      );
    },
    [setTasks]
  );

  const handleTaskSelected = useCallback(
    (selectedTaskId: string) => {
      const selectedTask = tasks.find(task => task.id === selectedTaskId);
      if (selectedTask) {
        setCurrentTask(selectedTask);
      }
    },
    [tasks, setCurrentTask]
  );

  return (
    <div className="m-10 mx-auto max-w-3xl font-medium" style={inter.style}>
      <div className="grid grid-cols-1 gap-3">
        {/* <p className="w-fit rounded-xl border border-accent/10 bg-foreground px-3 py-1">
          {currentTask.title}
        </p> */}

        {/* Pomodoro */}
        <div className="flex h-full w-full flex-col items-center gap-5 rounded-xl border border-accent/10 bg-foreground p-5">
          <div className="flex flex-row gap-5 text-sm">
            <button className="rounded-md bg-accent px-5 py-2 text-tracker-white">
              Focus
            </button>
            <div className="flex flex-row divide-x-2 divide-foreground rounded-md bg-surface">
              <button className="px-5 py-2">Short Break</button>
              <button className="px-5 py-2">Long Break</button>
            </div>
          </div>
          <h1 className="text-7xl font-bold tabular-nums">00:00</h1>
          <div>
            <div className="flex flex-row divide-x-2 divide-foreground rounded-md bg-surface">
              <button className="w-20 py-2">+5 </button>
              <button className="w-20 py-2">+10 </button>
              <button className="w-20 py-2">+15 </button>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="flex h-full w-full flex-col gap-5 rounded-xl border border-accent/10 bg-foreground p-5">
          <div className="flex flex-row items-center justify-between text-sm">
            <div className="flex flex-row overflow-hidden rounded-md bg-surface">
              <button className="inline-flex items-center gap-2 bg-accent px-3 py-2 text-tracker-white">
                <RiStickyNote2Fill /> Current tasks
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2">
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
                  id={task.id}
                  title={task.title}
                  isCompleted={task.isCompleted}
                  isSelected={currentTask.id === task.id}
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
