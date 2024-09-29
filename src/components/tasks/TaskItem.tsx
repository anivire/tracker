import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiDeleteBin7Fill from '~icons/ri/delete-bin-7-fill';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import Task from '@/utils/models/Task';
import KeybindTip from './KeybindTip';
import { useHotkey } from '../providers/HotkeyProvider';
import { pre } from 'framer-motion/client';

interface Props {
  id: string;
  title: string;
  isCompleted: boolean;
  isSelected: boolean;
  onProgressChange: (isCompleted: boolean) => void;
  onSelected: (selectedTaskId: string | null) => void;
  onDelete: (removedTaskId: string) => void;
}

const TaskItem: FC<Props> = ({
  id,
  title,
  isCompleted,
  isSelected,
  onProgressChange,
  onSelected,
  onDelete,
}) => {
  const { pressedKey } = useHotkey();

  useEffect(() => {
    if (!isSelected) return;

    if (pressedKey === 'ArrowRight') {
      onProgressChange(true);
    } else if (pressedKey === 'ArrowLeft') {
      onProgressChange(false);
    } else if (pressedKey === 'Delete') {
      onDelete(id);
    }
    // } else if (pressedKey === ' ') {
    //   if (isSelected) {
    //     onSelected(null);
    //   } else {
    //     onSelected(id);
    //   }
    // }
  }, [pressedKey]);

  return (
    <div
      onClick={() => onSelected(id)}
      className={classNames(
        'relative flex w-full cursor-pointer flex-row items-center justify-between overflow-hidden rounded-md text-sm',
        {
          'text-tracker-white': isSelected,
        }
      )}
    >
      <div
        className={classNames(
          'group flex w-full flex-row flex-wrap justify-between gap-1 rounded-md px-3 py-3',
          {
            'line-through': isCompleted,
            'text-fill': isCompleted && !isSelected,
            'cursor-default bg-accent text-tracker-white': isSelected,
            'bg-foreground': !isSelected,
          }
        )}
      >
        <div className="flex flex-row items-center gap-1">
          <button onClick={() => onProgressChange(!isCompleted)}>
            {isCompleted ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
          </button>
          <p
            className={classNames(
              'block overflow-hidden hyphens-auto whitespace-normal break-words',
              { 'max-w-48 sm:max-w-sm md:max-w-lg': isSelected }
            )}
          >
            {title}
          </p>
        </div>
      </div>

      {isSelected && (
        <div className="absolute right-5 flex h-full flex-row gap-2 text-xs">
          <KeybindTip keybind="del" description="Delete" />
          <KeybindTip keybind="f1" description="Help" />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
