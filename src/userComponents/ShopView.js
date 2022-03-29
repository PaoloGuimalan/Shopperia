import React from 'react'
import { useParams } from 'react-router-dom'

function ShopView() {

  const {shopID} = useParams();

  return (
    <div>ShopView: {shopID}</div>
  )
}

export default ShopView