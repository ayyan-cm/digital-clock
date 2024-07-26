import DigitalClock from "./DigitalClock";
import StopWatch from "./StopWatch";
import darkModeImage from "./assets/dark-mode.svg";
import lightModeImage from "./assets/light-mode.svg";
import fullScreenImage from "./assets/full-screen.svg";
import exitFullScreenImage from "./assets/full-screen-exit.svg";
import { useState } from "react";

function App() {
  const [clockType, setClockType] = useState("digital");

  function toggleTheme(e) {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
    if (theme === "dark") {
      e.target.src = lightModeImage;
      e.target.alt = "Light Mode";
    } else {
      e.target.src = darkModeImage;
      e.target.alt = "Dark Mode";
    }
  }

  function toggleFullScreen(e) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      e.target.src = fullScreenImage;
      e.target.alt = "Toggle Full Screen";
    } else {
      document.documentElement.requestFullscreen();
      e.target.src = exitFullScreenImage;
      e.target.alt = "Exit Full Screen";
    }
  }

  function changeClockType(e) {
    setClockType(e.target.value);
  }

  return (
    <>
      <div className="clock-options">
        <select name="clock" id="clock" onChange={changeClockType}>
          <option value="digital">Digital</option>
          <option value="stopwatch">Stop Watch</option>
        </select>
      </div>
      <div className="theme-selection">
        <img src={lightModeImage} onClick={toggleTheme} alt="Light Mode" />
        <img
          src={fullScreenImage}
          onClick={toggleFullScreen}
          alt="Toggle Full Screen"
        />
      </div>
      {clockType === "digital" && <DigitalClock />}
      {clockType === "stopwatch" && <StopWatch />}
    </>
  );
}

export default App;
