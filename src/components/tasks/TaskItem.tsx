import classNames from 'classnames';
import { FC, useState } from 'react';
import {
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';
import RiCheckboxFill from '~icons/ri/checkbox-fill';
import RiDeleteBin7Fill from '~icons/ri/delete-bin-7-fill';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import Task from '@/utils/models/Task';
import KeybindTip from './KeybindTip';

interface Props {
  id: string;
  title: string;
  isCompleted: boolean;
  isSelected: boolean;
  onProgressChange: (isCompleted: boolean) => void;
  onSelected: (selectedTaskId: string) => void;
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
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const dragMax = 125;

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > -dragMax) {
      animate(x, 0);
    } else {
      setIsDragging(false);
    }
  };

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
      {isDragging && (
        <div className="bg-tracker-light-pink absolute inset-0 flex w-fit items-center justify-start px-4 text-tracker-pink">
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center gap-1"
          >
            <RiDeleteBin7Fill />
            <span>Delete task</span>
          </button>
        </div>
      )}

      <motion.div
        className={classNames(
          'group flex flex-row flex-wrap justify-between gap-1 rounded-md px-3 py-2 transition-all duration-200 ease-in-out',
          {
            'line-through': isCompleted,
            'w-full bg-accent': isSelected,
            'w-fit bg-foreground': !isSelected,
            'rounded-none': isDragging,
          }
        )}
        drag="x"
        dragConstraints={{ left: 0, right: dragMax }}
        dragElastic={{ left: 0, right: 0 }}
        dragMomentum={false}
        whileTap={{ cursor: 'grabbing' }}
        // whileHover={{ cursor: 'grabbing' }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        <div className="inline-flex items-center gap-1">
          <button onClick={() => onProgressChange(!isCompleted)}>
            {isCompleted ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
          </button>
          {title}
        </div>
      </motion.div>

      {isSelected && (
        <div className="absolute right-5 flex h-full flex-row gap-2 text-xs">
          {/* <KeybindTip
            keybind={<RiArrowLeftLine className="text-sm" />}
            description="Archive"
          /> */}
          <KeybindTip keybind="f1" description="Help" />
          {/* <KeybindTip
            keybind={<RiArrowRightLine className="text-sm" />}
            description="Complete"
          /> */}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
