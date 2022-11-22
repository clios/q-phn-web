import './GarbageDisposal.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function GarbageDisposal(props) {
  return (
    <div className="garbage-disposal">
      <Box>
        <Text orange>Picked by Garbage Truck</Text>
        <Text two>{props.totalGarbageDisposalCollecting?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Waste Segregation</Text>
        <Text two>{props.totalGarbageDisposalSegregating?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Composting</Text>
        <Text two>{props.totalGarbageDisposalComposting?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Burning</Text>
        <Text two>{props.totalGarbageDisposalBurning?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Burying</Text>
        <Text two>{props.totalGarbageDisposalBurying?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default GarbageDisposal
