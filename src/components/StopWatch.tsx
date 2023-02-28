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
        interrupt: true,
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
            }
        }
    };

    if (!isOpen) stop();

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
            ms: `0${(time / 10) % 100}`.slice(-2),
            sec: `0${Math.floor((time / 1000) % 60)}`.slice(-2),
            min: `0${Math.floor((time / 60000) % 60)}`.slice(-2),
        });

        showAlert();
    }, [time]);

    return (
        <>
            <div className="flex flex-col items-center space-y-4 md:w-1/4">
                <div
                    className={`w-full rounded-lg border-4 p-5 font-orbitron text-3xl transition-shadow duration-200 md:text-2xl ${
                        isRunning
                            ? 'border-primary-focus shadow-lg shadow-primary-focus'
                            : 'border-primary'
                    }`}
                >
                    <span className="hidden text-6xl md:countdown">
                        <span style={{ '--value': timer.min }} />
                    </span>
                    <span className="md:hidden">{timer.min}</span>:
                    <span className="md:hidden">{timer.sec}</span>
                    <span className="hidden text-6xl md:countdown">
                        <span style={{ '--value': timer.sec }} />
                    </span>
                    .<span>{timer.ms}</span>
                </div>
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn-primary btn ${
                            isRunning ? 'btn-disabled' : ''
                        }`}
                        disabled={isRunning}
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
                        ⏰ Alarm set to
                        {` ${alarm.min} `}
                        minutes with
                        {` ${alarm.sec} `}
                        seconds
                    </p>
                )}
            </div>
            <AlarmModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default StopWatch;
