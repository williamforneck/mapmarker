import React, { useState, useCallback } from 'react'

import { AiOutlineCloseCircle } from 'react-icons/ai'

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'

import mapStyles from './mapStyles'
import './styles.css'

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

  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [tempMarkers, setTempMarkers] = useState({})
  const [namePlace, setNamePlace] = useState(null)

  const onMapClick = useCallback(evt => {
    const form = window.document.getElementById('formNamePlace').style
    const backForm = window.document.getElementById('backForm').style
    form.top = '100px'
    backForm.zIndex = '10'
    backForm.opacity = '1'

    setTempMarkers(
      {
        name: '',
        lat: evt.latLng.lat(),
        lng: evt.latLng.lng()
      }
    )
  }, [])

  if (loadError) return 'Erro ao carregar o mapa'
  if (!isLoaded) return 'Carregando mapa'

  const saveName = () => {
    setMarkers(old => [
      ...old,
      {
        name: namePlace,
        lat: tempMarkers.lat,
        lng: tempMarkers.lng
      }
    ])

    const form = window.document.getElementById('formNamePlace').style
    const backForm = window.document.getElementById('backForm').style
    form.top = '-200px'
    backForm.zIndex = '-10'
    backForm.opacity = '0'

    setNamePlace('')
  }
  return (
    <div>
      <div id='backForm'>
        <section id='formNamePlace'>
          <AiOutlineCloseCircle
            className='closeIcon'
            onClick={() => {
              const form = window.document.getElementById('formNamePlace').style
              const backForm = window.document.getElementById('backForm').style
              form.top = '-200px'
              backForm.zIndex = '-10'
              backForm.opacity = '0'
            }}
          />

          <p>Nome do local:</p>
          <input
            type='text' placeholder='Nome do lugar' value={namePlace} onChange={evt => {
              setNamePlace(evt.target.value)
            }}
          />
          <button onClick={saveName}>Adicionar</button>
        </section>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={onMapClick}
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
