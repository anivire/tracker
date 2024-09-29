import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface HotkeyContextProps {
  pressedKey: string | null;
  keyBinds: string[];
}

const HotkeyContext = createContext<HotkeyContextProps | undefined>(undefined);

interface HotkeyProviderProps {
  children: ReactNode;
}

export const HotkeyProvider: React.FC<HotkeyProviderProps> = ({ children }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [keyBinds, setKeyBinds] = useState<string[]>([
    'F1',
    'Delete',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKey(event.key);
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
        keyBinds,
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
