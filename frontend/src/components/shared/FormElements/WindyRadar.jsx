const  WindyRadar = () => {

<div className="border-spacing-0">
  <iframe
    title="Windy radar"
    width="100%"
    height="500"
    src="https://embed.windy.com/embed2.html?lat=-27.4705&lon=153.026&detailLat=-27.4705&detailLon=153.026&width=650&height=500&zoom=8&level=surface&overlay=rain&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
    
    allowFullScreen
 ></iframe>
</div>
}

export default WindyRadar;