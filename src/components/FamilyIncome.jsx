import './FamilyIncome.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function FamilyIncome(props) {
  return (
    <div className="family-income">
      <Box>
        <Text orange>Below 5,000</Text>
        <Text two>{props.totalMonthlyAverageIncomeBelow5000?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>5,000-9,999</Text>
        <Text two>{props.totalMonthlyAverageIncome5000To9999?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>10,000-29,000</Text>
        <Text two>{props.totalMonthlyAverageIncome10000To29999?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>30,000-69,999</Text>
        <Text two>{props.totalMonthlyAverageIncome30000To69999?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>70,000 and Above</Text>
        <Text two>{props.totalMonthlyAverageIncome70000AndAbove?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default FamilyIncome
