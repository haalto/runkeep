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
  const [position1, setPosition1] = useState<Coordinates | null>(null);
  const [position2, setPosition2] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        const coordinates = position.coords;
        if (isOn) {
          setPosition1(position2);
          setPosition2(coordinates);
          const previousDistance = distance;
          console.log(distance);

          if (position1 && position2) {
            setDistance(
              previousDistance + calculateDistance(position1, position2)
            );
          }
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [isOn]);

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
          if (isOn) {
            setPosition1(coordinates);
            setPosition2(coordinates);
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

  const calculateDistance = (
    position1: Coordinates,
    position2: Coordinates
  ) => {
    //https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates

    const R = 6371;
    const dLat = toRad(position2.latitude - position1.latitude);
    const dLon = toRad(position2.longitude - position1.longitude);
    const lat1 = toRad(position1.latitude);
    const lat2 = toRad(position2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRad = (value: number) => {
    return (value * Math.PI) / 180;
  };

  return (
    <Wrapper>
      <span>{formattedTime}</span>
      <Button onClick={() => startTimer()}>Start</Button>
      <Button onClick={() => stopTimer()}>Stop</Button>
      <span>
        Position: {position2?.latitude} {position2?.longitude}
      </span>
      <span>Speed: </span>
      <span>Distance: {distance / 0.001} meters</span>
      <span>Distance: {distance} kilometers</span>
    </Wrapper>
  );
};

export default RunTracker;
