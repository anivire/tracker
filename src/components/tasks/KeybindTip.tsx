import { FC } from 'react';

interface Props {
  keybind: React.ReactNode;
  description: string;
}

const KeybindTip: FC<Props> = ({ keybind, description }) => {
  return (
    <div className="inline-flex items-center gap-1 font-medium">
      <span className="rounded-md bg-surface p-1 px-2 font-black uppercase text-accent/50">
        {keybind}
      </span>
      {description}
    </div>
  );
};

export default KeybindTip;
