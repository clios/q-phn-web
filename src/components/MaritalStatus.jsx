import './MaritalStatus.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function MaritalStatus(props) {
  return (
    <div className="marital-status">
      <Box>
        <Text orange>Single</Text>
        <Text blue>Male: {props.singleMale?.toLocaleString()}</Text>
        <Text green>Female: {props.singleFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.single - (props.singleFemale + props.singleMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.single?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Living-in</Text>
        <Text blue>Male: {props.livingInMale?.toLocaleString()}</Text>
        <Text green>Female: {props.livingInFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.livingIn - (props.livingInFemale + props.livingInMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.livingIn?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Married</Text>
        <Text blue>Male: {props.marriedMale?.toLocaleString()}</Text>
        <Text green>Female: {props.marriedFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.married - (props.marriedFemale + props.marriedMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.married?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Widowed</Text>
        <Text blue>Male: {props.widowedMale?.toLocaleString()}</Text>
        <Text green>Female: {props.widowedFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.widowed - (props.widowedFemale + props.widowedMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.widowed?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Divorced</Text>
        <Text blue>Male: {props.divorcedMale?.toLocaleString()}</Text>
        <Text green>Female: {props.divorcedFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.divorced - (props.divorcedFemale + props.divorcedMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.divorced?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Separated</Text>
        <Text blue>Male: {props.separatedMale?.toLocaleString()}</Text>
        <Text green>Female: {props.separatedFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.separated - (props.separatedFemale + props.separatedMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.separated?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default MaritalStatus
