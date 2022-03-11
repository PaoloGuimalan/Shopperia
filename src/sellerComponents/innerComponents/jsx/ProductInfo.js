import React from 'react'
import { useParams } from 'react-router-dom'

function ProductInfo() {

  const {product_id} = useParams();

  return (
    <div>ProductInfo: {product_id}</div>
  )
}

export default ProductInfo