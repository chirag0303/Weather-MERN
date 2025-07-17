import WindyRadar from '../components/shared/FormElements/WindyRadar.jsx';
import WeatherMapStack  from '../components/shared/util/WeatherMapStack.jsx';

const Charts = () => {

  return (
    <div className="bg-weather-teal text-stone-200 mb-4">
      <p className="text-2xl">Weather Charts</p>
      <div>
        <h2>Brisbane Radar</h2>
        <div className="border rounded-md shadow-lg overflow-hidden">
        <WindyRadar />
        </div>
      </div>

      <div>
        <h2>Brisbane satellite view</h2>
        <WeatherMapStack  />
        {/* <div className="border rounded-md shadow-lg overflow-hidden">
          <iframe className="w-full h-[500px] rounded-md"
            title="Australian satellite viewer"
            src="https://www.bom.gov.au/australia/satellite/"
            width="100%"
            height="500"
            alt="Brisbane satellite"
          />
        </div> */}
      </div>
    </div>
  )
}

export default Charts;