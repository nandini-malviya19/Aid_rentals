import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios"


let DefaultIcon = L.icon ({
    iconUrl : icon, 
    shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

const GeoCoderMarker = ({ address, city, country }) => {

    const map = useMap()
    const [position, setPosition] = useState([22.7196, 75.8577])

    useEffect(() => {
        const apiKey = "62263460b345f14c7234e63b38b23e9b";
        const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
      
        axios.get(cityUrl)
          .then(response => {
            const weatherData = response.data;
            if (weatherData && weatherData.length > 0) {
              const lat = weatherData[0].lat;
              const lon = weatherData[0].lon;
              console.log({ lat, lon });
              setPosition([lat, lon]);
              map.flyTo([lat, lon], 11)
            }
          })
          .catch(error => {
            console.error(error);
          });
      }, [city]);
      //test
    

    return (
        <Marker position={position} icon={DefaultIcon}>
            <Popup/>
        </Marker>
    )
}

export default GeoCoderMarker
