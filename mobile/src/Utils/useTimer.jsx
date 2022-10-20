import { useState } from "react";
import Time from "./Time";
import useInterval from "./useInterval";

const DEFAULT_DELAY = 100;
class Validate {
  static expiryTimestamp(expiryTimestamp) {
    const isValid = new Date(expiryTimestamp).getTime() > 0;
    if (!isValid) {
      console.warn(
        "react-timer-hook: { useTimer } Invalid expiryTimestamp settings",
        expiryTimestamp
      ); // eslint-disable-line
    }
    return isValid;
  }

  static onExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === "function";
    if (onExpire && !isValid) {
      console.warn(
        "react-timer-hook: { useTimer } Invalid onExpire settings function",
        onExpire
      ); // eslint-disable-line
    }
    return isValid;
  }
}
function getDelayFromExpiryTimestamp(expiryTimestamp) {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }
  return 100;
}

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart = true,
}) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(
    Time.getSecondsFromExpiry(expiryTimestamp)
  );
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(
    getDelayFromExpiryTimestamp(expiryTimestamp)
  );

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setDelay(null);
  }

  function pause() {
    setIsRunning(false);
  }

  function restart(newExpiryTimestamp, newAutoStart = true) {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }

  function resume() {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000);
    restart(time);
  }

  function start() {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(secondsValue);
      if (secondsValue <= 0) {
        handleExpire();
      }
    },
    isRunning ? delay : null
  );

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
}
