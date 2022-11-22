import './CommunicationFacility.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function CommunicationFacility(props) {
  return (
    <div className="communication-facility">
      <Box>
        <Text orange>Cable (TV)</Text>
        <Text two>{props.totalCommunicationFacilityCableTelevision?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Antenna (TV)</Text>
        <Text two>{props.totalCommunicationFacilityAntennaTelevision?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Radio</Text>
        <Text two>{props.totalCommunicationFacilityRadio?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Two-way Radio</Text>
        <Text two>{props.totalCommunicationFacilityTwoWayRadio?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Mobile Phone</Text>
        <Text two>{props.totalCommunicationFacilityMobilePhone?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Landline Phone</Text>
        <Text two>{props.totalCommunicationFacilityLandlinePhone?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default CommunicationFacility
