import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { WeatherIcon } from '../components/weather/WeatherIcons.jsx';

const FiveDays = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const place = params.get('place') || 'Brisbane';
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchForecast = async() => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${key}`
        );
        const data = await res.json();
        if (data.cod !== '200') throw new Error(data.message);

        // Group forecast into days
        const grouped = {};
        data.list.forEach(entry => {
          const date = entry.dt_txt.split(' ')[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(entry);
        });

        const daily = Object.entries(grouped).slice(0,5).map(([date,entries]) => {
          const descriptions = entries.map(e => e.weather[0].description);
          const min = Math.min(...entries.map(e => e.main.temp_min));
          const max = Math.max(...entries.map(e => e.main.temp_max));
          const rainChances = entries.map(e => e.pop); // pop = probability of precipitation (0-1)
          const totalRain = entries.reduce((acc,e) => {
            return acc + (e.rain?.['3h'] || 0)
          },0)

          return {
            date: format(new Date(date), 'EEEE, d MMMM'),
            description: descriptions[Math.floor(descriptions.length/2)],
            minTemp: min.toFixed(0),
            maxTemp: max.toFixed(0),
            rainChance: Math.round(Math.max(...rainChances) * 100),
            rainAmount: totalRain.toFixed(1)
          };
        });

        setForecastData(daily);
        setLoading(false);
      } catch(err) {
        console.error('error retrieving the forecast', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (place) fetchForecast();
  }, [place]);

  if (loading) return <p className="text-stone-200 p-4">Loading 5-day forecast ...</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error} </p>;

  return (
    <div className="bg-stone-800 text-stone-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">5 day forecast for {place}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-5 gap-4'>
        {forecastData.map((day,index) => {
          return (
            <div key={index} className="bg-stone-600 text-stone-200 text-center rounded py-4 shadow">   
              <p className="font-semibold mt-2">{day.date}</p>
              <p className="flex flex-col items-center mt-2"> 
                <WeatherIcon type={day.description} />
                <span className="text-sm">{day.description}</span>
              </p>
              <p className="text-lg">
                <span className="font-bold">{day.minTemp}</span> -{' '}
                <span className="font-bold">{day.maxTemp}°C</span>
              </p>
              <p className="text-sm mt-1">Chance of rain: {day.rainChance}%</p>
              <p className="text-sm">Amount of rain: {Math.floor(day.rainAmount)}mm</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FiveDays;