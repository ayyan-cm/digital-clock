import { useState, useEffect } from "react";

function DigitalClock() {

    const [time, setTime] = useState({
        hour : 0,
        minute : 0,
        second : 0,
        ampm : 'AM',
        dayString : ''
    });

    useEffect( () => {
        const updateClock = () => {
            const date = new Date();
            const hour = date.getHours();
            const updatedTime = {
                hour : hour % 12 || 12,
                minute : date.getMinutes(),
                second : date.getSeconds(),
                ampm : hour >= 12 ? 'PM' : 'AM',
                dayString : date.toDateString()
            };
            setTime(updatedTime);
        };
        
        updateClock();

        const intervalId =  setInterval(updateClock,1000);
        return () => clearInterval(intervalId);
    },[]);

    return (
        <div className="digital-clock clock-container">
            <div className="card-container">
                <div className="card hour"><p>{time.hour.toString().padStart(2, '0')}</p></div>
                <div className="card minute"><p>{time.minute.toString().padStart(2, '0')}</p></div>
                <div className="card second"><p>{time.second.toString().padStart(2, '0')}</p></div>
                <div className="maridiam"><p>{time.ampm}</p></div>
            </div>
            <div className="day"><p style={{fontSize: "1.5rem"}}>{time.dayString}</p></div>
        </div>
    );
}

export default DigitalClock;
