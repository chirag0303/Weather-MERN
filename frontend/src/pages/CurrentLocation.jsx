import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DisplayDate from '../components/shared/util/DisplayDate.jsx';
import Charts from '../pages/Charts.jsx';
import FiveDays from '../pages/FiveDays.jsx';

const getCompassDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg/45) % 8];
};

const CurrentLocation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const place = params.get('place');
  const show = params.get('show');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async() => {
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/weather?city=${place}`);
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Location not found: ${msg}`);
        }
        const data = await res.json();
        setWeather(data);
        console.log('Received weather data:', data);
      } catch(err) {
        console.error('Unable to fetch weather for current location:', err);
        setError(`No weather data could be found for that location`);
      }
    };
    if (place) fetchWeather();
  }, [place]);

  if (error) {
    return (
      <div className="p-4 text-red-300">
        <p className="text-lg font-semibold">⚠️ {error}</p>
      </div>
    )
  }

  if (!weather) return <p className="text-stone-200 p-4">loading weather ...</p>;

  return (
    <div className="bg-weather-teal-offset text-stone-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-2">Today's forecast for {weather.city}</h2>
      <DisplayDate />
      <div className="mt-4 space-y-2">
        <p>Current temperature: {Math.floor(weather.temperature)}°C</p>
        <p>Humidity: {weather.humidity ?? '--'}%</p>
        <p>Rainfall (last 3 hours): {weather.rainfall ?? '0'}mm</p>
        <p>Wind:         
          <span className="ml-1 text-sm">{getCompassDirection(weather.wind_dir) ?? '--'}</span>
          {' '}
          <span>{weather.wind_kph ? `${Math.floor(weather.wind_kph)} km/h` : '--'} </span>
        </p>
      </div>
 
      <div className="mt-8">
        {show === 'charts' && <Charts />}
        {show === 'fivedays' && <FiveDays />}
      </div>
    </div>
  )
}

export default CurrentLocation;