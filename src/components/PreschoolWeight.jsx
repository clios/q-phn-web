import './PreschoolWeight.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function PreschoolWeight(props) {
  return (
    <div className="preschool-weight">
      <Box>
        <Text orange>Severly Underweight</Text>
        <Text blue>Male: {props.suwMale?.toLocaleString()}</Text>
        <Text green>Female: {props.suwFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.suw - (props.suwFemale + props.suwMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.suw?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Underweight</Text>
        <Text blue>Male: {props.uwMale?.toLocaleString()}</Text>
        <Text green>Female: {props.uwFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.uw - (props.uwFemale + props.uwMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.uw?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Normal Weight</Text>
        <Text blue>Male: {props.nwMale?.toLocaleString()}</Text>
        <Text green>Female: {props.nwFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.nw - (props.nwFemale + props.nwMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.nw?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Overweight</Text>
        <Text blue>Male: {props.owMale?.toLocaleString()}</Text>
        <Text green>Female: {props.owFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.ow - (props.owFemale + props.owMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.ow?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Obesity</Text>
        <Text blue>Male: {props.oMale?.toLocaleString()}</Text>
        <Text green>Female: {props.oFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.o - (props.oFemale + props.oMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.o?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default PreschoolWeight
