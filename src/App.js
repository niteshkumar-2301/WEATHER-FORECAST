import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';

function App() {

  const [degrees, setDegrees] = useState(null)
  const [location, setLocation] = useState("")
  const [userLocation, setuserLocation] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [country, setCountry] = useState("")
  const [dataFetched, setDataFetched] = useState(false)

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${userLocation}`);
      const data = res.data;

      setDegrees(data.current.temp_c);
      setLocation(data.location.name);
      setDescription(data.current.condition.text);
      setIcon(data.current.condition.icon);
      setHumidity(data.current.humidity);
      setWind(data.current.wind_kph);
      setCountry(data.location.country);

      setDataFetched(true);
    } catch (err) {
      console.log(err);
      alert("Please enter a valid location");
    }
  }

  const defaultDataFetched = async () => {
    if (!dataFetched) {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Delhi`);
      const data = res.data;

      setDegrees(data.current.temp_c);
      setLocation(data.location.name);
      setDescription(data.current.condition.text);
      setIcon(data.current.condition.icon);
      setHumidity(data.current.humidity);
      setWind(data.current.wind_kph);
      setCountry(data.location.country);
    }
  }

  useEffect(() => {
    defaultDataFetched();
  }, [defaultDataFetched]);

  return (
    <div className="App">
      <div className='weather'>
        <Input 
          text={(e) => setuserLocation(e.target.value)}
          submit={fetchData}
          func={fetchData}
        />

        <div className='weather_display'>
          <h3 className='weather_location'>Weather in {location}</h3>

          <div>
            <h1 className='weather_degrees'>{degrees} °C</h1>
          </div>

          <div className='weather_description'>
            <div>
              <div className='weather_description_head'>
                <span className='weather_icon'>
                  <img src={icon} alt="weather icon" />
                </span>
                <h3>{description}</h3>
              </div>

              <h3>Humidity: {humidity}%</h3>
              <h3>Wind speed: {wind} km/h</h3>
            </div>

            <div className='weather_country'>
              <h3>{country}</h3>
              <h2 className='weather_date'>{new Date().toLocaleString()}</h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
