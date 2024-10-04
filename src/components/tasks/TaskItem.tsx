import { useAppSelector } from '@/hooks/useStore';
import { RootState } from '@/redux/store';
import { Task } from '@/redux/tasksReducer';
import formatTrackerTime from '@/utils/formatTrackerTime';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiDeleteBin7Fill from '~icons/ri/delete-bin-7-fill';

import { useHotkey } from '../../providers/HotkeyProvider';
import Tip from '../shared/Tip';

interface Props {
  task: Task;
  isSelected: boolean;
  onProgressChange: (isCompleted: boolean) => void;
  onSelected: (selectedTaskId: string | null) => void;
  onDelete: (removedTaskId: string) => void;
}

const TaskItem: FC<Props> = ({
  task,
  isSelected,
  onProgressChange,
  onSelected,
  onDelete,
}) => {
  const { pressedKey } = useHotkey();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const selectedTaskID = useAppSelector(
    (state: RootState) => state.tasks.selectedTaskID
  );

  useEffect(() => {
    if (!isSelected) return;

    if (pressedKey === 'Shift+ArrowRight') {
      onProgressChange(true);
    } else if (pressedKey === 'Shift+ArrowLeft') {
      onProgressChange(false);
    } else if (pressedKey === 'Shift+Delete') {
      onDelete(task.id);
    }
  }, [pressedKey]);

  return (
    <div
      onClick={() => onSelected(task.id)}
      className={classNames(
        'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-md text-sm',
        {
          'text-tracker-white': isSelected,
        }
      )}
    >
      <div
        className={classNames(
          'group flex w-full flex-row flex-wrap justify-between gap-1 rounded-md px-3 py-3',
          {
            'line-through': task.isCompleted,
            'text-fill': task.isCompleted && !isSelected,
            'cursor-default bg-accent text-tracker-white': isSelected,
            'bg-foreground': !isSelected,
          }
        )}
      >
        <div className="flex w-full flex-row items-center gap-1">
          <button onClick={() => onProgressChange(!task.isCompleted)}>
            {task.isCompleted ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
          </button>
          <p
            className={classNames(
              'block overflow-hidden hyphens-auto whitespace-normal break-words'
            )}
          >
            {task.title}
          </p>
        </div>
      </div>

      {isSelected && selectedTaskID && tasks && (
        <div className="absolute right-3 flex h-full flex-row items-center gap-2 text-xs tabular-nums bg-accent pl-3">
          <Tip
            item={formatTrackerTime(
              tasks.find(task => task.id === selectedTaskID)?.elapsedTime ?? 0
            )}
          />
        </div>
      )}

      {/* {!isSelected && selectedTask && (
        <div className="absolute right-3 flex h-full flex-row items-center gap-2 text-xs bg-acc tabular-nums bg-foreground pl-3">
          <Tip item={formatTrackerTime(task.elapsedTime)} />
        </div>
      )} */}
    </div>
  );
};

export default TaskItem;
