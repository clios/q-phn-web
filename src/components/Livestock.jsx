import './Livestock.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function Livestock(props) {
  return (
    <div className="livestock">
      <Box>
        <Text orange>Pig</Text>
        <Text two>{props.totalLivestockPig?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Goat</Text>
        <Text two>{props.totalLivestockGoat?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Sheep</Text>
        <Text two>{props.totalLivestockSheep?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Cow</Text>
        <Text two>{props.totalLivestockCow?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Carabao</Text>
        <Text two>{props.totalLivestockCarabao?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Horse</Text>
        <Text two>{props.totalLivestockHorse?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default Livestock
