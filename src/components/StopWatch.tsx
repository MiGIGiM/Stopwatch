// eslint-disable-next-line object-curly-newline
import React, { FC, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { Timer } from '../types/timer';
import alarmSfx from '../assets/sound/alarm.mp3';
import AlarmModal from './AlarmModal';

export interface IStopWatchProps {
    alarm: Timer;
}

const StopWatch: FC<IStopWatchProps> = ({ alarm }) => {
    const [time, setTime] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const interval = useRef<number>(0);
    const [play, { stop }] = useSound(alarmSfx, {
        volume: 0.15,
    });
    const [timer, setTimer] = useState<Timer>({
        ms: 0,
        sec: 0,
        min: 0,
    });

    const showAlert = () => {
        if (alarm.min !== 0 && alarm.sec !== 0) {
            if (
                timer.min.toString() === alarm.min &&
                timer.sec.toString() === alarm.sec
            ) {
                play();
                setIsOpen(true);
                const stopSound = setTimeout(() => {
                    stop();
                }, 1000);
                clearTimeout(stopSound);
            }
        }
    };

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else if (!isRunning) clearInterval(interval.current);

        return () => clearInterval(interval.current);
    }, [isRunning]);

    useEffect(() => {
        setTimer({
            ms: (time / 10) % 100,
            sec: Math.floor((time / 1000) % 60),
            min: Math.floor((time / 60000) % 60),
        });

        showAlert();
    }, [time]);

    return (
        <>
            <div className="flex flex-col items-center space-y-4 md:w-1/4">
                <div
                    className={`w-full rounded-lg border-4 p-5 font-orbitron text-2xl transition-shadow duration-200 ${
                        isRunning
                            ? 'border-primary-focus shadow-lg shadow-primary-focus'
                            : 'border-primary'
                    }`}
                >
                    <span className="countdown text-6xl">
                        <span style={{ '--value': timer.min }} />
                    </span>
                    :
                    <span className="countdown text-6xl">
                        <span style={{ '--value': timer.sec }} />
                    </span>
                    <span>{timer.ms}</span>
                </div>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn-primary btn"
                        onClick={() => setIsRunning(true)}
                    >
                        Start
                    </button>
                    <button
                        type="button"
                        className="btn-primary-focus btn"
                        onClick={() => setIsRunning(false)}
                    >
                        Stop
                    </button>
                    <button
                        type="button"
                        className="btn-accent btn"
                        onClick={() => setTime(0)}
                    >
                        Reset
                    </button>
                </div>
                {alarm.min !== 0 && alarm.sec !== 0 && (
                    <p className="badge-info badge  badge-lg">
                        ⏰ Alarm set to {alarm.min} minutes with {alarm.sec}{' '}
                        seconds{' '}
                    </p>
                )}
            </div>
            <AlarmModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default StopWatch;
