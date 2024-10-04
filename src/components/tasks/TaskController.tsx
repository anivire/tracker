import { useAppDispatch } from '@/hooks/useStore';
import { useHotkey } from '@/providers/HotkeyProvider';
import { AppDispatch } from '@/redux/store';
import { Task, selectTask } from '@/redux/tasksReducer';
import { taskSelection } from '@/utils/lib/taskUtils';
import { useEffect, useRef } from 'react';
import React from 'react';

import CreateTask from './CreateTask';
import TaskItem from './TaskItem';

interface TaskControllerProps {
  tasks: Task[];
  selectedTask: Task | null;
  onTaskRemove: (taskId: string) => void;
  onTaskUpdate: (task: Task, isCompleted: boolean) => void;
  onTaskSelect: (taskId: string | null) => void;
  onTaskAdd: (task: Task) => void;
}

const TaskController: React.FC<TaskControllerProps> = ({
  tasks,
  selectedTask,
  onTaskRemove,
  onTaskUpdate,
  onTaskSelect,
  onTaskAdd,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();
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

  return (
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col gap-1">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
              onDelete={onTaskRemove}
              onSelected={onTaskSelect}
              onProgressChange={isCompleted => onTaskUpdate(task, isCompleted)}
            />
          ))}
        </div>
      )}

      <CreateTask onTaskCreated={onTaskAdd} />
    </>
  );
};

export default TaskController;
