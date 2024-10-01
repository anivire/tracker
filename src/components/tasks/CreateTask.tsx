import Task from '@/utils/models/Task';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Tip from './Tip';
import { useHotkey } from '../providers/HotkeyProvider';

interface Props {
  onTaskCreated: (newTask: Task) => void;
}

const CreateTask: FC<Props> = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const { pressedKey, keyBinds } = useHotkey();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pressedKey === 'Escape') {
      setTaskTitle('');
      setIsActive(false);
    } else if (pressedKey === 'Enter') {
      if (!inputRef.current && document.activeElement !== inputRef.current) {
        setIsActive(true);
      }
    }

    if (inputRef.current && document.activeElement !== inputRef.current)
      inputRef.current.focus();
  }, [pressedKey]);

  const onKeyPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (taskTitle !== '') {
        onTaskCreated({
          id: crypto.randomUUID(),
          isCompleted: false,
          title: taskTitle,
          createdAt: new Date(Date.now()).toISOString(),
          elapsedTime: 0,
        });
        setTaskTitle('');
      }
    }
  };

  const onTitleChanged = (title: string) => {
    setTaskTitle(title);
  };

  return (
    <div
      className={classNames(
        'flex h-full min-h-16 w-full flex-col items-center justify-center rounded-xl border-2 border-surface',
        { 'border-dashed': !isActive, 'border-solid': isActive }
      )}
    >
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          className="inline-flex h-full w-full items-center justify-center gap-1 transition-transform duration-200 ease-in-out md:active:scale-105"
        >
          Click here or press <Tip keybind={'enter'} /> to add new task
        </button>
      ) : (
        <div className="relative flex h-full min-h-20 w-full flex-col">
          <input
            ref={inputRef}
            onKeyDown={e => onKeyPressed(e)}
            value={taskTitle}
            onChange={e => onTitleChanged(e.target.value)}
            className="flex h-auto w-full rounded-xl bg-transparent p-3 outline-none"
            type="text"
          />
          <div className="mx-3 mb-3 flex cursor-default flex-row gap-3 text-xs opacity-50 transition-opacity duration-200 ease-in-out md:hover:opacity-100">
            <Tip keybind="enter" description="Save" />
            <Tip keybind="esc" description="Close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
