import './SocioCivics.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function SocioCivics(props) {
  return (
    <div className="socio-civics">
      <Box>
        <Text orange>Solo Parent</Text>
        <Text blue>Male: {props.soloParentMale?.toLocaleString()}</Text>
        <Text green>Female: {props.soloParentFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.soloParent - (props.soloParentFemale + props.soloParentMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.soloParent?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>PWD</Text>
        <Text blue>Male: {props.disabilityMale?.toLocaleString()}</Text>
        <Text green>Female: {props.disabilityFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.disability - (props.disabilityFemale + props.disabilityMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.disability?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>4Ps</Text>
        <Text blue>Male: {props.fourPsMale?.toLocaleString()}</Text>
        <Text green>Female: {props.fourPsFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.fourPs - (props.fourPsFemale + props.fourPsMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.fourPs?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>IPs</Text>
        <Text blue>Male: {props.iPsMale?.toLocaleString()}</Text>
        <Text green>Female: {props.iPsFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.iPs - (props.iPsFemale + props.iPsMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.iPs?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Senior Citizen</Text>
        <Text blue>Male: {props.elderlyMale?.toLocaleString()}</Text>
        <Text green>Female: {props.elderlyFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.elderly - (props.elderlyFemale + props.elderlyMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.elderly?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default SocioCivics
