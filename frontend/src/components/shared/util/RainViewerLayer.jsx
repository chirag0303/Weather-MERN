import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RainViewerLayer = ({ map, timestamp }) => {
  useEffect(() => {
    if (!map || !timestamp) return;

    const tileLayer = L.tileLayer(
      `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/1_1.png`,
      {
        tileSize: 256,
        opacity: 0.7,
        zIndex: 1000,
        attribution: 'Radardata©RainViewer'
      }
    );

    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map, timestamp]);

  return null;
};

export default RainViewerLayer;