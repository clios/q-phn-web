import './AgeStructure.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function AgeStructure(props) {
  return (
    <div className="age-structure">
      <Box>
        <Text orange>Children</Text>
        <Text>0-12 yrs old</Text>
        <Text blue>Male: {props.childMale?.toLocaleString()}</Text>
        <Text green>Female: {props.childFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.child - (props.childFemale + props.childMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.child?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Teen</Text>
        <Text>13-19 yrs old</Text>
        <Text blue>Male: {props.teenMale?.toLocaleString()}</Text>
        <Text green>Female: {props.teenFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.teen - (props.teenFemale + props.teenMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.teen?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Adult</Text>
        <Text>20-59 yrs old</Text>
        <Text blue>Male: {props.adultMale?.toLocaleString()}</Text>
        <Text green>Female: {props.adultFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.adult - (props.adultFemale + props.adultMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.adult?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Elderly</Text>
        <Text>60 yrs old and above</Text>
        <Text blue>Male: {props.elderlyMale?.toLocaleString()}</Text>
        <Text green>Female: {props.elderlyFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.elderly - (props.elderlyFemale + props.elderlyMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.elderly?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default AgeStructure
