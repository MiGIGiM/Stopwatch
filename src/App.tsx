import React, { useState } from 'react';
import AlarmForm from './components/AlarmForm';
import StopWatch from './components/StopWatch';
import { Timer } from './types/timer';

const App = () => {
    const [alarmTime, setAlarmTime] = useState<Timer>({
        sec: 0,
        min: 0,
    });
    return (
        <div className="flex h-screen items-center justify-around">
            <StopWatch alarm={alarmTime} />
            <AlarmForm setAlarm={(data) => setAlarmTime(data)} />
        </div>
    );
};

export default App;
