import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Cleave from 'cleave.js/react'
import { Close20 } from '@carbon/icons-react'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import FormUtils from '../utils/FormUtils'
import L from 'leaflet'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import axios from 'axios'
import swrFamily from '../swr/swrFamily'
import { toast } from 'react-toastify'

// CUSTOM MAP ICON
const FAMILY_ICON = L.icon({
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
  iconSize: [30, 30],
  shadowSize: [30, 30],
  iconAnchor: [15, 15],
  shadowAnchor: [15, 15],
  popupAnchor: [1, 1]
})

// MAP TILE LAYER URL TEMPLATE
const MAP_TILE_LAYER_URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

// MAP TILE LAYER OPTIONS
const MAP_TILE_LAYER_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
    'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/satellite-streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: process.env.MAPBOX_ACCESS_TOKEN
}

// DEFAULT VIEW LOCATION AND ZOOM LEVEL
const DEFAULT_VIEW_LOCATION = [16.523711, 121.516725]
const DEFAULT_ZOOM_LEVEL = 10

function FamilyUpdateLocation() {
  // SEND GET FAMILY REQUEST
  const ROUTE = useParams()
  const F = swrFamily(ROUTE.family_id)

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})
  const [map, setMap] = React.useState(null)

  // INPUT STATE: ADDRESS
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')

  // ON RENDER CREATE MAP
  React.useEffect(() => {
    setMap(L.map('map').setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL))
  }, [])

  // ON CHANGE OF MAP AND LOCATION
  React.useEffect(() => {
    if (map) {
      let marker = L.marker()
      let latitude = F.data?.address_latitude
      let longitude = F.data?.address_longitude
      L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)

      if (latitude && longitude) {
        marker.setLatLng({ lat: latitude, lng: longitude }).setIcon(FAMILY_ICON).addTo(map)
        map.setView([latitude, longitude], 18)
      }

      function onMapClick(e) {
        marker.setLatLng(e.latlng).setIcon(FAMILY_ICON).addTo(map)
        setAddressLatitude(e.latlng.lat)
        setAddressLongitude(e.latlng.lng)
      }

      map.on('click', onMapClick)
    }
  }, [map, F.data?.address_latitude, F.data?.address_longitude])

  // ON FETCH FAMILY
  React.useEffect(() => {
    if (F.loading) setStatus('loading')
    if (F.error) setStatus('error')

    if (F.data) {
      setStatus('success')
      setAddressLatitude(FormUtils.valOrEmpty(F.data.address_latitude))
      setAddressLongitude(FormUtils.valOrEmpty(F.data.address_longitude))
    }

    return () => setStatus('loading')
  }, [F.loading, F.error, F.data])

  // SEND PATCH FAMILY REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/families/' + ROUTE.family_id
    const DATA = {
      address_latitude: FormUtils.zeroIsNull(address_latitude),
      address_longitude: FormUtils.zeroIsNull(address_longitude)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Family location updated successfully') // SUCCESSFUL OPERATION
          navigate(-1, { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data) // FORM INPUT IS INVALID
            toast.error('Form input is invalid')
          } else if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 404) {
            toast.error('User was not found') // USER WAS NOT FOUND
          } else if (error.response?.status === 500) {
            toast.error('Unexpected server error') // UNEXPECTED SERVER ERROR
          }
        } else if (error.request) {
          console.error(error.request)
        } else {
          console.error('Error', error.message)
        }
      })
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="write_family">
      <Form status={status}>
        <PageTitle
          title="Edit Family Location"
          description="Click to choose new family address location. To unset location, clear latitude and longitude field."
        />
        <SectionHeader title="Location">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.address_latitude} label="Latitude" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setAddressLatitude(e.target.value)}
              size={20}
              type="text"
              options={{
                numeral: true,
                numeralIntegerScale: 3,
                numeralDecimalScale: 15,
                numeralThousandsGroupStyle: 'none'
              }}
              value={address_latitude}
            />
          </Field>
          <Field error={helper.address_longitude} label="Longitude" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setAddressLongitude(e.target.value)}
              size={20}
              type="text"
              options={{
                numeral: true,
                numeralIntegerScale: 3,
                numeralDecimalScale: 15,
                numeralThousandsGroupStyle: 'none'
              }}
              value={address_longitude}
            />
          </Field>
        </FormRow>
        <SectionBody>
          <div id="map" className="map-container-family-update" />
        </SectionBody>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Updating..."
            onClick={submitForm}
            status={status}
            title="Update family location"
            type="submit">
            Update
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default FamilyUpdateLocation
