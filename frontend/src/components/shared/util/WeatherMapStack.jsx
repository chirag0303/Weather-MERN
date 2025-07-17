import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RainViewerLayer from './RainViewerLayer';
import './WeatherMapStack.css';

// const { BaseLayer, Overlay } = LayersControl;
const MapInitializer = ({ setMap }) => {
  const map = useMap();
  useEffect(() => {
    setMap(map);
  }, [map]);
  return null;
}

const WeatherMapStack = () => {
  const key = import.meta.env.WEATHER_API_KEY;
  const [timestamp, setTimestamp] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    const fetchTimestamps = async() => {
      try {
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await res.json();
        const lastValidTimestamp = data.radar?.past?.slice(-1)[0]?.time;
        if (lastValidTimestamp) setTimestamp(lastValidTimestamp);
      } catch (err) {
        console.log('Failed to fetch Rainviewer timestamps', err);
      }
    };
    fetchTimestamps();
  },[]);

  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden shadow-lg border border-gray-300 mt-8">
      <MapContainer
        center={[-28.04, 153.01]}
        // center={[-12.46,130.84]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapInitializer setMap={setMapInstance} />

        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="@OpenStreetMap contributors"
          zIndex={1}
        />
        
        {/* OpenWeatherMap Cloud coverager layer */}
        {key && (
          <TileLayer 
            url={`https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${key}`}
            attribution="Clouds@OpenWeatherMap"
            opacity={0.7}
            zIndex={900}
            className="leaflet-clouds"
          />
        )}

        {/* Radar Cloud Layer */}
        {timestamp && <RainViewerLayer map={mapInstance} timestamp={timestamp} />}

        {/* <LayersControl position="topright">
          <BaseLayer checked name="Satellite">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles@Esri Source: Esri, Earthstar Geographics"
              zindex={0}
            />
          </BaseLayer>
        
          <Overlay checked name="Radar">
            <TileLayer 
              url="https://tilecache.rainviewer.com/v2/radar/now/256/{z}/{x}/{y}/6/1_1.png"
              attribution="Radar data@Rainviewer"
              opacity={0.6}
              zIndex={998}
            />
          </Overlay>

          <Overlay name="Clouds">
            <TileLayer 
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${key}`}
              attribution="Clouds@OpenWeatherMap"
              className="leaflet-clouds"
              zindex={999}
            />
          </Overlay>
        </LayersControl> */}
      </MapContainer>
    </div>
  )
}

export default WeatherMapStack ;