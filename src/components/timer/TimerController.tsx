import formatTrackerTime from '@/utils/formatTrackerTime';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import RiPauseFill from '~icons/ri/pause-fill';
import RiPlayFill from '~icons/ri/play-fill';
import RiResetLeftFill from '~icons/ri/reset-left-fill';

import { useHotkey } from '../../providers/HotkeyProvider';

interface Props {
  // onElapsedTime: (time: number) => void;
  // trackedTaskID?: string;
  // onTrackedTaskCompleted?: () => void;
  // elapsedTime: number;
  // onTimerStopped: () => void;
  // onTimerStarted: () => void;
}

const TimerController: FC<Props> = (
  {
    // onElapsedTime,
    // trackedTaskID,
    // onTrackedTaskCompleted,
    // elapsedTime,
    // onTimerStarted,
    // onTimerStopped,
  }
) => {
  const DEFAULT_TIME = 1500;
  const [defaultElapsedTime, setDefaultElapsedTime] =
    useState<number>(DEFAULT_TIME);
  const [elapsedTime, setElapsedTime] = useState<number>(defaultElapsedTime);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  const [timerType, setTimerType] = useState<
    'focus' | 'short-break' | 'long-break' | 'stopwatch'
  >('focus');
  const { pressedKey } = useHotkey();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect(() => {
  //   setElapsedTime(defaultElapsedTime);
  //   setIsTimerStarted(false);
  // }, [onTrackedTaskCompleted]);

  const updateDefaultTime = (addedTime: number) => {
    setElapsedTime(prev => prev + addedTime);
    setDefaultElapsedTime(prev => prev + addedTime);
  };

  const resetTime = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsTimerStarted(false);
    setDefaultElapsedTime(DEFAULT_TIME);
    setElapsedTime(DEFAULT_TIME);
  };

  useEffect(() => {
    const startTimer = () => {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setElapsedTime(prev => {
            if (prev === 0) {
              resetTimer();
              return prev;
            }

            if (timerType === 'stopwatch') {
              return prev + 1;
            } else {
              return prev - 1;
            }
          });
        }, 1000);
      }
    };

    const pauseTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setIsTimerStarted(false);
      setElapsedTime(defaultElapsedTime);
    };

    if (isTimerStarted) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [isTimerStarted]);

  useEffect(() => {
    if (pressedKey === 'Shift+Enter') {
      if (isTimerStarted) setIsTimerStarted(false);
      else setIsTimerStarted(true);
    }
  }, [pressedKey]);

  // useEffect(() => {
  //   const calculatedSpentTime = defaultElapsedTime - elapsedTime;
  //   onElapsedTime(calculatedSpentTime);
  // }, [elapsedTime]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 rounded-xl border border-accent/10 bg-foreground p-5">
      <div className="flex flex-row gap-5 text-sm">
        <button className="rounded-md bg-accent px-5 py-2 text-tracker-white">
          Focus
        </button>
        <div className="flex flex-row divide-x-2 divide-foreground overflow-hidden rounded-md bg-surface">
          <button className="px-5 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white">
            Short Break
          </button>
          <button className="px-5 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white">
            Long Break
          </button>
        </div>
      </div>
      <h1 className="flex flex-row text-7xl font-bold tabular-nums">
        {formatTrackerTime(elapsedTime)}
      </h1>
      <div>
        <div className="flex flex-row gap-5 overflow-hidden rounded-md text-sm">
          <div className="flex flex-row divide-x-2 divide-foreground overflow-hidden rounded-md bg-surface">
            <button
              onClick={() => setIsTimerStarted(!isTimerStarted)}
              className={classNames(
                'group px-3 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white',
                { 'bg-accent text-tracker-white': isTimerStarted }
              )}
            >
              {!isTimerStarted ? (
                <RiPlayFill className="transition-transform duration-200 ease-in-out md:group-active:scale-150" />
              ) : (
                <RiPauseFill className="transition-transform duration-200 ease-in-out md:group-active:scale-150" />
              )}
            </button>
            <button
              onClick={() => resetTime()}
              className="group px-3 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white"
            >
              <RiResetLeftFill className="transition-transform duration-200 ease-in-out md:group-active:scale-150" />
            </button>
          </div>
          <div className="flex flex-row divide-x-2 divide-foreground overflow-hidden rounded-md bg-surface">
            <button
              onClick={() => updateDefaultTime(300)}
              className="w-16 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white"
            >
              +5
            </button>
            <button
              onClick={() => updateDefaultTime(600)}
              className="w-16 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white"
            >
              +10
            </button>
            <button
              onClick={() => updateDefaultTime(900)}
              className="w-16 py-2 transition-colors duration-200 ease-in-out md:hover:bg-accent md:hover:text-tracker-white"
            >
              +15
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerController;
