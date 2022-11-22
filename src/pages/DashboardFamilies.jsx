import * as Address from '../address/getAddress'

import AccountContext from '../contexts/AccountContext'
import AgriculturalProducts from '../components/AgriculturalProducts'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import CommunicationFacility from '../components/CommunicationFacility'
import DashboardContent from '../components/DashboardContent'
import DashboardItem from '../components/DashboardItem'
import DashboardToolbar from '../components/DashboardToolbar'
import FamilyIncome from '../components/FamilyIncome'
import FamilyPlanningMethod from '../components/FamilyPlanningMethod'
import Field from '../components/Field'
import FishPond from '../components/FishPond'
import GarbageDisposal from '../components/GarbageDisposal'
import HouseLight from '../components/HouseLight'
import HousingUnit from '../components/HousingUnit'
import LandOwned from '../components/LandOwned'
import LandUnowned from '../components/LandUnowned'
import Livestock from '../components/Livestock'
import Poultry from '../components/Poultry'
import React from 'react'
import { Reset20 } from '@carbon/icons-react'
import Select from '../components/Select'
import SourceIncome from '../components/SourceIncome'
import Toilet from '../components/Toilet'
import TotalFamilyProfile from '../components/TotalFamilyProfile'
import TransportationFacility from '../components/TransportationFacility'
import WaterSupply from '../components/WaterSupply'
import { mutate } from 'swr'
import swrCensusesFamilies from '../swr/swrCensusesFamilies'
import swrDashboardFamilies from '../swr/swrDashboardFamilies'
import { toast } from 'react-toastify'

