import './WaterSupply.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function WaterSupply(props) {
  return (
    <div className="water-supply">
      <Box>
        <Text orange>Tap (Inside House)</Text>
        <Text two>{props.totalWaterSupplyTap?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Spring</Text>
        <Text two>{props.totalWaterSupplySpring?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Dug Well</Text>
        <Text two>{props.totalWaterSupplyDugWell?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Public Faucet</Text>
        <Text two>{props.totalWaterSupplyPublicFaucet?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Public Well</Text>
        <Text two>{props.totalWaterSupplyPublicWell?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default WaterSupply
