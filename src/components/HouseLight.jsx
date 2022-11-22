import './HouseLight.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function HouseLight(props) {
  return (
    <div className="house-light">
      <Box>
        <Text orange>Electricity</Text>
        <Text two>{props.totalHouseLightElectricity?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Gas Lamp</Text>
        <Text two>{props.totalHouseLightGasLamp?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default HouseLight
