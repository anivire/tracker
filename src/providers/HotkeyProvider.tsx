import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface HotkeyContextProps {
  pressedKey: string | null;
}

const HotkeyContext = createContext<HotkeyContextProps | undefined>(undefined);

interface HotkeyProviderProps {
  children: ReactNode;
}

export const HotkeyProvider: React.FC<HotkeyProviderProps> = ({ children }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey) {
        event.preventDefault();
      }

      let keyCombo = event.key;

      if (event.shiftKey) keyCombo = `Shift+${keyCombo}`;
      if (event.ctrlKey) keyCombo = `Ctrl+${keyCombo}`;
      if (event.altKey) keyCombo = `Alt+${keyCombo}`;

      setPressedKey(keyCombo);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <HotkeyContext.Provider
      value={{
        pressedKey,
      }}
    >
      {children}
    </HotkeyContext.Provider>
  );
};

export const useHotkey = (): HotkeyContextProps => {
  const context = useContext(HotkeyContext);
  if (!context) {
    throw new Error('useHotkey must be used within a HotkeyProvider');
  }
  return context;
};
