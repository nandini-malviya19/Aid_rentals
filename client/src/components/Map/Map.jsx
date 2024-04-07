import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker';

const Map = ({address, city, zip}) => {
    const country= "India";
  return (
    <MapContainer
    center={[47.2654296, 11.3927685]}
    zoom={1}
    scrollWheelZoom={false}
    style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
       
    }}
    >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <GeoCoderMarker address={address} city={city} country={country} />
    </MapContainer>
  )
}

export default Map