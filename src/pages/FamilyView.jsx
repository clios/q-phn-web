import 'leaflet-easyprint'

import { Close20, Download20, Edit20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import FamilySpreadsheet from '../spreadsheets/FamilySpreedsheet'
import Field from '../components/Field'
import L from 'leaflet'
import PageSubtitle from '../components/PageSubtitle'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import VicinityChecker from '../components/VicinityChecker'
import ViewUtils from '../utils/ViewUtils'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
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

// PRINT SETTINGS
const PRINT_SETTINGS = {
  exportOnly: true,
  filename: 'Q-PHN Map',
  position: 'topleft',
  sizeModes: ['A4Portrait', 'A4Landscape'],
  tilWait: 1000,
  title: 'Print Map'
}

function FamilyView() {
  // SEND GET FAMILY REQUEST
  const ROUTE = useParams()
  const F = swrFamily(ROUTE.family_id)

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [map, setMap] = React.useState(null)

  // ON RENDER, REVALIDATE FAMILY AND CREATE MAP
  React.useEffect(() => {
    F.mutate()
    setMap(L.map('map', { scrollWheelZoom: false }).setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL))
  }, [])

  // ON MAP CREATION, SET MAP TILE LAYER
  React.useEffect(() => {
    map && L.tileLayer(MAP_TILE_LAYER_URL, MAP_TILE_LAYER_OPTIONS).addTo(map)
    map && L.easyPrint(PRINT_SETTINGS).addTo(map)
  }, [map])

  // ON REVALIDATAION OF FAMILY, UPDATE INFORMATION STATE
  React.useEffect(() => {
    if (F.loading) setStatus('loading')
    if (F.error) setStatus('error')
    if (F.data) setStatus('success')
    return () => setStatus('loading')
  }, [F.loading, F.error, F.data])

  // ON CHANGE OF MAP AND LOCATION
  React.useEffect(() => {
    let marker = L.marker()
    let latitude = F.data?.address_latitude
    let longitude = F.data?.address_longitude

    if (map && latitude && longitude) {
      marker.setLatLng({ lat: latitude, lng: longitude }).setIcon(FAMILY_ICON).addTo(map)
      map.setView([latitude, longitude], 18)
    } else if (map && latitude === null && longitude === null) {
      map.setView(DEFAULT_VIEW_LOCATION, DEFAULT_ZOOM_LEVEL)
    }

    return () => marker && marker.remove()
  }, [F])

  // SEND DELETE FAMILY REQUEST
  function deleteFamily() {
    const URL = process.env.BASE_URL + '/families/' + ROUTE.family_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .delete(URL, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 204) {
          toast.success('Family deleted successfully') // SUCCESSFUL OPERATION
          navigate('/families', { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 403) {
            toast.error('Family was not found') // FAMILY WAS NOT FOUND
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

  // DISPLAY DELETE FAMILY ALERT
  function alertDeleteFamily() {
    confirmAlert({
      title: 'Delete Permanently',
      message: 'This family record will be permanently lost and you will not be able to recover it',
      buttons: [{ label: 'Delete', onClick: () => deleteFamily() }, { label: 'Cancel' }]
    })
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_family">
      {status === 'success' && (
        <VicinityChecker
          accountVicinity={ViewUtils.arrayTextCapsOrNotFound([ACCOUNT.vicinity_province, ACCOUNT.vicinity_municipal, ACCOUNT.vicinity_barangay])}
          recordAddress={ViewUtils.arrayTextCapsOrNotFound([F.data?.address_province, F.data?.address_municipal, F.data?.address_barangay])}
        />
      )}
      <PageTitle title="Family" description="Group of two or more persons related by birth, marriage, or adoption who live together." />
      <PageSubtitle status={status}>{F.data?.name_of_head?.toUpperCase()}</PageSubtitle>
      <SectionHeader title="Interview">
        <CSVLink
          filename={`Q-PHN MIS - FAMILY - ${ViewUtils.dateCapsOrNotFound(Date())}.csv`}
          data={[{ ...F.data }] || []}
          headers={FamilySpreadsheet}>
          <ButtonIcon title="Download Family Info">
            <Download20 />
          </ButtonIcon>
        </CSVLink>
        <ButtonIcon
          onClick={() => navigate('/families/' + ROUTE.family_id + '/edit')}
          permission="write_family"
          permissions={ACCOUNT.permissions}
          status={status}
          title="Edit family">
          <Edit20 />
        </ButtonIcon>
        <ButtonIcon status={status} permissions={ACCOUNT.permissions} permission="write_family" onClick={alertDeleteFamily} title="Delete family">
          <TrashCan20 />
        </ButtonIcon>
        <ButtonIcon onClick={() => navigate('/families')} status={status} title="Close">
          <Close20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <Field label="Year" status={status} text={F.data?.census_year} />
        <Field label="Visit No." status={status} text={F.data?.census_visit} />
      </SectionBody>
      <SectionHeader title="Family Profile" />
      <SectionBody>
        <Field label="Total Members" status={status} text={ViewUtils.numOrNotFound(F.data?.total_members)} />
        <Field label="Total Children" status={status} text={ViewUtils.numOrNotFound(F.data?.total_children)} />
      </SectionBody>
      <SectionHeader title="Address" />
      <SectionBody>
        <Field label="Municipality" status={status} text={ViewUtils.valCapsOrNotFound(F.data?.address_municipal)} />
        <Field label="Barangay" status={status} text={ViewUtils.valCapsOrNotFound(F.data?.address_barangay)} />
        <Field label="Purok" status={status} text={ViewUtils.valCapsOrNotFound(F.data?.address_purok)} />
        <Field label="Street" status={status} text={ViewUtils.valCapsOrNotFound(F.data?.address_street)} />
        <Field label="Latitude" status={status} text={ViewUtils.numOrNotFound(F.data?.address_latitude)} />
        <Field label="Longitude" status={status} text={ViewUtils.numOrNotFound(F.data?.address_longitude)} />
      </SectionBody>
      <SectionHeader title="1. Family Planning Method" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.planning_methods)} />
      <SectionHeader title="2. Type of Housing Unit Occupied" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.house_units)} />
      <SectionHeader title="3. Type of House Light" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.house_lights)} />
      <SectionHeader title="4. Type of Water Supply" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.water_supplies)} />
      <SectionHeader title="5. Type of Toilet" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.toilets)} />
      <SectionHeader title="6. Type of Garbage Disposal" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.garbage_disposals)} />
      <SectionHeader title="7. Communication Facility" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.communication_facilities)} />
      <SectionHeader title="8. Transportation Facility" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.transportation_facilities)} />
      <SectionHeader title="9. Agricultural Products" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.agricultural_products)} />
      <SectionHeader title="10. Poultry (# of Heads)" />
      <SectionBody status={status} />
      <SectionBody>
        <Field label="Chicken" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.poultry_chicken)} />
        <Field label="Duck" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.poultry_duck)} />
        <Field label="Geese" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.poultry_geese)} />
        <Field label="Turkey" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.poultry_turkey)} />
      </SectionBody>
      <SectionHeader title="11. Livestock (# of Heads)" />
      <SectionBody>
        <Field label="Pig" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_pig)} />
        <Field label="Goat" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_goat)} />
        <Field label="Sheep" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_sheep)} />
        <Field label="Cow" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_cow)} />
        <Field label="Carabao" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_carabao)} />
        <Field label="Horse" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.livestock_horse)} />
      </SectionBody>
      <SectionHeader title="12. Other Source of Income" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.other_livelihoods)} />
      <SectionHeader title="13. Fish Pond Owned" />
      <SectionBody>
        <Field label="Pond Area" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.fishpond_area)} />
      </SectionBody>
      <SectionHeader title="14. Land (Owned)" />
      <SectionBody>
        <Field label="Rice Field Area" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.owned_rice_field_area)} />
        <Field label="Corn Field Area" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.owned_corn_field_area)} />
      </SectionBody>
      <SectionHeader title="15. Land (Lease/Tenant/Caretaker)" />
      <SectionBody status={status} text={ViewUtils.arrayTextCapsOrNotFound(F.data?.unowned_lands)} />
      <SectionBody>
        <Field label="Rice Field Area" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.unowned_rice_field_area)} />
        <Field label="Corn Field Area" status={status} text={ViewUtils.numCommaOrNotFound(F.data?.unowned_corn_field_area)} />
      </SectionBody>
      <SectionHeader title="16. Monthly Average Family Income" />
      <SectionBody>
        <Field label="Philippine Peso" status={status} text={ViewUtils.valCapsOrNotFound(F.data?.monthly_average_income)} />
      </SectionBody>
      <SectionFooter status={status}>
        Updated by {ViewUtils.valCapsOrNotFound(F.data?.last_updated_by)} | {ViewUtils.dayDateTimeOrNotFound(F.data?.updated_at)}
      </SectionFooter>
      <SectionHeader title={!F.data?.address_latitude && !F.data?.address_longitude ? 'Location Not Found' : 'Family Address Location'}>
        <ButtonIcon
          onClick={() => navigate('/families/' + ROUTE.family_id + '/edit/location')}
          permission="write_family"
          permissions={ACCOUNT.permissions}
          status={status}
          title="Edit location">
          <Edit20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <div id="map" className="map-container-family" />
      </SectionBody>
    </Authorization>
  )
}

export default FamilyView
