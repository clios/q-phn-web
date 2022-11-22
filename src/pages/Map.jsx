import 'leaflet-easyprint'
import 'leaflet.bigimage'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import * as Address from '../address/getAddress'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import DashboardToolbar from '../components/DashboardToolbar'
import Field from '../components/Field'
import Input from '../components/Input'
import L from 'leaflet'
import PageTitle from '../components/PageTitle'
import React from 'react'
import Select from '../components/Select'
import { mutate } from 'swr'
import { navigate } from '@reach/router'
import swrCensusesFamilies from '../swr/swrCensusesFamilies'
import swrLocationsFamilies from '../swr/swrLocationsFamilies'

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

// PRINT SETTINGS
const PRINT_SETTINGS = {
  exportOnly: true,
  filename: 'Q-PHN Map',
  position: 'topleft',
  sizeModes: ['A4Portrait', 'A4Landscape'],
  tilWait: 1000,
  title: 'Print Map'
}

function Map() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [map, setMap] = React.useState(null)
  const [locations, setLocations] = React.useState([])

  // INPUT STATE
  const [censuses, setCensuses] = React.useState([])
  const [census_year, setCensusYear] = React.useState(new Date().getFullYear())
  const [census_visit, setCensusVisit] = React.useState(1)
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [params, setParams] = React.useState({ census_year, census_visit, address_municipal, address_barangay, address_purok, address_street })
  const CF = swrCensusesFamilies()
  const LF = swrLocationsFamilies(params)

  // ON RENDER CREATE MAP
  React.useEffect(() => {
    setMap(L.map('map', { scrollWheelZoom: true }).setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL))
    mutate('censuses/families')
  }, [])

  // ON MAP CREATION, SET MAP TILE LAYER
  React.useEffect(() => {
    map && L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)
    map && L.easyPrint(PRINT_SETTINGS).addTo(map)
    map && L.control.BigImage().addTo(map)
    setStatus('success')
  }, [map])

  // ON FETCH DASHBOARD FAMILIES
  React.useEffect(() => {
    if (CF.loading) setStatus('loading')
    if (CF.error) setStatus('error')

    if (CF.data) {
      setStatus('success')
      setCensuses(CF.data)
      setCensusYear(CF.data?.[0]?.year)
      setCensusVisit(CF.data?.[0]?.visit)
    }

    return () => setStatus('loading')
  }, [CF.loading, CF.error, CF.data])

  // ON FETCH DASHBOARD FAMILIES
  React.useEffect(() => {
    if (LF.loading) setStatus('loading')
    if (LF.error) setStatus('error')

    if (LF.data) {
      setStatus('success')
      setLocations(LF.data)
    }

    return () => setStatus('loading')
  }, [LF.loading, LF.error, LF.data])

  React.useEffect(() => {
    var markers = L.markerClusterGroup()
    if (map && locations) {
      map.eachLayer(function (layer) {
        map.removeLayer(layer)
        L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)
      })

      locations.forEach((loc) => {
        markers.addLayer(
          L.marker({ lat: loc.latitude, lng: loc.longitude })
            .setIcon(FAMILY_ICON)
            .on('click', () => navigate('/families/' + loc.id))
        )
      })
      map.addLayer(markers)
    }
  }, [locations])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [census_year, census_visit, address_municipal, address_barangay])

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (census_year !== '') newParams.census_year = census_year
    if (census_visit !== '') newParams.census_visit = census_visit
    if (address_municipal !== '') newParams.address_municipal = address_municipal
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    setParams(newParams)
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_location">
      <PageTitle title="Map" description="Location of families within Quirino province." />
      <DashboardToolbar>
        {ACCOUNT.vicinity_municipal === '' && (
          <Field label="Municipality" status={status}>
            <Select
              onChange={(e) => {
                setAddressBarangay('')
                setAddressMunicipal(e.target.value)
              }}
              value={address_municipal}>
              <option value="">ALL MUNICIPALS</option>
              {Address.getMunicipalityList('02', 'QUIRINO').map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
        )}
        {ACCOUNT.vicinity_barangay === '' && (
          <Field label="Barangay" status={status}>
            <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
              <option value="">ALL BARANGAYS</option>
              {Address.getBarangayList('02', 'QUIRINO', address_municipal).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="Purok">
          <Input onChange={(e) => setAddressPurok(e.target.value)} size={5} type="text" value={address_purok} />
        </Field>
        <Field label="Street">
          <Input onChange={(e) => setAddressStreet(e.target.value)} size={15} type="text" value={address_street} />
        </Field>
        <Field label="Censuses" status={status}>
          <Select
            onChange={(e) => {
              setCensusYear(e.target.value.substring(0, 4))
              setCensusVisit(e.target.value.substring(5, 6))
            }}
            value={`${census_year} ${census_visit}`}>
            {censuses.map((census, index) => {
              return (
                <option value={`${census.year} ${census.visit}`} key={index}>
                  {census.year} {census.visit == 1 ? 'FIRST VISIT' : 'SECOND VISIT'}
                </option>
              )
            })}
          </Select>
        </Field>
      </DashboardToolbar>

      <div id="map" className="map-container"></div>
    </Authorization>
  )
}

export default Map
