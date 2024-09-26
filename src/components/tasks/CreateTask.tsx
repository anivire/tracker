import Task from '@/utils/models/Task';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import RiStickyNoteAddFill from '~icons/ri/sticky-note-add-fill';
import KeybindTip from './KeybindTip';

interface Props {
  onTaskCreated: (newTask: Task) => void;
}

const CreateTask: FC<Props> = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        textareaRef.current &&
        document.activeElement !== textareaRef.current
      ) {
        textareaRef.current.focus();
      }

      if (event.key === 'Escape') {
        setTaskTitle('');
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onKeyPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (taskTitle !== '') {
        onTaskCreated({
          id: crypto.randomUUID(),
          isCompleted: false,
          title: taskTitle,
        });
        setTaskTitle('');
      }
    }
    //  else if (event.key === 'Escape') {
    //   setTaskTitle('');
    //   setIsActive(false);
    // }
  };

  const onTitleChanged = (title: string) => {
    setTaskTitle(title);
  };

  return (
    <div
      className={classNames(
        'flex h-full min-h-24 w-full flex-col items-center justify-center rounded-xl border-2 border-surface',
        { 'border-dashed': !isActive, 'border-solid': isActive }
      )}
    >
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          className="inline-flex h-full min-h-24 w-full items-center justify-center gap-1 transition-transform duration-200 ease-in-out md:active:scale-105"
        >
          <RiStickyNoteAddFill />
          Click here or start typing, to add new task
        </button>
      ) : (
        <div className="relative flex h-full min-h-24 w-full">
          <textarea
            ref={textareaRef}
            onKeyDown={e => onKeyPressed(e)}
            value={taskTitle}
            onChange={e => onTitleChanged(e.target.value)}
            className="flex h-auto min-h-24 w-full rounded-xl bg-transparent p-3 outline-none"
          />
          <div className="absolute bottom-3 left-3 flex cursor-default flex-row gap-3 text-xs opacity-50 transition-opacity duration-200 ease-in-out md:hover:opacity-100">
            <KeybindTip keybind="enter" description="Save" />
            <KeybindTip keybind="esc" description="Close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
