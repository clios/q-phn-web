import './AgriculturalProducts.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function AgriculturalProducts(props) {
  return (
    <div className="agricultural-products">
      <Box>
        <Text orange>Rice</Text>
        <Text two>{props.totalAgriculturalProductRice?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Corn</Text>
        <Text two>{props.totalAgriculturalProductCorn?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Banana</Text>
        <Text two>{props.totalAgriculturalProductBanana?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Taro / Gabi</Text>
        <Text two>{props.totalAgriculturalProductTaro?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Cassava</Text>
        <Text two>{props.totalAgriculturalProductCassava?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default AgriculturalProducts
