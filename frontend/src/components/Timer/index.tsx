import React, { useState } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState<number | Date>(0);
  const [start, setStart] = useState<number | Date>(0);
  const [isOn, setIsOn] = useState<boolean>(false);

  return <div>Timer</div>;
};

export default Timer;
