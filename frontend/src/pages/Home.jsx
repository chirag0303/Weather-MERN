import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Charts from './Charts';
import FiveDays from './FiveDays';

const Home = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cities = ['Brisbane','Sydney','Melbourne','Hobart','Adelaide','Perth','Darwin'];
  const [weatherData, setWeatherData] = useState({});
  const showCharts = params.get('show') === 'charts';
  const showFiveDays = params.get('show') === 'fivedays';

  useEffect(() => {
    const fetchWeather = async() => {
      const updated = {};
      for (const city of cities) {
        try {
          const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
          const data = await res.json();
          updated[city] = {
            temp: data.temperature,
            condition: data.condition,
            icon: data.icon
          }
        } catch(err) {
          console.error(`Error fetching weather for ${city}:`, err);
          updated[city] = null;
        }
      }
      setWeatherData(updated);
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-weather-teal text-stone-200 mx-4 mb-4">
      <h1 className="text-2xl mb-2">Current temperatures</h1>
      <hr className="w-50"/>
      <div>
        <ul className="mt-1 space-y-2">
          {cities.map((city) => (
            <li key={city} className="grid grid-cols-4 items-center gap-0">
              <span className="text-xl">{city}</span>
              {weatherData[city] ? (
                <>
                  <span>{Math.floor(weatherData[city].temp)}° C</span>
                  <img 
                    src={weatherData[city].icon}
                    alt={weatherData[city].condition}
                    className="inline w-12 h-12"
                  />
                  <span className="text-lg">{weatherData[city].condition}</span>
                </>
              ) : (
                <span className="col-span-3">loading ...</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      {showCharts && (
        <div className="mt-4">
          <Charts />
        </div>
      )}
      {showFiveDays && (
        <div className="mt-4">
          <FiveDays />
        </div>
      )}

    </div>
  )
}

export default Home;