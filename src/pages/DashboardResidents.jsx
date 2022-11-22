import * as Address from '../address/getAddress'

import AccountContext from '../contexts/AccountContext'
import ActualPopulation from '../components/ActualPopulation'
import AgeStructure from '../components/AgeStructure'
import Authorization from '../components/Authorization'
import BloodType from '../components/BloodType'
import ButtonIcon from '../components/ButtonIcon'
import DashboardContent from '../components/DashboardContent'
import DashboardItem from '../components/DashboardItem'
import DashboardToolbar from '../components/DashboardToolbar'
import FamilyHead from '../components/FamilyHead'
import Field from '../components/Field'
import HealthCase from '../components/HealthCase'
import HouseholdHead from '../components/HouseholdHead'
import IndigenousPeople from '../components/IndigenousPeople'
import MaritalStatus from '../components/MaritalStatus'
import PregnancyLactation from '../components/PregnancyLactation'
import PreschoolWeight from '../components/PreschoolWeight'
import React from 'react'
import { Reset20 } from '@carbon/icons-react'
import SchoolYouth from '../components/SchoolYouth'
import Select from '../components/Select'
import SocioCivics from '../components/SocioCivics'
import ViewUtils from '../utils/ViewUtils'
import { mutate } from 'swr'
import swrCensusesResidents from '../swr/swrCensusesResidents'
import swrDashboardResidents from '../swr/swrDashboardResidents'
import { toast } from 'react-toastify'

