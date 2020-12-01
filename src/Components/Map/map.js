import React, { useState } from 'react'

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import mapStyles from './mapStyles'

const fromBase64 = value => {
  const buff = new Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

const libraries = ['places']

const containerStyle = {
  width: '100%',
  height: '100vh'
}

const center = {
  lat: -29.681950499303028,
  lng: -51.46791019420852
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function App () {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: fromBase64('QUl6YVN5QkZhMGUzV2l2SnBJRGRsRjFGLW9lYXBkZ20wdGF4ejdF'),
    libraries
  })

  const [markers, setMarkers] = useState([
    center
  ])
  const [selectedMarker, setSelectedMarker] = useState(null)

  if (loadError) return 'Erro ao carregar o mapa'
  if (!isLoaded) return 'Carregando mapa'
  
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={center}
        options={options}
      >
        {markers.map((item, index) => {
          return (
            <Marker
              key={index + `${item.lat}`}
              position={{ lat: item.lat, lng: item.lng }}
              onClick={() => {
                setSelectedMarker(item)
              }}
            />
          )
        })}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null)
            }}
          >
            <div>
              {!selectedMarker.name && <h2>Nenhum nome definido.</h2>}
              {selectedMarker.name && <h2>{selectedMarker.name}</h2>}
              <p>Latidude: {selectedMarker.lat}</p>
              <p>Longitude: {selectedMarker.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
