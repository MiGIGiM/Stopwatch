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
        <div className="mt-6 flex h-screen flex-col items-center space-y-6 md:mt-0 md:flex-row md:justify-center md:space-x-28 md:space-y-0">
            <StopWatch alarm={alarmTime} />
            <AlarmForm setAlarm={(data) => setAlarmTime(data)} />
        </div>
    );
};

export default App;
