import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    // State for the time and whether the timer is on
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    // Format the time in mm:ss:ms
    const minutes = Math.floor((time / 6000));
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;
    // Format the minutes, seconds, and milliseconds to be two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    // Combine the values into a string
    const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;

    // Every time timerOn changes, we start or stop the timer
    // useEffect is necessary since setInterval changes the state and we don't want to create an infinite loop
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerOn) {
            interval = setInterval(() => setTime(time => time + 1), 10)
        }

        return () => {clearInterval(interval)} // Clears the interval when the component unmounts or timerOn changes
    }, [timerOn])

    return(
        <div>
            <h1>StopWatch</h1>
            <p>{formattedTime}</p>
            <StopWatchButton type={'start'} onClick={() => setTimerOn(true)}></StopWatchButton>
            <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)}></StopWatchButton>
            <StopWatchButton type={'lap'} onClick={() => {}}></StopWatchButton> {/*TODO: Implement lap functionality*/}
            <StopWatchButton type={'reset'} onClick={() => setTimerOn(false)}></StopWatchButton> {/* TODO: Implement reset functionality */}
        </div>
    )
}