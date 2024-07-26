import { useEffect, useState, useRef } from "react";

function StopWatch() {
    const [time, setTime] = useState({
        minute: 0,
        second: 0,
        milliSecond: 0
    });

    const [isActive, setIsActive] = useState(false);
    const intervalIdRef = useRef(null);

    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);
        }
    };

    const stopTimer = () => {
        if (isActive) {
            setIsActive(false);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime({
            minute: 0,
            second: 0,
            milliSecond: 0
        });
    };

    useEffect(() => {
        if (isActive) {
            intervalIdRef.current = setInterval(() => {
                setTime(prevTime => {
                    const updatedTime = {
                        minute: prevTime.second === 59 && prevTime.milliSecond === 59 ? prevTime.minute + 1 : prevTime.minute,
                        second: prevTime.milliSecond === 59 ? (prevTime.second === 59 ? 0 : prevTime.second + 1) : prevTime.second,
                        milliSecond: prevTime.milliSecond === 59 ? 0 : prevTime.milliSecond + 1
                    };
                    return updatedTime;
                });
            }, 10);
        } else if (!isActive && intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);
    }, [isActive]);

    return (
        <div className="stop-watch clock-container">
            <div className="card-container">
                <div className="card minute"><p>{time.minute.toString().padStart(2, '0')}</p></div>
                <div className="card second"><p>{time.second.toString().padStart(2, '0')}</p></div>
                <div className="card milliSecond"><p>{time.milliSecond.toString().padStart(2, '0')}</p></div>
            </div>
            <div className="button-container">
                <button className="clock-actions" onClick={startTimer}>Start</button>
                <button className="clock-actions" onClick={stopTimer}>Stop</button>
                <button className="clock-actions" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;