function DashboardResidents() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')

  // INFORMATION STATE: ACTUAL POPULATION
  const [total_population, setTotalPopulation] = React.useState(0)
  const [total_population_male, setTotalPopulationMale] = React.useState(0)
  const [total_population_female, setTotalPopulationFemale] = React.useState(0)

  // INFORMATION STATE: AGE STRUCTURE
  const [total_child, setTotalChild] = React.useState(0)
  const [total_child_male, setTotalChildMale] = React.useState(0)
  const [total_child_female, setTotalChildFemale] = React.useState(0)
  const [total_teen, setTotalTeen] = React.useState(0)
  const [total_teen_male, setTotalTeenMale] = React.useState(0)
  const [total_teen_female, setTotalTeenFemale] = React.useState(0)
  const [total_adult, setTotalAdult] = React.useState(0)
  const [total_adult_male, setTotalAdultMale] = React.useState(0)
  const [total_adult_female, setTotalAdultFemale] = React.useState(0)
  const [total_elderly, setTotalElderly] = React.useState(0)
  const [total_elderly_male, setTotalElderlyMale] = React.useState(0)
  const [total_elderly_female, setTotalElderlyFemale] = React.useState(0)

  // INFORMATION STATE: MARITAL STATUS
  const [total_single, setTotalSingle] = React.useState(0)
  const [total_single_male, setTotalSingleMale] = React.useState(0)
  const [total_single_female, setTotalSingleFemale] = React.useState(0)
  const [total_living_in, setTotalLivingIn] = React.useState(0)
  const [total_living_in_male, setTotalLivingInMale] = React.useState(0)
  const [total_living_in_female, setTotalLivingInFemale] = React.useState(0)
  const [total_married, setTotalMarried] = React.useState(0)
  const [total_married_male, setTotalMarriedMale] = React.useState(0)
  const [total_married_female, setTotalMarriedFemale] = React.useState(0)
  const [total_divorced, setTotalDivorced] = React.useState(0)
  const [total_divorced_male, setTotalDivorcedMale] = React.useState(0)
  const [total_divorced_female, setTotalDivorcedFemale] = React.useState(0)
  const [total_separated, setTotalSeparated] = React.useState(0)
  const [total_separated_male, setTotalSeparatedMale] = React.useState(0)
  const [total_separated_female, setTotalSeparatedFemale] = React.useState(0)
  const [total_widowed, setTotalWidowed] = React.useState(0)
  const [total_widowed_male, setTotalWidowedMale] = React.useState(0)
  const [total_widowed_female, setTotalWidowedFemale] = React.useState(0)

  // INFORMATION STATE: BLOOD TYPE
  const [total_a_positive, setTotalAPositive] = React.useState(0)
  const [total_a_positive_male, setTotalAPositiveMale] = React.useState(0)
  const [total_a_positive_female, setTotalAPositiveFemale] = React.useState(0)
  const [total_a_negative, setTotalANegative] = React.useState(0)
  const [total_a_negative_male, setTotalANegativeMale] = React.useState(0)
  const [total_a_negative_female, setTotalANegativeFemale] = React.useState(0)
  const [total_b_positive, setTotalBPositive] = React.useState(0)
  const [total_b_positive_male, setTotalBPositiveMale] = React.useState(0)
  const [total_b_positive_female, setTotalBPositiveFemale] = React.useState(0)
  const [total_b_negative, setTotalBNegative] = React.useState(0)
  const [total_b_negative_male, setTotalBNegativeMale] = React.useState(0)
  const [total_b_negative_female, setTotalBNegativeFemale] = React.useState(0)
  const [total_o_positive, setTotalOPositive] = React.useState(0)
  const [total_o_positive_male, setTotalOPositiveMale] = React.useState(0)
  const [total_o_positive_female, setTotalOPositiveFemale] = React.useState(0)
  const [total_o_negative, setTotalONegative] = React.useState(0)
  const [total_o_negative_male, setTotalONegativeMale] = React.useState(0)
  const [total_o_negative_female, setTotalONegativeFemale] = React.useState(0)
  const [total_ab_positive, setTotalAbPositive] = React.useState(0)
  const [total_ab_positive_male, setTotalAbPositiveMale] = React.useState(0)
  const [total_ab_positive_female, setTotalAbPositiveFemale] = React.useState(0)
  const [total_ab_negative, setTotalAbNegative] = React.useState(0)
  const [total_ab_negative_male, setTotalAbNegativeMale] = React.useState(0)
  const [total_ab_negative_female, setTotalAbNegativeFemale] = React.useState(0)

  // INFORMATION STATE: FAMILY HEAD
  const [total_family_head, setTotalFamilyHead] = React.useState(0)
  const [total_family_head_male, setTotalFamilyHeadMale] = React.useState(0)
  const [total_family_head_female, setTotalFamilyHeadFemale] = React.useState(0)

  // INFORMATION STATE: HOUSEHOLD HEAD
  const [total_household_head, setTotalHouseholdHead] = React.useState(0)
  const [total_household_head_male, setTotalHouseholdHeadMale] = React.useState(0)
  const [total_household_head_female, setTotalHouseholdHeadFemale] = React.useState(0)

  // INFORMATION STATE: SOCIO CIVICS
  const [total_solo_parent, setTotalSoloParent] = React.useState(0)
  const [total_solo_parent_male, setTotalSoloParentMale] = React.useState(0)
  const [total_solo_parent_female, setTotalSoloParentFemale] = React.useState(0)
  const [total_disability, setTotalDisability] = React.useState(0)
  const [total_disability_male, setTotalDisabilityMale] = React.useState(0)
  const [total_disability_female, setTotalDisabilityFemale] = React.useState(0)
  const [total_member_of_ips, setTotalMemberOfIps] = React.useState(0)
  const [total_member_of_ips_male, setTotalMemberOfIpsMale] = React.useState(0)
  const [total_member_of_ips_female, setTotalMemberOfIpsFemale] = React.useState(0)
  const [total_member_of_4ps, setTotalMemberOf4ps] = React.useState(0)
  const [total_member_of_4ps_male, setTotalMemberOf4psMale] = React.useState(0)
  const [total_member_of_4ps_female, setTotalMemberOf4psFemale] = React.useState(0)

  // INFORMATION STATE: INDIGENOUS PEOPLE
  const [total_member_of_ips_preschool, setTotalMemberOfIpsPreschool] = React.useState(0) // 0 - 5
  const [total_member_of_ips_preschool_male, setTotalMemberOfIpsPreschoolMale] = React.useState(0)
  const [total_member_of_ips_preschool_female, setTotalMemberOfIpsPreschoolFemale] = React.useState(0)
  const [total_member_of_ips_in_school, setTotalMemberOfIpsInSchool] = React.useState(0)
  const [total_member_of_ips_in_school_male, setTotalMemberOfIpsInSchoolMale] = React.useState(0)
  const [total_member_of_ips_in_school_female, setTotalMemberOfIpsInSchoolFemale] = React.useState(0)
  const [total_member_of_ips_elderly, setTotalMemberOfIpsElderly] = React.useState(0)
  const [total_member_of_ips_elderly_male, setTotalMemberOfIpsElderlyMale] = React.useState(0)
  const [total_member_of_ips_elderly_female, setTotalMemberOfIpsElderlyFemale] = React.useState(0)

  // INFORMATION STATE: SCHOOL YOUTH
  const [total_youth, setTotalYouth] = React.useState(0)
  const [total_youth_male, setTotalYouthMale] = React.useState(0)
  const [total_youth_female, setTotalYouthFemale] = React.useState(0)
  const [total_in_school_youth, setTotalInSchoolYouth] = React.useState(0)
  const [total_in_school_youth_male, setTotalInSchoolYouthMale] = React.useState(0)
  const [total_in_school_youth_female, setTotalInSchoolYouthFemale] = React.useState(0)
  const [total_out_of_school_youth, setTotalOutOfSchoolYouth] = React.useState(0)
  const [total_out_of_school_youth_male, setTotalOutOfSchoolYouthMale] = React.useState(0)
  const [total_out_of_school_youth_female, setTotalOutOfSchoolYouthFemale] = React.useState(0)

  // INFORMATION STATE: PRESCHOOL WEIGHT STATUS
  const [total_severly_underweight_preschool, setTotalSeverlyUnderweightPreschool] = React.useState(0)
  const [total_severly_underweight_preschool_male, setTotalSeverlyUnderweightPreschoolMale] = React.useState(0)
  const [total_severly_underweight_preschool_female, setTotalSeverlyUnderweightPreschoolFemale] = React.useState(0)
  const [total_underweight_preschool, setTotalUnderweightPreschool] = React.useState(0)
  const [total_underweight_preschool_male, setTotalUnderweightPreschoolMale] = React.useState(0)
  const [total_underweight_preschool_female, setTotalUnderweightPreschoolFemale] = React.useState(0)
  const [total_normal_weight_preschool, setTotalNormalWeightPreschool] = React.useState(0)
  const [total_normal_weight_preschool_male, setTotalNormalWeightPreschoolMale] = React.useState(0)
  const [total_normal_weight_preschool_female, setTotalNormalWeightPreschoolFemale] = React.useState(0)
  const [total_overweight_preschool, setTotalOverweightPreschool] = React.useState(0)
  const [total_overweight_preschool_male, setTotalOverweightPreschoolMale] = React.useState(0)
  const [total_overweight_preschool_female, setTotalOverweightPreschoolFemale] = React.useState(0)
  const [total_obesity_preschool, setTotalObesityPreschool] = React.useState(0)
  const [total_obesity_preschool_male, setTotalObesityPreschoolMale] = React.useState(0)
  const [total_obesity_preschool_female, setTotalObesityPreschoolFemale] = React.useState(0)

  // INFORMATION STATE: GOITER CASE
  const [total_goiter_case, setTotalGoiterCase] = React.useState(0)
  const [total_goiter_case_male, setTotalGoiterCaseMale] = React.useState(0)
  const [total_goiter_case_female, setTotalGoiterCaseFemale] = React.useState(0)
  const [total_goiter_case_preschool, setTotalGoiterCasePreschool] = React.useState(0)
  const [total_goiter_case_preschool_male, setTotalGoiterCasePreschoolMale] = React.useState(0)
  const [total_goiter_case_preschool_female, setTotalGoiterCasePreschoolFemale] = React.useState(0)
  const [total_goiter_case_elementary, setTotalGoiterCaseElementary] = React.useState(0)
  const [total_goiter_case_elementary_male, setTotalGoiterCaseElementaryMale] = React.useState(0)
  const [total_goiter_case_elementary_female, setTotalGoiterCaseElementaryFemale] = React.useState(0)
  const [total_goiter_case_pregnant, setTotalGoiterCasePregnant] = React.useState(0)
  const [total_goiter_case_lactating, setTotalGoiterCaseLactating] = React.useState(0)

  // INFORMATION STATE: ANEMIA CASE
  const [total_anemia_case, setTotalAnemiaCase] = React.useState(0)
  const [total_anemia_case_male, setTotalAnemiaCaseMale] = React.useState(0)
  const [total_anemia_case_female, setTotalAnemiaCaseFemale] = React.useState(0)
  const [total_anemia_case_preschool, setTotalAnemiaCasePreschool] = React.useState(0)
  const [total_anemia_case_preschool_male, setTotalAnemiaCasePreschoolMale] = React.useState(0)
  const [total_anemia_case_preschool_female, setTotalAnemiaCasePreschoolFemale] = React.useState(0)
  const [total_anemia_case_elementary, setTotalAnemiaCaseElementary] = React.useState(0)
  const [total_anemia_case_elementary_male, setTotalAnemiaCaseElementaryMale] = React.useState(0)
  const [total_anemia_case_elementary_female, setTotalAnemiaCaseElementaryFemale] = React.useState(0)
  const [total_anemia_case_pregnant, setTotalAnemiaCasePregnant] = React.useState(0)
  const [total_anemia_case_lactating, setTotalAnemiaCaseLactating] = React.useState(0)

  // INFORMATION STATE: VITAMIN A DEFICIENCY CASE
  const [total_vad_case, setTotalVadCase] = React.useState(0)
  const [total_vad_case_male, setTotalVadCaseMale] = React.useState(0)
  const [total_vad_case_female, setTotalVadCaseFemale] = React.useState(0)
  const [total_vad_case_preschool, setTotalVadCasePreschool] = React.useState(0)
  const [total_vad_case_preschool_male, setTotalVadCasePreschoolMale] = React.useState(0)
  const [total_vad_case_preschool_female, setTotalVadCasePreschoolFemale] = React.useState(0)
  const [total_vad_case_elementary, setTotalVadCaseElementary] = React.useState(0)
  const [total_vad_case_elementary_male, setTotalVadCaseElementaryMale] = React.useState(0)
  const [total_vad_case_elementary_female, setTotalVadCaseElementaryFemale] = React.useState(0)
  const [total_vad_case_pregnant, setTotalVadCasePregnant] = React.useState(0)
  const [total_vad_case_lactating, setTotalVadCaseLactating] = React.useState(0)

  // INFORMATION STATE: PREGNANCY AND LACTATION
  const [total_pregnant, setTotalPregnant] = React.useState(0)
  const [total_pregnant_teen, setTotalPregnantTeen] = React.useState(0)
  const [total_pregnant_productive, setTotalPregnantProductive] = React.useState(0)
  const [total_pregnant_high_risk, setTotalPregnantHighRisk] = React.useState(0)
  const [total_lactating, setTotalLactating] = React.useState(0)
  const [total_infant, setTotalInfant] = React.useState(0)
  const [total_infant_zero_to_three_months, setTotalInfantZeroToThreeMonths] = React.useState(0)
  const [total_infant_four_to_six_months, setTotalInfantFourToSixMonths] = React.useState(0)
  const [total_infant_seven_to_nine_months, setTotalInfantSevenToNineMonths] = React.useState(0)
  const [total_infant_ten_to_twelve_months, setTotalInfantTenToTwelveMonths] = React.useState(0)
  const [total_pregnant_mortality, setTotalPregnantMortality] = React.useState(0)
  const [total_pregnant_teen_mortality, setTotalPregnantTeenMortality] = React.useState(0)
  const [total_pregnant_productive_mortality, setTotalPregnantProductiveMortality] = React.useState(0)
  const [total_pregnant_high_risk_mortality, setTotalPregnantHighRiskMortality] = React.useState(0)
  const [total_lactating_mortality, setTotalLactatingMortality] = React.useState(0)
  const [total_infant_mortality, setTotalInfantMortality] = React.useState(0)
  const [total_infant_zero_to_three_months_mortality, setTotalInfantZeroToThreeMonthsMortality] = React.useState(0)
  const [total_infant_four_to_six_months_mortality, setTotalInfantFourToSixMonthsMortality] = React.useState(0)
  const [total_infant_seven_to_nine_months_mortality, setTotalInfantSevenToNineMonthsMortality] = React.useState(0)
  const [total_infant_ten_to_twelve_months_mortality, setTotalInfantTenToTwelveMonthsMortality] = React.useState(0)

  // INPUT STATE
  const [censuses, setCensuses] = React.useState([])
  const [census_year, setCensusYear] = React.useState(0)
  const [census_visit, setCensusVisit] = React.useState(0)
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [params, setParams] = React.useState({ census_year, census_visit, address_municipal, address_barangay })
  const DR = swrDashboardResidents(params)
  const CR = swrCensusesResidents()

  // ON RENDER REVALIDATE DASHBOARD RESIDENT
  React.useEffect(() => {
    mutate('dashboard/residents')
    mutate('censuses/residents')
    window.scrollTo(0, 0)
  }, [])

  // ON FETCH DASHBOARD RESIDENTS
  React.useEffect(() => {
    if (DR.loading) setStatus('loading')
    if (DR.error) setStatus('error')

    if (DR.data) {
      setStatus('success')

      // INFORMATION STATE: ACTUAL POPULATION
      setTotalPopulation(DR.data?.total_population)
      setTotalPopulationMale(DR.data?.total_population_male)
      setTotalPopulationFemale(DR.data?.total_population_female)

      // INFORMATION STATE: AGE STRUCTURE
      setTotalChild(DR.data?.total_child)
      setTotalChildMale(DR.data?.total_child_male)
      setTotalChildFemale(DR.data?.total_child_female)
      setTotalTeen(DR.data?.total_teen)
      setTotalTeenMale(DR.data?.total_teen_male)
      setTotalTeenFemale(DR.data?.total_teen_female)
      setTotalAdult(DR.data?.total_adult)
      setTotalAdultMale(DR.data?.total_adult_male)
      setTotalAdultFemale(DR.data?.total_adult_female)
      setTotalElderly(DR.data?.total_elderly)
      setTotalElderlyMale(DR.data?.total_elderly_male)
      setTotalElderlyFemale(DR.data?.total_elderly_female)

      // INFORMATION STATE: MARITAL STATUS
      setTotalSingle(DR.data?.total_single)
      setTotalSingleMale(DR.data?.total_single_male)
      setTotalSingleFemale(DR.data?.total_single_female)
      setTotalLivingIn(DR.data?.total_living_in)
      setTotalLivingInMale(DR.data?.total_living_in_male)
      setTotalLivingInFemale(DR.data?.total_living_in_female)
      setTotalMarried(DR.data?.total_married)
      setTotalMarriedMale(DR.data?.total_married_male)
      setTotalMarriedFemale(DR.data?.total_married_female)
      setTotalDivorced(DR.data?.total_divorced)
      setTotalDivorcedMale(DR.data?.total_divorced_male)
      setTotalDivorcedFemale(DR.data?.total_divorced_female)
      setTotalSeparated(DR.data?.total_separated)
      setTotalSeparatedMale(DR.data?.total_separated_male)
      setTotalSeparatedFemale(DR.data?.total_separated_female)
      setTotalWidowed(DR.data?.total_widowed)
      setTotalWidowedMale(DR.data?.total_widowed_male)
      setTotalWidowedFemale(DR.data?.total_widowed_female)

      // INFORMATION STATE: BLOOD TYPE
      setTotalAPositive(DR.data?.total_a_positive)
      setTotalAPositiveMale(DR.data?.total_a_positive_male)
      setTotalAPositiveFemale(DR.data?.total_a_positive_female)
      setTotalANegative(DR.data?.total_a_negative)
      setTotalANegativeMale(DR.data?.total_a_negative_male)
      setTotalANegativeFemale(DR.data?.total_a_negative_female)
      setTotalBPositive(DR.data?.total_b_positive)
      setTotalBPositiveMale(DR.data?.total_b_positive_male)
      setTotalBPositiveFemale(DR.data?.total_b_positive_female)
      setTotalBNegative(DR.data?.total_b_negative)
      setTotalBNegativeMale(DR.data?.total_b_negative_male)
      setTotalBNegativeFemale(DR.data?.total_b_negative_female)
      setTotalOPositive(DR.data?.total_o_positive)
      setTotalOPositiveMale(DR.data?.total_o_positive_male)
      setTotalOPositiveFemale(DR.data?.total_o_positive_female)
      setTotalONegative(DR.data?.total_o_negative)
      setTotalONegativeMale(DR.data?.total_o_negative_male)
      setTotalONegativeFemale(DR.data?.total_o_negative_female)
      setTotalAbPositive(DR.data?.total_ab_positive)
      setTotalAbPositiveMale(DR.data?.total_ab_positive_male)
      setTotalAbPositiveFemale(DR.data?.total_ab_positive_female)
      setTotalAbNegative(DR.data?.total_ab_negative)
      setTotalAbNegativeMale(DR.data?.total_ab_negative_male)
      setTotalAbNegativeFemale(DR.data?.total_ab_negative_female)

      // INFORMATION STATE: FAMILY HEAD
      setTotalFamilyHead(DR.data?.total_family_head)
      setTotalFamilyHeadMale(DR.data?.total_family_head_male)
      setTotalFamilyHeadFemale(DR.data?.total_family_head_female)

      // INFORMATION STATE: HOUSEHOLD HEAD
      setTotalHouseholdHead(DR.data?.total_household_head)
      setTotalHouseholdHeadMale(DR.data?.total_household_head_male)
      setTotalHouseholdHeadFemale(DR.data?.total_household_head_female)

      // INFORMATION STATE: SOCIO CIVICS
      setTotalSoloParent(DR.data?.total_solo_parent)
      setTotalSoloParentMale(DR.data?.total_solo_parent_male)
      setTotalSoloParentFemale(DR.data?.total_solo_parent_female)
      setTotalDisability(DR.data?.total_disability)
      setTotalDisabilityMale(DR.data?.total_disability_male)
      setTotalDisabilityFemale(DR.data?.total_disability_female)
      setTotalMemberOfIps(DR.data?.total_member_of_ips)
      setTotalMemberOfIpsMale(DR.data?.total_member_of_ips_male)
      setTotalMemberOfIpsFemale(DR.data?.total_member_of_ips_female)
      setTotalMemberOf4ps(DR.data?.total_member_of_4ps)
      setTotalMemberOf4psMale(DR.data?.total_member_of_4ps_male)
      setTotalMemberOf4psFemale(DR.data?.total_member_of_4ps_female)

      // INFORMATION STATE: INDIGENOUS PEOPLE
      setTotalMemberOfIpsPreschool(DR.data?.total_member_of_ips_preschool)
      setTotalMemberOfIpsPreschoolMale(DR.data?.total_member_of_ips_preschool_male)
      setTotalMemberOfIpsPreschoolFemale(DR.data?.total_member_of_ips_preschool_female)
      setTotalMemberOfIpsInSchool(DR.data?.total_member_of_ips_in_school)
      setTotalMemberOfIpsInSchoolMale(DR.data?.total_member_of_ips_in_school_male)
      setTotalMemberOfIpsInSchoolFemale(DR.data?.total_member_of_ips_in_school_female)
      setTotalMemberOfIpsElderly(DR.data?.total_member_of_ips_elderly)
      setTotalMemberOfIpsElderlyMale(DR.data?.total_member_of_ips_elderly_male)
      setTotalMemberOfIpsElderlyFemale(DR.data?.total_member_of_ips_elderly_female)

      // INFORMATION STATE: SCHOOL YOUTH
      setTotalYouth(DR.data?.total_youth)
      setTotalYouthMale(DR.data?.total_youth_male)
      setTotalYouthFemale(DR.data?.total_youth_female)
      setTotalInSchoolYouth(DR.data?.total_in_school_youth)
      setTotalInSchoolYouthMale(DR.data?.total_in_school_youth_male)
      setTotalInSchoolYouthFemale(DR.data?.total_in_school_youth_female)
      setTotalOutOfSchoolYouth(DR.data?.total_out_of_school_youth)
      setTotalOutOfSchoolYouthMale(DR.data?.total_out_of_school_youth_male)
      setTotalOutOfSchoolYouthFemale(DR.data?.total_out_of_school_youth_female)

      // INFORMATION STATE: PRESCHOOL WEIGHT STATUS
      setTotalSeverlyUnderweightPreschool(DR.data?.total_severly_underweight_preschool)
      setTotalSeverlyUnderweightPreschoolMale(DR.data?.total_severly_underweight_preschool_male)
      setTotalSeverlyUnderweightPreschoolFemale(DR.data?.total_severly_underweight_preschool_female)
      setTotalUnderweightPreschool(DR.data?.total_underweight_preschool)
      setTotalUnderweightPreschoolMale(DR.data?.total_underweight_preschool_male)
      setTotalUnderweightPreschoolFemale(DR.data?.total_underweight_preschool_female)
      setTotalNormalWeightPreschool(DR.data?.total_normal_weight_preschool)
      setTotalNormalWeightPreschoolMale(DR.data?.total_normal_weight_preschool_male)
      setTotalNormalWeightPreschoolFemale(DR.data?.total_normal_weight_preschool_female)
      setTotalOverweightPreschool(DR.data?.total_overweight_preschool)
      setTotalOverweightPreschoolMale(DR.data?.total_overweight_preschool_male)
      setTotalOverweightPreschoolFemale(DR.data?.total_overweight_preschool_female)
      setTotalObesityPreschool(DR.data?.total_obesity_preschool)
      setTotalObesityPreschoolMale(DR.data?.total_obesity_preschool_male)
      setTotalObesityPreschoolFemale(DR.data?.total_obesity_preschool_female)

      // INFORMATION STATE: GOITER CASE
      setTotalGoiterCase(DR.data?.total_goiter_case)
      setTotalGoiterCaseMale(DR.data?.total_goiter_case_male)
      setTotalGoiterCaseFemale(DR.data?.total_goiter_case_female)
      setTotalGoiterCasePreschool(DR.data?.total_goiter_case_preschool)
      setTotalGoiterCasePreschoolMale(DR.data?.total_goiter_case_preschool_male)
      setTotalGoiterCasePreschoolFemale(DR.data?.total_goiter_case_preschool_female)
      setTotalGoiterCaseElementary(DR.data?.total_goiter_case_elementary)
      setTotalGoiterCaseElementaryMale(DR.data?.total_goiter_case_elementary_male)
      setTotalGoiterCaseElementaryFemale(DR.data?.total_goiter_case_elementary_female)
      setTotalGoiterCasePregnant(DR.data?.total_goiter_case_pregnant)
      setTotalGoiterCaseLactating(DR.data?.total_goiter_case_lactating)

      // INFORMATION STATE: ANEMIA CASE
      setTotalAnemiaCase(DR.data?.total_anemia_case)
      setTotalAnemiaCaseMale(DR.data?.total_anemia_case_male)
      setTotalAnemiaCaseFemale(DR.data?.total_anemia_case_female)
      setTotalAnemiaCasePreschool(DR.data?.total_anemia_case_preschool)
      setTotalAnemiaCasePreschoolMale(DR.data?.total_anemia_case_preschool_male)
      setTotalAnemiaCasePreschoolFemale(DR.data?.total_anemia_case_preschool_female)
      setTotalAnemiaCaseElementary(DR.data?.total_anemia_case_elementary)
      setTotalAnemiaCaseElementaryMale(DR.data?.total_anemia_case_elementary_male)
      setTotalAnemiaCaseElementaryFemale(DR.data?.total_anemia_case_elementary_female)
      setTotalAnemiaCasePregnant(DR.data?.total_anemia_case_pregnant)
      setTotalAnemiaCaseLactating(DR.data?.total_anemia_case_lactating)

      // INFORMATION STATE: VITAMIN A DEFICIENCY CASE
      setTotalVadCase(DR.data?.total_vad_case)
      setTotalVadCaseMale(DR.data?.total_vad_case_male)
      setTotalVadCaseFemale(DR.data?.total_vad_case_female)
      setTotalVadCasePreschool(DR.data?.total_vad_case_preschool)
      setTotalVadCasePreschoolMale(DR.data?.total_vad_case_preschool_male)
      setTotalVadCasePreschoolFemale(DR.data?.total_vad_case_preschool_female)
      setTotalVadCaseElementary(DR.data?.total_vad_case_elementary)
      setTotalVadCaseElementaryMale(DR.data?.total_vad_case_elementary_male)
      setTotalVadCaseElementaryFemale(DR.data?.total_vad_case_elementary_female)
      setTotalVadCasePregnant(DR.data?.total_vad_case_pregnant)
      setTotalVadCaseLactating(DR.data?.total_vad_case_lactating)

      // INFORMATION STATE: PREGNANCY AND LACTATION
      setTotalPregnant(DR.data?.total_pregnant)
      setTotalPregnantTeen(DR.data?.total_pregnant_teen)
      setTotalPregnantProductive(DR.data?.total_pregnant_productive)
      setTotalPregnantHighRisk(DR.data?.total_pregnant_high_risk)
      setTotalLactating(DR.data?.total_lactating)
      setTotalInfant(DR.data?.total_infant)
      setTotalInfantZeroToThreeMonths(DR.data?.total_infant_zero_to_three_months)
      setTotalInfantFourToSixMonths(DR.data?.total_infant_four_to_six_months)
      setTotalInfantSevenToNineMonths(DR.data?.total_infant_seven_to_nine_months)
      setTotalInfantTenToTwelveMonths(DR.data?.total_infant_ten_to_twelve_months)
      setTotalPregnantMortality(DR.data?.total_pregnant_mortality)
      setTotalPregnantTeenMortality(DR.data?.total_pregnant_teen_mortality)
      setTotalPregnantProductiveMortality(DR.data?.total_pregnant_productive_mortality)
      setTotalPregnantHighRiskMortality(DR.data?.total_pregnant_high_risk_mortality)
      setTotalLactatingMortality(DR.data?.total_lactating_mortality)
      setTotalInfantMortality(DR.data?.total_infant_mortality)
      setTotalInfantZeroToThreeMonthsMortality(DR.data?.total_infant_zero_to_three_months_mortality)
      setTotalInfantFourToSixMonthsMortality(DR.data?.total_infant_four_to_six_months_mortality)
      setTotalInfantSevenToNineMonthsMortality(DR.data?.total_infant_seven_to_nine_months_mortality)
      setTotalInfantTenToTwelveMonthsMortality(DR.data?.total_infant_ten_to_twelve_months_mortality)
    }

    return () => setStatus('loading')
  }, [DR.loading, DR.error, DR.data])

  // ON FETCH DASHBOARD RESIDENTS
  React.useEffect(() => {
    if (CR.loading) setStatus('loading')
    if (CR.error) setStatus('error')

    if (CR.data) {
      setStatus('success')
      setCensuses(CR.data)
      setCensusYear(CR.data?.[0]?.year)
      setCensusVisit(CR.data?.[0]?.visit)
    }

    return () => setStatus('loading')
  }, [CR.loading, CR.error, CR.data])

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
    DR.mutate()
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
        <DashboardItem
          status={status}
          title="Actual Population"
          desc="From survey of barangay workers."
          footer={`${ViewUtils.percentage(total_population_male + total_population_female, total_population)} or ${ViewUtils.numCommaOrNotFound(
            total_population_male + total_population_female
          )} out of ${total_population?.toLocaleString()} residents answered during survey.`}>
          <ActualPopulation total={total_population} male={total_population_male} female={total_population_female} />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Age Structure"
          desc="Distribution of the population according to sex and age."
          footer={`${ViewUtils.percentage(total_child + total_teen + total_adult + total_elderly, total_population)} or ${(
            total_child +
            total_teen +
            total_adult +
            total_elderly
          )?.toLocaleString()} out of ${total_population?.toLocaleString()} residents age classification were identified during survey.`}>
          <AgeStructure
            child={total_child}
            childMale={total_child_male}
            childFemale={total_child_female}
            teen={total_teen}
            teenMale={total_teen_male}
            teenFemale={total_teen_female}
            adult={total_adult}
            adultMale={total_adult_male}
            adultFemale={total_adult_female}
            elderly={total_elderly}
            elderlyMale={total_elderly_male}
            elderlyFemale={total_elderly_female}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Marital Status"
          desc="Distribution of the population according to sex and marital status."
          footer={`${ViewUtils.percentage(
            total_single + total_living_in + total_married + total_divorced + total_separated + total_widowed,
            total_population
          )} or ${(
            total_single +
            total_living_in +
            total_married +
            total_divorced +
            total_separated +
            total_widowed
          )?.toLocaleString()} out of ${total_population?.toLocaleString()} residents marital status were identified during survey.`}>
          <MaritalStatus
            single={total_single}
            singleMale={total_single_male}
            singleFemale={total_single_female}
            livingIn={total_living_in}
            livingInMale={total_living_in_male}
            livingInFemale={total_living_in_female}
            married={total_married}
            marriedMale={total_married_male}
            marriedFemale={total_married_female}
            divorced={total_divorced}
            divorcedMale={total_divorced_male}
            divorcedFemale={total_divorced_female}
            separated={total_separated}
            separatedMale={total_separated_male}
            separatedFemale={total_separated_female}
            widowed={total_widowed}
            widowedMale={total_widowed_male}
            widowedFemale={total_widowed_female}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Blood Type"
          desc="Distribution of the population according to sex and blood type."
          footer={`${ViewUtils.percentage(
            total_a_positive +
              total_a_negative +
              total_b_positive +
              total_b_negative +
              total_o_positive +
              total_o_negative +
              total_ab_positive +
              total_ab_negative,
            total_population
          )} or ${(
            total_a_positive +
            total_a_negative +
            total_b_positive +
            total_b_negative +
            total_o_positive +
            total_o_negative +
            total_ab_positive +
            total_ab_negative
          )?.toLocaleString()} out of ${total_population?.toLocaleString()} residents provided their blood type information during survey.`}>
          <BloodType
            totalPopulation={total_population}
            aPos={total_a_positive}
            aPosMale={total_a_positive_male}
            aPosFemale={total_a_positive_female}
            aNeg={total_a_negative}
            aNegMale={total_a_negative_male}
            aNegFemale={total_a_negative_female}
            bPos={total_b_positive}
            bPosMale={total_b_positive_male}
            bPosFemale={total_b_positive_female}
            bNeg={total_b_negative}
            bNegMale={total_b_negative_male}
            bNegFemale={total_b_negative_female}
            oPos={total_o_positive}
            oPosMale={total_o_positive_male}
            oPosFemale={total_o_positive_female}
            oNeg={total_o_negative}
            oNegMale={total_o_negative_male}
            oNegFemale={total_o_negative_female}
            abPos={total_ab_positive}
            abPosMale={total_ab_positive_male}
            abPosFemale={total_ab_positive_female}
            abNeg={total_ab_negative}
            abNegMale={total_ab_negative_male}
            abNegFemale={total_ab_negative_female}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Family Head"
          desc="The one who earns money or makes decisions for the rest of the family."
          footer={`${ViewUtils.percentage(
            total_family_head,
            total_population
          )} or ${total_family_head?.toLocaleString()} out of ${total_population?.toLocaleString()} residents answered yes.`}>
          <FamilyHead familyHead={total_family_head} familyHeadMale={total_family_head_male} familyHeadFemale={total_family_head_female} />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Household Head"
          desc="Head of the household unit or by himself (or herself) if living alone."
          footer={`${ViewUtils.percentage(
            total_household_head,
            total_population
          )} or ${total_household_head?.toLocaleString()} out of ${total_population?.toLocaleString()} residents answered yes.`}>
          <HouseholdHead
            householdHead={total_household_head}
            householdHeadMale={total_household_head_male}
            householdHeadFemale={total_household_head_female}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Socio Civics" desc="Distribution of the population according to sex and socio civics.">
          <SocioCivics
            soloParent={total_solo_parent}
            soloParentMale={total_solo_parent_male}
            soloParentFemale={total_solo_parent_female}
            disability={total_disability}
            disabilityMale={total_disability_male}
            disabilityFemale={total_disability_female}
            fourPs={total_member_of_4ps}
            fourPsMale={total_member_of_4ps_male}
            fourPsFemale={total_member_of_4ps_female}
            iPs={total_member_of_ips}
            iPsMale={total_member_of_ips_male}
            iPsFemale={total_member_of_ips_female}
            elderly={total_elderly}
            elderlyMale={total_elderly_male}
            elderlyFemale={total_elderly_female}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Indigenous People" desc="Distribution of the population according to sex and age.">
          <IndigenousPeople
            total={total_member_of_ips}
            male={total_member_of_ips_male}
            female={total_member_of_ips_female}
            preschool={total_member_of_ips_preschool}
            preschoolMale={total_member_of_ips_preschool_male}
            preschoolFemale={total_member_of_ips_preschool_female}
            inSchool={total_member_of_ips_in_school}
            inSchoolMale={total_member_of_ips_in_school_male}
            inSchoolFemale={total_member_of_ips_in_school_female}
            elderly={total_member_of_ips_elderly}
            elderlyMale={total_member_of_ips_elderly_male}
            elderlyFemale={total_member_of_ips_elderly_female}
          />
        </DashboardItem>

        <DashboardItem status={status} title="School Youth" desc="Distribution of the population according to sex and in/out of school youth.">
          <SchoolYouth
            youth={total_youth}
            youthMale={total_youth_male}
            youthFemale={total_youth_female}
            inSchoolYouth={total_in_school_youth}
            inSchoolYouthMale={total_in_school_youth_male}
            inSchoolYouthFemale={total_in_school_youth_female}
            outSchoolYouth={total_out_of_school_youth}
            outSchoolYouthMale={total_out_of_school_youth_male}
            outSchoolYouthFemale={total_out_of_school_youth_female}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Preschool Weight Status"
          desc="Distribution of the population below 6 yrs old according to sex and weight status.">
          <PreschoolWeight
            suw={total_severly_underweight_preschool}
            suwMale={total_severly_underweight_preschool_male}
            suwFemale={total_severly_underweight_preschool_female}
            uw={total_underweight_preschool}
            uwMale={total_underweight_preschool_male}
            uwFemale={total_underweight_preschool_female}
            nw={total_normal_weight_preschool}
            nwMale={total_normal_weight_preschool_male}
            nwFemale={total_normal_weight_preschool_female}
            ow={total_overweight_preschool}
            owMale={total_overweight_preschool_male}
            owFemale={total_overweight_preschool_female}
            o={total_obesity_preschool}
            oMale={total_obesity_preschool_male}
            oFemale={total_obesity_preschool_female}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Goiter Case"
          desc="A goitre, or goiter, is a swelling in the neck resulting from an enlarged thyroid gland.">
          <HealthCase
            case={total_goiter_case}
            caseMale={total_goiter_case_male}
            caseFemale={total_goiter_case_female}
            casePreschool={total_goiter_case_preschool}
            casePreschoolMale={total_goiter_case_preschool_male}
            casePreschoolFemale={total_goiter_case_preschool_female}
            caseElementary={total_goiter_case_elementary}
            caseElementaryMale={total_goiter_case_elementary_male}
            caseElementaryFemale={total_goiter_case_elementary_female}
            casePregnant={total_goiter_case_pregnant}
            caseLactating={total_goiter_case_lactating}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Anemia Case"
          desc="Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.">
          <HealthCase
            case={total_anemia_case}
            caseMale={total_anemia_case_male}
            caseFemale={total_anemia_case_female}
            casePreschool={total_anemia_case_preschool}
            casePreschoolMale={total_anemia_case_preschool_male}
            casePreschoolFemale={total_anemia_case_preschool_female}
            caseElementary={total_anemia_case_elementary}
            caseElementaryMale={total_anemia_case_elementary_male}
            caseElementaryFemale={total_anemia_case_elementary_female}
            casePregnant={total_anemia_case_pregnant}
            caseLactating={total_anemia_case_lactating}
          />
        </DashboardItem>

        <DashboardItem
          status={status}
          title="Vitamin A Deficiency Case"
          desc="Vitamin A deficiency leads to a variety of ocular manifestations including cornea and conjunctival xerosis, keratinization of the conjunctiva, keratomalacia and potentially corneal perforation, retinopathy, visual loss, and nyctalopia.">
          <HealthCase
            case={total_vad_case}
            caseMale={total_vad_case_male}
            caseFemale={total_vad_case_female}
            casePreschool={total_vad_case_preschool}
            casePreschoolMale={total_vad_case_preschool_male}
            casePreschoolFemale={total_vad_case_preschool_female}
            caseElementary={total_vad_case_elementary}
            caseElementaryMale={total_vad_case_elementary_male}
            caseElementaryFemale={total_vad_case_elementary_female}
            casePregnant={total_vad_case_pregnant}
            caseLactating={total_vad_case_lactating}
          />
        </DashboardItem>

        <DashboardItem status={status} title="Pregnancy and Lactation" desc="Distribution of the population according to pregnancy and mortality.">
          <PregnancyLactation
            pregnant={total_pregnant}
            pregnantTeen={total_pregnant_teen}
            pregnantProduct={total_pregnant_productive}
            pregnantHighRisk={total_pregnant_high_risk}
            lactating={total_lactating}
            infant={total_infant}
            infantZeroToThree={total_infant_zero_to_three_months}
            infantFourToSix={total_infant_four_to_six_months}
            infantSevenToNine={total_infant_seven_to_nine_months}
            infantTenToTwelve={total_infant_ten_to_twelve_months}
            pregnantMortality={total_pregnant_mortality}
            pregnantTeenMortality={total_pregnant_teen_mortality}
            pregnantProductMortality={total_pregnant_productive_mortality}
            pregnantHighRiskMortality={total_pregnant_high_risk_mortality}
            lactatingMortality={total_lactating_mortality}
            infantMortality={total_infant_mortality}
            infantZeroToThreeMortality={total_infant_zero_to_three_months_mortality}
            infantFourToSixMortality={total_infant_four_to_six_months_mortality}
            infantSevenToNineMortality={total_infant_seven_to_nine_months_mortality}
            infantTenToTwelveMortality={total_infant_ten_to_twelve_months_mortality}
          />
        </DashboardItem>
      </DashboardContent>
    </Authorization>
  )
}

export default DashboardResidents
