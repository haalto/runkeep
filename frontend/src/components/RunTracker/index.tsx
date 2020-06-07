import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 6rem;
`;

const StartButton = styled.button`
  width: 10rem;
  border-radius: 20rem;
  background-color: rgba(10, 180, 10, 0.8);
  height: 5rem;
  font-family: inherit;
  font-size: 2rem;
  margin: 4rem;
  cursor: pointer;
  box-shadow: 3px 3px 2px 1px grey;
  border: none;
  color: #ffff;
  letter-spacing: 0.2rem;
`;

const StopButton = styled.button`
  background-color: rgba(200, 10, 10, 0.8);
  width: 10rem;
  border-radius: 20rem;
  height: 5rem;
  font-family: inherit;
  font-size: 2rem;
  margin: 4rem;
  cursor: pointer;
  box-shadow: 3px 3px 2px 1px grey;
  border: none;
  color: #ffff;
  letter-spacing: 0.2rem;
`;

const Timer = styled.span`
  font-size: 4rem;
  padding: 1rem;
`;

const Stats = styled.div``;

const Speed = styled.span`
  font-size: 2rem;
  padding: 1rem;
`;

const Distance = styled.span`
  font-size: 2rem;
  padding: 1rem;
`;

const RunTracker: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [position1, setPosition1] = useState<Coordinates | null>(null);
  const [position2, setPosition2] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [GPSInterval, setGPSInterval] = useState(true);
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = position.coords;
        setPosition1(position2);
        setPosition2(coordinates);
        const previousDistance = distance;
        console.log('here');

        if (position1 && position2) {
          setDistance(
            previousDistance + calculateDistance(position1, position2)
          );
          setSpeed((distance / time) * 3600 * 3600);
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [GPSInterval]);

  useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        const newTime = Date.now() - start;
        setTime(newTime);
      }, 500);
    }
  }, [start, time, isOn]);

  useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        setGPSInterval(!GPSInterval);
      }, 5000);
    }
  }, [isOn, time]);

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
    setDistance(0);
    setSpeed(0);
    setTime(0);
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
      <Timer>{formattedTime}</Timer>
      <Distance>{Math.round(distance / 0.001)} meters</Distance>
      <Speed>{speed.toFixed(2)} km/h</Speed>
      {!isOn ? (
        <StartButton onClick={() => startTimer()}>Start</StartButton>
      ) : (
        <StopButton onClick={() => stopTimer()}>Stop</StopButton>
      )}
      {/* <span>
        Position1: {position1?.latitude} {position1?.longitude}
      </span>
      <span>
        Position2: {position2?.latitude} {position2?.longitude}
      </span> */}
    </Wrapper>
  );
};

export default RunTracker;
