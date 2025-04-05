// src/components/AuctionTimer.jsx

import Countdown from 'react-countdown';

// eslint-disable-next-line react/prop-types
const AuctionTimer = ({ startTime, endTime }) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  const isLive = now >= start && now <= end;

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (!isLive) {
    return (
      <div>
        Start: {formatTime(start)} | End: {formatTime(end)}
      </div>
    );
  }

  return (
    <div>
      <span>LIVE 🔴</span>
      <Countdown
        date={end}
        renderer={({ hours, minutes, seconds }) => (
          <span>
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
        )}
      />
    </div>
  );
};

export default AuctionTimer;