function DashboardFamilies() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')

  // INFORMATION STATE: TOTAL FAMILY PROFILE
  const [total, setTotal] = React.useState(0)
  const [total_small, setTotalSmall] = React.useState(0)
  const [total_large, setTotalLarge] = React.useState(0)
  const [total_three_and_below_children, setTotalThreeAndBelowChildren] = React.useState(0)
  const [total_more_than_three_children, setTotalMoreThanThreeChildren] = React.useState(0)

  // INFORMATION STATE: FAMILY PLANNING METHOD
  const [total_planning_method_pills, setTotalPlanningMethodPills] = React.useState(0)
  const [total_planning_method_condom, setTotalPlanningMethodCondom] = React.useState(0)
  const [total_planning_method_intrauterine_device, setTotalPlanningMethodIntrauterineDevice] = React.useState(0)
  const [total_planning_method_dmpa_injection, setTotalPlanningMethodDmpaInjection] = React.useState(0)
  const [total_planning_method_vasectomy, setTotalPlanningMethodVasectomy] = React.useState(0)
  const [total_planning_method_tubal_ligation, setTotalPlanningMethodTubalLigation] = React.useState(0)
  const [total_planning_method_basal_body_temperature, setTotalPlanningMethodBasalBodyTemperature] = React.useState(0)
  const [total_planning_method_cervical_mucus, setTotalPlanningMethodCervicalMucus] = React.useState(0)
  const [total_planning_method_sympto_thermal, setTotalPlanningMethodSymptoThermal] = React.useState(0)
  const [total_planning_method_lactation_amenorrhea, setTotalPlanningMethodLactationAmenorrhea] = React.useState(0)
  const [total_planning_method_standard_days, setTotalPlanningMethodStandardDays] = React.useState(0)
  const [total_planning_method_two_day, setTotalPlanningMethodTwoDay] = React.useState(0)

  // INFORMATION STATE: HOUSING UNIT
  const [total_house_unit_owned, setTotalHouseUnitOwned] = React.useState(0)
  const [total_house_unit_rented, setTotalHouseUnitRented] = React.useState(0)
  const [total_house_unit_caretaken, setTotalHouseUnitCaretaken] = React.useState(0)
  const [total_house_unit_concrete, setTotalHouseUnitConcrete] = React.useState(0)
  const [total_house_unit_wooden, setTotalHouseUnitWooden] = React.useState(0)
  const [total_house_unit_makeshift, setTotalHouseUnitMakeshift] = React.useState(0)
  const [total_house_unit_single, setTotalHouseUnitSingle] = React.useState(0)
  const [total_house_unit_duplex, setTotalHouseUnitDuplex] = React.useState(0)
  const [total_house_unit_commercial, setTotalHouseUnitCommercial] = React.useState(0)
  const [total_house_unit_apartment, setTotalHouseUnitApartment] = React.useState(0)
  const [total_house_unit_improvised, setTotalHouseUnitImprovised] = React.useState(0)

  // INFORMATION STATE: HOUSE LIGHT
  const [total_house_light_electricity, setTotalHouseLightElectricity] = React.useState(0)
  const [total_house_light_gas_lamp, setTotalHouseLightGasLamp] = React.useState(0)

  // INFORMATION STATE: WATER SUPPLY
  const [total_water_supply_tap, setTotalWaterSupplyTap] = React.useState(0)
  const [total_water_supply_spring, setTotalWaterSupplySpring] = React.useState(0)
  const [total_water_supply_dug_well, setTotalWaterSupplyDugWell] = React.useState(0)
  const [total_water_supply_public_well, setTotalWaterSupplyPublicWell] = React.useState(0)
  const [total_water_supply_public_faucet, setTotalWaterSupplyPublicFaucet] = React.useState(0)

  // INFORMATION STATE: TOILET
  const [total_toilet_water_sealed_exclusive, setTotalToiletWaterSealedExclusive] = React.useState(0)
  const [total_toilet_water_sealed_shared, setTotalToiletWaterSealedShared] = React.useState(0)
  const [total_toilet_closed_pit, setTotalToiletClosedPit] = React.useState(0)
  const [total_toilet_opened_pit, setTotalToiletOpenedPit] = React.useState(0)

  // INFORMATION STATE: GARBAGE DISPOSAL
  const [total_garbage_disposal_collecting, setTotalGarbageDisposalCollecting] = React.useState(0)
  const [total_garbage_disposal_segregating, setTotalGarbageDisposalSegregating] = React.useState(0)
  const [total_garbage_disposal_composting, setTotalGarbageDisposalComposting] = React.useState(0)
  const [total_garbage_disposal_burning, setTotalGarbageDisposalBurning] = React.useState(0)
  const [total_garbage_disposal_burying, setTotalGarbageDisposalBurying] = React.useState(0)

  // INFORMATION STATE: COMMUNICATION FACILITY
  const [total_communication_facility_radio, setTotalCommunicationFacilityRadio] = React.useState(0)
  const [total_communication_facility_two_way_radio, setTotalCommunicationFacilityTwoWayRadio] = React.useState(0)
  const [total_communication_facility_cable_television, setTotalCommunicationFacilityCableTelevision] = React.useState(0)
  const [total_communication_facility_antenna_television, setTotalCommunicationFacilityAntennaTelevision] = React.useState(0)
  const [total_communication_facility_mobile_phone, setTotalCommunicationFacilityMobilePhone] = React.useState(0)
  const [total_communication_facility_landline_phone, setTotalCommunicationFacilityLandlinePhone] = React.useState(0)

  // INFORMATION STATE: TRANSPORTATION FACILITY
  const [total_transportation_facility_bicycle, setTotalTransportationFacilityBicycle] = React.useState(0)
  const [total_transportation_facility_motorcycle, setTotalTransportationFacilityMotorcycle] = React.useState(0)
  const [total_transportation_facility_tricycle, setTotalTransportationFacilityTricycle] = React.useState(0)
  const [total_transportation_facility_kuliglig, setTotalTransportationFacilityKuliglig] = React.useState(0)
  const [total_transportation_facility_jeepney, setTotalTransportationFacilityJeepney] = React.useState(0)
  const [total_transportation_facility_car, setTotalTransportationFacilityCar] = React.useState(0)
  const [total_transportation_facility_truck, setTotalTransportationFacilityTruck] = React.useState(0)
  const [total_transportation_facility_van, setTotalTransportationFacilityVan] = React.useState(0)

  // INFORMATION STATE: AGRICULTURAL PRODUCTS
  const [total_agricultural_product_rice, setTotalAgriculturalProductRice] = React.useState(0)
  const [total_agricultural_product_corn, setTotalAgriculturalProductCorn] = React.useState(0)
  const [total_agricultural_product_banana, setTotalAgriculturalProductBanana] = React.useState(0)
  const [total_agricultural_product_taro, setTotalAgriculturalProductTaro] = React.useState(0)
  const [total_agricultural_product_cassava, setTotalAgriculturalProductCassava] = React.useState(0)

  // INFORMATION STATE: POULTRY
  const [total_poultry_chicken, setTotalPoultryChicken] = React.useState(0)
  const [total_poultry_duck, setTotalPoultryDuck] = React.useState(0)
  const [total_poultry_geese, setTotalPoultryGeese] = React.useState(0)
  const [total_poultry_turkey, setTotalPoultryTurkey] = React.useState(0)

  // INFORMATION STATE: LIVESTOCK
  const [total_livestock_pig, setTotalLivestockPig] = React.useState(0)
  const [total_livestock_goat, setTotalLivestockGoat] = React.useState(0)
  const [total_livestock_sheep, setTotalLivestockSheep] = React.useState(0)
  const [total_livestock_cow, setTotalLivestockCow] = React.useState(0)
  const [total_livestock_carabao, setTotalLivestockCarabao] = React.useState(0)
  const [total_livestock_horse, setTotalLivestockHorse] = React.useState(0)

  // INFORMATION STATE: SOURCE OF INCOME
  const [total_other_livelihood_sari_sari_store, setTotalOtherLivelihoodSariSariStore] = React.useState(0)
  const [total_other_livelihood_restaurant, setTotalOtherLivelihoodRestaurant] = React.useState(0)
  const [total_other_livelihood_bakeshop, setTotalOtherLivelihoodBakeshop] = React.useState(0)

  // INFORMATION STATE:FISH POND AREA
  const [total_fishpond_area, setTotalFishpondArea] = React.useState(0)

  // INFORMATION STATE: LAND OWNED
  const [total_owned_rice_field_area, setTotalOwnedRiceFieldArea] = React.useState(0)
  const [total_owned_corn_field_area, setTotalOwnedCornFieldArea] = React.useState(0)

  // INFORMATION STATE: LAND UNOWNED
  const [total_unowned_rice_field_area, setTotalUnownedRiceFieldArea] = React.useState(0)
  const [total_unowned_corn_field_area, setTotalUnownedCornFieldArea] = React.useState(0)

  // INFORMATION STATE: AVERAGE FAMILY INCOME
  const [total_monthly_average_income_below_5000, setTotalMonthlyAverageIncomeBelow5000] = React.useState(0)
  const [total_monthly_average_income_5000_to_9999, setTotalMonthlyAverageIncome5000To9999] = React.useState(0)
  const [total_monthly_average_income_10000_to_29999, setTotalMonthlyAverageIncome10000To29999] = React.useState(0)
  const [total_monthly_average_income_30000_to_69999, setTotalMonthlyAverageIncome30000To69999] = React.useState(0)
  const [total_monthly_average_income_70000_and_above, setTotalMonthlyAverageIncome70000AndAbove] = React.useState(0)

  // INPUT STATE
  const [censuses, setCensuses] = React.useState([])
  const [census_year, setCensusYear] = React.useState(0)
  const [census_visit, setCensusVisit] = React.useState(0)
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [params, setParams] = React.useState({ census_year, census_visit, address_municipal, address_barangay })
  const DF = swrDashboardFamilies(params)
  const CF = swrCensusesFamilies()

  // ON RENDER REVALIDATE DASHBOARD FAMILIES
  React.useEffect(() => {
    mutate('dashboard/families')
    mutate('censuses/families')
    window.scrollTo(0, 0)
  }, [])

  // ON FETCH DASHBOARD FAMILIES
  React.useEffect(() => {
    if (DF.loading) setStatus('loading')
    if (DF.error) setStatus('error')

    if (DF.data) {
      setStatus('success')

      // INFORMATION STATE: TOTAL FAMILY PROFILE
      setTotal(DF.data?.total)
      setTotalSmall(DF.data?.total_small)
      setTotalLarge(DF.data?.total_large)
      setTotalThreeAndBelowChildren(DF.data?.total_three_and_below_children)
      setTotalMoreThanThreeChildren(DF.data?.total_more_than_three_children)

      // INFORMATION STATE: FAMILY PLANNING METHOD
      setTotalPlanningMethodPills(DF.data?.total_planning_method_pills)
      setTotalPlanningMethodCondom(DF.data?.total_planning_method_condom)
      setTotalPlanningMethodIntrauterineDevice(DF.data?.total_planning_method_intrauterine_device)
      setTotalPlanningMethodDmpaInjection(DF.data?.total_planning_method_dmpa_injection)
      setTotalPlanningMethodVasectomy(DF.data?.total_planning_method_vasectomy)
      setTotalPlanningMethodTubalLigation(DF.data?.total_planning_method_tubal_ligation)
      setTotalPlanningMethodBasalBodyTemperature(DF.data?.total_planning_method_basal_body_temperature)
      setTotalPlanningMethodCervicalMucus(DF.data?.total_planning_method_cervical_mucus)
      setTotalPlanningMethodSymptoThermal(DF.data?.total_planning_method_sympto_thermal)
      setTotalPlanningMethodLactationAmenorrhea(DF.data?.total_planning_method_lactation_amenorrhea)
      setTotalPlanningMethodStandardDays(DF.data?.total_planning_method_standard_days)
      setTotalPlanningMethodTwoDay(DF.data?.total_planning_method_two_day)

      // INFORMATION STATE: HOUSING UNIT
      setTotalHouseUnitOwned(DF.data?.total_house_unit_owned)
      setTotalHouseUnitRented(DF.data?.total_house_unit_rented)
      setTotalHouseUnitCaretaken(DF.data?.total_house_unit_caretaken)
      setTotalHouseUnitConcrete(DF.data?.total_house_unit_concrete)
      setTotalHouseUnitWooden(DF.data?.total_house_unit_wooden)
      setTotalHouseUnitMakeshift(DF.data?.total_house_unit_makeshift)
      setTotalHouseUnitSingle(DF.data?.total_house_unit_single)
      setTotalHouseUnitDuplex(DF.data?.total_house_unit_duplex)
      setTotalHouseUnitCommercial(DF.data?.total_house_unit_commercial)
      setTotalHouseUnitApartment(DF.data?.total_house_unit_apartment)
      setTotalHouseUnitImprovised(DF.data?.total_house_unit_improvised)

      // INFORMATION STATE: HOUSE LIGHT
      setTotalHouseLightElectricity(DF.data?.total_house_light_electricity)
      setTotalHouseLightGasLamp(DF.data?.total_house_light_gas_lamp)

      // INFORMATION STATE: WATER SUPPLY
      setTotalWaterSupplyTap(DF.data?.total_water_supply_tap)
      setTotalWaterSupplySpring(DF.data?.total_water_supply_spring)
      setTotalWaterSupplyDugWell(DF.data?.total_water_supply_dug_well)
      setTotalWaterSupplyPublicWell(DF.data?.total_water_supply_public_well)
      setTotalWaterSupplyPublicFaucet(DF.data?.total_water_supply_public_faucet)

      // INFORMATION STATE: TOILET
      setTotalToiletWaterSealedExclusive(DF.data?.total_toilet_water_sealed_exclusive)
      setTotalToiletWaterSealedShared(DF.data?.total_toilet_water_sealed_shared)
      setTotalToiletClosedPit(DF.data?.total_toilet_closed_pit)
      setTotalToiletOpenedPit(DF.data?.total_toilet_opened_pit)

      // INFORMATION STATE: GARBAGE DISPOSAL
      setTotalGarbageDisposalCollecting(DF.data?.total_garbage_disposal_collecting)
      setTotalGarbageDisposalSegregating(DF.data?.total_garbage_disposal_segregating)
      setTotalGarbageDisposalComposting(DF.data?.total_garbage_disposal_composting)
      setTotalGarbageDisposalBurning(DF.data?.total_garbage_disposal_burning)
      setTotalGarbageDisposalBurying(DF.data?.total_garbage_disposal_burying)

      // INFORMATION STATE: COMMUNICATION FACILITY
      setTotalCommunicationFacilityRadio(DF.data?.total_communication_facility_radio)
      setTotalCommunicationFacilityTwoWayRadio(DF.data?.total_communication_facility_two_way_radio)
      setTotalCommunicationFacilityCableTelevision(DF.data?.total_communication_facility_cable_television)
      setTotalCommunicationFacilityAntennaTelevision(DF.data?.total_communication_facility_antenna_television)
      setTotalCommunicationFacilityMobilePhone(DF.data?.total_communication_facility_mobile_phone)
      setTotalCommunicationFacilityLandlinePhone(DF.data?.total_communication_facility_landline_phone)

      // INFORMATION STATE: TRANSPORTATION FACILITY
      setTotalTransportationFacilityBicycle(DF.data?.total_transportation_facility_bicycle)
      setTotalTransportationFacilityMotorcycle(DF.data?.total_transportation_facility_motorcycle)
      setTotalTransportationFacilityTricycle(DF.data?.total_transportation_facility_tricycle)
      setTotalTransportationFacilityKuliglig(DF.data?.total_transportation_facility_kuliglig)
      setTotalTransportationFacilityJeepney(DF.data?.total_transportation_facility_jeepney)
      setTotalTransportationFacilityCar(DF.data?.total_transportation_facility_car)
      setTotalTransportationFacilityTruck(DF.data?.total_transportation_facility_truck)
      setTotalTransportationFacilityVan(DF.data?.total_transportation_facility_van)

      // INFORMATION STATE: AGRICULTURAL PRODUCTS
      setTotalAgriculturalProductRice(DF.data?.total_agricultural_product_rice)
      setTotalAgriculturalProductCorn(DF.data?.total_agricultural_product_corn)
      setTotalAgriculturalProductBanana(DF.data?.total_agricultural_product_banana)
      setTotalAgriculturalProductTaro(DF.data?.total_agricultural_product_taro)
      setTotalAgriculturalProductCassava(DF.data?.total_agricultural_product_cassava)

      // INFORMATION STATE: POULTRY
      setTotalPoultryChicken(DF.data?.total_poultry_chicken)
      setTotalPoultryDuck(DF.data?.total_poultry_duck)
      setTotalPoultryGeese(DF.data?.total_poultry_geese)
      setTotalPoultryTurkey(DF.data?.total_poultry_turkey)

      // INFORMATION STATE: LIVESTOCK
      setTotalLivestockPig(DF.data?.total_livestock_pig)
      setTotalLivestockGoat(DF.data?.total_livestock_goat)
      setTotalLivestockSheep(DF.data?.total_livestock_sheep)
      setTotalLivestockCow(DF.data?.total_livestock_cow)
      setTotalLivestockCarabao(DF.data?.total_livestock_carabao)
      setTotalLivestockHorse(DF.data?.total_livestock_horse)

      // INFORMATION STATE: SOURCE OF INCOME
      setTotalOtherLivelihoodSariSariStore(DF.data?.total_other_livelihood_sari_sari_store)
      setTotalOtherLivelihoodRestaurant(DF.data?.total_other_livelihood_restaurant)
      setTotalOtherLivelihoodBakeshop(DF.data?.total_other_livelihood_bakeshop)

      // INFORMATION STATE:FISH POND AREA
      setTotalFishpondArea(DF.data?.total_fishpond_area)

      // INFORMATION STATE: LAND OWNED
      setTotalOwnedRiceFieldArea(DF.data?.total_owned_rice_field_area)
      setTotalOwnedCornFieldArea(DF.data?.total_owned_corn_field_area)

      // INFORMATION STATE: LAND UNOWNED
      setTotalUnownedRiceFieldArea(DF.data?.total_unowned_rice_field_area)
      setTotalUnownedCornFieldArea(DF.data?.total_unowned_corn_field_area)

      // INFORMATION STATE: AVERAGE FAMILY INCOME
      setTotalMonthlyAverageIncomeBelow5000(DF.data?.total_monthly_average_income_below_5000)
      setTotalMonthlyAverageIncome5000To9999(DF.data?.total_monthly_average_income_5000_to_9999)
      setTotalMonthlyAverageIncome10000To29999(DF.data?.total_monthly_average_income_10000_to_29999)
      setTotalMonthlyAverageIncome30000To69999(DF.data?.total_monthly_average_income_30000_to_69999)
      setTotalMonthlyAverageIncome70000AndAbove(DF.data?.total_monthly_average_income_70000_and_above)
    }

    return () => setStatus('loading')
  }, [DF.loading, DF.error, DF.data])

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

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setCensusYear(new Date().getFullYear())
    setCensusVisit(1)
    setAddressMunicipal(ACCOUNT.vicinity_municipal)
    setAddressBarangay(ACCOUNT.vicinity_barangay)
    DF.mutate()
    toast.info('Dashboard refreshed')
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_dashboard">
      <DashboardToolbar
        action={
          <ButtonIcon className="is-gray" onClick={refreshTable} title="Refresh">
            <Reset20 />
          </ButtonIcon>
        }>
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
        <Field label="Censuses" status={status}>
          <Select
            onChange={(e) => {
              setCensusYear(e.target.value.substring(0, 4))
              setCensusVisit(e.target.value.substring(5, 6))
              console.log(`${census_year} ${census_visit}`)
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

      <DashboardContent>
        <DashboardItem status={status} title="Total Family Profile" desc="From survey of barangay workers.">
          <TotalFamilyProfile
            total={total}
            totalSmall={total_small}
            totalLarge={total_large}
            totalThreeAndBelowChildren={total_three_and_below_children}
            totalMoreThanThreeChildren={total_more_than_three_children}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Family Planning Method"
          desc="Allows people to attain their desired number of children, if any, and to determine the spacing of their pregnancies.">
          <FamilyPlanningMethod
            totalPlanningMethodPills={total_planning_method_pills}
            totalPlanningMethodCondom={total_planning_method_condom}
            totalPlanningMethodIntrauterineDevice={total_planning_method_intrauterine_device}
            totalPlanningMethodDmpaInjection={total_planning_method_dmpa_injection}
            totalPlanningMethodVasectomy={total_planning_method_vasectomy}
            totalPlanningMethodTubalLigation={total_planning_method_tubal_ligation}
            totalPlanningMethodBasalBodyTemperature={total_planning_method_basal_body_temperature}
            totalPlanningMethodCervicalMucus={total_planning_method_cervical_mucus}
            totalPlanningMethodSymptoThermal={total_planning_method_sympto_thermal}
            totalPlanningMethodLactationAmenorrhea={total_planning_method_lactation_amenorrhea}
            totalPlanningMethodStandardDays={total_planning_method_standard_days}
            totalPlanningMethodTwoDay={total_planning_method_two_day}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Housing Unit"
          desc="Or dwelling unit, is a structure or the part of a structure or the space that is used as a home, residence, or sleeping place by one person or more people who maintain a common household.">
          <HousingUnit
            totalHouseUnitOwned={total_house_unit_owned}
            totalHouseUnitRented={total_house_unit_rented}
            totalHouseUnitCaretaken={total_house_unit_caretaken}
            totalHouseUnitConcrete={total_house_unit_concrete}
            totalHouseUnitWooden={total_house_unit_wooden}
            totalHouseUnitMakeshift={total_house_unit_makeshift}
            totalHouseUnitSingle={total_house_unit_single}
            totalHouseUnitDuplex={total_house_unit_duplex}
            totalHouseUnitCommercial={total_house_unit_commercial}
            totalHouseUnitApartment={total_house_unit_apartment}
            totalHouseUnitImprovised={total_house_unit_improvised}
          />
        </DashboardItem>

        <DashboardItem status={status} title="House Light" desc="Light that provides general illumination for a housing unit.">
          <HouseLight totalHouseLightElectricity={total_house_light_electricity} totalHouseLightGasLamp={total_house_light_gas_lamp} />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Water Supply"
          desc="Provision of water by public utilities, commercial organisations, community endeavors or by individuals, usually via a system of pumps and pipes.">
          <WaterSupply
            totalWaterSupplyTap={total_water_supply_tap}
            totalWaterSupplySpring={total_water_supply_spring}
            totalWaterSupplyDugWell={total_water_supply_dug_well}
            totalWaterSupplyPublicWell={total_water_supply_public_well}
            totalWaterSupplyPublicFaucet={total_water_supply_public_faucet}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Toilet"
          desc="A fixed receptacle into which a person may urinate or defecate, typically consisting of a large bowl connected to a system for flushing away the waste into a sewer or septic tank.">
          <Toilet
            totalToiletWaterSealedExclusive={total_toilet_water_sealed_exclusive}
            totalToiletWaterSealedShared={total_toilet_water_sealed_shared}
            totalToiletClosedPit={total_toilet_closed_pit}
            totalToiletOpenedPit={total_toilet_opened_pit}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Garbage Disposal"
          desc="Waste disposal, the collection, processing, and recycling or deposition of the waste materials of human society.">
          <GarbageDisposal
            totalGarbageDisposalCollecting={total_garbage_disposal_collecting}
            totalGarbageDisposalSegregating={total_garbage_disposal_segregating}
            totalGarbageDisposalComposting={total_garbage_disposal_composting}
            totalGarbageDisposalBurning={total_garbage_disposal_burning}
            totalGarbageDisposalBurying={total_garbage_disposal_burying}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Communication Facility"
          desc="Any and all public and private instrumentalities used or useful in the transmission of writing, signs, signals, pictures, or sounds of all kinds and includes mail, telephone, wire, radio, and all other means of communication.">
          <CommunicationFacility
            totalCommunicationFacilityRadio={total_communication_facility_radio}
            totalCommunicationFacilityTwoWayRadio={total_communication_facility_two_way_radio}
            totalCommunicationFacilityCableTelevision={total_communication_facility_cable_television}
            totalCommunicationFacilityAntennaTelevision={total_communication_facility_antenna_television}
            totalCommunicationFacilityMobilePhone={total_communication_facility_mobile_phone}
            totalCommunicationFacilityLandlinePhone={total_communication_facility_landline_phone}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Transportation Facility" desc="Vehicle used by the family to move from one place to another.">
          <TransportationFacility
            totalTransportationFacilityBicycle={total_transportation_facility_bicycle}
            totalTransportationFacilityMotorcycle={total_transportation_facility_motorcycle}
            totalTransportationFacilityTricycle={total_transportation_facility_tricycle}
            totalTransportationFacilityKuliglig={total_transportation_facility_kuliglig}
            totalTransportationFacilityJeepney={total_transportation_facility_jeepney}
            totalTransportationFacilityCar={total_transportation_facility_car}
            totalTransportationFacilityTruck={total_transportation_facility_truck}
            totalTransportationFacilityVan={total_transportation_facility_van}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Agricultural Products" desc="Frequent family-produced agricultural products.">
          <AgriculturalProducts
            totalAgriculturalProductRice={total_agricultural_product_rice}
            totalAgriculturalProductCorn={total_agricultural_product_corn}
            totalAgriculturalProductBanana={total_agricultural_product_banana}
            totalAgriculturalProductTaro={total_agricultural_product_taro}
            totalAgriculturalProductCassava={total_agricultural_product_cassava}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Poultry" desc="Total number of heads by poultry animals.">
          <Poultry
            totalPoultryChicken={total_poultry_chicken}
            totalPoultryDuck={total_poultry_duck}
            totalPoultryGeese={total_poultry_geese}
            totalPoultryTurkey={total_poultry_turkey}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Livestock" desc="Total number of heads by livestock animals.">
          <Livestock
            totalLivestockPig={total_livestock_pig}
            totalLivestockGoat={total_livestock_goat}
            totalLivestockSheep={total_livestock_sheep}
            totalLivestockCow={total_livestock_cow}
            totalLivestockCarabao={total_livestock_carabao}
            totalLivestockHorse={total_livestock_horse}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Source of Income" desc="Other family source of income like sari-sari store, restaurant and bakeshop.">
          <SourceIncome
            totalOtherLivelihoodSariSariStore={total_other_livelihood_sari_sari_store}
            totalOtherLivelihoodRestaurant={total_other_livelihood_restaurant}
            totalOtherLivelihoodBakeshop={total_other_livelihood_bakeshop}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Fish Pond Owned" desc="Total area of fish pond.">
          <FishPond totalFishpondArea={total_fishpond_area} />
        </DashboardItem>

        <DashboardItem status={status} title="Land (Owned)" desc="Total land area of rice and corn fields.">
          <LandOwned totalOwnedRiceFieldArea={total_owned_rice_field_area} totalOwnedCornFieldArea={total_owned_corn_field_area} />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Land (Unowned)"
          desc="Total number of land leased, tenants and caretakers including rice and corn field area.">
          <LandUnowned totalUnownedRiceFieldArea={total_unowned_rice_field_area} totalUnownedCornFieldArea={total_unowned_corn_field_area} />
        </DashboardItem>

        <DashboardItem status={status} title="Average Family Income" desc="Total average of family income per month in philippines peso.">
          <FamilyIncome
            totalMonthlyAverageIncomeBelow5000={total_monthly_average_income_below_5000}
            totalMonthlyAverageIncome5000To9999={total_monthly_average_income_5000_to_9999}
            totalMonthlyAverageIncome10000To29999={total_monthly_average_income_10000_to_29999}
            totalMonthlyAverageIncome30000To69999={total_monthly_average_income_30000_to_69999}
            totalMonthlyAverageIncome70000AndAbove={total_monthly_average_income_70000_and_above}
          />
        </DashboardItem>
      </DashboardContent>
    </Authorization>
  )
}

export default DashboardFamilies
