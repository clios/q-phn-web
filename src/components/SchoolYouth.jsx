import './SchoolYouth.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function SchoolYouth(props) {
  return (
    <div className="school-youth">
      <Box>
        <Text orange>Total of Youth</Text>
        <Text>6-24 yrs old</Text>
        <Text blue>Male: {props.youthMale?.toLocaleString()}</Text>
        <Text green>Female: {props.youthFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.youth - (props.youthFemale + props.youthMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.youth?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>In School Youth</Text>
        <Text>6-24 yrs old</Text>
        <Text blue>Male: {props.inSchoolYouthMale?.toLocaleString()}</Text>
        <Text green>Female: {props.inSchoolYouthFemale?.toLocaleString()}</Text>
        <Text>
          Not Sure: {(props.inSchoolYouth - (props.inSchoolYouthFemale + props.inSchoolYouthMale))?.toLocaleString()}
        </Text>
        <Text total>Total: {props.inSchoolYouth?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Out of School Youth</Text>
        <Text>6-24 yrs old</Text>
        <Text blue>Male: {props.outSchoolYouthMale?.toLocaleString()}</Text>
        <Text green>Female: {props.outSchoolYouthFemale?.toLocaleString()}</Text>
        <Text>
          Not Sure: {(props.outSchoolYouth - (props.outSchoolYouthFemale + props.outSchoolYouthMale))?.toLocaleString()}
        </Text>
        <Text total>Total: {props.outSchoolYouth?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default SchoolYouth
