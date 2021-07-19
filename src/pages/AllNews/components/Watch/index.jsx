import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function Watch(props) {
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Clock
      value={value}
      secondHandWidth={3}
      minuteHandWidth={4}
      minuteHandLength={80}
      hourHandWidth={6}
      hourMarksWidth={8}
      size={200}
    />
  );
}

export default Watch;
