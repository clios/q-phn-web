import './HousingUnit.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function HousingUnit(props) {
  return (
    <div className="housing-unit">
      <Box className="housing-unit-owned">
        <Text orange>Owned</Text>
        <Text two>{props.totalHouseUnitOwned?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Rented</Text>
        <Text two>{props.totalHouseUnitRented?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Caretaker</Text>
        <Text two>{props.totalHouseUnitCaretaken?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Permanent-Concrete</Text>
        <Text two>{props.totalHouseUnitConcrete?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Temporary-Wooden</Text>
        <Text two>{props.totalHouseUnitWooden?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Makeshift-cogon / bamboo</Text>
        <Text two>{props.totalHouseUnitMakeshift?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Single</Text>
        <Text two>{props.totalHouseUnitSingle?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Duplex</Text>
        <Text two>{props.totalHouseUnitDuplex?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Commercial / Industrial / Agricultural</Text>
        <Text two>{props.totalHouseUnitCommercial?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Apartment / Accessorial / Condominium</Text>
        <Text two>{props.totalHouseUnitApartment?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Improvised Barong-barong</Text>
        <Text two>{props.totalHouseUnitImprovised?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default HousingUnit
