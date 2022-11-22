import './SourceIncome.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function SourceIncome(props) {
  return (
    <div className="source-income">
      <Box>
        <Text orange>Sari-Sari Store</Text>
        <Text two>{props.totalOtherLivelihoodSariSariStore?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Restaurant</Text>
        <Text two>{props.totalOtherLivelihoodRestaurant?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Bakeshop</Text>
        <Text two>{props.totalOtherLivelihoodBakeshop?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default SourceIncome
