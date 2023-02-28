import React, { useState } from 'react';
import AlarmForm from './components/AlarmForm';
import StopWatch from './components/StopWatch';
import { Timer } from './types/timer';
import ThemeLayout from './components/Layout/ThemeLayout';

const App = () => {
    const [alarmTime, setAlarmTime] = useState<Timer>({
        sec: 0,
        min: 0,
    });
    return (
        <ThemeLayout>
            <StopWatch alarm={alarmTime} />
            <AlarmForm setAlarm={(data) => setAlarmTime(data)} />
        </ThemeLayout>
    );
};

export default App;
