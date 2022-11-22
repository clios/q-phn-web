import './BloodType.css'

import Box from './Box'
import React from 'react'
import Text from './Text'
import ViewUtils from '../utils/ViewUtils'

function BloodType(props) {
  return (
    <div className="blood-type">
      <Box className="blood-type-box">
        <div>
          <Text two orange>
            A+
          </Text>
          <Text blue>Male: {props.aPosMale?.toLocaleString()}</Text>
          <Text green>Female: {props.aPosFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.aPos - (props.aPosFemale + props.aPosMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.aPos?.toLocaleString()}</Text>
        </div>
        <div>
          <Text two orange>
            A-
          </Text>
          <Text blue>Male: {props.aNegMale?.toLocaleString()}</Text>
          <Text green>Female: {props.aNegFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.aNeg - (props.aNegFemale + props.aNegMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.aNeg?.toLocaleString()}</Text>
        </div>
        <div>
          <Text orange>Total of Blood Type A</Text>
          <Text three>{(props.aPos + props.aNeg)?.toLocaleString()}</Text>
          <Text orange>Residents</Text>
        </div>
        <div>
          <Text orange>Percentage of Blood Type A</Text>
          <Text three>{ViewUtils.percentage(props.aPos + props.aNeg, props.totalPopulation)}</Text>
          <Text orange>Out of {props.totalPopulation?.toLocaleString()} Residents</Text>
        </div>
      </Box>
      <Box className="blood-type-box">
        <div>
          <Text two orange>
            B+
          </Text>
          <Text blue>Male: {props.bPosMale?.toLocaleString()}</Text>
          <Text green>Female: {props.bPosFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.bPos - (props.bPosFemale + props.bPosMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.bPos?.toLocaleString()}</Text>
        </div>
        <div>
          <Text two orange>
            B-
          </Text>
          <Text blue>Male: {props.bNegMale?.toLocaleString()}</Text>
          <Text green>Female: {props.bNegFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.bNeg - (props.bNegFemale + props.bNegMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.bNeg?.toLocaleString()}</Text>
        </div>
        <div>
          <Text orange>Total of Blood Type B</Text>
          <Text three>{(props.bPos + props.bNeg)?.toLocaleString()}</Text>
          <Text orange>Residents</Text>
        </div>
        <div>
          <Text orange>Percentage of Blood Type B</Text>
          <Text three>{ViewUtils.percentage(props.bPos + props.bNeg, props.totalPopulation)}</Text>
          <Text orange>Out of {props.totalPopulation?.toLocaleString()} Residents</Text>
        </div>
      </Box>
      <Box className="blood-type-box">
        <div>
          <Text two orange>
            O+
          </Text>
          <Text blue>Male: {props.oPosMale?.toLocaleString()}</Text>
          <Text green>Female: {props.oPosFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.oPos - (props.oPosFemale + props.oPosMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.oPos?.toLocaleString()}</Text>
        </div>
        <div>
          <Text two orange>
            O-
          </Text>
          <Text blue>Male: {props.oNegMale?.toLocaleString()}</Text>
          <Text green>Female: {props.oNegFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.oNeg - (props.oNegFemale + props.oNegMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.oNeg?.toLocaleString()}</Text>
        </div>
        <div>
          <Text orange>Total of Blood Type O</Text>
          <Text three>{(props.oPos + props.oNeg)?.toLocaleString()}</Text>
          <Text orange>Residents</Text>
        </div>
        <div>
          <Text orange>Percentage of Blood Type O</Text>
          <Text three>{ViewUtils.percentage(props.oPos + props.oNeg, props.totalPopulation)}</Text>
          <Text orange>Out of {props.totalPopulation?.toLocaleString()} Residents</Text>
        </div>
      </Box>
      <Box className="blood-type-box">
        <div>
          <Text two orange>
            AB+
          </Text>
          <Text blue>Male: {props.abPosMale?.toLocaleString()}</Text>
          <Text green>Female: {props.abPosFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.abPos - (props.abPosFemale + props.abPosMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.abPos?.toLocaleString()}</Text>
        </div>
        <div>
          <Text two orange>
            AB-
          </Text>
          <Text blue>Male: {props.abNegMale?.toLocaleString()}</Text>
          <Text green>Female: {props.abNegFemale?.toLocaleString()}</Text>
          <Text>Not Sure: {(props.abNeg - (props.abNegFemale + props.abNegMale))?.toLocaleString()}</Text>
          <Text total>Total: {props.abNeg?.toLocaleString()}</Text>
        </div>
        <div>
          <Text orange>Total of Blood Type AB</Text>
          <Text three>{(props.abPos + props.abNeg)?.toLocaleString()}</Text>
          <Text orange>Residents</Text>
        </div>
        <div>
          <Text orange>Percentage of Blood Type AB</Text>
          <Text three>{ViewUtils.percentage(props.abPos + props.abNeg, props.totalPopulation)}</Text>
          <Text orange>Out of {props.totalPopulation?.toLocaleString()} Residents</Text>
        </div>
      </Box>
    </div>
  )
}

export default BloodType
