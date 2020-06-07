import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { logRoles } from '@testing-library/react';

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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = position.coords;
        setPosition1(position2);
        setPosition2(coordinates);
        const previousDistance = distance;

        if (position1 && position2) {
          setDistance(
            previousDistance + calculateDistance(position1, position2)
          );
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [time]);

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
    setStart(Date.now());
    setIsOn(true);
  };

  const stopTimer = () => {
    setIsOn(false);
  };

  const calculateDistance = (pos1: Coordinates, pos2: Coordinates) => {
    //https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates

    const R = 6371;
    const dLat = toRad(pos2.latitude - pos1.latitude);
    const dLon = toRad(pos2.longitude - pos1.longitude);
    const lat1 = toRad(pos1.latitude);
    const lat2 = toRad(pos2.latitude);

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
        Position1: {position1?.latitude} {position1?.longitude}
      </span>
      <span>
        Position2: {position2?.latitude} {position2?.longitude}
      </span>
      <span>Speed: </span>
      <span>Distance: {distance / 0.001} meters</span>
      <span>Distance: {distance} kilometers</span>
    </Wrapper>
  );
};

export default RunTracker;
