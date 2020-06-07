import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const Button = styled.button`
  width: 30%;
`;

const RunTracker: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [position, setPosition] = useState<Coordinates | null>(null);

  navigator.geolocation.watchPosition(
    (position) => {
      const coordinates = position.coords;
      console.log(coordinates);
      if (isOn) {
        setPosition(coordinates);
      }
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
    }
  );

  useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        const newTime = Date.now() - start;
        setTime(newTime);
      }, 1);
    }
  }, [start, time, isOn]);

  useEffect(() => {
    const timeInSeconds = time / 1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor((timeInSeconds % 3600) % 60);

    const hDisplay = hours > 0 ? (hours < 10 ? '0' : '') + hours : '00';
    const mDisplay = minutes > 0 ? (minutes < 10 ? '0' : '') + minutes : '00';
    const sDisplay = seconds > 0 ? (seconds < 10 ? '0' : '') + seconds : '00';

    setFormattedTime(`${hDisplay}:${mDisplay}:${sDisplay}`);
  }, [time]);

  const startTimer = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          const coordinates = position.coords;
          console.log(coordinates);
          if (isOn) {
            setPosition(coordinates);
          }
        }, 1000);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
    setStart(Date.now());
    setIsOn(true);
  };

  const stopTimer = () => {
    setIsOn(false);
  };

  return (
    <Wrapper>
      <span>{formattedTime}</span>
      <Button onClick={() => startTimer()}>Start</Button>
      <Button onClick={() => stopTimer()}>Stop</Button>
      <span>
        Position: {position?.latitude} {position?.longitude}
      </span>
      <span>Speed: </span>
      <span>Distance</span>
    </Wrapper>
  );
};

export default RunTracker;
