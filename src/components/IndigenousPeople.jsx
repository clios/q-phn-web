import './IndigenousPeople.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function IndigenousPeople(props) {
  return (
    <div className="indigenous-people">
      <Box>
        <Text orange>All Age</Text>
        <Text blue>Male: {props.male?.toLocaleString()}</Text>
        <Text green>Female: {props.female?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.total - (props.female + props.male))?.toLocaleString()}</Text>
        <Text total>Total: {props.total?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Preschool</Text>
        <div>Below 6 yrs old</div>
        <Text blue>Male: {props.preschoolMale?.toLocaleString()}</Text>
        <Text green>Female: {props.preschoolFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.preschool - (props.preschoolFemale + props.preschoolMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.preschool?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>In School</Text>
        <div>6-24 yrs old</div>
        <Text blue>Male: {props.inSchoolMale?.toLocaleString()}</Text>
        <Text green>Female: {props.inSchoolFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.inSchool - (props.inSchoolFemale + props.inSchoolMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.inSchool?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Senior Citizen</Text>
        <div>60 yrs old and above</div>
        <Text blue>Male: {props.elderlyMale?.toLocaleString()}</Text>
        <Text green>Female: {props.elderlyFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.elderly - (props.elderlyFemale + props.elderlyMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.elderly?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default IndigenousPeople
