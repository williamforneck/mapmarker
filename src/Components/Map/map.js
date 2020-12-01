import React from 'react'

import {
  GoogleMap,
  useLoadScript
} from '@react-google-maps/api'


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
  disableDefaultUI: true,
  zoomControl: true
}

export default function App () {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: fromBase64('QUl6YVN5QkZhMGUzV2l2SnBJRGRsRjFGLW9lYXBkZ20wdGF4ejdF'),
    libraries
  })

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
      </GoogleMap>
    </div>
  )
}
