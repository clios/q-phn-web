import './HealthCase.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function HealthCase(props) {
  return (
    <div className="health-case">
      <Box>
        <Text orange>All Age</Text>
        <Text blue>Male: {props.caseMale?.toLocaleString()}</Text>
        <Text green>Female: {props.caseFemale?.toLocaleString()}</Text>
        <Text>Not Sure: {(props.case - (props.caseFemale + props.caseMale))?.toLocaleString()}</Text>
        <Text total>Total: {props.case?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Preschool</Text>
        <div>Below 6 yrs old</div>
        <Text blue>Male: {props.casePreschoolMale?.toLocaleString()}</Text>
        <Text green>Female: {props.casePreschoolFemale?.toLocaleString()}</Text>
        <Text>
          Not Sure: {(props.casePreschool - (props.casePreschoolFemale + props.casePreschoolMale))?.toLocaleString()}
        </Text>
        <Text total>Total: {props.casePreschool?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Children</Text>
        <div>6-12 yrs old</div>
        <Text blue>Male: {props.caseElementaryMale?.toLocaleString()}</Text>
        <Text green>Female: {props.caseElementaryFemale?.toLocaleString()}</Text>
        <Text>
          Not Sure: {(props.caseElementary - (props.caseElementaryFemale + props.caseElementaryMale))?.toLocaleString()}
        </Text>
        <Text total>Total: {props.caseElementary?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Pregnant</Text>
        <div>All Age</div>
        <Text two green>
          {props.casePregnant?.toLocaleString()}
        </Text>
        <div>Residents</div>
      </Box>
      <Box>
        <Text orange>Lactating</Text>
        <div>All Age</div>
        <Text two green>
          {props.caseLactating?.toLocaleString()}
        </Text>
        <div>Residents</div>
      </Box>
    </div>
  )
}

export default HealthCase
