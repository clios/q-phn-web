import * as Address from '../address/getAddress'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import Cleave from 'cleave.js/react'
import { Close20 } from '@carbon/icons-react'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import FormUtils from '../utils/FormUtils'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import axios from 'axios'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

function FamilyCreate() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE: INTERVIEW
  const [recorded_at, setRecordedAt] = React.useState('')

  // INPUT STATE: FAMILY PROFILE
  const [name_of_head, setNameOfHead] = React.useState('')
  const [total_members, setTotalMembers] = React.useState('')
  const [total_children, setTotalChildren] = React.useState('')

  // INPUT STATE: ADDRESS
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')

  // INPUT STATE: 1. FAMILY PLANNING METHOD
  const [pills, setPills] = React.useState(false)
  const [condom, setCondom] = React.useState(false)
  const [intrauterine_device, setIntrauterineDevice] = React.useState(false)
  const [dmpa_injection, setDmpaInjection] = React.useState(false)
  const [vasectomy, setVasectomy] = React.useState(false)
  const [tubal_ligation, setTubalLigation] = React.useState(false)
  const [basal_body_temperature, setBasalBodyTemperature] = React.useState(false)
  const [cervical_mucus, setCervicalMucus] = React.useState(false)
  const [sympto_thermal, setSymptoThermal] = React.useState(false)
  const [lactation_amenorrhea, setLactationAmenorrhea] = React.useState(false)
  const [standard_days, setStandardDays] = React.useState(false)
  const [two_day, setTwoDay] = React.useState(false)

  // INPUT STATE: 2. TYPE OF HOUSING UNIT OCCUPIED
  const [owned, setOwned] = React.useState(false)
  const [rented, setRented] = React.useState(false)
  const [caretaken, setCaretaken] = React.useState(false)
  const [concrete, setConcrete] = React.useState(false)
  const [wooden, setWooden] = React.useState(false)
  const [makeshift, setMakeshift] = React.useState(false)
  const [single, setSingle] = React.useState(false)
  const [duplex, setDuplex] = React.useState(false)
  const [commercial, setCommercial] = React.useState(false)
  const [apartment, setApartment] = React.useState(false)
  const [improvised, setImprovised] = React.useState(false)

  // INPUT STATE: 3. TYPE OF HOUSE LIGHT
  const [electricity, setElectricity] = React.useState(false)
  const [gas_lamp, setGasLamp] = React.useState(false)

  // INPUT STATE: 4. TYPE OF WATER SUPPLY
  const [tap, setTap] = React.useState(false)
  const [spring, setSpring] = React.useState(false)
  const [dug_well, setDugWell] = React.useState(false)
  const [public_well, setPublicWell] = React.useState(false)
  const [public_faucet, setPublicFaucet] = React.useState(false)

  // INPUT STATE: 5. TYPE OF TOILET
  const [water_sealed_exclusive, setWaterSealedExclusive] = React.useState(false)
  const [water_sealed_shared, setWaterSealedShared] = React.useState(false)
  const [closed_pit, setClosedPit] = React.useState(false)
  const [opened_pit, setOpenedPit] = React.useState(false)

  // INPUT STATE: 6. TYPE OF GARBAGE DISPOSAL
  const [collecting, setCollecting] = React.useState(false)
  const [segregating, setSegregating] = React.useState(false)
  const [composting, setComposting] = React.useState(false)
  const [burning, setBurning] = React.useState(false)
  const [burying, setBurying] = React.useState(false)

  // INPUT STATE: 7. COMMUNICATION FACILITY
  const [radio, setRadio] = React.useState(false)
  const [two_way_radio, setTwoWayRadio] = React.useState(false)
  const [cable_television, setCableTelevision] = React.useState(false)
  const [antenna_television, setAntennaTelevision] = React.useState(false)
  const [mobile_phone, setMobilePhone] = React.useState(false)
  const [landline_phone, setLandlinePhone] = React.useState(false)

  // INPUT STATE: 8. TRANSPORTATION FACILITY
  const [bicycle, setBicycle] = React.useState(false)
  const [motorcycle, setMotorcycle] = React.useState(false)
  const [tricycle, setTricycle] = React.useState(false)
  const [kuliglig, setKuliglig] = React.useState(false)
  const [jeepney, setJeepney] = React.useState(false)
  const [car, setCar] = React.useState(false)
  const [truck, setTruck] = React.useState(false)
  const [van, setVan] = React.useState(false)

  // INPUT STATE: 9. AGRICULTURAL PRODUCTS
  const [rice, setRice] = React.useState(false)
  const [corn, setCorn] = React.useState(false)
  const [banana, setBanana] = React.useState(false)
  const [taro, setTaro] = React.useState(false)
  const [cassava, setCassava] = React.useState(false)

  // INPUT STATE: 10. POULTRY (# OF HEADS)
  const [poultry_chicken, setPoultryChicken] = React.useState('')
  const [poultry_duck, setPoultryDuck] = React.useState('')
  const [poultry_geese, setPoultryGeese] = React.useState('')
  const [poultry_turkey, setPoultryTurkey] = React.useState('')

  // INPUT STATE: 11. LIVESTOCK (# OF HEADS)
  const [livestock_pig, setLivestockPig] = React.useState('')
  const [livestock_goat, setLivestockGoat] = React.useState('')
  const [livestock_sheep, setLivestockSheep] = React.useState('')
  const [livestock_cow, setLivestockCow] = React.useState('')
  const [livestock_carabao, setLivestockCarabao] = React.useState('')
  const [livestock_horse, setLivestockHorse] = React.useState('')

  // INPUT STATE: 12. OTHER SOURCE OF INCOME
  const [sari_sari_store, setSariSariStore] = React.useState(false)
  const [restaurant, setRestaurant] = React.useState(false)
  const [bakeshop, setBakeshop] = React.useState(false)

  // INPUT STATE: 13. FISH POND OWNED
  const [fishpond_area, setFishpondArea] = React.useState('')

  // INPUT STATE: 14. LAND (OWNED)
  const [owned_rice_field_area, setOwnedRiceFieldArea] = React.useState('')
  const [owned_corn_field_area, setOwnedCornFieldArea] = React.useState('')

  // INPUT STATE: 15. LAND (LEASE/TENANT/CARETAKER)
  const [lease, setLease] = React.useState(false)
  const [tenant, setTenant] = React.useState(false)
  const [caretaker, setCaretaker] = React.useState(false)
  const [unowned_rice_field_area, setUnownedRiceFieldArea] = React.useState('')
  const [unowned_corn_field_area, setUnownedCornFieldArea] = React.useState('')

  // INPUT STATE: 16. MONTHLY AVERAGE FAMILY INCOME
  const [monthly_average_income, setMonthlyAverageIncome] = React.useState('')

  // SEND POST FAMILY REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/families'
    const DATA = {
      recorded_at: FormUtils.dateAndNullable(recorded_at),
      name_of_head: name_of_head?.toUpperCase(),
      total_members: FormUtils.number(total_members),
      total_children: FormUtils.number(total_children),
      address_province: 'QUIRINO',
      address_municipal: address_municipal,
      address_barangay: address_barangay,
      address_purok: FormUtils.emptyStringIsNull(address_purok),
      address_street: FormUtils.emptyStringIsNull(address_street),
      address_latitude: FormUtils.zeroIsNull(address_latitude),
      address_longitude: FormUtils.zeroIsNull(address_longitude),
      planning_methods: [
        pills && 'pills',
        condom && 'condom',
        intrauterine_device && 'intrauterine device',
        dmpa_injection && 'dmpa injection',
        vasectomy && 'vasectomy',
        tubal_ligation && 'tubal ligation',
        basal_body_temperature && 'basal body temperature',
        cervical_mucus && 'cervical mucus',
        sympto_thermal && 'sympto-thermal',
        lactation_amenorrhea && 'lactation amenorrhea',
        standard_days && 'standard days',
        two_day && 'two-day'
      ].filter(Boolean),
      house_units: [
        owned && 'owned',
        rented && 'rented',
        caretaken && 'caretaken',
        concrete && 'concrete',
        wooden && 'wooden',
        makeshift && 'makeshift',
        single && 'single',
        duplex && 'duplex',
        commercial && 'commercial',
        apartment && 'apartment',
        improvised && 'improvised'
      ].filter(Boolean),
      house_lights: [electricity && 'electricity', gas_lamp && 'gas lamp'].filter(Boolean),
      water_supplies: [
        tap && 'tap',
        spring && 'spring',
        dug_well && 'dug well',
        public_well && 'public well',
        public_faucet && 'public faucet'
      ].filter(Boolean),
      toilets: [
        water_sealed_exclusive && 'water-sealed exclusive',
        water_sealed_shared && 'water-sealed shared',
        closed_pit && 'closed pit',
        opened_pit && 'opened pit'
      ].filter(Boolean),
      garbage_disposals: [
        collecting && 'collecting',
        segregating && 'segregating',
        composting && 'composting',
        burning && 'burning',
        burying && 'burying'
      ].filter(Boolean),
      communication_facilities: [
        two_way_radio && 'two-way radio',
        radio && 'radio',
        cable_television && 'cable television',
        antenna_television && 'antenna television',
        mobile_phone && 'mobile phone',
        landline_phone && 'landline phone'
      ].filter(Boolean),
      transportation_facilities: [
        bicycle && 'bicycle',
        motorcycle && 'motorcycle',
        tricycle && 'tricycle',
        kuliglig && 'kuliglig',
        jeepney && 'jeepney',
        car && 'car',
        truck && 'truck',
        van && 'van'
      ].filter(Boolean),
      agricultural_products: [rice && 'rice', corn && 'corn', banana && 'banana', taro && 'taro', cassava && 'cassava'].filter(Boolean),
      poultry_chicken: FormUtils.number(poultry_chicken),
      poultry_duck: FormUtils.number(poultry_duck),
      poultry_geese: FormUtils.number(poultry_geese),
      poultry_turkey: FormUtils.number(poultry_turkey),
      livestock_pig: FormUtils.number(livestock_pig),
      livestock_goat: FormUtils.number(livestock_goat),
      livestock_sheep: FormUtils.number(livestock_sheep),
      livestock_cow: FormUtils.number(livestock_cow),
      livestock_carabao: FormUtils.number(livestock_carabao),
      livestock_horse: FormUtils.number(livestock_horse),
      other_livelihoods: [sari_sari_store && 'sari-sari store', restaurant && 'restaurant', bakeshop && 'bakeshop'].filter(Boolean),
      fishpond_area: FormUtils.number(fishpond_area),
      owned_rice_field_area: FormUtils.number(owned_rice_field_area),
      owned_corn_field_area: FormUtils.number(owned_corn_field_area),
      unowned_rice_field_area: FormUtils.number(unowned_rice_field_area),
      unowned_corn_field_area: FormUtils.number(unowned_corn_field_area),
      unowned_lands: [lease && 'lease', tenant && 'tenant', caretaker && 'caretaker'].filter(Boolean),
      monthly_average_income: FormUtils.emptyStringIsNull(monthly_average_income)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .post(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Added a new family record') // SUCCESSFUL OPERATION
          navigate('/families/' + response.data.id, { replace: true })
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
          title="New Family"
          description="Create a new family record. For unknown answers, please leave it blank. For date visited, January to June will be considered as first visit and July to December as second visit."
        />
        <SectionHeader title="Interview">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.recorded_at} label="Date Visited" status={status}>
            <Input onChange={(e) => setRecordedAt(e.target.value)} size={35} type="date" value={recorded_at} />
          </Field>
        </FormRow>
        <SectionHeader title="Family Profile" />
        <FormRow>
          <Field error={helper.name_of_head} label="Family Head Name" status={status}>
            <Input className="uppercase" onChange={(e) => setNameOfHead(e.target.value)} required size={35} type="text" value={name_of_head} />
          </Field>
          <Field error={helper.total_members} label="Total Members" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setTotalMembers(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 2, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              value={total_members}
            />
          </Field>
          <Field error={helper.total_children} label="Total Children" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setTotalChildren(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 2, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              value={total_children}
            />
          </Field>
        </FormRow>
        <SectionHeader title="Address" />
        <FormRow>
          {ACCOUNT.vicinity_municipal === '' && (
            <Field error={helper.address_municipal} label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setAddressBarangay('')
                  setAddressMunicipal(e.target.value)
                }}
                value={address_municipal}>
                <option value=""></option>
                {Address.getMunicipalityList('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {ACCOUNT.vicinity_barangay === '' && (
            <Field error={helper.address_barangay} label="Barangay" status={status}>
              <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                <option value=""></option>
                {Address.getBarangayList('02', 'QUIRINO', address_municipal).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field error={helper.address_purok} label="Purok" status={status}>
            <Input className="uppercase" onChange={(e) => setAddressPurok(e.target.value)} size={5} type="text" value={address_purok} />
          </Field>
          <Field error={helper.address_street} label="Street" status={status}>
            <Input className="uppercase" onChange={(e) => setAddressStreet(e.target.value)} size={20} type="text" value={address_street} />
          </Field>
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
        <SectionHeader error={helper.planning_methods} title="1. Family Planning Method" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setPills(e.target.checked)} checked={pills} text="Pills" />
          <Checkbox onChange={(e) => setCondom(e.target.checked)} checked={condom} text="Condom" />
          <Checkbox onChange={(e) => setIntrauterineDevice(e.target.checked)} checked={intrauterine_device} text="Intrauterine Device" />
          <Checkbox onChange={(e) => setDmpaInjection(e.target.checked)} checked={dmpa_injection} text="DMPA Injection" />
          <Checkbox onChange={(e) => setVasectomy(e.target.checked)} checked={vasectomy} text="Vasectomy" />
          <Checkbox onChange={(e) => setTubalLigation(e.target.checked)} checked={tubal_ligation} text="Tubal Ligation" />
          <Checkbox onChange={(e) => setBasalBodyTemperature(e.target.checked)} checked={basal_body_temperature} text="Basal Body Temperature" />
          <Checkbox onChange={(e) => setCervicalMucus(e.target.checked)} checked={cervical_mucus} text="Cervical Mucus or Billing Method" />
          <Checkbox onChange={(e) => setSymptoThermal(e.target.checked)} checked={sympto_thermal} text="Sympho-Thermal Method" />
          <Checkbox onChange={(e) => setLactationAmenorrhea(e.target.checked)} checked={lactation_amenorrhea} text="Lactation Amenorrhea" />
          <Checkbox onChange={(e) => setStandardDays(e.target.checked)} checked={standard_days} text="Standard Days Method" />
          <Checkbox onChange={(e) => setTwoDay(e.target.checked)} checked={two_day} text="Two-Day Method" />
        </FormRow>
        <SectionHeader title="2. Type of Housing Unit Occupied" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setOwned(e.target.checked)} checked={owned} text="Owned" />
          <Checkbox onChange={(e) => setRented(e.target.checked)} checked={rented} text="Rented" />
          <Checkbox onChange={(e) => setCaretaken(e.target.checked)} checked={caretaken} text="Caretaker" />
          <Checkbox onChange={(e) => setConcrete(e.target.checked)} checked={concrete} text="Permanent - Concrete" />
          <Checkbox onChange={(e) => setWooden(e.target.checked)} checked={wooden} text="Temporary - Wooden" />
          <Checkbox onChange={(e) => setMakeshift(e.target.checked)} checked={makeshift} text="Makeshift - cogon/bamboo" />
          <Checkbox onChange={(e) => setSingle(e.target.checked)} checked={single} text="Single" />
          <Checkbox onChange={(e) => setDuplex(e.target.checked)} checked={duplex} text="Duplex" />
          <Checkbox onChange={(e) => setCommercial(e.target.checked)} checked={commercial} text="Commercial/Industrial/Agricultural" />
          <Checkbox onChange={(e) => setApartment(e.target.checked)} checked={apartment} text="Apartment/Accessorial/Condominium" />
          <Checkbox onChange={(e) => setImprovised(e.target.checked)} checked={improvised} text="Improvised Barong-barong" />
        </FormRow>
        <SectionHeader title="3. Type of House Light" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setElectricity(e.target.checked)} checked={electricity} text="Electricity" />
          <Checkbox onChange={(e) => setGasLamp(e.target.checked)} checked={gas_lamp} text="Gas Lamp" />
        </FormRow>
        <SectionHeader title="4. Type of Water Supply" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setTap(e.target.checked)} checked={tap} text="Tap (Inside House)" />
          <Checkbox onChange={(e) => setSpring(e.target.checked)} checked={spring} text="Spring" />
          <Checkbox onChange={(e) => setDugWell(e.target.checked)} checked={dug_well} text="Dug Well" />
          <Checkbox onChange={(e) => setPublicFaucet(e.target.checked)} checked={public_faucet} text="Public Faucet" />
          <Checkbox onChange={(e) => setPublicWell(e.target.checked)} checked={public_well} text="Public Well" />
        </FormRow>
        <SectionHeader title="5. Type of Toilet" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setWaterSealedExclusive(e.target.checked)} checked={water_sealed_exclusive} text="Water-sealed, exclusive" />
          <Checkbox onChange={(e) => setWaterSealedShared(e.target.checked)} checked={water_sealed_shared} text="Water-sealed, shared" />
          <Checkbox onChange={(e) => setClosedPit(e.target.checked)} checked={closed_pit} text="Closed Pit" />
          <Checkbox onChange={(e) => setOpenedPit(e.target.checked)} checked={opened_pit} text="Open Pit" />
        </FormRow>
        <SectionHeader title="6. Type of Garbage Disposal" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setCollecting(e.target.checked)} checked={collecting} text="Picked by Garbage Truck" />
          <Checkbox onChange={(e) => setSegregating(e.target.checked)} checked={segregating} text="Waste Segregation" />
          <Checkbox onChange={(e) => setComposting(e.target.checked)} checked={composting} text="Composting" />
          <Checkbox onChange={(e) => setBurning(e.target.checked)} checked={burning} text="Burning" />
          <Checkbox onChange={(e) => setBurying(e.target.checked)} checked={burying} text="Burying" />
        </FormRow>
        <SectionHeader title="7. Communication Facility" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setCableTelevision(e.target.checked)} checked={cable_television} text="Cable (TV)" />
          <Checkbox onChange={(e) => setAntennaTelevision(e.target.checked)} checked={antenna_television} text="Antenna (TV)" />
          <Checkbox onChange={(e) => setRadio(e.target.checked)} checked={radio} text="Radio" />
          <Checkbox onChange={(e) => setTwoWayRadio(e.target.checked)} checked={two_way_radio} text="Two-way Radio" />
          <Checkbox onChange={(e) => setMobilePhone(e.target.checked)} checked={mobile_phone} text="Mobile Phone" />
          <Checkbox onChange={(e) => setLandlinePhone(e.target.checked)} checked={landline_phone} text="Landline Phone" />
        </FormRow>
        <SectionHeader title="8. Transportation Facility" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setBicycle(e.target.checked)} checked={bicycle} text="Bicycle" />
          <Checkbox onChange={(e) => setMotorcycle(e.target.checked)} checked={motorcycle} text="Motorcycle" />
          <Checkbox onChange={(e) => setTricycle(e.target.checked)} checked={tricycle} text="Tricycle" />
          <Checkbox onChange={(e) => setJeepney(e.target.checked)} checked={jeepney} text="Jeep" />
          <Checkbox onChange={(e) => setCar(e.target.checked)} checked={car} text="Car" />
          <Checkbox onChange={(e) => setTruck(e.target.checked)} checked={truck} text="Truck" />
          <Checkbox onChange={(e) => setVan(e.target.checked)} checked={van} text="Van" />
          <Checkbox onChange={(e) => setKuliglig(e.target.checked)} checked={kuliglig} text="Kuliglig" />
        </FormRow>
        <SectionHeader title="9. Agricultural Products" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setRice(e.target.checked)} checked={rice} text="Rice" />
          <Checkbox onChange={(e) => setCorn(e.target.checked)} checked={corn} text="Corn" />
          <Checkbox onChange={(e) => setBanana(e.target.checked)} checked={banana} text="Banana" />
          <Checkbox onChange={(e) => setTaro(e.target.checked)} checked={taro} text="Taro/Gabi" />
          <Checkbox onChange={(e) => setCassava(e.target.checked)} checked={cassava} text="Cassava" />
        </FormRow>
        <SectionHeader title="10. Poultry (# of Heads)" />
        <FormRow>
          <Field error={helper.poultry_chicken} label="Chicken" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setPoultryChicken(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={poultry_chicken}
            />
          </Field>
          <Field error={helper.poultry_duck} label="Duck" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setPoultryDuck(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={poultry_duck}
            />
          </Field>
          <Field error={helper.poultry_geese} label="Geese" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setPoultryGeese(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={poultry_geese}
            />
          </Field>
          <Field error={helper.poultry_turkey} label="Turkey" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setPoultryTurkey(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={poultry_turkey}
            />
          </Field>
        </FormRow>
        <SectionHeader title="11. Livestock (# of Heads)" />
        <FormRow>
          <Field error={helper.livestock_pig} label="Pig" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockPig(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_pig}
            />
          </Field>
          <Field error={helper.livestock_goat} label="Goat" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockGoat(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_goat}
            />
          </Field>
          <Field error={helper.livestock_sheep} label="Sheep" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockSheep(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_sheep}
            />
          </Field>
          <Field error={helper.livestock_cow} label="Cow" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockCow(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_cow}
            />
          </Field>
          <Field error={helper.livestock_carabao} label="Carabao" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockCarabao(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_carabao}
            />
          </Field>
          <Field error={helper.livestock_horse} label="Horse" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setLivestockHorse(e.target.value)}
              size={7}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={livestock_horse}
            />
          </Field>
        </FormRow>
        <SectionHeader title="12. Other Source of Income" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setSariSariStore(e.target.checked)} checked={sari_sari_store} text="Sari-sari Store" />
          <Checkbox onChange={(e) => setRestaurant(e.target.checked)} checked={restaurant} text="Restaurant" />
          <Checkbox onChange={(e) => setBakeshop(e.target.checked)} checked={bakeshop} text="Bakeshop" />
        </FormRow>
        <SectionHeader title="13. Fish Pond Owned" />
        <FormRow>
          <Field error={helper.fishpond_area} label="Pond Area" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setFishpondArea(e.target.value)}
              size={10}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={fishpond_area}
            />
          </Field>
        </FormRow>
        <SectionHeader title="14. Land (Owned)" />
        <FormRow>
          <Field error={helper.owned_rice_field_area} label="Rice Field Area" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setOwnedRiceFieldArea(e.target.value)}
              size={10}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={owned_rice_field_area}
            />
          </Field>
          <Field error={helper.owned_corn_field_area} label="Corn Field Area" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setOwnedCornFieldArea(e.target.value)}
              size={10}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={owned_corn_field_area}
            />
          </Field>
        </FormRow>
        <SectionHeader title="15. Land (Lease/Tenant/Caretaker)" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setLease(e.target.checked)} checked={lease} text="Lease" />
          <Checkbox onChange={(e) => setTenant(e.target.checked)} checked={tenant} text="Tenant" />
          <Checkbox onChange={(e) => setCaretaker(e.target.checked)} checked={caretaker} text="Caretaker" />
        </FormRow>
        <FormRow>
          <Field error={helper.unowned_rice_field_area} label="Rice Field Area" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setUnownedRiceFieldArea(e.target.value)}
              size={10}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={unowned_rice_field_area}
            />
          </Field>
          <Field error={helper.unowned_corn_field_area} label="Corn Field Area" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setUnownedCornFieldArea(e.target.value)}
              size={10}
              options={{
                numeral: true,
                numeralIntegerScale: 7,
                numeralDecimalScale: 0,
                numeralPositiveOnly: true
              }}
              value={unowned_corn_field_area}
            />
          </Field>
        </FormRow>
        <SectionHeader title="16. Monthly Average Family Income" />
        <FormRow>
          <Field error={helper.monthly_average_income} label="Philippine Peso" status={status}>
            <Select onChange={(e) => setMonthlyAverageIncome(e.target.value)} value={monthly_average_income}>
              <option value="">NO ANSWER</option>
              <option value="below 5000">BELOW 5,000</option>
              <option value="5000 to 9999">5,000 - 9,999</option>
              <option value="10000 to 29999">10,000 - 29,999</option>
              <option value="30000 to 69999">30,000 - 69,999</option>
              <option value="70000 and above">70,000 AND ABOVE</option>
            </Select>
          </Field>
        </FormRow>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Creating..."
            onClick={submitForm}
            status={status}
            title="Create new family record"
            type="submit">
            Create
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default FamilyCreate
