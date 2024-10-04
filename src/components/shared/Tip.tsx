import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  item: React.ReactNode | React.ReactNode[];
  description?: string;
  isDefaultTextSize?: boolean;
}

const Tip: FC<Props> = ({ item, description, isDefaultTextSize }) => {
  return (
    <div
      className={classNames(
        'inline-flex cursor-default select-none items-center gap-1 font-medium',
        { 'text-xs': !isDefaultTextSize }
      )}
    >
      {Array.isArray(item) ? (
        item.map(_item => (
          <span className="rounded-md bg-surface p-1 px-2 font-black uppercase text-accent/50">
            {_item}
          </span>
        ))
      ) : (
        <span className="rounded-md bg-surface p-1 px-2 font-black uppercase text-accent/50">
          {item}
        </span>
      )}
      {description}
    </div>
  );
};

export default Tip;
