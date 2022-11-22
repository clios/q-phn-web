import './Poultry.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function Poultry(props) {
  return (
    <div className="poultry">
      <Box>
        <Text orange>Chicken</Text>
        <Text two>{props.totalPoultryChicken?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Duck</Text>
        <Text two>{props.totalPoultryDuck?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Geese</Text>
        <Text two>{props.totalPoultryGeese?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Turkey</Text>
        <Text two>{props.totalPoultryTurkey?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default Poultry
