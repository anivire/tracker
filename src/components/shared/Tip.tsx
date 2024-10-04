import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  keybind: React.ReactNode | React.ReactNode[];
  description?: string;
  isDefaultTextSize?: boolean;
}

const Tip: FC<Props> = ({ keybind, description, isDefaultTextSize }) => {
  return (
    <div
      className={classNames(
        'inline-flex cursor-default select-none items-center gap-1 font-medium',
        { 'text-xs': !isDefaultTextSize }
      )}
    >
      {Array.isArray(keybind) ? (
        keybind.map(item => (
          <span className="rounded-md bg-surface p-1 px-2 font-black uppercase text-accent/50">
            {item}
          </span>
        ))
      ) : (
        <span className="rounded-md bg-surface p-1 px-2 font-black uppercase text-accent/50">
          {keybind}
        </span>
      )}
      {description}
    </div>
  );
};

export default Tip;
