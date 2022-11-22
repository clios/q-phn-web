import './ActualPopulation.css'

import { VictoryLabel, VictoryPie } from 'victory'

import Box from './Box'
import React from 'react'
import Text from './Text'
import ViewUtils from '../utils/ViewUtils'

function ActualPopulation(props) {
  let total = props.male + props.female
  let not_sure = props.total - total

  return (
    <div className="actual-population">
      <Box>
        <Text orange>Male Population</Text>
        <Text blue three>
          {ViewUtils.percentage(props.male, props.total)}
        </Text>
        <Text>or</Text>
        <Text two>{props.male?.toLocaleString()}</Text>
        <Text>Residents</Text>
      </Box>
      <Box>
        {!props.total && <div>NOT FOUND</div>}
        <VictoryPie
          colorScale={['#20DF20', '#73858C', '#20A8DF']}
          data={[
            { x: 'Female', y: props.female },
            { x: 'Not Sure', y: not_sure },
            { x: 'Male', y: props.male }
          ]}
          height={150}
          labels={() => null}
          padding={0}
        />
        <Text total>
          <Text two>{props.total?.toLocaleString()}</Text>
          <div className="text-orange">Total Population</div>
        </Text>
      </Box>
      <Box>
        <Text orange>Female Population</Text>
        <Text green three>
          {ViewUtils.percentage(props.female, props.total)}
        </Text>
        <Text>or</Text>
        <Text two>{props.female?.toLocaleString()}</Text>
        <Text>Residents</Text>
      </Box>
    </div>
  )
}

export default ActualPopulation
