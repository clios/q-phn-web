import './TransportationFacility.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function TransportationFacility(props) {
  return (
    <div className="transportation-facility">
      <Box>
        <Text orange>Bicycle</Text>
        <Text two>{props.totalTransportationFacilityBicycle?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Motorcycle</Text>
        <Text two>{props.totalTransportationFacilityMotorcycle?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Tricycle</Text>
        <Text two>{props.totalTransportationFacilityTricycle?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Jeep</Text>
        <Text two>{props.totalTransportationFacilityKuliglig?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Car</Text>
        <Text two>{props.totalTransportationFacilityJeepney?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Truck</Text>
        <Text two>{props.totalTransportationFacilityCar?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Van</Text>
        <Text two>{props.totalTransportationFacilityTruck?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Kuliglig</Text>
        <Text two>{props.totalTransportationFacilityVan?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default TransportationFacility
