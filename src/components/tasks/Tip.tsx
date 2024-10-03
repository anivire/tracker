import { FC } from 'react';

interface Props {
  keybind: React.ReactNode | React.ReactNode[];
  description?: string;
}

const Tip: FC<Props> = ({ keybind, description }) => {
  return (
    <div className="inline-flex cursor-default select-none items-center gap-1 text-xs font-medium">
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
