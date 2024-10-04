import { useAppDispatch } from '@/hooks/useStore';
import { useHotkey } from '@/providers/HotkeyProvider';
import { AppDispatch } from '@/redux/store';
import { Task, resetSelectedTask, selectTask } from '@/redux/tasksReducer';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

import CreateTask from './CreateTask';
import TaskItem from './TaskItem';

interface TaskControllerProps {
  tasks: Task[];
  selectedTaskID: string | null;
  onTaskRemove: (taskId: string) => void;
  onTaskUpdate: (task: Task, isCompleted: boolean) => void;
  onTaskSelect: (taskId: string | null) => void;
  onTaskAdd: (task: Task) => void;
}

const TaskController: React.FC<TaskControllerProps> = ({
  tasks,
  selectedTaskID,
  onTaskRemove,
  onTaskUpdate,
  onTaskSelect,
  onTaskAdd,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const prevPressedKeyRef = useRef<string | null>(null);
  const { pressedKey } = useHotkey();
  const [isInputActive, setIsInputActive] = useState<boolean>(false);

  useEffect(() => {
    if (pressedKey !== prevPressedKeyRef.current) {
      if (pressedKey === 'ArrowUp') {
        dispatch(
          selectTask({
            taskID: selectedTaskID ?? '',
            direction: 'up',
          })
        );
      } else if (pressedKey === 'ArrowDown') {
        dispatch(
          selectTask({
            taskID: selectedTaskID ?? '',
            direction: 'down',
          })
        );
      } else if (pressedKey === 'Escape' && !isInputActive) {
        dispatch(resetSelectedTask());
      }
      prevPressedKeyRef.current = pressedKey;
    }
  }, [pressedKey, tasks, selectedTaskID, dispatch]);

  return (
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col gap-1">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTaskID === task.id}
              onDelete={onTaskRemove}
              onSelected={onTaskSelect}
              onProgressChange={isCompleted => onTaskUpdate(task, isCompleted)}
            />
          ))}
        </div>
      )}

      <CreateTask
        onInputActiveChange={setIsInputActive}
        onTaskCreated={onTaskAdd}
      />
    </>
  );
};

export default TaskController;
